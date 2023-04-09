// Helpers
import {
  Response,
} from 'jest-express/lib/response';
import {
  baseErrorKey,
  CustomError,
  errorResponse,
} from '../src';

// Types
import type {
  $CustomError,
} from '../src/types';

describe(
  'error-handler middleware',
  () => {
    let mockResponse;

    describe(
      'errorResponse',
      () => {
        beforeEach(() => {
          mockResponse = new Response();
        });

        afterEach(() => {
          mockResponse.resetMocked();
        });

        it(
          'should send out an error',
          async () => {
            const err = new Error();

            errorResponse(
              mockResponse,
              err,
            );

            expect(mockResponse.json).toHaveBeenCalled();
          },
        );

        it(
          'should send out a SyntaxError if `err.name`=="SyntaxError"',
          async () => {
            const err = new Error();

            err.name = 'SyntaxError';

            errorResponse(
              mockResponse,
              err,
            );

            expect(mockResponse.json)
              .toHaveBeenCalledWith({
                key: baseErrorKey.syntaxError,
                message: expect.any(String),
              });
            expect(mockResponse.status)
              .toHaveBeenCalledWith(400);
          },
        );

        it(
          'should send out an error with custom key and message if both are defined',
          async () => {
            const customErrKey = 'ACUSTOMKEY';
            const customErrMessage = 'a custom message';
            const err: $CustomError = new CustomError(
              customErrMessage,
              customErrKey,
            );

            errorResponse(
              mockResponse,
              err,
            );

            expect(mockResponse.json)
              .toHaveBeenCalledWith({
                key: customErrKey,
                message: customErrMessage,
              });
            expect(mockResponse.status)
              .toHaveBeenCalledWith(400);
          },
        );

        it(
          'should send out an error with data property if data was passed to err object',
          async () => {
            const err: $CustomError = new CustomError(
              'mandatory message field',
              baseErrorKey.parametersValidationError,
              {
                data: {
                  a: null,
                },
              },
            );

            errorResponse(
              mockResponse,
              err,
            );

            expect(mockResponse.json)
              .toHaveBeenCalledWith({
                data: err.data,
                key: expect.any(String),
                message: expect.any(String),
              });
            expect(mockResponse.status)
              .toHaveBeenCalledWith(400);
          },
        );

        it(
          'should send out an error with status 500 if status 500 was passed to err object',
          async () => {
            const err: $CustomError = new CustomError(
              'Lorem',
              baseErrorKey.unknownError,
              {
                status: 500,
              },
            );

            errorResponse(
              mockResponse,
              err,
            );

            expect(mockResponse.json)
              .toHaveBeenCalled();
            expect(mockResponse.status)
              .toHaveBeenCalledWith(err.status);
          },
        );
      },
    );
  },
);
