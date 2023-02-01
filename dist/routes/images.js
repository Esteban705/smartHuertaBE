"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagenesRoutes = void 0;
const express_1 = require("express");
const image_1 = require("../controllers/image");
class ImagenesRoutes {
    constructor() {
        this.ImageController = new image_1.ImageController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/:userId", this.ImageController.getImageToUser);
        this.router.post("/", this.ImageController.UploadImage);
        this.router.put("/:imageId", this.ImageController.deleteImage);
    }
}
exports.ImagenesRoutes = ImagenesRoutes;
//# sourceMappingURL=images.js.map