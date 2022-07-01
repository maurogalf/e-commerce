import ContenedorMongo from "../../contenedores/ContenedorMongo.js";
import mongoose from "mongoose";
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

class ProductosMongoDAO extends ContenedorMongo {
    constructor(){
        super('products', productSchema)
    }
}

export default ProductosMongoDAO;