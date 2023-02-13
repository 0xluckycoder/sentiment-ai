import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'user created 🌟😀',
                accessKey: `${process.env.AccessId}`,
                secretkey: `${process.env.SecretKey}`
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};