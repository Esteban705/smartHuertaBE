import { Router } from "express";
import { ImageController } from "../controllers/image";

export class ImagenesRoutes {
  router: Router;
  public ImageController: ImageController = new ImageController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/:userId", this.ImageController.getImageToUser);
    this.router.post("/", this.ImageController.UploadImage);
    this.router.put("/:imageId", this.ImageController.deleteImage);
  }
}
