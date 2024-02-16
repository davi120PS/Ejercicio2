const express = require ("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//cargamos el archivo de rutas
app.use(require('./routes/alumnos'));
app.use(require('./routes/materias'));
app.use(require('./routes/carreras'));

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log('El servidor escucha en el puerto '+ PORT);
});

module.exports = app;