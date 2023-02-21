import { Document, model, Schema } from "mongoose";



export interface ICategories extends Document {
    name: string;
  }
  
  const CategoriesSchema: Schema<ICategories> = new Schema({
    name: {
        type: String,
        require: true
    }
  });

  export const Homes = model<ICategories>("Homes", CategoriesSchema);
