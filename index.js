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

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_universidad'
});
connection.connect((err) => {
    if(err){
        console.error('Error de conecxion: ', err);
        return;
    }
    console.log('Conectado a la base de datos!');
});

connection.query('SELECT * FROM tbl_carrera', (err,rows) => {
    if(err){
        console.error('Error al realizar la consulta: ',err);
        return;
    }
    console.log('Resultados: ', rows);
});

connection.query('SELECT al.ID_Alumno, al.Nombre, al.Apellido, cal.Calificacion,mat.Materia,car.Carrera FROM tbl_alumno as al'+
                ' INNER JOIN tbl_carrera as car on car.ID_Carrera=al.FK_Carrera'+
                ' INNER JOIN tbl_calificaciones as cal ON al.ID_Alumno = cal.FK_Alumno'+
                ' INNER JOIN tbl_materia as mat ON mat.ID_Materia=cal.FK_Materia;', (err,rows) => {
    if(err){
        console.error('Error al realizar la consulta: ',err);
        return;
    }
    console.log('Resultados: ', rows);
});
