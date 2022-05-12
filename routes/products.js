const express = require('express');
const fs = require('fs');

const {Router} = express;

const router = Router();

// NEW PRODUCTS
router.get('/form', (req, res) => {
    if(req.query.admin === 'true'){
        res.render('form');
    }else{
        res.send({error: -1, description : 'No tienes permisos para acceder a esta ruta'});
    }
});

router.post('/form/newproduct', (req, res) => {
    fs.readFile('./data/products.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).send('Error al leer el archivo');
        }else{
            const products = JSON.parse(data);
            const newProduct = req.body;
            newProduct.id = products.length + 1;
            newProduct.timestamp = new Date().toLocaleString();
            products.push(newProduct);
            fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
                if(err){
                    res.status(500).send('Error al escribir el archivo');
                }else{
                    res.redirect('/api/productos');
                }
            });
        }
    });
});


// DELETE PRODUCTS
router.delete('/:id', (req, res) => {
    console.log("entro aca")
    fs.readFile('./data/products.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).send('Error al leer el archivo');
        }else{
            const products = JSON.parse(data);
            const newProducts = products.filter(product => product.id !== parseInt(req.params.id));
            fs.writeFile('./data/products.json', JSON.stringify(newProducts), (err) => {
                if(err){
                    res.status(500).send('Error al escribir el archivo');
                }else{
                    res.send('producto borrado');
                }
            });
        }
    });
});

router.get('/delete', (req, res) => {
    if(req.query.admin === 'true'){
        fs.readFile('./data/products.json', (err, data) => {
            if(err){
                res.send('No se pudo leer el archivo');
            }else{
                let products = JSON.parse(data);
                res.render('delete', {data:products});
            }
        });
    }else{
        res.send({error: -1, description : 'No tienes permisos para acceder a esta ruta'});
    }
});




//PRODUCTS
router.get('/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./data/products.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).send('Error al leer el archivo');
        }else{
            const products = JSON.parse(data);
            const productSelect = products.filter(product => product.id === Number(id));
            if(req.query.admin === 'true'){
                res.render('products', {products: productSelect, admin: true});
            }else{
            res.render('products', {products: productSelect});
        }
        }
    });
});

router.get('/', (req, res) => {
    fs.readFile('./data/products.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).send('Error al leer el archivo');
        }else{
            const products = JSON.parse(data);
            if(req.query.admin === 'true'){
                res.render('products', {products: products, admin: true});
            }else{
                res.render('products', {products: products});
        }
    }
    });
});


// EDIT PRODUCTS
router.put('/:id', (req, res) => {
    if(req.query.admin === 'true'){
        fs.readFile('./data/products.json', 'utf-8', (err, data) => {
            if(err){
                res.status(500).send('Error al leer el archivo');
            }else{
                const products = JSON.parse(data);
                const id = req.params.id;
                const index = products.findIndex(product => product.id === Number(id));
                if(index >= 0){
                    products[index].nombre = req.body.nombre;
                    products[index].price = req.body.price;
                    products[index].stock = req.body.stock;
                    fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
                    if(err){
                        res.status(500).send('Error al escribir el archivo');
                    }else{
                        res.redirect('/api/productos');
                    }
                });
                }else{
                    res.send('No se encontro el producto');
                }
            }
        });
    }else{
        res.send({error: -1, description : 'No tienes permisos para acceder a esta ruta'});
    }
});

module.exports = router;