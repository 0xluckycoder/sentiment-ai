import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { deleteReviewByIdDB } from '../../database/review';
import { errorHandler } from '../../utils/errorHandler';

export const deleteReviewById = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // extract id parameter
        const reviewId = event.pathParameters!.reviewId as string;
        const productId = event.pathParameters!.productId as string;

        const deleteReviewByIdDBResponse = await deleteReviewByIdDB(productId, reviewId);

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: deleteReviewByIdDBResponse
            }),
        };

    } catch (error) {
        return errorHandler(error);
    }
};