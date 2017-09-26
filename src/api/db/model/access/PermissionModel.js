const BasicModel = require('../BasicModel');
const TABLES = require('../../../../constants/tables');
const _ = require('lodash');

/**
 * PermissionModel implementation of default permission database entity
 * @augments BasicModel
 */
class PermissionModel extends BasicModel {
    static get tableName() {
        return TABLES.PERMISSION_TABLE_NAME;
    }

    /**
     * JsonSchema getter merge role schema with super class schema
     * @type {Object}
     * @property {string} name permission name
     * @property {string} type permission type (allow, deny)
     * @property {string} activity subject's activity
     * @property {string} subject subject of permission (entity, view, ..)
     */
    static get jsonSchema() {
        return _.merge(super.jsonSchema, {
            properties: {
                name: { type: 'string' },
                type: { type: 'string' },
                activity: { type: 'string' },
                subject: { type: 'string' },
            },
        });
    }
}

module.exports = PermissionModel;
