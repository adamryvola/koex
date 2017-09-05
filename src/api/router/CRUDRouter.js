const EndpointRouter = require('./EndpointRouter');
const {Errors} = require('../../constants');

/**
 * CRUD Endpoint
 * @extends EndpointRouter
 */
class CRUDEndpoint extends EndpointRouter{

    constructor(dao) {
        super();
        if (new.target === CRUDEndpoint) {
            throw new Error(Errors.AbstractClassConstructor('[CRUDEndpoint] - Don\'t create CRUDEndpoint directly'));
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
                //TODO error reaction
                console.log('[CRUD Router - get all ERROR]', err.message);
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
                    return res.status(404).send({success: false, message: 'Not found'});
                }
            }).catch(err => {
                //TODO error reaction
                console.log('[CRUD Router - get by id ERROR]', err.message);
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
            })
        })
    }

    /**
     * Init update entity endpoint - PUT '/:id'
     */
    initUpdateEndpoint() {
        this.router.put('/:id', (req, res) => {

        });
    }

    /**
     * Init delete entity endpoint - DELETE '/:id'
     */
    initDeleteEndpoint() {
        this.router.delete('/:id', (req, res) => {

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
