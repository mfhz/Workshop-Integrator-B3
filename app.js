const express = require('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const cors = require("cors");
server.use(cors());

server.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

let usuarios = [{'nombre': 'prueba', 'correo': 'prueba@prueba.com', 'contrasenia': 'prueba123456', 'monto': 30000}];

server.get('/usuario',(req, res) => {
    if(usuarios.length == 0){
        res.status(200).send('Usuario no creado');
    } else {
        res.status(200).send(usuarios);
    }})

server.post('/ingreso',(req, res) => {
    console.log('entró');
    console.log(req.body.nombre);
    console.log(req.body);
    const validarUser = usuarios.findIndex(c => {
        usuarios.forEach(function (eb){
            if (eb.nombre == req.body.nombre){
                console.log('Ingresó correctamente');
                return true;
            }
        })
        return c.nombre == req.body.nombre;
    });
    console.log(validarUser);
    const validarPass = usuarios.findIndex(c => {
        return c.contrasenia == req.body.contrasenia;
    });

    if(usuarios.length == 0){
        res.status(200).send('Usuario no creado');
        console.log('Usuario no creado');
    } else if (validarUser >= 0) {
        res.status(200).send('Ingreso Exitoso');
        console.log('Ingreso Exitoso');
    } else {
        res.status(200).send('Usuario o contraseña incorrectos');
        console.log('Usuario o contraseña incorrectos');
    }
})

server.post('/usuario',(req, res) => {
    console.log('entró');
    console.log(req.body);
    console.log(req.body.name);
    const i = usuarios.findIndex(c => {
        return c.nombre == req.body.nombre;
    });
    console.log(i);
    if (!req.body.nombre || !req.body.correo || !req.body.contrasenia) {
        res.status(400).send('Todos los campos son obligatorios para registrarse')
    } else if (req.body.contrasenia.length < 8) {
        res.status(400).send('Se requiere ocho o mas caracteres para la contraseña');
    } else if (i >= 0) {
            res.status(400).send('El usuario ya existe')
    } else {
        req.body.monto = 0;
        usuarios.push(req.body);
        res.status(200).send('¡Usuario creado con éxito!');
    }
});
