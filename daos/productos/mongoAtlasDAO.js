const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    id: Number,
    timestamp: Date,
    nombre: String,
    descripcion: String,
    codigo: String,
    thumbnail: String,
    price: Number,
    stock: Number
});
const Product = model('product', productSchema);

class MongoAtlasDAO {
    constructor(){
        this.connection = this.createConnection();
    }
    
    createConnection(){
        mongoose.connect('mongodb+srv://root:asd123456@cluster-e-commerce.r10cy.mongodb.net/e-commerce?retryWrites=true&w=majority');
        mongoose.connection.on('error', (err) => {
            console.log(err);
        }
        );
        mongoose.connection.on('open', () => {
            console.log('MongoDB connected');
        }
        );
        
    }
    //CREATE PRODUCT
    async newProduct(product){
        const newPr = await new Product(product);
        const productSaved = newPr.save();
        return productSaved;
    }
    //READ PRODUCTS
    async getAllProducts(){
        const products = await Product.find().lean();
        return products;        
    }

    //READ PRODUCT BY ID
    async getProductById(id){
        const product = await Product.find({id: id}).lean();
        return product;
    }

    //UPDATE PRODUCT
    async updateProduct(product){
        const productUpdated = await Product.findByIdAndUpdate(product.id, product);
        return productUpdated;
    }
    //DELETE PRODUCT
    async deleteProduct(id){
        const productDeleted = await Product.findOneAndDelete({id: id});
        return productDeleted;
    }
}

module.exports = MongoAtlasDAO;

