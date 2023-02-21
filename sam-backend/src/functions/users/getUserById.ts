import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { formatResponse } from '../../utils/formatResponse';
import { getUserByIdDB } from '../../database/user';

export const getUserById = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // extract id parameter
        const userId = event.pathParameters!.id as string;

        const getUserByIdDBResponse = await getUserByIdDB(userId);

        // throw error if user doesn't exits
        if (!getUserByIdDBResponse.Item) {
            callback(null, {
                statusCode: 404,
                body: JSON.stringify({
                    message: "no user found with given id",
                }),
            });
        }

        // format response
        const formattedResponse = formatResponse([getUserByIdDBResponse.Item!])[0];

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