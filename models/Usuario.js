const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsuarioSchema = new Schema({
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


const Usuarios = mongoose.model("Usuarios", UsuarioSchema);

module.exports = {Usuarios};




