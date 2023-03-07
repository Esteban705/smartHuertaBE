import { Categories } from "../models/Categories"

export class CategorieServices {


    
  public async getAllCategories():Promise<any> {

    const findAllCategories = await Categories.find({}) 

    return findAllCategories


  }


}