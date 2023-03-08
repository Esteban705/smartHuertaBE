import { ImageService } from "./../service/ImageServices";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generarJWT } from "../../helpers/jwt";
import { Usuarios } from "../models/Usuario";
import { Image, Images } from "../models/Images";
import { ObjectId } from "mongoose";
import { ProductService } from "../service/ProductServices";
import { IDataEditUser } from "../types/UserType";
import { ImageValidation } from "../validations/ImageValidation";

export class UserController {
  private ImageService: ImageService;
  private ImageValidation: ImageValidation;

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
    const { password, name } = req.body;

    try {
      const usuario = await Usuarios.findOne({ name });

      if (!usuario) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario no existe",
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

      return res.status(200).send({
        email: usuario.email,
        isNew: false,
        id: usuario.id,
        name: usuario.name,
        ok: true,
      });
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
      const usuario = await Usuarios.findOne({ _id: userId }).populate({
        path: "imgId",
        model: Images,
        select: {
          dataImg: 1,
          _id: 1,
          name: 1,
        },
      });;

      if (!usuario) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario no existe",
        });
      }

      return res.status(200).send({ ok: true, usuario });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }
  public async editUser(req: Request, res: Response): Promise<Response<any>> {
    try {
      const imageValidation = new ImageValidation();
      const imageService = new ImageService();

      const { userId } = req.params;
      let dataUser: IDataEditUser = req.body;

      const { dataImage } = dataUser;

      const validateImageExist = await imageValidation.ValidateImageExist(
        dataImage.newEncodedPicture
      );

      delete dataUser.dataImage;

      if (!validateImageExist) {
        const createImg = await Images.create({
          name: dataImage.name,
          dataImg: dataImage.newEncodedPicture,
          userId,
        });

        dataUser = {
          ...dataUser,
          imgId: createImg._id,
        };
      }

      if(validateImageExist){
 
        dataUser = {
          ...dataUser,
          imgId: validateImageExist._id,
        };
      }

      const usuario = await Usuarios.findOne({ _id: userId });

      if (!usuario) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario no existe",
        });
      }

      const updateUserData = await Usuarios.findOneAndUpdate(
        { _id: userId },
        dataUser,
        {
          new: true,
        }
      );

      return res.status(200).send({ ok: true, updateUserData });
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
