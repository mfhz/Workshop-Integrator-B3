const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const sequelize = require('./conexion.js');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const api = '1234567';

const helmet = require('helmet');
server.use(helmet());
const rateLimit = require("express-rate-limit");


const cors = require("cors");
server.use(cors());

const limite = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10
});


function validarEdad(req, res, next) {
    // console.log(typeof(req.body.edad));
    let num = parseInt(req.body.edad);
    if (Number.isInteger(num) && !isNaN(num)) {
        // console.log('entra');
        return next();
    } else {
        res.status(200).json('La edad debe ser de tipo entero');
    }
}

function validarCorreo(req, res, next) {
    // console.log(req.body.correo);
    if (emailRegexp.test(req.body.correo)) {        
        return next();
    } else {
        res.status(200).json('El correo ingresado es incorrecto');
    }
}


server.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

let usuarios = [{'nombre': 'prueba', 'correo': 'prueba@prueba.com', 'contrasenia': 'prueba123456', 'monto': 30000, 'admin': true}, {'nombre': 'juan', 'correo': 'prueba@prueba.com', 'contrasenia': 'prueba123456', 'monto': 30000}];

server.get('/usuario',(req, res) => {
    if(usuarios.length == 0){
        res.status(200).json('Usuario no creado');
    } else {
        res.status(200).json(usuarios);
}})

server.post('/login',(req, res) => {
    console.log('entró');
    // console.log(req.body.nombre);
    // console.log(req.body);
    // const validarDatos = usuarios.findIndex(c => {
    //     // console.log(req.body.nombre);
        
    //     return c.nombre == req.body.nombre && c.contrasenia == req.body.contrasenia;
    // });

    const validarDatos = verificarCuenta(req.body);
    console.log(validarDatos);

    // const validarPass = usuarios.findIndex(c => {
    //     return c.contrasenia == req.body.contrasenia;
    // });

    // let x = usuarioExiste(req);
    // console.log(x);

    if (validarDatos) {
        let token = jwt.sign(usuarios[validarDatos], api);

        res.status(200).json({msj: "Ingreso Exitoso", token: token, status: 200});

        // res.status(200).json('Ingreso Exitoso');
        console.log('Ingreso Exitoso');
    } else {
        res.status(200).json('Usuario o contraseña incorrectos');
        console.log('Usuario o contraseña incorrectos');
    }



})

server.post('/registro', limite,validarEdad,validarCorreo,(req, res) => {
    // console.log('entró');
    // console.log(req.body.nombre);
    // console.log(req.body.name);
    const i = usuarios.findIndex(c => {
        return c.nombre == req.body.nombre;
    });
    // console.log(i);
    if (!req.body.nombre || !req.body.correo || !req.body.contrasenia) {
        res.status(400).send('Todos los campos son obligatorios para registrarse');
        console.log('Todos los campos son obligatorios para registrarse');
    } else if (req.body.contrasenia.length < 8) {
        res.status(400).json('Se requiere ocho o mas caracteres para la contraseña');
        console.log('Se requiere ocho o mas caracteres para la contraseña');
    } else if (i >= 0) {
            res.status(400).json('El usuario ya existe');
            console.log('El usuario ya existe');
    } else {
        req.body.monto = 0;
        req.body.admin = false;
        let usuario = req.body;
        let token = jwt.sign(usuario, api);        
        usuarios.push(req.body);
        // console.log('Entra acá');
        res.status(200).json({msj: "Ingreso Exitoso", token: token,status: 200});    
        // res.status(200).json({status: 200, user: req.body});
        registroBD(req.body);
        console.log('¡Usuario creado con éxito!');


    }
});

server.post('/validar', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const validarToken = jwt.verify(token, api);

    if (!validarToken) {
        res.status(401).send('Token invalido');
    } else {
        res.status(200).json({data: validarToken, status: 200}); 
    }
})




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

function registroBD(req) {
    // console.log(req);
    let array_insert = [req.nombre, req.contrasenia, req.edad, req.correo];
    // console.log(array_insert);

    sequelize.query('INSERT INTO `usuarios` (`user`, `password`, `age`, `email`) VALUES(?, ?, ?, ?)', {replacements: array_insert, type: sequelize.QueryTypes.SELECT})
    .then((succes) => {
        console.log(succes);
    })
    .catch((err) => {
        console.log('error----', err);
    })
}

async function verificarCuenta(req) {
    var x;
    sequelize.query('SELECT user, password from usuarios', {type: sequelize.QueryTypes.SELECT})    
    .then((succes) => {
        // console.log(succes);
        succes.forEach(element => {
            // console.log(element.user);
            if (element.user == req.nombre && element.password == req.contrasenia) {
                // console.log('CORRECTO');
                return true;

            } else {
                console.log('INCORRECTO');
            }
        });
    })
    .catch((err) => {
        console.log('error----', err);
    })
}



