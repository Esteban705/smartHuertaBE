"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const ValidateRouteExist_1 = require("../middlewares/ValidateRouteExist");
const auth_1 = require("./auth");
const categoriesRoute_1 = require("./categoriesRoute");
const homes_1 = require("./homes");
const images_1 = require("./images");
const productRoute_1 = require("./productRoute");
const exchange_1 = require("./exchange");
const routes = (app) => {
    //user
    app.use("/api/auth", new auth_1.UserRouter().router);
    app.use("/api/homes", new homes_1.HomeRouter().router);
    app.use("/api/images", new images_1.ImagenesRoutes().router);
    app.use("/api/product", new productRoute_1.ProductRoute().router);
    app.use("/api/categories", new categoriesRoute_1.CategoriesRoute().router);
    app.use("/api/exchange", new exchange_1.ExchangeRoute().router);
    app.use("*", new ValidateRouteExist_1.ValidateRoute().ValidateExistRoute);
};
exports.routes = routes;
//# sourceMappingURL=router-helpers.js.map