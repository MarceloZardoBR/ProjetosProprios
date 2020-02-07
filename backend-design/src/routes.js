const express = require('express');
const DesignController = require('./controller/DesignController');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send('Lets Do This Shit');
})

routes.post('/design/create', DesignController.create);
routes.post('/design/auth', DesignController.auth);
routes.get('/user', DesignController.user);
routes.post('/addDesign', DesignController.addDesign);
routes.get('/userProducts', DesignController.getUserProducts);
routes.put('/editProduct', DesignController.editUserProduct);
routes.get('/getUserProduct', DesignController.getProductById);
routes.delete('/deleteProduct', DesignController.deleteUserProd);
module.exports = routes;

