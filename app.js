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