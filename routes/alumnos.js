const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexion con la base de datos
const {connection}=require('../config/config.db');

const getAlumno = (request,response) => {
    connection.query("SELECT tbl_alumno.ID_Alumno, tbl_alumno.Nombre, tbl_alumno.Apellido,tbl_alumno.Email, tbl_alumno.Edad, tbl_carrera.Carrera FROM tbl_alumno INNER JOIN tbl_carrera WHERE tbl_alumno.FK_Carrera = tbl_carrera.ID_Carrera",
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//ruta
app.route("/alumnos").get(getAlumno);
module.exports = app;

// Listado de alumnos y a que carrera pertenece
const getAlumnoCarrera = (request,response) => {
    connection.query('SELECT al.nombre,car.carrera FROM tbl_alumno as al'+
                    ' INNER JOIN tbl_carrera as car ON al.FK_Carrera=car.ID_Carrera',
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
app.route("/alumnoscarrera").get(getAlumnoCarrera);

/*aqui va mi primer post*/
const postAlumno = (request, response) => {
    const {action,id,carrera, nombre, apellido, edad, email, estado, ID_Alumno} = request.body;
    //console.log(action);return false;
    if(action == "insert"){
        connection.query("INSERT INTO tbl_alumno (FK_Carrera, Nombre, Apellido, Edad, Email, Estado) VALUES (?,?,?,?,?,?)", 
        [carrera, nombre, apellido,edad,email,estado],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item añadido correctamente": results.affectedRows});
        });
    }else{
        //console.log(action);return false;
        connection.query("UPDATE tbl_alumno SET FK_Carrera = ?, Nombre = ?, Apellido =?, Edad = ? , Email = ?, Estado = ? WHERE ID_Alumno = "+ID_Alumno+"", 
        [carrera,nombre, apellido, edad,email,estado,id],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item editado con exito": results.affectedRows});
        });
    }
};
app.route("/alumnos").post(postAlumno);

const getAlumnoId = (request,response) => {
    const id = request.params.id;
    connection.query("SELECT al.*, al.Nombre AS nombre, al.Apellido AS apellido, al.Edad AS edad, al.Email AS email, al.Estado AS estado, cr.Carrera, cr.ID_Carrera AS carrera FROM tbl_alumno al LEFT JOIN tbl_carrera cr ON al.FK_Carrera = cr.ID_Carrera WHERE al.ID_Alumno = ?",
    [id],
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
app.route("/alumnos/:id").get(getAlumnoId);

/************Aqui va el servicio de eliminar alumnos*/
const delAlumno = (request,response) => {
    const id = request.params.id;
    //console.log(id); return false;
    connection.query("DELETE FROM tbl_alumno WHERE ID_Alumno = ?",
    [id],
    (error,results)=>{
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};
app.route("/alumnos/:id").delete(delAlumno);