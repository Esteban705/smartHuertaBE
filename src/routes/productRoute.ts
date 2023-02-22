import { Router } from "express";
import { ProductController } from "../controllers/productControllers";

export class ProductRoute {
  router: Router;
  public ProductController: ProductController = new ProductController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/", this.ProductController.crearProducto);
    this.router.delete("/:productId", this.ProductController.eliminarProducto);
  }
}
