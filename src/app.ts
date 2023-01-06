import { routes } from "./routes/router-helpers";

import express from "express";
import cors from "cors";
import { PORT } from "./environment/config";
import { dbConnection } from "./database/database";



class Server {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.config();

    routes(this.app);

    dbConnection()
  }

  

  public config(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
  

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  }
}

const server = new Server();

server.start();
