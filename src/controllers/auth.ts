import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generarJWT } from "../../helpers/jwt";
import { Usuarios } from "../models/Usuario";
import { Images } from "../models/Images";
import { ObjectId } from "mongoose";

export class UserController {
  public async crearUsuario(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    const { email, password, name } = req.body;

    try {
      let usuario = await Usuarios.findOne({ email });

      if (usuario) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario ya existe",
        });
      }

      const salt = bcrypt.genSaltSync();
      const passwordHash = bcrypt.hashSync(password, salt);

      await Usuarios.create({
        name,
        password: passwordHash,
        email,
        description: "",
      });

      const { id } = await Usuarios.findOne({ name });

      res.status(201).send({ ok: true, name, email, id });
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

      const userData = {
        email: usuario.email,
        isNew: false,
        id: usuario.id,
        name: usuario.name,
        ok: true,
      };

      return res.status(200).send(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }

  public async getDataUser(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    try {
      const { userId } = req.params;
      const usuario = await Usuarios.findOne({ _id: userId });
      const imga = await Images.findOne({
        userId: userId as unknown as ObjectId,
      });

      if (!usuario) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario no existe",
        });
      }

      return res.status(200).send({ ok: true, usuario, imga });
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
