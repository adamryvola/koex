const BasicDAO = require('../BasicDAO');
const UserModel = require('../../model/user/UserModel');

/**
 * UserDAO - BasicDAO implementation for @link[UserModel] entity
 * @augments BasicDAO
 */
class UserDAO extends BasicDAO {

    create(user, context) {
        //TODO generate password and salt
        delete user.rawPassword;
        return super.create(user, context);
    }

}
module.exports = new UserDAO(UserModel);