const express = require('express');

// Ir comentando y descomentando para cambiar entre las diferentes implementaciones
// MongoDB
const MongoAtlasDAO = require('../daos/productos/MongoAtlasDAO');
let DaoInstance = new MongoAtlasDAO();

// FireBase
// const fireBaseDAO = require('../daos/productos/fireBaseDAO');
// let DaoInstance = new fireBaseDAO();

// FireSystem
// const fsDAO = require('../daos/productos/fsDAO');
// let DaoInstance = new fsDAO();


const {Router} = express;

const router = Router();


// RENDER NEW PRODUCTS
router.get('/form', (req, res) => {
    if(req.query.admin === 'true'){
        res.render('form');
    }else{
        res.send({error: -1, description : 'No tienes permisos para acceder a esta ruta'});
    }
});

// SAVE NEW PRODUCT
router.post('/form/newproduct', (req, res) => {
    if(req.query.admin === 'true'){
        DaoInstance.getAllProducts().then((data) => {
            let newProduct = req.body;
            newProduct.id = data.length + 1;
            newProduct.timestamp = new Date();
            DaoInstance.newProduct(newProduct).then((data) => {
                res.redirect('/api/productos');
            }).catch((err) => {
                res.send({error: -1, description: 'Error al guardar el producto'});
            });
        }).catch((err) => {
            res.send({error: -1, description: 'Error al leer la coleccion'});
        });
    }else{
        res.send({error: -1, description : 'No tienes permisos para acceder a esta ruta'});
    }
});



// DELETE PRODUCTS
router.delete('/:id', (req, res) => {
    if(req.query.admin === 'true'){
        DaoInstance.deleteProduct(req.params.id).then((data) => {
            res.send({error: 0, description: 'Producto eliminado correctamente'});
        }).catch((err) => {
            res.send({error: -1, description: 'Error al eliminar el producto'});
        });
    }else{
        res.send({error: -1, description : 'No tienes permisos para acceder a esta ruta'});
    }
});

// DELETE VIEW
router.get('/delete', (req, res) => {
    if(req.query.admin === 'true'){
        DaoInstance.getAllProducts().then((data) => {
            res.render('delete', {data:products});
        }).catch((err) => {
            res.send({error: -1, description: 'Error al leer la coleccion'});
        });
    }else{
        res.send({error: -1, description : 'No tienes permisos para acceder a esta ruta'});
    }
});

//PRODUCT BY ID
router.get('/:id', (req, res) => {
    let id = Number(req.params.id);
    DaoInstance.getProductById(id).then((data) => {
        if(req.query.admin === 'true'){
            res.render('products', {products: data, admin: true, id: true});
        }else{
            res.render('products', {products: data, admin: false, id: true});
        }
    }).catch((err) => {
        res.send({error: -1, description: 'Error al leer la coleccion'});
    });
});


// GET ALL PRODUCTS
router.get('/', (req, res) => {
    DaoInstance.getAllProducts().then((data) => {
        if(req.query.admin === 'true'){
            res.render('products', {products: data, admin: true});  
        }else{
            res.render('products', {products: data, admin: false});
        }
    }).catch((err) => {
        res.send({error: -1, description: 'Error al leer la coleccion'});
    });
});





// EDIT PRODUCTS
router.put('/:id', (req, res) => {
    if(req.query.admin === 'true'){
        DaoInstance.getAllProducts().then((data) => {
            let productUpdated = data.find(product => product.id == req.params.id);
            productUpdated.nombre = req.body.nombre;
            productUpdated.price = req.body.price;
            productUpdated.stock = req.body.stock;
            DaoInstance.updateProduct(productUpdated).then((data) => {
                res.send({error: 0, description: 'Producto actualizado correctamente'});
            }).catch((err) => {
                res.send({error: -1, description: 'Error al actualizar el producto'});
            });
        }).catch((err) => {
            res.send({error: -1, description: 'Error al leer la coleccion'});
        });
    }else{
        res.send({error: -1, description : 'No tienes permisos para acceder a esta ruta'});
    }
});


module.exports = router;