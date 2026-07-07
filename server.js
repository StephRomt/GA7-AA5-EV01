// Importa el framework Express
const express = require('express');

// Crea la aplicación
const app = express();

// Puerto donde se ejecutará el servidor
const PORT = 3000;

// Permite recibir datos en formato JSON
app.use(express.json());

// Arreglo donde se almacenarán temporalmente los usuarios registrados
const usuarios = [];

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// ===============================
// SERVICIO PARA REGISTRAR USUARIO
// ===============================
app.post('/register', (req, res) => {

    const { usuario, password } = req.body;

    usuarios.push({
        usuario,
        password
    });

    res.json({
        mensaje: 'Usuario registrado correctamente'
    });

});

// ===============================
// SERVICIO PARA INICIAR SESIÓN
// ===============================
app.post('/login', (req, res) => {

    const { usuario, password } = req.body;

    const usuarioEncontrado = usuarios.find(
        u => u.usuario === usuario && u.password === password
    );

    if (usuarioEncontrado) {
        res.json({
            mensaje: 'Autenticación satisfactoria'
        });
    } else {
        res.status(401).json({
            mensaje: 'Error en la autenticación'
        });
    }

});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});