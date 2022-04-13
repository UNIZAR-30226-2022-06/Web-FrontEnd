const express = require('express');
const router = express.Router();

//para cifrar las contraseñas
//const bcrypt = require('bcrypt');
const saltRounds = 10;

//const connection = require('../database');

//página de inicio (nadie va a hacer get aquí)
router.get('/', (req, res) => {
    res.send('API running...');
})

// Registrar un usuario
router.post('/registrarse', (req, res) => {
    
    const usuarioObj = {
        nombre: req.body.nombre,
        nomUsuario: req.body.nomUsuario,
        password: req.body.password,
        correo: req.body.correo,
        nombre: false
    };

    connection.query("SELECT * FROM usuario WHERE correo = $1", [usuarioObj.correo], (error, result) => {
        if (error) throw error;
        if (result.rowCount > 0) {
            res.json({
                message: 'Ya existe un usuario con ese correo'
            })
        }else {
            let hash = bcrypt.hashSync(usuarioObj.password, saltRounds);
            usuarioObj.password=hash;
            connection.query("INSERT INTO usuario (nombre,nomUsuario,password,correo,esAdmin) VALUES ($1,$2,$3,$4,$5)", [usuarioObj.nombre,usuarioObj.nomUsuario,usuarioObj.password,usuarioObj.correo,usuarioObj.esAdmin], error => {
                if (error) throw error;
                res.json({
                    message: 'Usuario registrado'
                });
            });
        }
    });
});

module.exports = router;
