const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexion con la base de datos
const {connection}=require('../config/config.db');

// Servicio nuevo de carrera vamos a enviar un ID para separar las carreras  visualizarlas segun su ID de carrera
const getCarreraID = (request,response) => {
    const id = request.params.id;
    //console.log(id); return false;
    connection.query('SELECT al.nombre,car.carrera FROM tbl_alumno as al'+
                    ' INNER JOIN tbl_carrera as car ON al.FK_Carrera=car.ID_Carrera'+
                    ' WHERE al.FK_Carrera = ?',
    [id],
    (error,results)=>{
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.route("/carrera/:id").get(getCarreraID);
module.exports = app;