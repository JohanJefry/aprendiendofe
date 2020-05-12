// Dependencies
import jwt from 'jsonwebtoken';
import { getBase64 } from '@utils/security';

// Configuration
import config from '@config';

export function User(req) {
  const { security: { secretKey } } = config

  function jwtVerify(cb, at = false) {//cb= callbkac at = acces token
    const accessToken = req.cookies.at || at//at si lo llaman directamente

    jwt.verify(accessToken, secretKey, (error, accessTokenData = {}) => {
      const { data: user } = accessTokenData// renombramos data a user

      if (error || !user) {
        return cb(false)
      }

      console.log(user)
      return cb(getBase64(user))
    })
  }

  async function getUserData() {
    const UserPromise = new Promise(resolve => jwtVerify(user => resolve(user)))
    const user = await UserPromise
    return user
  }

  return {
    jwtVerify,
    getUserData
  }
}

//verificar si esta conectado y si tiene permisos
export const isConnected = (isLogged = true, privilege = 'user', redirectTo = '/') => (req, res, next) => {
  //console.log('Middlewareeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ')
  User(req).jwtVerify(user => {

    //console.log('esta conec', user, ' probando00 ' ,isLogged)
    if (!user && !isLogged) {
      //console.log('!user && !isLogged')
      return next(); // lo dejamos pasar al proximo middleware
    } else if (user && isLogged) {
      if (privilege === 'god') { // privilegiios usuarios = god con mayores privilegios, admin y user
        if (user.privilege === 'god') {
          return next()
        } else {
          //console.log(user, ' probando1 ' ,isLogged)
          res.redirect(redirectTo)
        }
      } else if (privilege === 'user' && user.privilege === 'user') {
        return next()
      }
    } else {
      //console.log(user, ' probando2 ' ,isLogged)
      res.redirect(redirectTo)
    }
  })

}

export default (req, res, next) => {
  res.user = User(req);

  return next()
}
