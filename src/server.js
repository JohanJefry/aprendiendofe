// Dependencias
import express from 'express';
import next from 'next';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session'
// Configuration
import config from '@config';
//Middlewares
import user, { isConnected } from '@middlewares/user';

// Settings up Nex App
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();//para las app Next

// Running Next App
nextApp.prepare().then(()=>{
    const app = express();

    //Public static
    app.use(express.static(path.join(__dirname, '../public')));

    // middlewares
    app.use(session({
      resave: false,// fuerza q la session se guarde en la bd sin importar si hubo cambios o no
      saveUninitialized: true,// guarda el objeto de session
      secret: config.security.secretKey
    }));
    // middleware de expres para enviar datos por formularios
    app.use(bodyParser.json());// Permite recibir parámetros en formato JSON.
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser(config.security.secretKey))
    app.use(cors({ credentials: true, origin: true }))// para pasar cookies en nuestros request
    app.use(user);// el q creamos

    //Routes
    app.get('/login', isConnected(false), (req, res)=>{// isConnected(false) verifica si estaconectado si no next del middleware
      console.log('entro primer Get ')
      return nextApp.render(req, res, '/users/login', req.query)
    });

    // redireccionar a /dashboar si cumple con isConnected si no lo envia a /login?redirectTo=/dashboard
    // si cumple se redirecciona al retur de app.get
    app.get('/dashboard', isConnected(true, 'god', '/login?redirectTo=/dashboard'), (req, res) => {
      return nextApp.render(req, res, '/dashboard', req.query)
    })

    app.all('*', (req, res) => {
        return handle(req, res);
    });

    //Listening port 3000
    app.listen(config.serverPort);
});
