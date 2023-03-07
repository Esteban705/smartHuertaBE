import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { Images } from "../models/Images";

export type CreateImg = {
  name: string;
  dataImg: string;
  userId?: ObjectId;
  homeId?: ObjectId;
};

export type ResponseImg = {
  createImg: CreateImg;
  ok: boolean;
};

export class ImageController {
  
  public async UploadImage(
    req: Request,
    res: Response
  ): Promise<Response<ResponseImg>> {
    try {
      const { dataImg, userId, nameImg } = req.body;

      if (!dataImg || !userId) return;

      const createImg: CreateImg = await Images.create({
        nameImg,
        dataImg,
        userId,
      });

      console.log("Imagen Creada");

      return res.status(201).send({ ok: true, createImg });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }

  public async getImageToUser(
    req: Request,
    res: Response
  ): Promise<Response<ResponseImg>> {
    try {
      const userId = req.params;

      if (!userId) return;

      const getImageToIdUser = await Images.find(userId);

      console.log("consultando imagenes...");

      return res.status(201).send({ ok: true, getImageToIdUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }

  public async deleteImage(
    req: Request,
    res: Response
  ): Promise<Response<ResponseImg>> {
    try {
      const { imageId } = req.params;

      console.log(imageId);

      if (!imageId) return;

      const deleteImageToIdImage = await Images.findOneAndRemove({
        _id: imageId as unknown as ObjectId,
      });

      console.log("eliminando imagen...");

      return res.status(201).send({ ok: true, deleteImageToIdImage });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }
}
