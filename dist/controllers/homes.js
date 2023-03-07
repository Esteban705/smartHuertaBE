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
exports.HomeControllers = void 0;
const Homes_1 = require("../models/Homes");
class HomeControllers {
    crearCasa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let home = req.body;
                home = new Homes_1.Homes(req.body);
                yield home.save();
                return (res.status(201).json({
                    ok: true,
                    msg: "Casa agregada con exito",
                    data: home,
                }));
            }
            catch (error) {
                console.log(error);
                return (res.status(500).json({
                    ok: false,
                    msg: "Por favor hable con el administrador",
                }));
            }
        });
    }
    ;
    traerCasa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const foundUser = yield Homes_1.Homes.findOne({ userId: userId }).populate("userId", { name: 1, email: 1 });
                const mapperUser = {
                    id: foundUser._id,
                    geometry: [foundUser.latitude, foundUser.longitude],
                    dataUser: foundUser.userId,
                };
                return (res.status(201).json({
                    ok: true,
                    data: mapperUser,
                }));
            }
            catch (error) {
                console.log(error);
                return (res.status(500).json({
                    ok: false,
                    msg: "Por favor hable con el administrador",
                }));
            }
        });
    }
    ;
    getAllHomesToUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const foundUser = yield Homes_1.Homes.find({ userId: userId });
                return (res.status(201).json({
                    ok: true,
                    foundUser,
                }));
            }
            catch (error) {
                console.log(error);
                return (res.status(500).json({
                    ok: false,
                    msg: "Por favor hable con el administrador",
                }));
            }
        });
    }
    ;
    traerCasas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundCasas = yield Homes_1.Homes.find().populate("userId", {
                    name: 1,
                    email: 1,
                });
                const allHomes = foundCasas.map((casa) => {
                    const mapperHome = {
                        name: casa.name,
                        id: casa._id,
                        geometry: [casa.latitude, casa.longitude],
                        dataUser: casa.userId,
                        isSpecial: casa.isSpecial,
                    };
                    return mapperHome;
                });
                return (res.status(201).json({
                    ok: true,
                    data: allHomes,
                }));
            }
            catch (error) {
                console.log(error);
                return (res.status(500).json({
                    ok: false,
                    msg: "Por favor hable con el administrador",
                }));
            }
        });
    }
    ;
    eliminarCasa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { homeId } = req.params;
                const dataDelete = yield Homes_1.Homes.deleteOne({ _id: homeId });
                return (res.status(201).json({
                    ok: true,
                    data: dataDelete,
                }));
            }
            catch (error) {
                console.log(error);
                return (res.status(500).json({
                    ok: false,
                    msg: "Por favor hable con el administrador",
                }));
            }
        });
    }
    ;
}
exports.HomeControllers = HomeControllers;
//# sourceMappingURL=homes.js.map