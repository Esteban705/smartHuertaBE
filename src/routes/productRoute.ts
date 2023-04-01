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
    /* this.router.get("/", this.ProductController.getAllProduct); */
    this.router.post("/", this.ProductController.crearProducto);
    this.router.get("/:productId", this.ProductController.getproductById);
    this.router.get(
      "/allproducts/:userId",
      this.ProductController.getAllProductByUserId
    );
    this.router.put("/:productId", this.ProductController.productEdit);
    this.router.put(
      "/delete/:productId",
      this.ProductController.eliminarProducto
    );
  }
}
