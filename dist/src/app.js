"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_helpers_1 = require("./routes/router-helpers");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../config");
const database_1 = require("./database/database");
// Crear el servidor de express
/* const app = express(); */
// Base de datos
// CORS
/* app.use(cors()); */
// Directorio Público
// Lectura y parseo del body
/* app.use(express.json()); */
// Rutas
/* routes(app); */
/* app.use('/api/auth', new UserRouter().router);
app.use("/api/homes", require("./routes/homes")); */
// TODO: CRUD: Eventos
// Escuchar peticiones
/* app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
}); */
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        (0, router_helpers_1.routes)(this.app);
        (0, database_1.dbConnection)();
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public"));
    }
    start() {
        console.log(config_1.PORT, 'PORT');
        this.app.listen(config_1.PORT, () => {
            console.log(`Servidor corriendo en puerto ${config_1.PORT} asdas`);
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=app.js.map