## MongoDB Cloud
[MongoDB Cloud Atlas]: https://cloud.mongodb.com/v2/62a3c7b624de9c42e3ff08d7#clusters/connect?clusterId=Cluster0

## Usuario y clave

user
jack
sUtQ5S4uDtN3WWai

mongodb+srv://jack:sUtQ5S4uDtN3WWai@cluster0.arwjf.mongodb.net/?retryWrites=true&w=majority

1. install node con brew en mac
2. crear proyecto node
npm init

3. instalar nodemon
https://www.npmjs.com/package/nodemon
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
8. instalamos Expres
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
10. instalacion postman o insomnia