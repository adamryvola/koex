const TABLES = require('../../../constants/tables');
const { initBasicModelTable } = require('../../../constants/migrations');

const up = (kn) => kn.transaction(knex => {
    const initRoleTable = () => knex.schema.createTable(TABLES.ROLE_TABLE_NAME, table => {
        initBasicModelTable(table);
        table.string('name');
    });

    const initPermissionTable = () => knex.schema.createTable(TABLES.PERMISSION_TABLE_NAME, table => {
        initBasicModelTable(table);
        table.string('name');
    });

    const initRoleToPermissionTable = () => knex.schema.createTable(TABLES.ROLE_TO_PERMISSION_TABLE_NAME, table => {
        table.integer('roleId').references('id').inTable(TABLES.ROLE_TABLE_NAME);
        table.integer('permissionId').references('id').inTable(TABLES.PERMISSION_TABLE_NAME);
    });

    const initUserRoleRelation = () => knex.schema.table(TABLES.USER_TABLE_NAME, table => {
        table.integer('roleId').references('id').inTable(TABLES.ROLE_TABLE_NAME);
    });

    return initRoleTable()
        .then(initPermissionTable)
        .then(initRoleToPermissionTable)
        .then(initUserRoleRelation);
});

const down = (kn, Promise) => kn.transaction(knex => {
    function dropTableIfExistsCascade(table) {
        return knex.raw(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
    }
    return Promise.all([
        TABLES.ROLE_TO_PERMISSION_TABLE_NAME,
        TABLES.ROLE_TABLE_NAME,
        TABLES.PERMISSION_TABLE_NAME]
        .map(dropTableIfExistsCascade));
});

module.exports.up = up;
module.exports.down = down;

