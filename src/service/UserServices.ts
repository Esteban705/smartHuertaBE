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
}

