const objection = require('objection');
const _ = require('lodash');
const {Errors, options} = require('../../../constants');
const debug = require('debug')('[BasicDAO]');

/**
 * BasicDAO implementation with standard CRUD operations and query creator
 * @abstract
 */
class BasicDAO {

    /**
     * Constructor with model (required)
     * @param model {BasicModel} model class
     * @throws {AbstractClassConstructor} Cannot crate Basic class directly - subclass needed
     * @returns {BasicDAO}
     */
    constructor(model) {
        if (new.target === BasicDAO) {
            throw Error(Errors.AbstractClassConstructor('BasicDAO'));
        }
        this.setModel(model);
        return this;
    }

    getModel() {
        return this.model;
    }

    setModel(model) {
        this.model = model;
    }

    /**
     * Get entity by ID
     * @param id {number} entity id
     * @param context {ReqContext} request context
     * @throws {GetByIdFailed}
     * @returns {BasicModel} Promise that returns entity
     */
    getById(id, context) {
        if (!id) {
            throw new Error(Errors.InvalidArguments('BasicDAO.getById', 'id'));
        }
        return this.getModel().makeQuery((trx) => this.createQuery(trx, context).findById(id)
            .catch(err => {
                debug('GgetById error', err.message);
                throw new Error(Errors.GetByIdFailed('BasicDAO.getById'));
            }));
    }

    /**
     * Get entities by field value
     * @param field {Object} Field object
     * @param {string} field.name Database column name
     * @param {string} field.operation Operation for comparing values
     * @param {any} field.value Attribute value
     * @param context {ReqContext} request context
     * @throws {GetByFieldFailed}
     * @returns {BasicModel[]}Promise that returns list of entities
     */
    getByField(field, context) {
        return this.getModel().makeQuery((trx) => this.createQuery(trx, context).where(field.name, field.operation, field.value))
            .catch(err => {
                debug('GetByField', err.message);
                throw new Error(Errors.GetByFieldFailed('BasicDAO'));
            })
    }

    /**
     * Get all entities
     * @param context {ReqContext} request context
     * @throws {GetAllFailed}
     * @returns {BasicModel[]} Promise that returns list of entites
     */
    getAll(context) {
        return this.getModel().makeQuery((trx) => this.createQuery(trx, context))
            .catch(err => {
                debug('GetAll', err.message);
                throw new Error(Errors.GetAllFailed('BasicDAO'));
            })
    }

    /**
     * Get entities by criteria array
     * @param filter {Object[]} Filter array
     * @param {string} filter[].name Database column name
     * @param {string} filter[].operation Operation for comparing values
     * @param {any} filter[].value Attribute value
     * @param context {ReqContext} request context
     * @throws {GetByCriteriaFailed}
     * @returns {BasicModel[]}Promise that returns list of entities
     */
    getByCriteria(filter, context) {
        return this.getModel().makeQuery(trx => {
            let query = this.createQuery();
            if (_.isEmpty(filter)) return this.getAll(context);
            query = this.addWhere(query, filter[0].column, filter[0].value, filter[0].operation);
            if (filter.length === 1) return this.returnResult(query);
            for (let i = 1; i < filter.length; i++) {
                query = this.addAndWhere(query, filter[i].value, filter[i].column, filter[i].operation);
            }
            return this.returnResult(query)
        }).catch(err => {
            debug('GetByCriteria', err.message);
            throw new Error(Errors.GetByCriteriaFailed('BasicDAO'));
        })
    }

    /**
     * Create entity (graph style, with all relations)
     * @param object {BasicModel} data object
     * @param context {ReqContext} request context
     * @throws {CreateEntityFailed | InvalidArguments}
     * @returns {BasicModel} Promise that returns created entity
     */
    create(object, context) {
        if (!object) {
            throw new Error(Errors.InvalidArguments('BasicDAO.create', 'object'));
        }
        return this.getModel().makeQuery(trx => {
                return this.createQuery(trx, context).insertGraph({})
                    .then(entity => {
                        object.id = entity.id;
                        return this.createQuery(trx, context).upsertGraph(object, options.UpsertOptions)
                    })
                    .catch(err => {
                        debug('Create', err.message);
                        throw new Error(Errors.CreateEntityFailed('BasicDAO'));
                    })
            }
        );
    }

    /**
     * Update entity (graph style, with all relations)
     * @param object {BasicModel} data object
     * @param context {ReqContext} request context
     * @throws {UpdateEntityFailed | InvalidArguments}
     * @returns {BasicModel} Promise that returns updated entity
     */
    update(object, context) {
        if (!object) {
            throw new Error(Errors.InvalidArguments('BasicDAO.update', 'object'));
        }
        return this.getModel().makeQuery(trx =>
            this.createQuery(trx, context).upsertGraph(object, options.UpsertOptions)
                .catch(err => {
                    debug('Update', err.message);
                    throw new Error(Errors.UpdateEntityFailed('BasicDAO'));
                })
        );
    }

    /**
     * Remove entity by id
     * @param id {number} id of entity to be removed
     * @param context {ReqContext} request context
     * @throws {RemoveEntityFailed | InvalidArguments}
     * @returns {Object} result
     */
    remove(id, context) {
        if (!id) {
            throw new Error(Errors.InvalidArguments('BasicDAO.remove', 'id'));
        }
        return this.getModel().query().deleteById(id)
            .catch(err => {
                debug('Remove', err.message);
                throw new Error(Errors.RemoveEntityFailed(err.message));
            });
    }

    /**
     * Transactional query creator
     * @param trx {Objection.Transaction} transaction
     * @param context {ReqContext} request context
     * @returns {Objection.QueryBuilder<BasicModel>} Transactional query builder transactional with request context injected
     */
    createQuery(trx, context) {
        return this.getModel().query(trx).eager(this.getModel().relations).context(context);
    }

    /**
     * Add where condition to query
     * @param query {Objection.QueryBuilder<BasicModel>} Query builder
     * @param field {Object} field
     * @param {string} field.name Database column name
     * @param {string} field.operation Operation for comparing values
     * @param {any} field.value Attribute value
     * @returns {Objection.QueryBuilder<BasicModel>}
     */
    addAndWhere(query, {name, value, operation = '='}) {
        return query.andWhere(name, operation, value);
    }

    /**
     * Add first where condition to query
     * @param query {Objection.QueryBuilder<BasicModel>} Query builder
     * @param field {Object} field
     * @param {string} field.name Database column name
     * @param {string} field.operation Operation for comparing values
     * @param {any} field.value Attribute value
     * @returns {Objection.QueryBuilder<BasicModel>}
     */
    addWhere(query, {name, operation = '=', value}) {
        return query.where(name, operation, value);
    }

    /**
     * Resolve query builder or log error and pass them to next catcher
     * @param query {Objection.QueryBuilder<BasicModel>} Query builder, that will be resolved
     * @returns {BasicEntity[]} Promise that return list of entities
     */
    returnResult(query) {
        return query
            .then(result => {
                return result;
            })
            .catch((err) => {
                debug('Return result', err.message);
                throw err;
            });
    }
}

module.exports = BasicDAO;
