import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { ReviewRequest } from '../../types/custom';
import { createReviewDB } from '../../database/review';
import { errorHandler } from '../../utils/errorHandler';
import { z } from "zod";
import { customError } from '../../utils/customError';

export const createReview = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        const requestData = JSON.parse(event.body as string);
        const productId = 'product_1000';
        const userId = 'user_fed_1000';

        // validate user input
        const reviewInput = z.object({
            title: z.string().max(20).optional(),
            description: z.string().max(600),
            star_rate: z.number().min(1).max(5).optional(),
            occupation: z.string().max(30).optional()
        });
        const isValidData = reviewInput.safeParse(requestData);

        // throw error if validation failed
        if (!isValidData.success) {
            throw customError('validation error', 'ValidationError');
        }

        // construct and format the review object to be created
        const review: ReviewRequest = {
            product_id: productId,
            id: uuidv4(),
            user_federated_id: userId,
            ...(requestData.title) && {title :requestData.title},
            description: requestData.description,
            ...(requestData.star_rate) && {star_rate :requestData.star_rate},
            ...(requestData.occupation) && {occupation :requestData.occupation},
            created_at: Date.now(),
            updated_at: Date.now(),
        }

        const createReviewDBResponse = await createReviewDB(review);
     
        return {
            statusCode: 200,
            body: JSON.stringify(createReviewDBResponse),
        };
    } catch (error) {
        return errorHandler(error);
    }
};