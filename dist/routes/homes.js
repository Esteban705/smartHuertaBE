"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRouter = void 0;
const express_1 = require("express");
const homes_1 = require("../controllers/homes");
class HomeRouter {
    constructor() {
        this.HomeControllers = new homes_1.HomeControllers();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", this.HomeControllers.traerCasas);
        this.router.get("/:userId", this.HomeControllers.traerCasa);
        this.router.get("/user/:userId", this.HomeControllers.getAllHomesToUser);
        this.router.post("/new/home", this.HomeControllers.crearCasa);
        this.router.put("/delete/:homeId", this.HomeControllers.eliminarCasa);
    }
}
exports.HomeRouter = HomeRouter;
//# sourceMappingURL=homes.js.map