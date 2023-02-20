import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { UserRequest, UserTableObject } from '../types/custom';

export const getUserById = async (
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
        const getItemCommand = new GetItemCommand({
            Key: {
                id: {
                    S: userId
                }
            },
            TableName: "user"
        });
        const getItemResponse = await dynamodbClient.send(getItemCommand);

        // throw error if user doesn't exits
        if (!getItemResponse.Item) {
            callback(null, {
                statusCode: 404,
                body: JSON.stringify({
                    message: "no user found with given id",
                }),
            });
        }

        // construct the response
        const constructedResponse: any = {};
        const itemKeys = Object.keys(getItemResponse.Item as Object);        
        itemKeys.forEach(item => {
            constructedResponse[item] = Object.values(getItemResponse!.Item![item])[0];
        });

        // return the user if user is found
        return {
            statusCode: 200,
            body: JSON.stringify({
                data: constructedResponse
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