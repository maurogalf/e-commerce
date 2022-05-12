const express = require('express');
const fs = require('fs');
const { CLIENT_RENEG_WINDOW } = require('tls');

const {Router} = express;

const router = Router();

router.get('/', (req, res) => {
    fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).send('Error al leer el archivo');
        }else{
            const carts = JSON.parse(data);
            res.render('cartsList', {carts: carts});
        }
    }
    );
}
);

router.post('/', (req, res) => {
    fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).send('Error al leer el archivo');
        }else{
            const cart = JSON.parse(data);
            if(data===""){
                newCart = [
                    {
                        id: 1,
                        timestamp: new Date().toLocaleString(),
                        products: []
                    }
                ]
            }else{
                newCart = JSON.parse(data);
                newCartId = cart.length + 1;
                console.log(newCartId);
                newCart = [...cart, {
                    id: newCartId,
                    timestamp: new Date().toLocaleString(),
                    products: []
                }];
            }
            fs.writeFile('./data/cart.json', JSON.stringify(newCart), (err) => {    
                if(err){
                    res.status(500).send('Error al escribir el archivo');
                }else{
                    res.render('cartsList', {carts: newCart, newCartId: newCartId});
                }
            });
        }
    });
});

router.delete('/:id', (req, res) => {
    fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).send('Error al leer el archivo');
        }else{
            const cart = JSON.parse(data);
            const newCart = cart.filter(cart => cart.id !== parseInt(req.params.id));  
            fs.writeFile('./data/cart.json', JSON.stringify(newCart), (err) => {
                if(err){
                    res.status(500).send('Error al escribir el archivo');
                }else{
                    res.send('carrito borrado'+ JSON.stringify(newCart));
                }
            }
            );
        }
    }
    );
});

router.get('/:id/productos', (req, res) => {
    fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).send('Error al leer el archivo');
        }else{
            const cart = JSON.parse(data);
            const cartId = parseInt(req.params.id);
            const cartProducts = cart.filter(cart => cart.id === cartId);
            fs.readFile('./data/products.json', 'utf-8', (err, data) => {
                if(err){
                    res.status(500).send('Error al leer el archivo');
                }else{
                    res.render('cartDetail', {data:cartProducts[0], products:JSON.parse(data)});
                }
            }
            );
        }
    }
    );
}
);


router.post('/:id/productos/:id_prod', (req, res) => {
    fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).send('Error al leer el archivo');
        }else{
            const cart = JSON.parse(data);
            const cartId = parseInt(req.params.id);
            fs.readFile('./data/products.json', 'utf-8', (err, data) => {
                if(err){
                    res.status(500).send('Error al leer el archivo');
                }else{
                    const products = JSON.parse(data);
                    const productId = parseInt(req.params.id_prod);
                    const product = products.find(product => product.id === productId);
                    cart.map(cart => {
                        if(cart.id === cartId){
                            cart.products.push(product);
                        }
                    }
                    );
                    fs.writeFile('./data/cart.json', JSON.stringify(cart), (err) => {   
                        if(err){
                            res.status(500).send('Error al escribir el archivo');
                        }else{
                            res.redirect('.');
                        }
                    }
                    );
                }
            }
            );
        }
    }
    );
}
);

router.delete('/', (req, res) => {
    res.send('Hello World');
}
);


module.exports = router;