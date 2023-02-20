import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { ProductRequest } from '../types/custom';



export const createProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        
        const requestData = JSON.parse(event.body as string);

        // construct and format the user to be created
        const product: ProductRequest = {
            id: uuidv4(),
            user_id: requestData.user_id,
            title: requestData.title
        }

        const client = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new PutItemCommand({
            TableName: "user",
            Item: {
                "id": {
                    S: product.id
                },
                "user_id": {
                    S: product.user_id
                },
                "title": {
                    S: product.title
                }
            },
        });
        const response = await client.send(command);
        
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (err) {

        // handle control level and service level issues 
        console.log('❌', err, '❌');
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};