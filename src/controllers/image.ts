import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { Images } from "../models/Images";



type CreateImg = {
    dataImg: string; 
    userId: ObjectId;
}


type ResponseImg = {
    createImg: CreateImg;
    ok: boolean;
}

export class ImageController {


    public async UploadImage(
        req: Request,
        res: Response
      ): Promise<Response<ResponseImg>> {
        try {
         
            const { dataImg, userId } = req.body

            if(!dataImg || !userId) return
 

          const createImg: CreateImg = await Images.create({
                dataImg,
                userId
            })

            console.log('Imagen Creada')

            return res.status(201).send({ok:true, createImg})

        } catch (error) {
          console.log(error);
          return(
            res.status(500).json({
              ok: false,
              msg: "Por favor hable con el administrador",
            })
          )
          
        }
      };
}