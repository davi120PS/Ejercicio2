const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexion con la base de datos
const {connection}=require('../config/config.db');
const getAlumno = (request,response) => {
    connection.query("SELECT * FROM tbl_alumno",
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/alumnos").get(getAlumno);
module.exports = app;