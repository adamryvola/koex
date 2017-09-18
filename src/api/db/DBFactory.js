/**
 * @module DBFactory
 */
const Model = require('objection').Model;
const env = process.env.NODE_ENV || 'production';
const Knex = require('knex');

/**
 * @param knexFile {string} path to knex file
 * @type {Object}
 * @property {TODO} TODO
 * @return {DBFactoryObject}
 */
class DBFactory {
    constructor() {
        this.Models = {
            BasicModel: require('./model/BasicModel'),
            PublicModel: require('./model/PublicModel'),
            UserModel: require('./model/user/UserModel'),
            AccountModel: require('./model/user/AccountModel'),
            RoleModel: require('./model/access/RoleModel'),
            PermissionModel: require('./model/access/PermissionModel')
        };
        this.DAO = {
            BasciDAO: require('./dao/BasicDAO'),
            UserDAO: require('./dao/user/UserDAO'),
            AccountDAO: require('./dao/user/AccountDAO'),
            RoleDAO: require('./dao/access/RoleDAO'),
            PermissionDAO: require('./dao/access/PermissionDAO'),
        };
        this.Migrations = require('../../constants/migrations');
    }

    init(knexfile) {
        const knexConfig = require(knexfile + '');
        const knex = new Knex(knexConfig[env]);
        Model.knex(knex);
        this.Model = Model;
        this.knex = knex;
    }
}

module.exports = new DBFactory();
