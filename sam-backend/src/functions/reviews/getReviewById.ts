import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { getReviewByIdDB } from '../../database/review';
import { formatResponse } from '../../utils/formatResponse';
 
export const getReviewById = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // extract id parameters
        const reviewId = event.pathParameters!.reviewId as string;
        const productId = event.pathParameters!.productId as string;

        const getReviewByIdDBResponse = await getReviewByIdDB(productId, reviewId);

        // throw error if user doesn't exits
        if (getReviewByIdDBResponse.Items?.length === 0) {
            callback(null, {
                statusCode: 404,
                body: JSON.stringify({
                    message: "no review found with given id",
                }),
            });
        }

        // format response
        const formattedResponse = formatResponse(getReviewByIdDBResponse.Items!)[0];

        // return the user if user is found
        return {
            statusCode: 200,
            body: JSON.stringify({
                data: formattedResponse
            }),
        };

    } catch (error) {
        console.log('❌', error, '❌');
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'server error',
            }),
        };
    }
};