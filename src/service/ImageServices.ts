import { ObjectId } from "mongoose";
import { Images } from "./../models/Images";
import { Categories } from "../models/Categories";
import { IBodyImg } from "./ProductServices";
import { UserServices } from "./UserServices";

export class ImageService {
  private UserServices: UserServices;

  public async updateUserImage(dataImg: IBodyImg, userId: ObjectId): Promise<any> {
    try {
      const { name, newEncodedPicture } = dataImg;

      const createImg = await Images.create({
        name: name,
        dataImg: newEncodedPicture,
        userId,
      });

      console.log("Imagen Creada");

      const userServices = new UserServices();

      const updateUser = await userServices.updateUserImage(userId, createImg._id);

      console.log("Usuario Actualizado");

      return updateUser;
    } catch (error) {
      console.log(error);
      throw new Error("error in editDataImage");
    }
  }

  public async getImageByUserId(userId): Promise<any> {
    const getImageToIdUser = await Images.findById(userId);

    console.log("consultando imagenes...");
    return getImageToIdUser;
  }
}
