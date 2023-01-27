import { Document, model, Schema } from "mongoose";

export interface Image extends Document {
  dataImg: string;
  userId: Schema.Types.ObjectId;
}

const ImageSchema: Schema<Image> = new Schema({
  dataImg: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Usuarios"
  },
});

export const Images = model<Image>("Images", ImageSchema) 

