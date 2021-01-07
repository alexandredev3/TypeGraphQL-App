import { GraphQLError } from 'graphql';
import { NODE_ENV } from '../utils/environment';
import { ArgumentValidationError } from 'type-graphql';

type Errors = {
  message: string;
  extensions: {
    code: string;
    validationErrors: String[];
  }
}

const exceptionHandle = (error: GraphQLError) => {
  // We have to deal with server errors,
  // These errors may contain sensitive information,
  // such as credentials from our database.

  // We have to make these conditionals
  // because Graphql doesn't understand errors of validations
  // of external libs, if there is a validation error of the class-validator,
  // it will return an internal error code on the server.

  const { message, extensions } = error;

  const isInternalServerError = extensions?.code === "INTERNAL_SERVER_ERROR";

  const errorsFormated: Errors = {
    message,
    extensions: {
      code: 'GRAPHQL_VALIDATION_FAILED',
      validationErrors: error.extensions?.exception.validationErrors
    }
  }
  
  if (error.originalError instanceof ArgumentValidationError) {
    return errorsFormated;
  }

  if (NODE_ENV === 'development') {
    return error;
  }

  if (isInternalServerError) {
    console.log(error);

    return {
      message: 'Internal Server Error',
      code: 'INTERNAL_SERVER_ERROR'
    }
  }

  return errorsFormated;
}

export default exceptionHandle;