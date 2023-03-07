import { ObjectId } from 'mongoose';
import { IBodyImg } from './../service/ProductServices';


export interface IDataEditUser {
    name: string;
    description: string;
    email: string;
    imgId?: ObjectId;
    dataImage?: IBodyImg;

}
