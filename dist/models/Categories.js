"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const mongoose_1 = require("mongoose");
const CategoriesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    }
});
exports.Categories = (0, mongoose_1.model)("Categories", CategoriesSchema);
//# sourceMappingURL=Categories.js.map