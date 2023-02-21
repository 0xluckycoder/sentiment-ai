import { 
    DynamoDBClient, 
    QueryCommand,
    PutItemCommand
} from '@aws-sdk/client-dynamodb';
import { ProductRequest } from '../types/custom';
 
export const createProductDB = async (product: ProductRequest) => {
    try {

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
        return getItemResponse;
    } catch (error) {
        throw error;
    }
}

export const getProductsDB = async (currentAuthUser: string) => {
    try {

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
        return getItemResponse;
    } catch (error) {
        throw error;
    }
}