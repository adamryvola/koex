const BasicDAO = require('../BasicDAO');
const PermissionModel = require('../../model/access/PermissionModel');

/**
 * PermissionDAO - BasicDAO implementation for @link[PermissionModel] entity
 * @augments BasicDAO
 */
class PermissionDAO extends BasicDAO {

}
module.exports = new PermissionDAO(PermissionModel);

