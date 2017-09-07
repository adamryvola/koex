const BasicDAO = require('../BasicDAO');
const {AccountModel} = require('../../model/user');

/**
 * AccountDAO - BasicDAO implementation for @link[AccountModel] entity
 * @augments BasicDAO
 */
class AccountDAO extends BasicDAO {

}
module.exports = new AccountDAO(AccountModel);
