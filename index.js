import express from 'express';
import productsRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

// ARCHIVOS ESTATICOS
app.use(express.static('views/layouts'));

import handlebars from 'express-handlebars';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("views", "./views")
app.set("view engine", "hbs")


// Configuracion de handlebars
app.engine( "hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}));


// PUERTO
const port = process.env.PORT || 8080;

app.use("/api/productos", productsRoutes);
app.use("/api/carrito", cartRoutes);



app.listen(port, () => {
    console.log('Server is running on port '+ port);
}
);
