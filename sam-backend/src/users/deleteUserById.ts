import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { DeleteItemCommand, DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

export const deleteUserById = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // extract id parameter
        const userId = event.pathParameters!.id as string;

        // grab the user from DB
        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });

        const deleteItemCommand = new DeleteItemCommand({
            TableName: "user",
            Key: {
                id: {
                    S: userId
                }
            }
        });
        const deleteItemResponse = await dynamodbClient.send(deleteItemCommand);

        // throw error if user doesn't exits
        // if (!deleteItemResponse.) {
        //     callback(null, {
        //         statusCode: 404,
        //         body: JSON.stringify({
        //             message: "no user found with given id",
        //         }),
        //     });
        // }

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: deleteItemResponse
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