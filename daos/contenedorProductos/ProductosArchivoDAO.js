import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class ProductosArchivoDAO extends ContenedorArchivo {
    constructor(){
        super('products.json')
    }
}

export default ProductosArchivoDAO;