"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Images = void 0;
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    dataImg: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: false,
        ref: "Usuarios"
    },
    home: {
        type: [mongoose_1.Schema.Types.ObjectId],
        require: false,
        ref: "Homes"
    },
});
exports.Images = (0, mongoose_1.model)("Images", ImageSchema);
//# sourceMappingURL=Images.js.map