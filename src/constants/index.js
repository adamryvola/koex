const UpsertOptions = {
    relate: true,
    unrelate: true
};

const options = {
    UpsertOptions
};

module.exports.options = options;
module.exports.Errors = require('./errors');
module.exports.migations = require('./migrations').migrations;
