const EndpointRouter = require('./EndpointRouter');
const {Errors} = require('../../constants');
const debug = require('../../log')('CRUDRoute');

/**
 * CRUD Endpoint
 * @extends EndpointRouter
 */
class CRUDEndpoint extends EndpointRouter {

    constructor(dao) {
        super();
        if (new.target === CRUDEndpoint) {
            throw new Error(Errors.GetByFieldFailed('CRUDEndpoint'));
        }
        this.setDAO(dao);
    }

    initEndpoints() {
        super.initEndpoints();
        this.initGetAllEndpoint();
        this.initGetByIdEndpoint();
        this.initCreateEndpoint();
        this.initUpdateEndpoint();
        this.initDeleteEndpoint();
    }

    /**
     * Init get all endpoint - GET '/'
     */
    initGetAllEndpoint() {
        this.router.get('/', (req, res) => {
            return this.getDAO().getAll({user: req.user}).then(users => {
                return res.status(200).send(users);
            }).catch(err => {
                debug('[getAll]', err.message);
                return this.sendErr(res, 400, err.message);
            })
        });
    }

    /**
     * Init get by id endpoint - GET '/:id'
     */
    initGetByIdEndpoint() {
        this.router.get('/:id', (req, res) => {
            return this.getDAO().getById(req.params.id, {user: req.user}).then(user => {
                if (user) {
                    return res.status(200).send(user);
                } else {
                    return this.sendErr(res, 404, 'Not found');
                }
            }).catch(err => {
                debug('[getById]', err.message);
                return this.sendErr(res, 400, err.message);
            })
        });
    }

    /**
     * Init create entity endpoint - POST '/'
     */
    initCreateEndpoint() {
        this.router.post('/', (req, res) => {
            return this.getDAO().create(req.body).then(user => {
                return res.status(200).send(user);
            }).catch(err => {
                debug('[create]', err.message);
                return this.sendErr(res, 400, err.message);
            })
        })
    }

    /**
     * Init update entity endpoint - PUT '/:id'
     */
    initUpdateEndpoint() {
        this.router.put('/:id', (req, res) => {
            debug(typeof req.params.id);
            if (!req.body.id) {
                try {
                    req.body.id = parseInt(req.params.id);
                } catch (error) {
                    return this.sendErr(res, 400, error.message);
                }
            }
            return this.getDAO().update(req.body, {user: req.user})
                .then(user => {
                    return res.status(200).send(user);
                }).catch(err => {
                    debug('[update]', err.message);
                    return this.sendErr(res, 400, err.message);
                });
        });
    }

    /**
     * Init delete entity endpoint - DELETE '/:id'
     */
    initDeleteEndpoint() {
        this.router.delete('/:id', (req, res) => {
            return this.getDAO().remove(req.params.id, {user: req.user}).then(result => {
                if (result === 0) {
                    return this.sendErr(res, 404, 'Not found');
                } else {
                    return res.status(200).send({success: true});
                }
            }).catch(err => {
                console.log(err.message);
                debug('[delete]', err.message);
                return this.sendErr(res, 400, err.message);
            })
        });
    }

    setDAO(dao) {
        this.DAO = dao;
    }

    getDAO() {
        return this.DAO;
    }
}

module.exports = CRUDEndpoint;
