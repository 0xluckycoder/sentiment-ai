import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { DynamoDBClient, BatchGetItemCommand, ScanCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

export const getProducts = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        const currentAuthUser = "24bef1a7-2816-48ed-bd09-bcbd07bb97e1";

        // grab the user from DB
        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });

        const getProductsCommand = new QueryCommand({
            TableName: "product",
            KeyConditionExpression: "user_id = :user_id",
            ExpressionAttributeValues: {
                ":user_id": {
                    S: currentAuthUser
                }
            }
        });
        const getItemResponse = await dynamodbClient.send(getProductsCommand);

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: getItemResponse
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