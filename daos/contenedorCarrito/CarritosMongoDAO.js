import ContenedorMongo from "../../contenedores/ContenedorMongo.js";
import mongoose from "mongoose";
const { Schema, model } = mongoose;


const cartSchema = new Schema({
    _id: Object,
    id: Number,
    timestamp: String,
    products: Array
});

class CarritosMongoDAO extends ContenedorMongo {
    constructor(){
        super('carts', cartSchema)
    }
}

export default CarritosMongoDAO;