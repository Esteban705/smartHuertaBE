"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Usuario_1 = require("../models/Usuario");
class UserController {
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                let usuario = yield Usuario_1.Usuarios.findOne({ email });
                if (usuario) {
                    return res.status(400).json({
                        ok: false,
                        msg: "El usuario ya existe",
                    });
                }
                usuario = new Usuario_1.Usuarios(req.body);
                // Encriptar contraseña
                const salt = bcryptjs_1.default.genSaltSync();
                usuario.password = bcryptjs_1.default.hashSync(password, salt);
                yield usuario.save();
                // Generar JWT
                /*  const token = await generarJWT( usuario.id, usuario.name ); */
                res.status(201).json({
                    ok: true,
                    uid: usuario.id,
                    name: usuario.name,
                    /* token */
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    ok: false,
                    msg: "Por favor hable con el administrador",
                });
            }
        });
    }
    loginUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const usuario = yield Usuario_1.Usuarios.findOne({ email });
                if (!usuario) {
                    return res.status(400).json({
                        ok: false,
                        msg: "El usuario no existe con ese email",
                    });
                }
                // Confirmar los passwords
                const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
                if (!validPassword) {
                    return res.status(400).json({
                        ok: false,
                        msg: "Password incorrecto",
                    });
                }
                // Generar JWT
                /*    const token = await generarJWT( usuario.id, usuario.name ); */
                res.json({
                    ok: true,
                    uid: usuario.id,
                    name: usuario.name,
                    /*      token */
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    ok: false,
                    msg: "Por favor hable con el administrador",
                });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=auth.js.map