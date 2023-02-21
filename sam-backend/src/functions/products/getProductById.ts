import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { formatResponse } from '../../utils/formatResponse';
import { getProductByIdDB } from '../../database/product';

export const getProductById = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // extract id parameter
        const productId = event.pathParameters!.id as string;
        const currentAuthUser = "24bef1a7-2816-48ed-bd09-bcbd07bb97e1";

        const getProductByIdDBResponse = await getProductByIdDB(currentAuthUser, productId);

        // throw error if user doesn't exits
        if (!getProductByIdDBResponse.Items) {
            callback(null, {
                statusCode: 404,
                body: JSON.stringify({
                    message: "no product found with given id",
                }),
            });
        }

        // format response
        const formattedResponse = formatResponse(getProductByIdDBResponse.Items!)[0];

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