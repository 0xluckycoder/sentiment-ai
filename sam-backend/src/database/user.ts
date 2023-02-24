import { 
    DynamoDBClient, 
    GetItemCommand,
    PutItemCommand,
    DeleteItemCommand,
    UpdateItemCommand
} from '@aws-sdk/client-dynamodb';
import { UserRequest } from '../types/custom';
import { expressionBuilder } from '../utils/expressionBuilder';

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
                "is_unpaid": {
                   BOOL: false 
                },
                "last_payment_date": {
                    NULL: true
                },
                "pricing_plan": {
                    S: user.pricing_plan
                },
                "remaining_reviews": {
                    NULL: true
                },
                "user_created_at": {
                    N: `${user.user_created_at}`
                }
            },

        });
        const response = await client.send(command);
        return response;

    } catch (error) {
        throw error;
    }
}

export const updateUserDB = async (userId: string, data: any) => {
    try {

        const dynamodbExpression: string = expressionBuilder(data)

        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new UpdateItemCommand({
            TableName: "user",
            Key: {
                id: {
                    S: userId
                }
            },
            UpdateExpression: dynamodbExpression,
            ExpressionAttributeValues: {
                ...(data.is_unpaid) && {
                    ":is_unpaid": {
                        BOOL: data.is_unpaid
                    }
                },
                ...(data.last_payment_date) && {
                    ":last_payment_date": {
                        N: data.last_payment_date
                    }
                },
                ...(data.pricing_plan) && {
                    ":pricing_plan": {
                        S: data.pricing_plan
                    }
                },
                ...(data.remaining_reviews) && {
                    ":remaining_reviews": {
                        S: data.remaining_reviews
                    }
                }
            }
        });
        const response = await dynamodbClient.send(command);
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