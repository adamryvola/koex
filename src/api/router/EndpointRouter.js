const {Errors} = require('../../constants');
const Router = require('express').Router;

/**
 * Endpoint handler - basic router
 */
class EndpointRouter {

    /**
     * Endpoint handler constructor
     */
    constructor() {
        if (new.target === EndpointRouter) {
            throw new Error(Errors.AbstractClassConstructor('[EndpointRouter] - Don\'t create EndpointRouter directly'));
        }
        this.router = new Router();
        this.initEndpoints();
        this.initAdditionalEndpoints();
    }

    /**
     * Initialize CRUD endpoints
     */
    initEndpoints() {
        this.router.use('/ping', (req, res) => {
            return res.status(200).send('Pong');
        })
    }

    /**
     * Initialize additional endpoints
     * @abstract
     */
    initAdditionalEndpoints() {}

    /**
     * Returns Router
     * @return {Express.Router}
     */
    getRouter() {
        return this.router;
    }
}

modules.exports = EndpointRouter;
