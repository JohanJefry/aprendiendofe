// Dependencias
import express from 'express';
import next from 'next';
import path from 'path';

// Settings up Nex App
const dev = process.env.NODE_ENV !== 'productio';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();//para las app Next

// Configuration
import config from '@config';

// Running Next App
nextApp.prepare().then(()=>{
    const app = express();

    //Public static
    app.use(express.static(path.join(__dirname, '../public')));

    //Routes
    app.get('/login', (req, res)=>{
      return nextApp.render(req, res, '/users/login', req.query);
    });


    app.all('*', (req, res) => {
        return handle(req, res);
    });

    //Listening port 3000
    app.listen(config.serverPort);
});
