import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { formatResponse } from '../../utils/formatResponse';
import { getProductsDB } from '../../database/product';

export const getProducts = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        const currentAuthUser = "24bef1a7-2816-48ed-bd09-bcbd07bb97e1";

        const getProductsDBResponse = await getProductsDB(currentAuthUser);

        // throw error if no products available
        if (!getProductsDBResponse.Items) {
            callback(null, {
                statusCode: 404,
                body: JSON.stringify({
                    message: "no products available"
                }),
            });
        }
        
        // format response
        const formattedResponse = formatResponse(getProductsDBResponse.Items!);

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