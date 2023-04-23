import { Application, request, response } from "express";
import { ValidateRoute } from "../middlewares/ValidateRouteExist";
import { UserRouter } from "./auth";
import { CategoriesRoute } from "./categoriesRoute";
import { HomeRouter } from "./homes";
import { ImagenesRoutes } from "./images";
import { ProductRoute } from "./productRoute";
import { ExchangeRoute } from "./exchange";

export const routes = (app: Application): void => {
  //user
  app.use("/api/auth", new UserRouter().router);
  app.use("/api/homes", new HomeRouter().router);
  app.use("/api/images", new ImagenesRoutes().router);
  app.use("/api/product", new ProductRoute().router);
  app.use("/api/categories", new CategoriesRoute().router);
  app.use("/api/exchange", new ExchangeRoute().router);
  app.use("*", new ValidateRoute().ValidateExistRoute);
};
