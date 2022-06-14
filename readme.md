## MongoDB Cloud
[MongoDB Cloud Atlas]: https://cloud.mongodb.com/v2/62a3c7b624de9c42e3ff08d7#clusters/connect?clusterId=Cluster0

## Usuario y clave 
Usuario:        jack
Password:       sUtQ5S4uDtN3WWai

## Link de conexion tomado de Mongo Cloud
```javascript
  mongodb+srv://jack:sUtQ5S4uDtN3WWai@cluster0.arwjf.mongodb.net/?retryWrites=true&w=majority
```
## Link de conexion modificado de Mongo Cloud
```javascript
  mongodb+srv://jack:sUtQ5S4uDtN3WWai@cluster0.arwjf.mongodb.net/?retryWrites=true&w=majority
```
1. install node con brew en mac
2. crear proyecto node
```bash
  npm init
```
3. instalar nodemon
servidor activo que escucha los cambios
[Documentacion Nodemon]: https://www.npmjs.com/package/nodemon

```bash
   npm install nodemon
```

4. se crea un archivo app.js con el siguiente codigo:
```javascript
  const http = require('http');

  const hostname = '127.0.0.1';
  const port = 3000;

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('mi primer proyecto node :D');
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
```
5. ir al archivo package.js buscar la key test que estaba de la siguiente manera:

```javascript
  "test": "echo \"Error: no test specified\" && exit 1"
```
y cambiarlo por lo siguiente:

```javascript
  "dev": "nodemon app.js"
```

6. se ubica en la carpeta root del proyecto y se copia el siguiente comando para correr el proyecto:
```bash
  npm run dev
```

7. Express framework para APIS

8. instalamos Express
```bash
  npm install express
```
9. cambiamos el app.js de la siguiente formada
```javascript
  const express = require('express')
  const app = express()

  app.get('/', (req, res) => {
    res.send('mi primer proyecto de node con express :D')
  })

  app.listen(3000)
```
10. instalamos mongoose
conectarme a base de datos mongo
[Documentacion Mongoose]: https://www.npmjs.com/package/mongoose
```bash
  npm install mongoose
```
11. instalamos morgan
logs para ver errores(leer peticiones)
[Documentacion Morgan]: https://www.npmjs.com/package/morgan
```bash
  npm install morgan
```

12. instalamos dotenv
archivo de ambientes variables de entorno
[Documentacion Dotenv]: https://www.npmjs.com/package/dotenv
```bash
  npm install dotenv --save
```

13. instalamos uuid
permite cifrar
[Documentacion uuid]: https://www.npmjs.com/package/uuid
```bash
  npm install uuid
```

14. instalamos body-parser
convercion del cuerpo a json
[Documentacion body-parser]: https://www.npmjs.com/package/body-parser
```bash
  npm install body-parser
```

15. instalamos cookie-parser
convercion a json
[Documentacion cookie-parser]: https://www.npmjs.com/package/cookie-parser
```bash
  npm install cookie-parser
```

16. instalamos jsonwebtoken

[Documentacion jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
```bash
  npm install jsonwebtoken --save
```

17. instalamos express-jwt

[Documentacion express-jwt]: https://www.npmjs.com/package/express-jwt
```bash
  npm install express-jwt
```

18. se generara la siguiente estructura de carpetas de hermanas de node_modules:

controllers
models
routes
helpers

y el archivo .env

![I1](https://github.com/jackmaf/node-js/blob/master/imagenes-guia/1.png)

19. se modifica el archivo .env de la siguiente manera
```javascript
  MONGO_URI=mongodb+srv://jack:sUtQ5S4uDtN3WWai@cluster0.arwjf.mongodb.net/?retryWrites=true&w=majority
  PORT=3000
  JWT_SECRET=loquequierasponerdediccionariooclaveparaencriptar:D
```
20. Instalacion Postman o Insomnia

[Link Descarga POSTMAN]: https://www.postman.com/downloads/
[Link Descarga Insomnia]: https://insomnia.rest/
[Ver video (Pruebas de APIs con POSTMAN 🔥 | Ejemplo 100% práctico)]: https://www.youtube.com/watch?v=FQAQO90LoQU
[Ver video (Introducción y tutorial a INSOMNIA | CLIENTE REST /GRAPHQL para tu API | ¿ES MEJOR QUE POSTMAN?)]: https://www.youtube.com/watch?v=f8FWymov4uk

21. en la carpeta models se creara un archivo user.js que tendra el siguiente codigo:
```javascript
const User = require('../models/user');
const {errorHandler} = require("../helpers/dbErrorHandler")
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup =(req,res)=> {
  const user = new User(req.body);
  user.save((err,user)=>{
    if(err){
      return res.status(400).json({
        err : errorHandler(err)
      })
    }
    user.salt = undefined
    user.hashed_password = undefined
    res.json({
      user
    })
  })
};

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
}
```

22. en la carpeta helpers se creara un archivo dbErrorHandler.js que tendra el siguiente codigo:
```javascript
"use strict";

/**
 * Get unique error field name
 */
const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error.message.substring(
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
        );
        output =
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
            " already exists";
    } catch (ex) {
        output = "Unique field already exists";
    }

    return output;
};

/**
 * Get the erroror message from error object
 */
exports.errorHandler = error => {
  let message = "";

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message)
        message = error.errorors[errorName].message;
    }
  }

  return message;
};
```
23. en la carpeta controllers se creara un archivo user.js que tendra el siguiente codigo:
```javascript
const User = require('../models/user');
const {errorHandler} = require("../helpers/dbErrorHandler")
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup =(req,res)=> {
  const user = new User(req.body);
  user.save((err,user)=>{
    if(err){
      return res.status(400).json({
        err : errorHandler(err)
      })
    }
    user.salt = undefined
    user.hashed_password = undefined
    res.json({
      user
    })
  })
};

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
}

```
24. en la carpeta routes se creara un archivo user.js que tendra el siguiente codigo:
```javascript
const express = require('express');
const router = express.Router();

const {signup,signin,signout} = require('../controllers/user');

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);


module.exports = router;
```

25. en app.js el siguiente codigo:
```javascript
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

//db
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('Base de datos conectada'))

mongoose.connection.on('error',err=>{
    console.log(`Error al conectar a la BD: ${err.message}`)
});

// Rutas
const userRoutes = require("./routes/user")

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api",userRoutes)


const port =process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`NODE JS api escuchando por el puerto: ${port}`)
})
```
26. corremos el server para que escuche:
```bash
  npm run dev
```
ejemplo de imagen que todo salio perfecto:

![I2](https://github.com/jackmaf/node-js/blob/master/imagenes-guia/5.png)

27. entramos a postman y consumimos la url http://localhost:3000/api/signup o http://127.0.0.1:3000/api/signup para crear un usuario ver siguientes imagenes de consumo
![I3](https://github.com/jackmaf/node-js/blob/master/imagenes-guia/4.png)
![I4](https://github.com/jackmaf/node-js/blob/master/imagenes-guia/3.png)

28. se ingresa a la base de datos remota en Mongo Atlas he ingresamos a: 
Database->Browse Colletions, para revisar que los datos enviamos por postman o insomnia se vean reflejados en la tabla users

![I5](https://github.com/jackmaf/node-js/blob/master/imagenes-guia/2.png)

## Otros
[Heramienta para copiar pegar codigo alumnos]: https://ctxt.io/
