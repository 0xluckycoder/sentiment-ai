import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { deleteUserByIdDB } from '../../database/user';
import { errorHandler } from '../../utils/errorHandler';

export const deleteUserById = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // extract id parameter
        const userId = event.pathParameters!.id as string;

        const deleteUserDBResponse = await deleteUserByIdDB(userId);

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: deleteUserDBResponse
            }),
        };

    } catch (error) {
        return errorHandler(error);
    }
};