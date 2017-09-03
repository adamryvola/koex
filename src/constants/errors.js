/** @module Errors */

const INVALID_ARGUMENTS = 'INVALID_ARGUMENTS';
const CREATE_ENTITY_FAILED = 'CREATE_ENTITY_FAILED';
const UPDATE_ENTITY_FAILED = 'UPDATE_ENTITY_FAILED';
const ABSTRACT_CLASS_CONSTRUCTOR = 'ABSTRACT_CLASS_CONSTRUCTOR';
const GET_BY_ID_FAILED = 'GET_BY_ID_FAILED';
const GET_BY_FIELD_FAILED ='GET_BY_FIELD_FAILED';
const GET_ALL_FAILED = 'GET_ALL_FAILED';
const GET_BY_CRITERIA__FAILED = 'GET_BY_CRITERIA__FAILED';
const REMOVE_ENTITY_FAILED = 'REMOVE_ENTITY_FAILED';

/**
 * Custom error creator
 * @param message {string} Error message
 * @param error {error|string} error additional info
 * @param code {string} custom error code
 */
const CustomError = (message, error, code) => ({message, error, code});

/**
 * Invalid arguments error object
 * @param error {error|string} error additional info
 */
const InvalidArguments = error => ({
    message: INVALID_ARGUMENTS,
    error,
    code: '001'
});

/**
 * Create entity error object
 * @param error {error|string} error additional info
 */
const CreateEntityFailed = error=> ({
    message: CREATE_ENTITY_FAILED,
    error,
    code: '002'
});

/**
 * Update entity error object
 * @param error {error|string} error additional info
 */
const UpdateEntityFailed = error => ({
    message: UPDATE_ENTITY_FAILED,
    error,
    code: '003'
});

/**
 * Abstract class constructor error object
 * @param error {error|string} error additional info
 */
const AbstractClassConstructor = error => ({
    message: ABSTRACT_CLASS_CONSTRUCTOR,
    error,
    code: '004'
});

/**
 * Get by ID error object
 * @param error {error|string} error additional info
 */
const GetByIdFailed = error => ({
    message: GET_BY_ID_FAILED,
    error,
    code: '005'
});

/**
 * Get by field error object
 * @param error {error|string} error additional info
 */
const GetByFieldFailed = error => ({
    message: GET_BY_FIELD_FAILED,
    error,
    code: '006'
});

/**
 * Get all error object
 * @param error {error|string} error additional info
 */
const GetAllFailed = error => ({
    message: GET_ALL_FAILED,
    error,
    code: '007'
});

/**
 * Get by criteria error object
 * @param error {error|string} error additional info
 */
const GetByCriteriaFailed = error => ({
    message: GET_BY_CRITERIA__FAILED,
    error,
    code: '008'
});

/**
 * Remove entity error object
 * @param error {error|string} error additional info
 */
const RemoveEntityFailed = error => ({
    message: REMOVE_ENTITY_FAILED,
    error,
    code: '009'
});

modules.exports.CustomError = CustomError;
modules.exports.InvalidArguments = InvalidArguments;
modules.exports.CreateEntityFailed = CreateEntityFailed;
modules.exports.UpdateEntityFailed = UpdateEntityFailed;
modules.exports.AbstractClassConstructor = AbstractClassConstructor;
modules.exports.GetByIdFailed = GetByIdFailed;
modules.exports.GetByFieldFailed = GetByFieldFailed;
modules.exports.GetAllFailed = GetAllFailed;
modules.exports.GetByCriteriaFailed = GetByCriteriaFailed;
modules.exports.RemoveEntityFailed = RemoveEntityFailed;