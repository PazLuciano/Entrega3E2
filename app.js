const { log } = require("console");
const fs = require("fs/promises");
const path = require("path");


const productoManager = require("./productManager")
// console.log(productoManager.ProductManager);
// ----
const archivo = __dirname;
instancia = new productoManager.ProductManager(archivo + "/db.json")

// instancia.getProducts().then((res)=> console.log(res));
const express = require("express");
const { request } = require("https");
const { send } = require("process");
const PORT = 8080;
const app = express()




// SERVIDOR
app.use(express.urlencoded({extended : true}))

app.listen(PORT, () => {
    console.log("API RUNNING ON PORT " + PORT);
})

app.get("/", (request, response) => {
    response.send("En una api por el puerto " + PORT)
} )


app.get("/products", async (req, response) => {

        let productos = await instancia.getProducts()
        console.log(productos);
        const { limit } = req.query;
        if (limit) {
            let productosSeleccionados = []
            let numero = 1;
            productos.forEach(element => {
                if (numero <= limit){
                    productosSeleccionados.push(element);
                    numero ++;
                }
            });
            return response.send(productosSeleccionados)
        }
        else{
            return response.send(productos)
        }
        
})

app.get("/products/:pid", async (req, response) => {

    const pid = req.params.pid;
    if(isNaN(pid)){
        return response.status(400).send("Parametro incorrecto!")
    }
    
    let producto = await instancia.getProductById(pid)   
    
    response.send(producto)
}
)