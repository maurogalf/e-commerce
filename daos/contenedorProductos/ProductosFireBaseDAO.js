import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";

class ProductosFirebaseDAO extends ContenedorFirebase {
    constructor() {
        super("products");
    }
}
export default ProductosFirebaseDAO;