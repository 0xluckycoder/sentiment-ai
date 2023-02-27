import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { updateReviewDB } from '../../database/review';
import { errorHandler } from '../../utils/errorHandler';
import { z } from "zod";
import { customError } from '../../utils/customError';

export const updateReview = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // // extract id parameter
        const reviewId = event.pathParameters!.id as string;
        const productId = "product_1000";
        
        // extract request data
        const requestData = JSON.parse(event.body as string);

        // validate user input
        const reviewInput = z.object({
            title: z.string().max(20).optional(),
            description: z.string().max(600).optional(),
            star_rate: z.number().min(1).max(5).optional(),
            occupation: z.string().max(30).optional(),
            is_deleted: z.boolean().optional(),
            is_ignored: z.boolean().optional(),
            is_unseen: z.boolean().optional(),
        });
        const isValidData = reviewInput.safeParse(requestData);

        // throw error if validation failed
        if (!isValidData.success) {
            throw customError('validation error', 'ValidationError');
        }  

        requestData.updated_at = Date.now();
        const updateReviewDBResponse = await updateReviewDB(reviewId, productId, requestData);

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: updateReviewDBResponse
            }),
        };

    } catch (error) {
        return errorHandler(error);
    }
};