const PublicModel = require('../PublicModel');
const TABLES = require('../../../../constants/tables');
const AccountModel = require('./AccountModel');
const RoleModel = require('../access/RoleModel');
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
     * Relations getter
     * @return {String} list of relations names
     */
    static get relations() {
        return '[accounts, role]';
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
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                salt: { type: 'string' },
                roleId: { type: 'number' },
            },
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
                relation: this.HasManyRelation,
                modelClass: AccountModel,
                join: {
                    from: `${TABLES.USER_TABLE_NAME}.id`,
                    to: `${TABLES.ACCOUNT_TABLE_NAME}.userId`,
                },
            },
            role: {
                relation: this.BelongsToOneRelation,
                modelClass: RoleModel,
                join: {
                    from: `${TABLES.USER_TABLE_NAME}.roleId`,
                    to: `${TABLES.ROLE_TABLE_NAME}.id`,
                },
            },
        };
    }
}

module.exports = UserModel;
