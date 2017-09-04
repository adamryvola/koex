const TABLES = require('../../../constants/tables');

const up = (kn, Promise) => {
    return kn.transaction(knex => {

        const initUserTable = () =>  knex.schema.createTable(TABLES.USER_TABLE_NAME, table => {
            table.increments().primary();
        });

        const initAccountTable = () => {

        };



        return initUserTable()
            .then(initAccountTable())

    })
};

const down = (kn, Promise) => {
    return kn.transaction(knex => {
        function dropTableIfExistsCascade(table) {
            return knex.raw(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
        }
        return Promise.all(TABLES.map(dropTableIfExistsCascade));
    })
};

module.exports.up = up;
module.exports.down = down;