import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { ReviewRequest, UserRequest } from '../../types/custom';
import { createUserDB } from '../../database/user';
import { createReviewDB } from '../../database/review';


export const createReview = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        const requestData = JSON.parse(event.body as string);
        const productId = 'product_1000';
        const userId = 'user_fed_1000';

        // construct and format the review object to be created
        const review: ReviewRequest = {
            product_id: productId,
            id: uuidv4(),
            user_federated_id: userId,
            ...(requestData.title) && {title :requestData.title},
            description: requestData.description,
            ...(requestData.star_rate) && {star_rate :requestData.star_rate},
            ...(requestData.occupation) && {occupation :requestData.occupation},
            created_at: Date.now(),
            updated_at: Date.now(),
        }

        const createReviewDBResponse = await createReviewDB(review);
     
        return {
            statusCode: 200,
            body: JSON.stringify(createReviewDBResponse),
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