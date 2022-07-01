import express from 'express';
import { carritosDao } from '../daos/index.js';
import { productosDao } from '../daos/index.js';

const { Router } = express;

const router = Router();

// VER CARRITOS
router.get('/', (req, res) => {
    carritosDao.getAll().then((data) => {
        res.render('cartsList', { carts: data });
    }).catch((err) => {
        res.send({ error: -1, description: 'Error al leer la coleccion' });
    })
});

// NUEVO CARRITO
router.post('/', (req, res) => {
    carritosDao.getAll().then((data) => {
        const idCart = data.length == 0 ? 1 : data.length + 1
        const newCart = {
                id: idCart,
                timestamp: new Date().toLocaleString(),
                products: []
            }
        console.log(newCart)
        carritosDao.newOne(newCart).then(() => {
            carritosDao.getAll().then((data) => {
                res.render('cartsList', { carts: data, newCartId: idCart });
            }).catch((err) => {
                res.send({ error: err, description: 'Error al leer la coleccion' });
            })
        }).catch((err)=>{
            res.send({ error: -1, description: 'Error al leer la coleccion' });
    })
    })
})



// ELIMINAR CARRITO
router.delete('/:id', (req, res) => {
    carritosDao.delete(req.params.id).then(() => {
        res.send('Carrito borrado numero: ' + req.params.id);
    }).catch((err) => {
        res.send({ error: err, description: 'Error al eliminar el carrito' });
    });
});

// VER DETALLE DE CARRITO
router.get('/:id/productos', (req, res) => {
    carritosDao.getAll().then((data) => {
        const cartId = parseInt(req.params.id);
        const cartProducts = data.find(cart => cart.id === cartId);
        productosDao.getAll().then((data) => {
            res.render('cartDetail', { data: cartProducts, products: data });
        })
    })
});

// AGREGAR PRODUCTO A CARRITO
router.post('/:id/productos/:id_prod', (req, res) => {
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.id_prod);
    carritosDao.getById(cartId).then((dataCart) => {
        const cart = dataCart;
        productosDao.getById(productId).then((dataProduct) => {
            const product = dataProduct
            cart.products.push(product);
            console.log(cart)
            carritosDao.update(cart).then(() => {
                res.redirect('../productos')
            }).catch((err) => {
                res.send({ error: err, description: 'Error al actualizar el carrito' });
            })
        }).catch((err) => {
            res.send({ error: err, description: 'Error al leer los productos' });
        })
    }).catch((err) => {
        res.send({ error: err, description: 'Error al leer los carritos' });
    })
});

router.delete('/:id/productos/:id_prod', (req, res) => {
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.id_prod);
    carritosDao.getAll().then((data) => {
        const cart = data.find(cart => cart.id == cartId)
        const productIndex = cart.products.findIndex(product => product.id == productId)
        const newCart = cart.products.splice(productIndex, 1)
        console.log("pasa por aca", newCart)
        carritosDao.update(newCart).then((data) => {
            console.log('product deleted from cart successfully')
        }).catch((err) => {
            res.send({ error: err, description: 'Error al actualizar el carrito' });
        })
    }).catch((err) => {
        res.send({ error: err, description: 'Error al leer los carritos' });
    })
});



export default router;