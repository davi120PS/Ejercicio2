// const express = require('express');
// console.log(express);

console.log("Prueba nodemon");

const express = require ("express");
const app = express();

app.get('/',function (req,res){
    res.send('mi primera ruta funciona')
});

app.get('/alumnos',function(req,res){
    res.json({
        "nombre":"David Peña",
        "carrera":"Software",
        "edad": "19"
    })
});

const port = 3000;
app.listen(port,()=>{
    console.log('El servidor escucha en el puerto ' +port)
});