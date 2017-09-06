# ADANE-FW
#### (adane framework)

This library provides implementation of basic classes and common parts for each backend and client.
Everything in API part is based on Express.js (Routes). Everything in DB part is designed for Objection.js (model implementation, query services - DAO or migrations).

## How to use?        
### Custom model, dao and router implementation

```javascript
//Class
// This custom model has created_at, created_by, updated_at, updated_by, uuid attributes
class CustomModel extends PublicModel {
    
    static get tableName() {
        return 'CUSTOM_MODEL';
    }
    
    static get jsonSchema() {
        return _merge(super.jsonSchema, {
            properties: {
                myCustomAttribyte: {type: 'string'}
            }
        })
    }
}

//DAO
// This DAO has standard CRUD operations implemented
class CustomDAO extends BasicDao {
    
}
module.exports = new CustomDAO(CustomModel);

//Router
// This Router has standard CRUD endpoints implemented
class CustomRouter extends CRUDRouter {
    initAdditionalEndpoints() {
        this.getRouter().get('/custom-endpoint', (req, res) => {
            res.status(200).send('Hello from custom endpoint');
        })
    }
}
module.exports = new CustomRouter(CustomDAO);

//Add router as middleware for apress app
const CustomRouter = require('./CustomRouter').getRouter();
const app = new Express();
app.use('/custom-entityu', CustomRouter);


//Migration - knex migration
const up = (kn, Promise) => {
    return kn.transaction(knex => {

        const initCustomTable = () =>  knex.schema.createTable('CUSTOM_MODEL', table => {
            initPublicModelTable(table);
            table.string('customAttribute');
        });
        return initUserTable()
    })
};
```
    
