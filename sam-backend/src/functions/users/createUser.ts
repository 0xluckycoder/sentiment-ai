import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { UserRequest } from '../../types/custom';
import { createUserDB } from '../../database/user';


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

        const createUserDBResponse = await createUserDB(user);
        
        return {
            statusCode: 200,
            body: JSON.stringify(createUserDBResponse),
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