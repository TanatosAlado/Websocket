const express = require("express");
const {Server: HTTPServer } = require("http");
const {Server: SocketServer} = require("socket.io");

const messages = [];
const app = express();
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.static("public"));
const handlebars = require("express-handlebars");

const { Router } = express;

///BD

const knex = require('knex');
const knexConfig = require('./knexfile')
const database = knex(knexConfig);

///BD


const events=require("./public/js/events")
const Contenedor = require('./public/js/archivosEnJavaScript')


app.use(express.json());
app.use (express.urlencoded({ extended: true }));

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/public",
});

app.engine("hbs", hbs.engine);
app.set('views', "./Views");
app.set("view engine", "hbs");

const myWine = new Contenedor('./public/js/baseProductos.json');

const routerProducto = Router();

app.use("/api/productos", routerProducto);


app.get("/", (req, res) => {
    res.render("index");
    // res.sendFile(__dirname + "/public/index.html");
  });

routerProducto.get("/", (req,res) => {
    // myWine.getAll()
    //     .then((products)=> res.render("losProductos", {products}))
    database('misproductos').select()
        .then(productos => {
            res.send(productos)
        })
        // .then((products)=> res.render("losProductos", {products}))
        .catch(error => {res.send(error)})
})

routerProducto.get("/:id", async(req,res) => {
    // myWine.getById(req.params.id)
    //     .then((product)=>res.json(product))
    try{
        const id = req.params.id;
        const _persona = await database('misproductos')
            .select()
            .where('id', id);
        res.send(_persona)    
    }
    catch (err) {
        res.send(err)    
    }
})

routerProducto.post("/", async(req,res) => {
    // myWine.save(req.body)
    //     res.redirect("/");
    const body = req.body;
    if (body.nombre && body.precio){
        const _vino = {
            nombre: body.nombre,
            precio: body.precio
        }
        try {
            const _resultado = await database('misproductos').insert(_vino);
            //paso index 0 para transformar el unico elemento del arreglo, en un 'dato'
            res.send({..._vino, id: _resultado[0]})
        } catch (err) {
            res.send(err)    
        }
    }else{
        res.status(400).send('Debe contener nombre y precio')
    }
})

routerProducto.put("/:id", async(req,res) => {
        // myWine.updateProduct(req.params.id, req.body)
        //     .then((product)=>res.json(product))
        //     .catch(res.json({error: "Error: el producto no fue encontrado"}))
        const body = req.body;
        const id = req.params.id;

        if (body.nombre && body.precio){
            const _vino = {
                nombre: body.nombre,
                precio: body.precio
            }
            try {
                const _resultado = await database('misproductos')
                .where({id: id})
                .update(_vino)
                res.send({_vino, id: _resultado})
            }catch (err) {
                res.send(err)    
            }
           
        }    

})

routerProducto.delete("/:id", async(req,res) => {
    // myWine.deleteById(req.params.id)
    //     res.send(`Se eliminó el producto con el ID: ${req.params.id}`)
    const id = req.params.id;

    try{
        const _resultado = await database('misproductos')
        .where({id: id})
        .del()
        res.send('Persona eliminada')
    } catch (err) {
        res.send(err)
    }
})

// const server = app.listen(port, ()=>{
    const PORT = process.env.PORT || 2882
    httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
})

app.on('error', (err) => {
    console.log(err)
})


app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html; charset=UTF8')
    res.send(`
            Bienvenido al sitio de Prueba de Server Express <br>
            Seleccione la opción a probar: <br>
            <ul>
                <li><a href="/productos">/productos</a></li>
                <li><a href="/productoRandom">/productoRandom</a></li>
            </ul>
            `)
})

socketServer.on("connection", (socket) => {
    console.log('Nuevo client conectado');
    socketServer.emit("INIT", "Bienvenido al WebSocket", messages);

    socketServer.emit(
        "productos_registrados",
      myWine.getAll()),
  
    socket.on("POST_MESSAGE", (msg)=>{
        let aDate = new Date; 
        const _msg = {...msg, date: aDate.toGMTString()};
        messages.push(_msg);
        console.log(_msg);
        socketServer.sockets.emit("NEW_MESSAGE", _msg);
    });

    socket.on(events.POST_PRODUCTS, (prod) => {
        console.log(prod)
        const _prod = {
          ...prod
        };
        socketServer.sockets.emit(events.NEW_PRODUCTS, _prod);
      });

  });


  

// server.on("error", error => console.log(`Error: ${error}`))



