import { ObjectId } from 'mongoose';
import { ICategories } from "../models/Categories";


type IImage = {
    name: string;
    newEncodePicture: string;
}



export interface IDataProduct {
    cantidad: number;
    categories: ICategories[];
    coments: string;
    home: ObjectId[];
    images:IImage[];
    productName: string;
    userId: ObjectId;
}


