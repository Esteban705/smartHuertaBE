import { Router } from "express";
import { HomeControllers } from "../controllers/homes";

export class HomeRouter {
  router: Router;
  public HomeControllers: HomeControllers = new HomeControllers();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.HomeControllers.traerCasas);
    this.router.get("/:userId", this.HomeControllers.traerCasa);
    this.router.post("/new/home", this.HomeControllers.crearCasa);
    this.router.put("/delete/:homeId", this.HomeControllers.eliminarCasa);
  }
}
