const {Model} = require('objection');
const objection = require('objection');
const {Errors} = require('../../constants');

/**
 * BasicModel implementation with default properties and transactional query creator
 * @abstract
 */
class BasicModel extends Model {

    constructor() {
        if (new.target === BasicModel) {
            throw new Error(Errors.AbstractClassConstructor('[BasicModel] - Don\'t create BasicModel directly'));
        }
        super();
    }

    /**
     * Table name getter
     * @abstract
     * @throws {AbstractClassConstructor}
     * @return {String} table name
     */
    static get tableName() {
        throw new Error(Errors.AbstractClassConstructor('[BasicModel - tableName getter] - Don\'t create BasicModel directly'))
    }

    /**
     * Json Schema initializer
     * @type {BasicSchema}
     * @property {null | number} id unique database identifier (primary key)
     * @property {null | Date} createdAt Date-time of object creation
     * @property {null | Date} updatedAt Date-time of object last update
     * @property {null | number} createdBy user ID (creator)
     * @property {null | number} updatedBy user ID (updater)
     * @return {BasicSchema} BasicModel schema
     */
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: {type: 'integer'},
                createdAt: {anyOf: [{type: 'null'}, {type: 'string', format: 'date-time'}]},
                updatedAt: {anyOf: [{type: 'null'}, {type: 'string', format: 'date-time'}]},
                createdBy: {anyOf: [{type: 'null'}, {type: 'integer'}]},
                updatedBy: {anyOf: [{type: 'null'}, {type: 'integer'}]}
            }
        };
    }

    /**
     * Method called before entity is inserted (sets: createdAt, updatedAt, createdBy, updatedBy)
     * @param context {ReqContext} request context
     */
    $beforeInsert(context) {
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
        this.createdBy = context.user.id;
        this.updatedBy = context.user.id;
    }

    /**
     * Method called before entity is updated (sets: updatedAt, updatedBy)
     * @param options
     * @param context {ReqContext} request context
     */
    $beforeUpdate(options, context) {
        this.updatedAt = new Date().toISOString();
        this.updatedBy = context.user.id;
    }

    /**
     * Executes query
     * @param callback
     * @return {Promise<BasicModel | BasicModel[]>}
     */
    makeQuery(callback) {
        return objection.transaction(this.knex(), transaction => callback(transaction));
    }
}

module.exports = BasicModel;
