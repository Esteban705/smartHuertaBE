"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = require("express");
const productControllers_1 = require("../controllers/productControllers");
class ProductRoute {
    constructor() {
        this.ProductController = new productControllers_1.ProductController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/", this.ProductController.crearProducto);
    }
}
exports.ProductRoute = ProductRoute;
//# sourceMappingURL=productRoute.js.map