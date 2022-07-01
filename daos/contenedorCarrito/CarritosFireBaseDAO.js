import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";

class CarritosFirebaseDAO extends ContenedorFirebase {
    constructor() {
        super('carts');
    }  
}
export default CarritosFirebaseDAO;