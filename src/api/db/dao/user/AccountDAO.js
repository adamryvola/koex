const BasicDAO = require('../BasicDAO');
const {AccountModel} = require('../../model/user');

/**
 * UserDAO - BasicDAO implementation for @link[UserModel] entity
 * @augments BasicDAO
 */
class AccountDAO extends BasicDAO {

}
module.exports = new AccountDAO(AccountModel);
