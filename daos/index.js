let carritosDao;
let productosDao;
/* 
La variable de entorno la pongo aca porque no se porque no me deja configurarla en el script de "npm start"
*/
let variableDeEntorno = "firebase"

switch (variableDeEntorno) {
    case 'firebase':
        const { default: ProductosFirebaseDAO } = await import ('./contenedorProductos/ProductosFirebaseDAO.js')
        const { default: CarritosFirebaseDAO } = await import ('./contenedorCarrito/CarritosFirebaseDAO.js')
        productosDao = new ProductosFirebaseDAO()
        carritosDao = new CarritosFirebaseDAO()
        break
        case 'archivo':
            const { default: ProductosArchivoDAO } = await import ('./contenedorProductos/ProductosArchivoDAO.js')
            const { default: CarritosArchivoDAO } = await import ('./contenedorCarrito/CarritosArchivoDAO.js')
            productosDao = new ProductosArchivoDAO()
            carritosDao = new CarritosArchivoDAO()
            break
    case 'mongodb':
        const { default: ProductosMongoDAO } = await import ('./contenedorProductos/ProductosMongoDAO.js')
        const { default: CarritosMongoDAO } = await import ('./contenedorCarrito/CarritosMongoDAO.js')
        productosDao = new ProductosMongoDAO()
        carritosDao = new CarritosMongoDAO()
        break
    case 'memoria':
        const { default: ProductosMemoriaDAO } = await import ('./contenedorProductos/ProductosMemoriaDAO.js')
        const { default: CarritosMemoriaDAO } = await import ('./contenedorCarrito/CarritosMemoriaDAO.js')
        productosDao = new ProductosMemoriaDAO()
        carritosDao = new CarritosMemoriaDAO()
        break
}


export {productosDao, carritosDao }