import { ZodError } from "zod";
import { TErrorSources } from "../errors/error";
import AppError from "../errors/AppError";
import handleZodError from "../errors/handleZodError";
import handleDuplicateError from "../errors/handleDuplicateError";


const globalErrorHandler = (err : any, req : any, res : any, next : any) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources: TErrorSources = [
      {
        path: '',
        message: 'Something went wrong',
      },
    ];
  
    if (err instanceof ZodError) {
      const simplifiedError = handleZodError(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    } else if (err?.code === 11000) {
      const simplifiedError = handleDuplicateError(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
      statusCode = err?.statusCode;
      message = err.message;
      errorSources = [
        {
          path: '',
          message: err?.message,
        },
      ];
    } else if (err instanceof Error) {
      message = err.message;
      errorSources = [
        {
          path: '',
          message: err?.message,
        },
      ];
    }
  
    //ultimate return
    return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      err,
    });
  };
  
  export default globalErrorHandler;