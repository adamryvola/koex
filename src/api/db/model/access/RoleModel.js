const BasicModel = require('../BasicModel');
const UserModel = require('../user/UserModel');
const PermissionModel = require('./PermissionModel');
const TABLES = require('../../../../constants/tables');
const _ = require('lodash');

/**
 * RoleModel implementation of default role database entity
 * @augments BasicModel
 */
class RoleModel extends BasicModel {

    static get tableName() {
        return TABLES.ROLE_TABLE_NAME;
    }

    /**
     * JsonSchema getter merge role schema with super class schema
     * @type {Object}
     * @property {string} name role name
     */
    static get jsonSchema() {
        return _.merge(super.jsonSchema, {
            properties: {
                name: {type: 'string'}
            }});
    }

    /**
     * Role relations mapping
     * @type {Object}
     * @property {PermissionModel[]} permissions role's permissions
     */
    static get relationMappings() {
        return {
            permissions: {
                relation: this.ManyToManyRelation,
                modelClass: PermissionModel,
                join: {
                    from: `${TABLES.ROLE_TABLE_NAME}.id`,
                    through: {
                        from: `${TABLES.ROLE_TO_PERMISSION_TABLE_NAME}.roleId`,
                        to: `${TABLES.ROLE_TO_PERMISSION_TABLE_NAME}.permissionId`
                    },
                    to: `${TABLES.PERMISSION_TABLE_NAME}.id`
                }
            }
        }
    }

}

module.exports = RoleModel;


