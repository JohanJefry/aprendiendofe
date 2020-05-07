// Dependencias 
import express from 'express';
import next from 'next';
import path from 'path';

// Settings up Nex App
const dev = process.env.NODE_ENV !== 'productio';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();//para las app Next

// Running Next App
nextApp.prepare().then(()=>{
    const app = express();

    app.all('*', (req, res) => {
        return handle(req, res);
    });

    //Listening port 3000
    app.listen(3000);
});