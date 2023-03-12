import { ObjectId } from 'mongoose';
import { Usuarios } from '../models/Usuario';

export class UserServices {

  public async updateUserImage(userId:ObjectId, idImage:ObjectId): Promise<any> {

    const filter = {
        _id: userId
    }

    const update = {
        imgId: idImage
    }

    let updateUserData = await Usuarios.findOneAndUpdate(filter, update, {
        new: true
      });

      return updateUserData
  }

  public async getUserById(userId:ObjectId): Promise<any> {

    const getUser = await Usuarios.findById({_id: userId})
      return getUser
  }
}

