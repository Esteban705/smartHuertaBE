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
const UserServices_1 = require("../service/UserServices");
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
                const createProduct = yield productService.crearProducto(dataProduct);
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
    productEdit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataToUpdate = req.body;
                const { productId } = req.params;
                const productValidation = new ProductValidation_1.ProductValidation();
                const productService = new ProductServices_1.ProductService();
                const validateDataProduct = yield productValidation.validateProductExist(productId);
                if (!validateDataProduct)
                    return res.status(201).send({ ok: true, data: [] });
                const createProduct = yield productService.productEdit(dataToUpdate, productId);
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
    getproductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                if (productId === "0")
                    return res.status(201).send({ ok: true, data: [] });
                const productValidation = new ProductValidation_1.ProductValidation();
                const productService = new ProductServices_1.ProductService();
                const validateProductThatExist = yield productValidation.validateProductExist(productId);
                if (!validateProductThatExist)
                    throw new Error("The Products not exist");
                const getProduct = yield productService.getProductById(productId);
                return res.status(201).send({ ok: true, getProduct });
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
    getAllProductByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userServices = new UserServices_1.UserServices();
                const productServices = new ProductServices_1.ProductService();
                const getDataOfUser = yield userServices.getUserById(req.params.userId);
                const getAllProduct = yield productServices.getAllProductByUserId(getDataOfUser._id);
                return res.status(201).send({ ok: true, getAllProduct });
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
    eliminarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const productService = new ProductServices_1.ProductService();
                const productEliminated = yield productService.eliminarProducto(productId);
                return res.status(201).send({ ok: true, productEliminated });
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