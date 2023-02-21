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
exports.ProductService = void 0;
const Product_1 = require("./../models/Product");
const Images_1 = require("../models/Images");
class ProductService {
    crearProducto(dataProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { images, home } = dataProduct;
                let imagesCreated = [];
                for (const img of images) {
                    const dataImg = img.dataImg;
                    const creatingImg = yield Images_1.Images.create({
                        dataImg,
                        home,
                    });
                    console.log(creatingImg);
                    imagesCreated.push(creatingImg);
                }
                const createProduct = yield Product_1.Product.create(Object.assign(Object.assign({}, dataProduct), { images: imagesCreated }));
                return createProduct;
            }
            catch (error) {
                console.log(error);
                /* res.status(500).json({
                      ok: false,
                      msg: "Por favor hable con el administrador",
                    }); */
            }
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductServices.js.map