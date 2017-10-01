const BasicDAO = require('../BasicDAO');
const UserModel = require('../../model/user/UserModel');
const { Errors } = require('../../../../constants');
const debug = require('../../../../log')('UserDAO');

/**
 * UserDAO - BasicDAO implementation for @link[UserModel] entity
 * @augments BasicDAO
 */
class UserDAO extends BasicDAO {
    create(data, context) {
        // const user = UserModel.fromJson(data);
        const user = data;
        // TODO generate password and salt
        delete user.rawPassword;
        return super.create(user, context);
    }

    isEmailAvailable(email, context) {
        return this.getModel().makeQuery(trx =>
            this.createQuery(trx, context).skipUndefined().where('email', 'like', email).then(user => !user))
            .catch(err => {
                debug('IsEmailAvailable', err.message);
                throw new Error(Errors.GetByFieldFailed('UserDAO'));
            });
    }
}

module.exports = new UserDAO(UserModel);
