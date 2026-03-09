export const internalServerError = () => {
    return {
        success: false,
        data: {},
        message: 'Internal server error' 
    }
}


export const customErrorResponse = (error) => {
    if(!error.message) {
        return internalServerError(error);
    }
    return {
        success: false,
        data: {},
        message: error.message
    }
}


export const successResponse = (data, message) => {
    return {
        success: true,
        message,
        data,
        err: {}
    }
}