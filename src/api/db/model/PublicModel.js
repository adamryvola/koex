const BasicModel = require('./BasicModel');
const _ = require('lodash');
const crypto = require("crypto");

/**
 * PublicModel implementation. It generates random hash identifier on insert as 'uuid' attribute
 * @abstract
 * @augments BasicModel
 */
class PublicModel extends BasicModel {

    /**
     * JsonSchema getter merge PublicModel schema with super class schema
     * @type {PublicModelSchema}
     * @property {string} uuid unique public identifier
     * @returns PublicModelSchema
     */
    static get jsonSchema() {
        return _.merge(super.jsonSchema, {
            properties: {
                uuid: {type: 'string'}
            }
        });
    }

    /**
     * Method called before entity is inserted (sets: uuid) (super class method called too - look at BasicModel)
     * @param context {ReqContext} request context
     */
    $beforeInsert(context) {
        super.$beforeInsert(context);
        this.uuid = crypto.randomBytes(12).toString("base64");
    }

}

module.exports = PublicModel;

