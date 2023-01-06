import { Document, model, Schema } from "mongoose";



export interface IHome extends Document {
    latitude: string;
    longitude: string;
    name: string;
    isSpecial: string;
    userId: Schema.Types.ObjectId;
  }
  
  const HomesSchema: Schema<IHome> = new Schema({
    latitude: {
        type: String,
        require: true
    },
    longitude: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        unique: false
    },
    isSpecial: {
        type: Boolean,
        require: true,
    },
    userId: { 
        type: Schema.Types.ObjectId,
        ref: "Usuarios"
     }
  });

  export const Homes = model<IHome>("Homes", HomesSchema);
