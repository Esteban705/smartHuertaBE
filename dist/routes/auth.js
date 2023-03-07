"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
class UserRouter {
    constructor() {
        this.UserController = new auth_1.UserController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/:userId", this.UserController.getDataUser);
        this.router.post("/new", this.UserController.crearUsuario);
        this.router.post("/", this.UserController.loginUsuario);
        this.router.put("/:userId", this.UserController.editUser);
    }
}
exports.UserRouter = UserRouter;
/* router.get('/renew', validarJWT ,revalidarToken ); */
//# sourceMappingURL=auth.js.map