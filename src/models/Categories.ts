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

  export const Categories = model<ICategories>("Categories", CategoriesSchema);
