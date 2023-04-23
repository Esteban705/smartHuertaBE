import { Router } from "express";
import { ExchangeControllers } from "../controllers/exchange";

export class ExchangeRoute {
  router: Router;
  public ExchangeControllers: ExchangeControllers = new ExchangeControllers();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/:id", this.ExchangeControllers.getExchangeById);
    this.router.get(
      "/getAll/:id",
      this.ExchangeControllers.getAllExchangesByUser
    );
    this.router.post("/", this.ExchangeControllers.createExchange);
    this.router.put("/:id", this.ExchangeControllers.deleteExchange);
  }
}
