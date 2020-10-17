const Sequelize = require('sequelize');
const path = 'mariadb://root@127.0.0.1:3306/banco';
const sequelize = new Sequelize(path, { operatorsAliases: false});


sequelize.authenticate()
.then((succes) => {
    console.log('conectado');
})
.catch((err) => {
    console.log('Error de conexion', err);
})


module.exports = sequelize;