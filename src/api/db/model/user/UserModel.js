const PublicModel = require('../PublicModel');
const TABLES = require('../../../../constants/tables');
const {Model} = require('../../DBFactory');
const AccountModel = require('./AccountModel');
const _ = require('lodash');

/**
 * UserModel implementation of default user database entity
 * @augments PublicModel
 */
class UserModel extends PublicModel {

    static get tableName() {
        return TABLES.USER_TABLE_NAME;
    }

    /**
     * JsonSchema getter merge user schema with super class schema
     * @type {Object}
     * @property {string} name full name of user
     * @property {string} email user email
     * @property {string} password hashed password
     * @property {string} salt salt for save password hash
     */
    static get jsonSchema() {
        return _.merge(super.jsonSchema, {
            properties: {
                name: {type: 'string'},
                email: {type: 'string'},
                password: {type: 'string'},
                salt: {type: 'string'}
            }
        });
    }

    /**
     * User relations mapping
     * @type {Object}
     * @property {AccountModel[]} accounts user accounts
     */
    static get relationMappings() {
        return {
            accounts: {
                relation: Model.HasManyRelation,
                modelClass: AccountModel,
                join: {
                    from: `${TABLES.USER_TABLE_NAME}.id`,
                    to: `${TABLES.ACCOUNT_TABLE_NAME}.userId`
                }
            },
        }
    }

}

module.exports = UserModel;
