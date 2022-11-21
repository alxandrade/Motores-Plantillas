const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; 
const cors = require("cors")

const { request } = require("http");
// Crear un controlador de rutas
let serverRoutes = require("./routes");

//La imagen se accede desde raiz, no esn /public
app.use(express.static('public'));

//Acceder a index.html
app.use(express.static('html'));

app.use(express.json());
app.use(express.urlencoded({}))
serverRoutes(app);
app.use(cors());

app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))
