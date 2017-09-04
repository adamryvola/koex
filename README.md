# ADANE-FW
#### (adane framework)

This library provides implementation of basic classes and common parts for each backend and client.
Everything in API part is based on Express.js (Routes). Everything in DB part is designed for Objection.js (model implementation or query services - DAO).

## How to use?
* Each model should extend BasicModel or PublicModel (PM is BM extension), tutorial: 
    * add table name into constants 
    * implement tableName getter
    * implement jsonSchema getter - merge new schema with super class schema
    * implement relationMappings getter (optional)
* Each route should extend EndpointRouter and each entity-route should extend CRUDRoute
    * EndpointRouter - it creates Express.Router instance and add test endpoint '/ping''
    * CRUDRouter - it extends EndpointRouter and add CRUD Routes with DAO methods calling
        * you can override each route calling (e.g. POST /:id -> override initCreateEndpoint)
    * it the end just use getRouter() method and add it as middleware into root router
        * e.g. rootRouter.use('/accounts', require('./AccountsRouter').getRouter())
    
