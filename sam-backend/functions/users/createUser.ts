import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {

        // const client = new DynamoDBClient({
        //     region: `${process.env.Region}`,
        // });
        // const command =  new ListTablesCommand({});
        // const data = await client.send(command);
        // console.log('🔥', data, '🔥😀');
        
        const requestData = JSON.parse(event.body as string);

        type User = {
            id: string,
            federated_id: string,
            currentUnixTime: number,
            pricingPlan: "basic" | "pro" | "enterprise"
        }

        const user: User = {
            id: uuidv4(),
            federated_id: requestData.federated_id,
            currentUnixTime: Date.now(),
            pricingPlan: requestData.pricing_plan
        }

        console.log(user);

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