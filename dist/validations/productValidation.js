"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
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
    ;
}
exports.ProductValidation = ProductValidation;
//# sourceMappingURL=ProductValidation.js.map