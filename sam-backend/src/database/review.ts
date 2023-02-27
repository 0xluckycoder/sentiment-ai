import { ReviewRequest } from "../types/custom";
import { 
    DynamoDBClient, 
    GetItemCommand,
    PutItemCommand,
    DeleteItemCommand,
    UpdateItemCommand,
    QueryCommand
} from '@aws-sdk/client-dynamodb';
import { expressionBuilder } from "../utils/expressionBuilder";

export const createReviewDB = async (review: ReviewRequest) => {
    try {

        const client = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new PutItemCommand({
            TableName: "review",
            Item: {
                "product_id": {
                    S: review.product_id
                },
                "id": {
                    S: review.id
                },
                "user_federated_id": {
                    S: review.user_federated_id
                },
                ...(review.title) 
                ? {
                    "title": {
                        S: review.title
                    }
                } 
                : {
                    "title": {
                        NULL: true
                    }
                }
                ,
                "description": {
                    S: review.description
                },
                ...(review.star_rate) 
                ? {
                    "star_rate": {
                        N: `${review.star_rate}`
                    }
                }
                : {
                    "star_rate": {
                        NULL: true
                    }
                }
                ,
                ...(review.occupation) 
                ? {
                    "occupation": {
                        S: review.occupation
                    }
                }
                : {
                    "occupation": {
                        NULL: true
                    }
                },
                "sentiment_rate": {
                    NULL: true
                },
                "automated_suggestion": {
                    NULL: true
                },
                "sentiments": {
                    NULL: true
                },
                "automated_reply": {
                    NULL: true
                },
                "sent_reply": {
                    NULL: true
                },
                "is_deleted": {
                    BOOL: false
                },
                "is_ignored": {
                    BOOL: false
                },
                "is_unseen": {
                    BOOL: true
                },
                "created_at": {
                    N: `${review.created_at}`
                },
                "updated_at": {
                    N: `${review.updated_at}`
                }
            },
        });
        const response = await client.send(command);
        return response;

    } catch (error) {
        throw error;
    }
}

export const getReviewsDB = async (productId: string) => {
    try {
        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new QueryCommand({
            TableName: "review",
            KeyConditionExpression: "product_id = :product_id",
            ExpressionAttributeValues: {
                ":product_id": {
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

export const updateReviewDB = async (
    reviewId: string, 
    productId: string,
    data: any
) => {
    try {

        const dynamodbExpression: string = expressionBuilder(data);

        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new UpdateItemCommand({
            TableName: "review",
            Key: {
                product_id: {
                    S: productId
                },
                id: {
                    S: reviewId
                }
            },
            UpdateExpression: dynamodbExpression,
            ExpressionAttributeValues: {
                ...(data.hasOwnProperty('title')) && {
                    ":title": {
                        S: data.title
                    }
                },
                ...(data.hasOwnProperty('description')) && {
                    ":description": {
                        S: data.description
                    }
                },
                ...(data.hasOwnProperty('star_rate')) && {
                    ":star_rate": {
                        N: `${data.star_rate}`
                    }
                },
                ...(data.hasOwnProperty('occupation')) && {
                    ":occupation": {
                        S: data.occupation
                    }
                },
                ...(data.hasOwnProperty('is_deleted')) && {
                    ":is_deleted": {
                        BOOL: `${data.is_deleted}`
                    }
                },
                ...(data.hasOwnProperty('is_ignored')) && {
                    ":is_ignored": {
                        BOOL: `${data.is_ignored}`
                    }
                },
                ...(data.hasOwnProperty('is_unseen')) && {
                    ":is_unseen": {
                        BOOL: `${data.is_unseen}`
                    }
                },
                ...(data.hasOwnProperty('created_at')) && {
                    ":created_at": {
                        N: `${data.created_at}`
                    }
                },                
                ...(data.hasOwnProperty('updated_at')) && {
                    ":updated_at": {
                        N: `${data.updated_at}`
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


export const getReviewByIdDB = async (productId: string, reviewId: string) => {
    try {

        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new QueryCommand({
            TableName: "review",
            KeyConditionExpression: "product_id = :product_id AND id = :id",
            ExpressionAttributeValues: {
                ":product_id": {
                    S: productId
                },
                ":id": {
                    S: reviewId
                }
            }
        });
        const response = await dynamodbClient.send(command);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteReviewByIdDB = async (productId: string, reviewId: string) => {
    try {

        const dynamodbClient = new DynamoDBClient({
            region: `${process.env.Region}`,
        });
        const command = new DeleteItemCommand({
            TableName: "review",
            Key: {
                product_id: {
                    S: productId
                },
                id: {
                    S: reviewId
                }
            }
        });
        const response = await dynamodbClient.send(command);
        return response;
    } catch (error) {
        throw error;
    }
}