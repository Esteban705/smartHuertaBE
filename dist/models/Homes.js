"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homes = void 0;
const mongoose_1 = require("mongoose");
const HomesSchema = new mongoose_1.Schema({
    latitude: {
        type: String,
        require: true
    },
    longitude: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        unique: false
    },
    isSpecial: {
        type: Boolean,
        require: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Usuarios"
    }
});
exports.Homes = (0, mongoose_1.model)("Homes", HomesSchema);
//# sourceMappingURL=Homes.js.map