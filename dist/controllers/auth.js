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
const ImageServices_1 = require("./../service/ImageServices");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Usuario_1 = require("../models/Usuario");
const Images_1 = require("../models/Images");
const ImageValidation_1 = require("../validations/ImageValidation");
class UserController {
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = req.body;
            try {
                let usuario = yield Usuario_1.Usuarios.findOne({ email });
                if (usuario) {
                    return res.status(400).json({
                        ok: false,
                        msg: "El usuario ya existe",
                    });
                }
                const salt = bcryptjs_1.default.genSaltSync();
                const passwordHash = bcryptjs_1.default.hashSync(password, salt);
                yield Usuario_1.Usuarios.create({
                    name,
                    password: passwordHash,
                    email,
                    description: "",
                });
                const { id } = yield Usuario_1.Usuarios.findOne({ name });
                res.status(201).send({ ok: true, name, email, id });
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
            const { password, name } = req.body;
            try {
                const usuario = yield Usuario_1.Usuarios.findOne({ name });
                if (!usuario) {
                    return res.status(400).json({
                        ok: false,
                        msg: "El usuario no existe",
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
                return res.status(200).send({
                    email: usuario.email,
                    isNew: false,
                    id: usuario.id,
                    name: usuario.name,
                    ok: true,
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
    getDataUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const usuario = yield Usuario_1.Usuarios.findOne({ _id: userId });
                if (!usuario) {
                    return res.status(400).json({
                        ok: false,
                        msg: "El usuario no existe",
                    });
                }
                return res.status(200).send({ ok: true, usuario });
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
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageValidation = new ImageValidation_1.ImageValidation();
                const imageService = new ImageServices_1.ImageService();
                const { userId } = req.params;
                let dataUser = req.body;
                const { dataImage } = dataUser;
                const validateImageExist = yield imageValidation.ValidateImageExist(dataImage.newEncodedPicture);
                delete dataUser.dataImage;
                if (!validateImageExist) {
                    const createImg = yield Images_1.Images.create({
                        name: dataImage.name,
                        dataImg: dataImage.newEncodedPicture,
                        userId,
                    });
                    dataUser = Object.assign(Object.assign({}, dataUser), { imgId: createImg._id });
                }
                if (validateImageExist) {
                    dataUser = Object.assign(Object.assign({}, dataUser), { imgId: validateImageExist._id });
                }
                const usuario = yield Usuario_1.Usuarios.findOne({ _id: userId });
                if (!usuario) {
                    return res.status(400).json({
                        ok: false,
                        msg: "El usuario no existe",
                    });
                }
                const updateUserData = yield Usuario_1.Usuarios.findOneAndUpdate({ _id: userId }, dataUser, {
                    new: true,
                });
                return res.status(200).send({ ok: true, updateUserData });
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