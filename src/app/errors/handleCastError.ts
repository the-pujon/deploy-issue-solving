// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
// import { TErrorSources, TGenericErrorResponse } from './error';


// const handlePrismaError = (
//     err: PrismaClientKnownRequestError,
// ): TGenericErrorResponse => {
//     let errorSources: TErrorSources = [];

//     // Handle a unique constraint violation
//     if (err.code === 'P2002') {
//         errorSources = [
//             {
//                 path: err.meta?.target?.toString() || 'unknown',
//                 message: `Duplicate value for ${err.meta?.target?.toString()}`,
//             },
//         ];
//     } else if (err.code === 'P2025') {
//         // Handle record not found
//         errorSources = [
//             {
//                 path: err.message,
//                 message: 'Record not found',
//             },
//         ];
//     } else {
//         // General Prisma error
//         errorSources = [
//             {
//                 path: err.message,
//                 message: 'An error occurred with Prisma',
//             },
//         ];
//     }

//     const statusCode = 400;

//     return {
//         statusCode,
//         message: 'Prisma Error',
//         errorSources,
//     };
// };

// export default handlePrismaError;
