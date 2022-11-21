let {Router} = require("express")
let router = new Router ()

const Container = require('../../contenedor')
const producto = new Container();

module.exports = app => {

    app.use("/api", router);

    // Traer los datos de todos los producto
    router.get ("/productos",(req, res, next) =>{
        try{
            let arrayProducto = producto.read();
            res.json(arrayProducto);
        } catch(error){
            console.log(error);
        }
    });

    // Traer los datos de un producto de un ID
    router.get ("/productos/:id",(req, res, next) =>{
        try{            
            let id = parseInt(req.params.id);            
            let productoEncontrado = producto.getById(id);
            productoEncontrado ? res.json(productoEncontrado): res.send(`Producto No Encontrado con ID: ${id}`);
        } catch(error){
            console.log(error);
        }
    });

    // Agregar nuevo producto al archivo
    router.post ("/productos",(req, res, next) =>{
        try{
            let {title,price,thumbnail} = req.body
            if(!title||!price||!thumbnail){
                console.log("Faltan datos");
            } else {
                let nextId = producto.getNextId();
                
                let productosAll = producto.read();
                let obj = req.body;
                obj.id = nextId;

                productosAll.push(obj);
                producto.write(productosAll);

                res.json(productosAll);
            }
        } catch(error){
            console.log(error);
        }
    });

    // Modificar los datos de un ID
    router.put ("/productos/:id",(req, res, next) =>{
        try{
            let {title,price,thumbnail} = req.body
            if(!title||!price||!thumbnail){
                console.log("Faltan datos");
            }else{
                let productosAll = producto.read();
                let id = parseInt(req.params.id);
                
                productosAll.map(p => {
                    if(p.id === id){
                        p.title = title;
                        p.price = price;
                        p.thumbnail = thumbnail;
                    } 
                });

                producto.write(productosAll);
                res.send(productosAll);
            }
        } catch(error){
            console.log(error);
        }
    });

    // Borrar los datos de un ID
    router.delete ("/productos/:id",(req, res, next) =>{
        try{
            let id = parseInt(req.params.id);
            producto.deleteById(id);
            let productosAll = producto.read();
            res.json(productosAll);
        } catch{
            console.log(error);
        }
    });
}
 