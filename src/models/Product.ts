import { Image } from './Images';
import { Document, model, ObjectId, Schema } from "mongoose";

type ICategory = {
    idCategori: ObjectId;
    name: string;
}



export interface IProduct extends Document {
  name: string;
  coments: string;
  cantidad: number;
  categories: ICategory[]
  idUser: ObjectId;
  idHome: ObjectId;
  idImagen: Image[];

}

const productSchema: Schema<IProduct> = new Schema({
  productName: { type: String, required: true },
  coments: {
    type: String,
    require: true,
    unique: true,
  },
  cantidad: {
    type: Number,
    require: true,
    unique: true,
  },
  categories: {
    type: [Schema.Types.ObjectId],
    require: true,
    ref: "Categories",
  },
  idImagen: {
    type: [Schema.Types.ObjectId],
    ref: "Images",
    require: true,
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    require: true,
  },
  idHome: {
    type: [Schema.Types.ObjectId],
    ref: "Homes",
    require: true,
  },
});

export const Product = model<IProduct>("Product", productSchema);
