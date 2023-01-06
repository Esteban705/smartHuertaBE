
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generarJWT } from "../../helpers/jwt";
import { Usuarios } from "../models/Usuario";

export class UserController {
  
  public async crearUsuario(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    const { email, password } = req.body;

    try {
      let usuario = await Usuarios.findOne({ email });

      if (usuario) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario ya existe",
        });
      }

      usuario = new Usuarios(req.body);

      // Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);

      await usuario.save();

      // Generar JWT
      /*  const token = await generarJWT( usuario.id, usuario.name ); */

      res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        /* token */
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }

  public async loginUsuario(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    const { email, password } = req.body;

    try {
      const usuario = await Usuarios.findOne({ email });

      if (!usuario) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario no existe con ese email",
        });
      }

      // Confirmar los passwords
      const validPassword = bcrypt.compareSync(password, usuario.password);

      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: "Password incorrecto",
        });
      }

      // Generar JWT
      /*    const token = await generarJWT( usuario.id, usuario.name ); */

      res.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        /*      token */
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }

  /* static revalidarToken = async (req: Request, res: Response ) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    })
} */
}

