import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {

        const client = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command =  new ListTablesCommand({});
        const data = await client.send(command);
        console.log('🔥', data, '🔥😀');

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'user created 🌟🌟',
            }),
        };
    } catch (err) {
        console.log('❌', err, '❌');
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};