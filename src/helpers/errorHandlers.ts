import { Execution } from '@gooddata/typings';
import {
    ErrorCodes,
} from '@gooddata/data-layer';
import { ErrorStates } from '../constants/errorStates';

export function convertErrors(error: Execution.IError) {
    const errorCode: number = error.response.status;

    switch (errorCode) {
        // TODO: Add 204 type
        case 204:
            throw ErrorStates.NO_DATA;
        case ErrorCodes.HTTP_TOO_LARGE:
            throw ErrorStates.DATA_TOO_LARGE_TO_COMPUTE;
        case ErrorCodes.HTTP_BAD_REQUEST:
            throw ErrorStates.BAD_REQUEST;
        default:
            throw ErrorStates.UNKNOWN_ERROR;
    }
}

export function checkEmptyResult(responses: Execution.IExecutionResponses) {
    if (responses.executionResult === null) {
        throw {
            response: {
                status: 204
            }
        };
    }

    return responses;
}
