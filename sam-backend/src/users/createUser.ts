import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { UserRequest } from '../types/custom';


export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        
        const requestData = JSON.parse(event.body as string);

        // construct and format the user to be created
        const user: UserRequest = {
            id: uuidv4(),
            federated_id: requestData.federated_id,
            currentUnixTime: Date.now(),
            pricingPlan: requestData.pricing_plan
        }

        const client = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new PutItemCommand({
            TableName: "user",
            Item: {
                "id": {
                    S: user.id
                },
                "federated_id": {
                    S: user.federated_id
                },
                "user_created_at": {
                    N: `${user.currentUnixTime}`
                },
                "pricing_plan": {
                    S: user.pricingPlan
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