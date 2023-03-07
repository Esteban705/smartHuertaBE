import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { Product } from "../models/Product";
import { CategorieServices } from "../service/CategoriesServices";
import { ProductService } from "../service/ProductServices";
import { IDataProduct } from "../types/ProductType";
import { ProductValidation } from "../validations/ProductValidation";

export class CategoriesController {
  private CategorieServices: CategorieServices

  public async getAllCategories(
    req: Request,
    res: Response
  ): Promise<Response<void>> {
    try {

        const categorieServices = new CategorieServices();

      const getAllCategories = await categorieServices.getAllCategories();

      return res.status(201).send({ ok: true, getAllCategories });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }
}
