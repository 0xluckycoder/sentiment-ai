import { ErrorTypes } from "../types/custom";

export const errorHandler = (error: unknown) => {

    // log error to the console
    console.log('❌', error, '❌');

    const errorTypes: ErrorTypes = {
        ValidationError: 400,
        NotFoundException: 404
    }

    if (error instanceof Error) {

        const statusCode = errorTypes[error.name] || 500;
        const errorType = errorTypes[error.name] ? error.name : 'ServerError';
        const message = errorTypes[error.name] ? error.message : 'server error occurred';

        return {
            statusCode: statusCode,
            body: JSON.stringify({
                success: false,
                errorType,
                message
            }),
        }
    } else {

        // handling unexpected errors
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                errorType: 'ServerError',
                message: 'server error occurred'
            }),
         
        }
    }

}