import { Router } from "express";
import { CategoriesController } from "../controllers/categoriesControllers";

export class CategoriesRoute {
  router: Router;
  public CategoriesController:CategoriesController = new CategoriesController() 

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.CategoriesController.getAllCategories);
  }
}
