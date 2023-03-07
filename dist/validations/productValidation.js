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
exports.ProductValidation = void 0;
const Product_1 = require("../models/Product");
class ProductValidation {
    validateDataIsNotEmpty(productData) {
        const { cantidad, coments, home, productName, categories, images } = productData;
        if (!cantidad || !coments || !productName) {
            return false;
        }
        if (!home.length || !categories.length || !images.length || !home.length) {
            return false;
        }
        return true;
    }
    validateProductExist(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getProduct = yield Product_1.Product.findById({
                _id: productId,
            });
            if (!getProduct) {
                return false;
            }
            return true;
        });
    }
}
exports.ProductValidation = ProductValidation;
//# sourceMappingURL=ProductValidation.js.map