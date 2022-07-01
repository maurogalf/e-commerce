import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class CarritosArchivoDAO extends ContenedorArchivo {
    constructor(){
        super('carts.json')
    }
}

export default CarritosArchivoDAO;