import { promises as fs } from 'fs';

class ContenedorArchivo {
    constructor(ruta){
        this.ruta = `./data/${ruta}`;
    }
    //CREATE PRODUCT
    async newOne(object){
        try{
            const docs = await this.getAll();
                let doc = object;
                doc.id = docs.length + 1;
                doc.timestamp = new Date();
                docs.push(doc);
                fs.writeFile(this.ruta, JSON.stringify(docs), (err) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Producto guardado correctamente');
                        return docs;
                    }
                });
    }catch{
        console.log(err);
    }
    }

    //READ PRODUCTS
    async getAll(){
        try{
            let data = await fs.readFile(this.ruta, 'utf-8');
            console.log("pasa por aca")
            return JSON.parse(data);
        }catch(err){
            console.log(err);
            return[];
        }
    }

    //READ PRODUCT BY ID
    async getById(id){
        try{
            let docs = await this.getAll();
            let doc = docs.filter(doc => doc.id == id);
            return doc;
        }catch(err){
            console.log(err);
            return[];
        }
    }

    //UPDATE PRODUCT
    async update(object){
        try{
            let docs = await this.getAll();
            for(let i = 0; i < docs.length; i++){
                    if(docs[i].id == object.id){
                        docs[i] = object;
                    }
                }
            fs.writeFile(this.ruta, JSON.stringify(docs), (err) => {
                if(err){
                    console.log(err);
                }else{
                    console.log('Document updated successfully');
                }
            });
            }
        catch(err){
            console.log(err);
        }
    }
    //DELETE PRODUCT
    async delete(id){
        try{
            let docs = await this.getAll()
                for(let i = 0; i < docs.length; i++){
                    if(docs[i].id == id){
                        docs.splice(i, 1);
                    }
                }
                fs.writeFile(this.ruta, JSON.stringify(docs), (err) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Deleted successfully');
                    }
                });
            }
        catch(err){
            console.log(err);
        };
    }
}

export default ContenedorArchivo;