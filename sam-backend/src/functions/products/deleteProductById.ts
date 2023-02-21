import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { deleteProductByIdDB } from '../../database/product';

export const deleteProductById = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // extract id parameter
        const productId = event.pathParameters!.id as string;
        const currentAuthUser = "24bef1a7-2816-48ed-bd09-bcbd07bb97e1";

        const deleteProductDBResponse = await deleteProductByIdDB(currentAuthUser, productId);

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: deleteProductDBResponse
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