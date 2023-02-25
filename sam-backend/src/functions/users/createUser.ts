import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { UserRequest } from '../../types/custom';
import { createUserDB } from '../../database/user';
import { errorHandler } from '../../utils/errorHandler';

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        
        const requestData = JSON.parse(event.body as string);

        // construct and format the user to be created
        const user: UserRequest = {
            id: uuidv4(),
            federated_id: requestData.federated_id,
            user_created_at: Date.now(),
            pricing_plan: requestData.pricing_plan
        }

        const createUserDBResponse = await createUserDB(user);
        
        return {
            statusCode: 200,
            body: JSON.stringify(createUserDBResponse),
        };
    } catch (error) {
        return errorHandler(error);
    }
};