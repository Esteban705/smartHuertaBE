"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuarios = void 0;
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
});
exports.Usuarios = (0, mongoose_1.model)("Usuarios", usuarioSchema);
//# sourceMappingURL=Usuario.js.map