import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { getReviewsDB } from '../../database/review';
import { formatResponse } from '../../utils/formatResponse';

export const getReviews = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        const productId = event.pathParameters!.productId as string;
        // const currentAuthUser = "24bef1a7-2816-48ed-bd09-bcbd07bb97e1";

        const getReviewDBResponse = await getReviewsDB(productId);

        // throw error if no products available
        if (getReviewDBResponse.Items?.length === 0) {
            callback(null, {
                statusCode: 404,
                body: JSON.stringify({
                    message: "no reviews available with specified product id"
                }),
            });
        }
        
        // format response
        const formattedResponse = formatResponse(getReviewDBResponse.Items!);

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