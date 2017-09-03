const {Model} = require('objection');
const objection = require('objection');

/**
 * BasicModel implementation with default properties and transactional query creator
 * @abstract
 */
class BasicModel extends Model {

    /**
     * Default properties getter
     * @type {Object}
     * @property {null | DateTime} createdAt Date-time of object creation
     * @property {null | DateTime} updatedAt Date-time of object last update
     * @property {null | number} createdBy user ID (creator)
     * @property {null | number} updatedBy user ID (updater)
     */
    static get defaultProperties() {
        return {
            createdAt: {anyOf: [{type: 'null'}, {type: 'string', format: 'date-time'}]},
            updatedAt: {anyOf: [{type: 'null'}, {type: 'string', format: 'date-time'}]},
            createdBy: {anyOf: [{type: 'null'}, {type: 'integer'}]},
            updatedBy: {anyOf: [{type: 'null'}, {type: 'integer'}]}
        };
    }

    /**
     * Json Schema initializer
     * @param schema {Object} schema object
     * @param {object} schema.properties schema properties (see defaultProperties)
     * @return {Object} Model schema
     */
    static initJsonSchema(schema) {
        schema.properties = Object.assign(schema.properties, this.defaultProperties);
        return schema;
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
