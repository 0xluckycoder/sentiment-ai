import { ReviewRequest } from "../types/custom";
import { 
    DynamoDBClient, 
    GetItemCommand,
    PutItemCommand,
    DeleteItemCommand
} from '@aws-sdk/client-dynamodb';

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
                ...(review.title) && {
                    "title": {
                        S: review.title
                    }
                },
                "description": {
                    S: review.description
                },
                ...(review.star_rate) && {
                    "star_rate": {
                        N: `${review.star_rate}`
                    }
                },
                ...(review.occupation) && {
                    "occupation": {
                        S: review.occupation
                    }
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