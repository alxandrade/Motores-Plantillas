const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const Container = require('./contenedor')
const producto = new Container();

app.use(express.json());
app.use(express.urlencoded({}))

// Engine set
app.set('views', './views/ejs');
app.set('view engine', 'ejs');

app.get("/", (req, res, next)=>{    
    let productos = producto.read();
    res.render("index",{productos});         
});

app.post('/', async (req, res)=> {
    try{
        let {title,price,thumbnail} = req.body
        if(!title||!price||!thumbnail){
            console.log("Faltan datos");
        } else {
            let nextId = producto.getNextId();
            
            let productos = producto.read();
            let obj = req.body;
            obj.id = nextId;

            productos.push(obj);
            producto.write(productos);

            res.redirect('/');
        }
    } catch(error){
        console.log(error);
    }
    
})

app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))
