import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { updateReviewDB } from '../../database/review';
import { errorHandler } from '../../utils/errorHandler';

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