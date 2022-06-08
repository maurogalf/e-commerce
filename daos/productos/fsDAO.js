const fs = require('fs');


class fsDAO {
    //CREATE PRODUCT
    async newProduct(product){
        try{
            await fs.readFile('./data/products.json', 'utf8', (err, data) => {
                let products = JSON.parse(data);   
                let newProduct = product;
                newProduct.id = products.length + 1;
                newProduct.timestamp = new Date();
                products.push(newProduct);
                fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Producto guardado correctamente');
                    }
                });
        });
    }catch{
        console.log(err);
    }
    }

    //READ PRODUCTS
    async getAllProducts(){
        try{
            let data = await fs.readFileSync('./data/products.json', 'utf-8');
            return JSON.parse(data);
        }catch(err){
            console.log(err);
            return[];
        }
    }

    //READ PRODUCT BY ID
    async getProductById(id){
        try{
            let data = await fs.readFileSync('./data/products.json', 'utf-8');
            let products = JSON.parse(data);
            let product = products.filter(product => product.id == id);
            return product;
        }catch(err){
            console.log(err);
            return[];
        }
    }

    //UPDATE PRODUCT
    async updateProduct(product){
        try{
            let data = await fs.readFileSync('./data/products.json', 'utf-8');
            let products = JSON.parse(data);
            for(let i = 0; i < products.length; i++){
                    if(products[i].id == product.id){
                        products[i] = product;
                    }
                }
            fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
                if(err){
                    console.log(err);
                }else{
                    console.log('Producto actualizado correctamente');
                }
            });
            }
        catch(err){
            console.log(err);
        }
    }
    //DELETE PRODUCT
    async deleteProduct(id){
        try{
            let data = await fs.readFileSync('./data/products.json', 'utf-8');
            let products = JSON.parse(data);
                for(let i = 0; i < products.length; i++){
                    if(products[i].id == id){
                        products.splice(i, 1);
                    }
                }
                fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Producto eliminado correctamente');
                    }
                });
            }
        catch(err){
            console.log(err);
        };
    }
}

module.exports = fsDAO;