const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {};

        //Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Sockets
        this.sockets();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    start() {
        this.server.listen(this.port, () => {
            console.log('Server on port', this.port);
        });
    }
}

module.exports = Server;