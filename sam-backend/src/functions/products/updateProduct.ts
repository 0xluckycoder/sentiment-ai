import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { updateProductDB } from '../../database/product';
import { errorHandler } from '../../utils/errorHandler';

export const updateProduct = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // extract id parameter
        const productId = event.pathParameters!.id as string;
        const currentAuthUser = "24bef1a7-2816-48ed-bd09-bcbd07bb97e1";
        
        // extract request data
        const requestData = JSON.parse(event.body as string);

        const updateProductDBResponse = await updateProductDB(currentAuthUser, productId, requestData.title);

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: updateProductDBResponse
            }),
        };

    } catch (error) {
        return errorHandler(error);
    }
};