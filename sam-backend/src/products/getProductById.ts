import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';


export const getProductById = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback
): Promise<APIGatewayProxyResult> => {

    try {

        // extract id parameter
        const productId = event.pathParameters!.id as string;

        const currentAuthUser = "24bef1a7-2816-48ed-bd09-bcbd07bb97e1";

        // grab the user from DB
        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const getProductItemCommand = new QueryCommand({
            TableName: "product",
            KeyConditionExpression: "user_id = :user_id AND id = :id",
            ExpressionAttributeValues: {
                ":user_id": {
                    S: currentAuthUser
                },
                ":id": {
                    S: productId
                }
            }
        });
        const getItemResponse = await dynamodbClient.send(getProductItemCommand);

        // throw error if user doesn't exits
        if (!getItemResponse.Items) {
            callback(null, {
                statusCode: 404,
                body: JSON.stringify({
                    message: "no product found with given id",
                }),
            });
        }

        // construct the response
        // const constructedResponse: any = {};
        // const itemKeys = Object.keys(getItemResponse.Item as Object);        
        // itemKeys.forEach(item => {
        //     constructedResponse[item] = Object.values(getItemResponse!.Item![item])[0];
        // });

        // return the user if user is found
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