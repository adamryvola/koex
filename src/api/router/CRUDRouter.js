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

        });
    }

    /**
     * Init get by id endpoint - GET '/:id'
     */
    initGetByIdEndpoint() {
        this.router.get('/:id', (req, res) => {

        });
    }

    /**
     * Init create entity endpoint - POST '/'
     */
    initCreateEndpoint() {
        this.router.post('/', (req, res) => {

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

module.exports.CRUDEndpoint = CRUDEndpoint;
