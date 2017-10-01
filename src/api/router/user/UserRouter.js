const CRUDRouter = require('../CRUDRouter');
const UserDAO = require('../../db/dao/user/UserDAO');
const debug = require('../../../log')('UserRouter');

/**
 * UserRouter - router for @link{UserModel} entity, extends @link[CRUDRouter], no new endpoints
 * @augments CRUDEndpoint
 */
class UserRouter extends CRUDRouter {
    initAdditionalEndpoints() {
        /**
         * Init is email available endpoint - GET '/available?email=xxx'
         */
        this.getRouter().get('/available', (req, res) => {
            if (!req.query || !req.query.email) {
                return this.sendErr(res, 400, 'Email required');
            }
            return this.getDAO().isEmailAvailable(req.query.email, { user: req.user })
                .then(result => res.status(200).send({ result }))
                .catch(err => {
                    debug('[isEmailAvailable]', err.message);
                    return this.sendErr(res, 400, err.message);
                });
        });
    }
}

module.exports = new UserRouter(UserDAO);
