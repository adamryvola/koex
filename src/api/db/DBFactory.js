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
const DBFactory = (knexFile) => {
    const knexConfig = require(knexFile + '');
    const knex = new Knex(knexConfig[env]);
    Model.knex(knex);

    return {
        Models: {
            BasicModel: require('./model/BasicModel'),
            PublicModel: require('./model/PublicModel'),
            UserModel: require('./model/user/UserModel'),
            AccountModel: require('./model/user/AccountModel'),
            RoleModel: require('./model/access/RoleModel'),
            PermissionModel: require('./model/access/PermissionModel')
        },
        DAO: {
            BasciDAO: require('./dao/BasicDAO'),
            UserDAO: require('./dao/user/UserDAO'),
            AccountDAO: require('./dao/user/AccountDAO'),
            RoleDAO: require('./dao/access/RoleDAO'),
            PermissionDAO: require('./dao/access/PermissionDAO'),
        },
        Migrations: require('../../constants/migrations'),
        Model,
        knex
    }
};

module.exports = DBFactory;
