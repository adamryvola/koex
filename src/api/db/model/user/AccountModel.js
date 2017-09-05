const BasicModel = require('../BasicModel');
const {Model} = require('../../DBFactory');
const TABLES = require('../../../../constants/tables');
const UserModel = require('./UserModel');
const _ = require('lodash');

/**
 * AccountModel implementation of default accnout database entity
 * @augments BasicModel
 */
class AccountModel extends BasicModel {

    static get tableName() {
        return TABLES.ACCOUNT_TABLE_NAME;
    }

    /**
     * JsonSchema getter merge account schema with super class schema
     * @type {Object}
     * @property {string} accessToken AccessToken (short term)
     * @property {string} refreshToken Refresh token (long term)
     * @property {string} email user email
     * @property {string} provider identity provider (e.g. GOOGLE)
     * @property {string} subject user identifier in 3rd party system
     * @property {number} userId owner of account
     */
    static get jsonSchema() {
        return _.merge(super.jsonSchema, {
            properties: {
                accessToken: {type: 'string'},
                refreshToken: {type: 'string'},
                email: {type: 'string'},
                provider: {type: 'string'},
                subject: {type: 'string'},
                userId: {type: 'integer'}

        }});
    }

    /**
     * Account relations mapping
     * @type {Object}
     * @property {UserModel} user account owner
     */
    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${TABLES.ACCOUNT_TABLE_NAME}.userId`,
                    to: `${TABLES.USER_TABLE_NAME}.id`
                }
            },
        }
    }

}

module.exports = AccountModel;
