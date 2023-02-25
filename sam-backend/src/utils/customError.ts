export const customError = (message: string, name: string): Error => {
    const error = new Error(message);
    error.name = name;
    return error;
    
    // throw customError('Unauthorized request', 'Unauthorized');
}