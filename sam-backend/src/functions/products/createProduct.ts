import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { ProductRequest } from '../../types/custom';
import { createProductDB } from '../../database/product';



export const createProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        
        const requestData = JSON.parse(event.body as string);

        // construct and format the user to be created
        const product: ProductRequest = {
            id: uuidv4(),
            user_id: requestData.user_id,
            title: requestData.title
        }

        const createProductDBResponse = await createProductDB(product);
        
        return {
            statusCode: 200,
            body: JSON.stringify(createProductDBResponse),
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