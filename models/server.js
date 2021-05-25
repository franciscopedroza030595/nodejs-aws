const express = require('express');
const cors = require('cors');





class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);

        this.profilePath = '/api/profile';
        this.twitterPath = '/api/tweets';



        // Middlewares
        this.middlewares();

        //routes
        this.routes();


    }




    middlewares() {

        // CORS
        this.app.use(cors());

        // body read and parse
        this.app.use(express.json());

        // public folder
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.profilePath, require('../routes/profile'));
        this.app.use(this.twitterPath, require('../routes/tweets'));
    }


    listen() {
        this.server.listen(this.port, () => {
            console.log('Server running in port ', this.port);
        });
    }
}

module.exports = Server;