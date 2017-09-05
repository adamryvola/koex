const TABLES = require('../../../constants/tables');
const {initPublicModelTable, initBasicModelTable} = require('../../../constants/migrations');

const up = (kn, Promise) => {
    return kn.transaction(knex => {

        const initAccountTable = () => knex.schema.createTable(TABLES.ACCOUNT_TABLE_NAME, table => {
            initBasicModelTable(table);
            table.string('accessToken');
            table.string('refreshToken');
            table.string('email');
            table.string('provider');
            table.string('subject');
            table.integer('userId').references('id').inTable(TABLES.USER_TABLE_NAME);
        });

        return initAccountTable();
    })
};

const down = (kn, Promise) => {
    return kn.transaction(knex => {
        function dropTableIfExistsCascade(table) {
            return knex.raw(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
        }
        return Promise.all([TABLES.ACCOUNT_TABLE_NAME].map(dropTableIfExistsCascade));
    })
};

module.exports.up = up;
module.exports.down = down;
