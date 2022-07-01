import { promises as fs } from 'fs';

class ContenedorArchivo {
    constructor(ruta){
        this.ruta = `./data/${ruta}`;
    }
    //CREATE
    async newOne(object){
        try{
            const docs = await this.getAll()
            docs.push(object);
            const response = await this.save(docs)
            return response;
    }catch{
        console.log(err);
    }
    }

    //READ
    async getAll(){
        try{
            let data = await fs.readFile(this.ruta, 'utf-8');
            return JSON.parse(data);
        }catch(err){
            console.log(err);
            return[];
        }
    }

    //READ BY ID
    async getById(id){
        try{
            let docs = await this.getAll();
            let doc = docs.find(doc => doc.id == id);
            return doc;
        }catch(err){
            console.log(err);
            return{};
        }
    }

    //UPDATE 
    async update(object){
        try{
            let docs = await this.getAll();
            for(let i = 0; i < docs.length; i++){
                    if(docs[i].id == object.id){
                        docs[i] = object;
                    }
                }
            const response = await this.save(docs)
            console.log("products updated successfully")
            return null
            }
        catch(err){
            console.log(err);
        }
    }
    //DELETE 
    async delete(id){
        try{
            let docs = await this.getAll()
                for(let i = 0; i < docs.length; i++){
                    if(docs[i].id == id){
                        docs.splice(i, 1);
                    }
                }
                const response = await this.save(docs)
                return null;
            }
        catch(err){
            console.log(err);
        };
    }

    //SAVE DOCS
    async save(docs){
        fs.writeFile(this.ruta, JSON.stringify(docs), (err) => {
            if(err){
                console.log(err);
            }else{
                console.log('Document saved successfully');
                return docs;
            }
        })
    }
}

export default ContenedorArchivo;