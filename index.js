const express = require('express');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');


const app = express();

// ARCHIVOS ESTATICOS
app.use(express.static('views/layouts'));

const handlebars = require('express-handlebars');
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
