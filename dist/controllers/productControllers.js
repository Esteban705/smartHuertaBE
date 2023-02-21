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
exports.ProductController = void 0;
const ProductServices_1 = require("../service/ProductServices");
const ProductValidation_1 = require("../validations/ProductValidation");
class ProductController {
    crearProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataProduct = req.body;
                const productValidation = new ProductValidation_1.ProductValidation();
                const productService = new ProductServices_1.ProductService();
                const validateDataProduct = productValidation.validateDataIsNotEmpty(dataProduct);
                if (!validateDataProduct)
                    throw new Error("ValidateData is fail");
                const createProduct = productService.crearProducto(dataProduct);
                return res.status(201).send({ ok: true, createProduct });
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
exports.ProductController = ProductController;
//# sourceMappingURL=productControllers.js.map