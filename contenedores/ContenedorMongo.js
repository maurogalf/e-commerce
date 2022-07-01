import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://root:asd123456@cluster-e-commerce.r10cy.mongodb.net/e-commerce?retryWrites=true&w=majority');
mongoose.connection.on('error', (err) => {
    console.log(err);
}
);
mongoose.connection.on('open', () => {
    console.log('MongoDB connected');
}
);


class ContenedorMongo {
    constructor(collectionName, collectionSchema){
        this.collection = mongoose.model(collectionName, collectionSchema);
    }
    
    //CREATE PRODUCT
    async newOne(object){
        try {
            const newOne = await this.collection.create(object)
            const carts = this.getAll()
                console.log(carts)
                return carts
        } catch (error) {
            console.log(`Error al guardar: ${error}`)
        }
    }
    //READ
    async getAll(){
        try {
            const docs = await this.collection.find().lean();
            return docs;        
        } catch (error) {
            console.log(`Error al leer: ${error}`)
        }
    }

    //READ BY ID
    async getById(id){
        try {
            const doc = await this.collection.find({id: id}).lean();
            return doc;
        } catch (error) {
            console.log(`Error al leer: ${error}`)
        }
    }

    //UPDATE
    async update(object){
        try {
            const docUpdated = await this.collection.replaceOne({'id': object.id}, object);
            console.log('Document updated successfully');
        } catch (error) {
            console.log(`Error al actualizar: ${error}`)
        }
    }
    //DELETE
    async delete(id){
        try {
            console.log(id)
            const docDeleted = await this.collection.deleteOne({"id": id});
            console.log("Producto deleteado")
        } catch (error) {
            console.log(`Error al borrar: ${error}`)
        }
    }
}

export default ContenedorMongo;

