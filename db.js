const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : '',
        database : 'products_db'
    },
    pool : {
        min : 0,
        max : 7
    }
});

knex.schema.createTableIfNotExists('products', (table) => {
    table.increments('id').primary();
    table.string('timestamp');
    table.string('nombre');
    table.string('description');
    table.string('codigo');
    table.string('thumbnail');
    table.string('price');
    table.string('stock');

}).then(() => {
    console.log('Tabla creada');
}).catch((err) => {
    console.log(err);
});



module.exports = knex
