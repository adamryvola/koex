/**
 * @module DBFactory
 */
const Model = require('objection').Model;
const env = process.env.NODE_ENV || 'development';
const Knex = require('knex');

/**
 * @param knexFile {string} path to knex file
 * @type {Object}
 * @property {BasicModel} BasicModel Basic model implementation
 * @property {PublicModel} PublicModel Public model implementation
 * @property {Objection.Model} Model Objection model implementation
 * @property {Knex} knex knex instance
 * @return {DBFactoryObject}
 */
const DBFactory = (knexFile) => {
    const knexConfig = require(knexFile + '');
    const knex = new Knex(knexConfig[env]);
    const BasicModel = require('./model/BasicModel');
    const PublicModel = require('./model/PublicModel');
    Model.knex(knex);

    return {
        BasicModel,
        PublicModel,
        Model,
        knex
    }
};

module.exports = DBFactory;
