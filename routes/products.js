import express from 'express';
import { productosDao } from '../daos/index.js';

const {Router} = express;

const router = Router();


// NEW PRODUCT
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
        productosDao.getAll().then((data) => {
            let newProduct = req.body;
            newProduct.id = data.length + 1;
            newProduct.timestamp = new Date();
            productosDao.newOne(newProduct).then((data) => {
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
        productosDao.delete(req.params.id).then((data) => {
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
        productosDao.getAll().then((data) => {
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
    productosDao.getById(id).then((data) => {
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
    productosDao.getAll().then((data) => {
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
        productosDao.getAll().then((data) => {
            let productUpdated = data.find(product => product.id == req.params.id);
            productUpdated.nombre = req.body.nombre;
            productUpdated.price = req.body.price;
            productUpdated.stock = req.body.stock;
            productosDao.update(productUpdated).then((data) => {
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


export default router;