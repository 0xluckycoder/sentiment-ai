import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { ProductRequest } from '../../types/custom';
import { createProductDB } from '../../database/product';
import { errorHandler } from '../../utils/errorHandler';



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
    } catch (error) {
        return errorHandler(error);
    }
};