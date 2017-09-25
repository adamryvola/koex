/**
 * Helper for creating migrations with table based on BasicModel or PublicModel
 * @module Migrations
 */

const TABLES = require('./tables');

/**
 * Create default BasicModel properties
 * @param table {Knex.Table}
 */
const initBasicModelTable = (table) => {
    table.increments().primary();
    table.integer('createdBy').references('id').inTable(TABLES.USER_TABLE_NAME);
    table.integer('updatedBy').references('id').inTable(TABLES.USER_TABLE_NAME);
    table.timestamp('createdAt');
    table.timestamp('updatedAt');
};

/**
 * Create default PublicModel properties (using initBasicModelTable)
 * @param table {Knex.Table}
 */
const initPublicModelTable = (table) => {
    initBasicModelTable(table);
    table.string('uuid');
};

module.exports.initBasicModelTable = initBasicModelTable;
module.exports.initPublicModelTable = initPublicModelTable;
module.exports.scripts = {
    user: require('../api/db/migrations/001_init_user'),
    account: require('../api/db/migrations/002_init_account'),
    rolePermission: require('../api/db/migrations/003_init_role_permission'),
};
