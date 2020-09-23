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

server.post('/login',(req, res) => {
    console.log('entró');
    // console.log(req.body.nombre);
    // console.log(req.body);
    const validarUser = usuarios.findIndex(c => {
        // console.log(req.body.nombre);
        return c.nombre == req.body.nombre;
    });
    const validarPass = usuarios.findIndex(c => {
        return c.contrasenia == req.body.contrasenia;
    });

    // let x = usuarioExiste(req);
    // console.log(x);

    if (validarUser >= 0 && validarPass >= 0) {
        res.status(200).send('Ingreso Exitoso');
        console.log('Ingreso Exitoso');
    } else {
        res.status(200).send('Usuario o contraseña incorrectos');
        console.log('Usuario o contraseña incorrectos');
    }
})

server.post('/registro',(req, res) => {
    console.log('entró');
    console.log(req.body);
    console.log(req.body.name);
    const i = usuarios.findIndex(c => {
        return c.nombre == req.body.nombre;
    });
    console.log(i);
    if (!req.body.nombre || !req.body.correo || !req.body.contrasenia) {
        res.status(400).send('Todos los campos son obligatorios para registrarse');
        console.log('Todos los campos son obligatorios para registrarse');
    } else if (req.body.contrasenia.length < 8) {
        res.status(400).send('Se requiere ocho o mas caracteres para la contraseña');
        console.log('Se requiere ocho o mas caracteres para la contraseña');
    } else if (i >= 0) {
            res.status(400).send('El usuario ya existe');
            console.log('El usuario ya existe');
    } else {
        req.body.monto = 0;
        usuarios.push(req.body);
        res.status(200).send('¡Usuario creado con éxito!');
        console.log('¡Usuario creado con éxito!');
    }
});



// Funciones

/// Verifica si el usuario existe y si existe permite el ingreso a la pagina
// function usuarioExiste(req) {
//     usuarios.forEach((ev) => {
//         // console.log(ev.nombre);
//         if (ev.nombre == req.body.nombre) {
//             console.log('Entra');            
//             return 1;
//         }
        
//     })
// }

