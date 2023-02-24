import { Document, model, Schema } from "mongoose";

export interface Image extends Document {
  dataImg: string;
  userId: Schema.Types.ObjectId;
  home: Schema.Types.ObjectId[];
}

const ImageSchema: Schema<Image> = new Schema({
  dataImg: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: false,
    ref: "Usuarios"
  },
  home: {
    type: [Schema.Types.ObjectId],
    require: false,
    ref: "Homes"
  },
});

export const Images = model<Image>("Images", ImageSchema) 

