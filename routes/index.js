let API = require("../components/productos")

module.exports = app => {    
    API(app);
    
    //Raiz del proyecto
    app.get("/",(req, res, next) =>{
        res.send("OK");
    });
}