const BasicDAO = require('../BasicDAO');
const {UserModel} = require('../../model/user');

/**
 * UserDAO - BasicDAO implementation for @link[UserModel] entity
 * @augments BasicDAO
 */
class UserDAO extends BasicDAO {

}
module.exports = new UserDAO(UserModel);