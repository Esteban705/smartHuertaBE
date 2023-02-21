"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    coments: {
        type: String,
        require: true,
        unique: true,
    },
    cantidad: {
        type: Number,
        require: true,
        unique: true,
    },
    categories: {
        type: [mongoose_1.Schema.Types.ObjectId],
        require: true,
        ref: "Categories",
    },
    idImagen: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Images",
        require: true,
    },
    idUser: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Usuarios",
        require: true,
    },
    idHome: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Homes",
        require: true,
    },
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
//# sourceMappingURL=Product.js.map