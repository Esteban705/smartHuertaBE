"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_1 = require("./auth");
const routes = (app) => {
    //user
    app.use('/api/auth', new auth_1.UserRouter().router);
};
exports.routes = routes;
//# sourceMappingURL=router-helpers.js.map