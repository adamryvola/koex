/**
 * @module Errors
 */

/**
 * Abstract class constructor error message creator
 * @param source {string} name of class which throwed error
 */
const AbstractClassConstructor = source => `Don't create ${source} directly`;

/**
 * Invalid arguments error message creator
 * @param source {string} name of class which throwed error
 * @param params {any} list of invalid arguments
 */
const InvalidArguments = (source, params) => `Invalid argumens: ${params} in ${source}`;

/**
 * Get by ID error message creator
 * @param source {string} name of class which throwed error
 */
const GetByIdFailed = source => `Fetch entity by id in ${source} failed`;

/**
 * Create entity error message creator
 * @param source {string} name of class which throwed error
 */
const CreateEntityFailed = source => `Create entity in ${source} failed`;

/**
 * Update entity error message creator
 * @param source {string} name of class which throwed error
 */
const UpdateEntityFailed = source => `Update entity in ${source} failed`;

/**
 * Get by field error message creator
 * @param source {string} name of class which throwed error
 */
const GetByFieldFailed = source => `Get entity by field in ${source} failed`;

/**
 * Get all error message creator
 * @param source {string} name of class which throwed error
 */
const GetAllFailed = source => `Get all entities in ${source} failed`;

/**
 * Get by criteria error message creator
 * @param source {string} name of class which throwed error
 */
const GetByCriteriaFailed = source => `Get entity by criteria in ${source} failed`;

/**
 * Remove entity error message creator
 * @param source {string} name of class which throwed error
 */
const RemoveEntityFailed = source => `Remove entity in ${source} failed`;

module.exports.InvalidArguments = InvalidArguments;
module.exports.CreateEntityFailed = CreateEntityFailed;
module.exports.UpdateEntityFailed = UpdateEntityFailed;
module.exports.AbstractClassConstructor = AbstractClassConstructor;
module.exports.GetByIdFailed = GetByIdFailed;
module.exports.GetByFieldFailed = GetByFieldFailed;
module.exports.GetAllFailed = GetAllFailed;
module.exports.GetByCriteriaFailed = GetByCriteriaFailed;
module.exports.RemoveEntityFailed = RemoveEntityFailed;
