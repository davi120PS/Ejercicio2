const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexion con la base de datos
const {connection}=require('../config/config.db');
const getMateria = (request,response) => {
    connection.query("SELECT * FROM tbl_materia",
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/materias").get(getMateria);
module.exports = app;

/*aqui va mi segundo post*/
const posMateria = (request,response)=>{
    const {materia,cuatrimestre} = request.body;
    connection.query("INSERT INTO tbl_materia (materia,cuatrimestre) VALUES(?,?)",
    [materia,cuatrimestre],
    (error,results) => {
    if(error)
        throw error;
    response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};
app.route("/materias").post(posMateria);

/************Aqui va el servicio de eliminar materias*/
const delMateria = (request,response) => {
    const id = request.params.id;
    //console.log(id); return false;
    connection.query("DELETE FROM tbl_materia WHERE ID_Materia = ?",
    [id],
    (error,results)=>{
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};
app.route("/materias/:id").delete(delMateria);