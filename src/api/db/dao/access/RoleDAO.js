const BasicDAO = require('../BasicDAO');
const RoleModel = require('../../model/access/RoleModel');

/**
 * RoleDAO - BasicDAO implementation for @link[RoleModel] entity
 * @augments BasicDAO
 */
class RoleDAO extends BasicDAO {

}
module.exports = new RoleDAO(RoleModel);

