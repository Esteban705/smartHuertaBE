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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const Images_1 = require("../models/Images");
const Usuario_1 = require("../models/Usuario");
class ImageController {
    UploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dataImg, userId } = req.body;
                if (!dataImg || !userId)
                    return;
                const createImg = yield Images_1.Images.create({
                    dataImg,
                    userId,
                });
                const addImgToUser = yield Usuario_1.Usuarios.findById({ userId }, { $set: { imgId: createImg } });
                console.log("Imagen Creada");
                return res.status(201).send({ ok: true, createImg });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: "Por favor hable con el administrador",
                });
            }
        });
    }
    getImageToUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params;
                if (!userId)
                    return;
                const getImageToIdUser = yield Images_1.Images.find(userId);
                console.log("consultando imagenes...");
                return res.status(201).send({ ok: true, getImageToIdUser });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: "Por favor hable con el administrador",
                });
            }
        });
    }
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { imageId } = req.params;
                console.log(imageId);
                if (!imageId)
                    return;
                const deleteImageToIdImage = yield Images_1.Images.findOneAndRemove({
                    _id: imageId,
                });
                console.log("eliminando imagen...");
                return res.status(201).send({ ok: true, deleteImageToIdImage });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: "Por favor hable con el administrador",
                });
            }
        });
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=image.js.map