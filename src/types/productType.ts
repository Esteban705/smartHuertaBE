import { ObjectId } from 'mongoose';
import { ICategories } from "../models/Categories";



export interface IDataProduct {
    cantidad: number;
    categories: ICategories[];
    coments: string;
    home: ObjectId[];
    images:ObjectId[];
    productName: string;
    userId: ObjectId;

}