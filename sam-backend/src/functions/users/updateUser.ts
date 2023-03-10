import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { updateUserDB } from '../../database/user';
import { errorHandler } from '../../utils/errorHandler';

export const updateUser = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // extract id parameter
        const userId = event.pathParameters!.id as string;

        // extract request data
        const requestData = JSON.parse(event.body as string);

        const updateUserDBResponse = await updateUserDB(userId, requestData);

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: updateUserDBResponse
            }),
        };

    } catch (error) {
        return errorHandler(error);
    }
};