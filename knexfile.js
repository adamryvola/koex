module.exports = {
    test: {
        connection: 'postgres://postgres:test@localhost:5432/koex-test',
        client: 'pg',
        migrations: {
            directory: __dirname + "/src/api/db/migrations",
            tableName: "version"
        }
    },
};
