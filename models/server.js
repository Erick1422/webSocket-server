    const express = require('express');
const cors = require('cors');

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.paths = {};

        //Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //Directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server on port', this.port);
        });
    }
}

module.exports = Server;