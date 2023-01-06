import { Router } from 'express';
import { check } from 'express-validator';
import { UserController } from '../controllers/auth';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';


export class UserRouter {
    router: Router;
    public UserController: UserController = new UserController();
  
    constructor() {
      this.router = Router();
      this.routes();
    }
  
    routes() {
      this.router.post(
        '/new',
        this.UserController.crearUsuario,
      );
      this.router.post(
        '/',
        this.UserController.loginUsuario,
      );
    }
    


  }





/* router.get('/renew', validarJWT ,revalidarToken ); */

