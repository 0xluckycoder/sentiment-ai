import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { formatResponse } from '../../utils/formatResponse';
import { getUserByIdDB } from '../../database/user';
import { errorHandler } from '../../utils/errorHandler';
import { customError } from '../../utils/customError';

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
            throw customError('no user found with given id','NotFoundException');
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
        return errorHandler(error);
    }
};