const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usuarioSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});


const Usuarios = mongoose.model("Usuarios", usuarioSchema);

module.exports = { Usuarios };




