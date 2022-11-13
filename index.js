const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; 

const Container = require('./contenedor')
const producto = new Container();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<h1>Servidor corriendo en puerto: ${PORT}</h1>`);
});

app.get("/productos", (req, res) => {    
    let productosAll = producto.read();
    res.json(productosAll);    
});

app.get("/productoRandom", (req, res) => {    
    let id = random(0,3);
    let productosAll = producto.read();
    let productoEncontrado = productosAll[id];

    productoEncontrado ? res.json(productoEncontrado): res.send(`Producto No Encontrado con ID: ${id + 1}`);    
});

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

try {
  app.listen(PORT, () =>
    console.log(`Server on http://localhost:${PORT}`)
  );
} 
catch (error) {
  console.log(`Error al iniciar servidor`, error);
}
