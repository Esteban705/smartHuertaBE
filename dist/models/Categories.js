"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homes = void 0;
const mongoose_1 = require("mongoose");
const CategoriesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    }
});
exports.Homes = (0, mongoose_1.model)("Homes", CategoriesSchema);
//# sourceMappingURL=Categories.js.map