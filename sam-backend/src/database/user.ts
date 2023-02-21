import { 
    DynamoDBClient, 
    GetItemCommand,
    PutItemCommand,
    DeleteItemCommand
} from '@aws-sdk/client-dynamodb';
import { UserRequest } from '../types/custom';

export const getUserByIdDB = async (userId: string) => {

    try {

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
        return getItemResponse;

    } catch (error) {
        throw error;
    }
}

export const createUserDB = async (user: UserRequest) => {
    try {

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
        return response;

    } catch (error) {
        throw error;
    }
}

export const deleteUserByIdDB = async (userId: string) => {
    try {
        
        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new DeleteItemCommand({
            TableName: "user",
            Key: {
                id: {
                    S: userId
                }
            }
        });
        const response = await dynamodbClient.send(command);
        return response;
    } catch (error) {
        throw error;
    }
}