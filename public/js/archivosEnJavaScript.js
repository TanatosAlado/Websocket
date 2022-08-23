// let cadena = "./baseProductos.json"
const { Console } = require("console");
const fs = require("fs");
// const { nextTick } = require("process");


    // module.exports = class Contenedor {
    //     constructor(archivo){
    //         this.archivo = archivo;
    //     }
    const encoding = "utf-8"

        module.exports = class Contenedor {
            constructor(archivo) {
                this.filePath = archivo;
                this.createFileIfNotExists();
                const data = fs.readFileSync(this.filePath, encoding);
                this.contenedor = JSON.parse(data);
            }    

            createFileIfNotExists() {
                if (!fs.existsSync(this.filePath)) {
                    fs.writeFileSync(this.filePath, "[]");
                }
            }


    save(object) {
        console.log(object)
        const lastId = this.contenedor.reduce(
            (acc, el) => { // Funcion a evaluar para ir comparando el mayor de los ids
            return el.id > acc ? el.id : acc 
            }, 
            0 // Acumulador inicial
        );
        const newId = lastId + 1;
        object.id = newId;
        this.contenedor.push(object);
        this._saveAll(this.contenedor)
        return newId;
    }

    _saveAll (data) {
        const stringData = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.filePath, stringData ,encoding)
    }

    save_ = async (oneObject) => {
        let nextId = 0;
        try{
            const pruebaIngreso = await fs.promises.readFile(this.archivo, "utf-8");
            if (pruebaIngreso.length == 0){
                let initialArray = [];
                nextId = 1;
                let newObject = {title: oneObject.name, price: oneObject.price, img: oneObject.imagen, id: nextId};
                initialArray.push(newObject);
                let newArray = JSON.stringify(initialArray, null, 2)
                await fs.promises.writeFile(this.archivo, newArray, "utf-8")
            }else{
                let vinos2 = JSON.parse(pruebaIngreso)
                let ultimoID = parseInt(vinos2.length) -1;
                nextId = (vinos2[ultimoID].id) +1
                let newObject = {title: oneObject.name, price: oneObject.price, img: oneObject.imagen, id: nextId};
                vinos2.push(newObject); 
                let newArray = JSON.stringify(vinos2, null, 2)
                await fs.promises.writeFile(this.archivo, newArray, "utf-8")
            }
        } catch(err){
            console.log(err)
        }
        // return this.getById(nextId);
        return nextId;
    }

    getById = async (oneId) => {
        try{
            let pruebaIngreso = await fs.promises.readFile(this.archivo, "utf-8")
            let vinos2 = JSON.parse(pruebaIngreso)
            let position = vinos2.findIndex(element => element.id == oneId)
            if(position != -1){
                return vinos2[position];
            } else{
                console.log("Elemento no encontrado")
            }            
        }catch(err){
            console.log(err)
        }
    }

    // getAll = async () =>{
    //     let losVinos = await fs.promises.readFile(this.archivo, "utf-8")
    //     if(losVinos) {
    //         let vinosFormato = JSON.parse(losVinos)
    //         return vinosFormato
    //     }
    //     else{
    //         return []
    //     }
    // }

    getAll() {
        return this.contenedor;
    }

    deleteById = async (oneId) =>{
        try{
            let pruebaIngreso = await fs.promises.readFile(this.archivo, "utf-8");
            let vinos2 = JSON.parse(pruebaIngreso) 
            let position = vinos2.filter(element => element.id != oneId);
            let newArray = JSON.stringify(position, null, 2)
            await fs.promises.writeFile(this.archivo, newArray, "utf-8")
            console.table(position)
        } catch(err){
            console.log(err)
        }
    }

    deleteAll(){
        let arrayEmpty = "";
        fs.writeFileSync(this.archivo, arrayEmpty, "utf-8")
    }

    getRandom = async () => {
        const bdVinos = await fs.promises.readFile(this.archivo, 'utf-8')
        const productos = JSON.parse(bdVinos)
        const myId = await (Math.floor(Math.random() * productos.length) +1)
        return this.getById(myId);
    }

    updateProduct = async (myId, oneObject) => {
        try{
        const bdVinos = await fs.promises.readFile(this.archivo, 'utf-8')
        const productos = JSON.parse(bdVinos)
        let position = productos.findIndex(element => element.id == myId)
        if(position != -1){
            productos[position].title = oneObject.name;
            productos[position].price = oneObject.price;
            productos[position].img = oneObject.imagen;
            let newArray = JSON.stringify(productos, null, 2)
            await fs.promises.writeFile(this.archivo, newArray, "utf-8")
            return this.getById(myId)    
        } else{
            console-console.log("Elemento con ID no encontrado");   
        }   
        }catch(err){
            console.log(err)
        }
    }    
}

