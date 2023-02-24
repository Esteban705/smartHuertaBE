import { Document, isValidObjectId, model, Schema } from "mongoose";

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
  description: {
    type: String,
    default: ""
  },
  imgId: {
    type: Schema.Types.ObjectId,
    ref: "Images",
    require: true,
    default: null
  },
});

export const Usuarios = model<IUser>("Usuarios", usuarioSchema);
