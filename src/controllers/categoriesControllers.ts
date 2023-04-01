import { Request, Response } from "express";
import { CategorieServices } from "../service/CategoriesServices";

export class CategoriesController {
  private CategorieServices: CategorieServices;

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
