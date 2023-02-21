import { 
    DynamoDBClient, 
    QueryCommand,
    PutItemCommand,
    UpdateItemCommand
} from '@aws-sdk/client-dynamodb';
import { ProductRequest } from '../types/custom';
 
export const createProductDB = async (product: ProductRequest) => {
    try {

        const client = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new PutItemCommand({
            TableName: "product",
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
    return response;
    } catch (error) {
        throw error;
    }
}

export const getProductByIdDB = async (currentAuthUser: string, productId: string) => {
    try {

        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new QueryCommand({
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
        const response = await dynamodbClient.send(command);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getProductsDB = async (currentAuthUser: string) => {
    try {

        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new QueryCommand({
            TableName: "product",
            KeyConditionExpression: "user_id = :user_id",
            ExpressionAttributeValues: {
                ":user_id": {
                    S: currentAuthUser
                }
            }
        });
        const response = await dynamodbClient.send(command);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateProductDB = async (
    userId: string, 
    productId: string,
    title: string
) => {
    try {

        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new UpdateItemCommand({
            TableName: "product",
            Key: {
                user_id: {
                    S: userId
                },
                id: {
                    S: productId
                }
            },
            UpdateExpression: "set title = :title",
            ExpressionAttributeValues: {
                ":title": {
                    S: title
                }
            }
        });
        const response = await dynamodbClient.send(command);
        return response;
    } catch (error) {
        throw error;
    }
}