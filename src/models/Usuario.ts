import { Document, model, Schema } from "mongoose";


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const usuarioSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  description:{
    type: String,
    require: false,
  },
  imgId: { 
    type: Schema.Types.ObjectId,
    ref: "Images",
    require: false,
 }
});

export const Usuarios = model<IUser>("Usuarios", usuarioSchema);

