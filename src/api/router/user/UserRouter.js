const CRUDRouter = require('../CRUDRouter');
const UserDAO = require('../../db/dao/user/UserDAO');

/**
 * UserRouter - router for @link{UserModel} entity, extends @link[CRUDRouter], no new endpoints
 * @augments CRUDEndpoint
 */
class UserRouter extends CRUDRouter {

}
module.exports = new UserRouter(UserDAO);
