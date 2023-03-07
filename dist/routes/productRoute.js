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
        /* this.router.get("/", this.ProductController.getAllProduct); */
        this.router.get("/:productId", this.ProductController.getproductById);
        this.router.post("/", this.ProductController.crearProducto);
        this.router.put("/:productId", this.ProductController.productEdit);
        this.router.delete("/:productId", this.ProductController.eliminarProducto);
    }
}
exports.ProductRoute = ProductRoute;
//# sourceMappingURL=productRoute.js.map