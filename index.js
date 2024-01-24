// const express = require('express');
// console.log(express);

console.log("Prueba nodemon");

const express = require ("express");
const app = express();

app.get('/',function (req,res){
    res.send('Ruta principal')
});

app.post('/servidor',function(req,res){
    res.json({
        "servidor":"Activo"
    })
});

app.post('/alumno',function(req,res){
    res.json(
            {"nombre":"David","apellido":"Peña Santos","matricula": "19","carrera":"Software"}
    )
});

app.post('/producto',function(req,res){
    res.json(
        [
            {"producto":"shampoo","cantidad":"10","precio":"80.00"},
            {"producto":"jabon","cantidad":"2","precio":"7.49"},
            {"producto":"estropajo","cantidad":"5","precio":"21.99"}
        ]        
    )
});

app.post('/metodos',function(req,res){
    res.json(
        [
            {"metodo":"get","descripcion":"Solicita una representacion de un recuerso especifico. Las peticiones que usan el metodo GET solo deben recuperar datos"},
            {"metodo":"post","descripcion":"Se utiliza para enviar una entidad a un recuerso en especifico, causando a menudo un camnoi en el estado o efectos secundarios en el servidor"},
            {"metodo":"patch","descripcion":"Es utilizado para aplicar modificaciones parcilaes a un recurso"},
            {"metodo":"delete","descripcion":"Borra un recuerso en especifico"}
        ]        
    )
});


const port = 3000;
app.listen(port,()=>{
    console.log('El servidor escucha en el puerto ' +port)
});