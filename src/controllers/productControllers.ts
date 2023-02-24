import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { Product } from "../models/Product";
import { ProductService } from "../service/ProductServices";
import { IDataProduct } from "../types/ProductType";
import { ProductValidation } from "../validations/ProductValidation";

export class ProductController {
  private ProductValidation: ProductValidation;
  private ProductService: ProductService;

  public async crearProducto(
    req: Request,
    res: Response
  ): Promise<Response<void>> {
    try {
      const dataProduct: IDataProduct = req.body;

      const productValidation = new ProductValidation();
      const productService = new ProductService();

      const validateDataProduct =
        productValidation.validateDataIsNotEmpty(dataProduct);

      if (!validateDataProduct) throw new Error("ValidateData is fail");

      const createProduct = await productService.crearProducto(dataProduct);

      return res.status(201).send({ ok: true, createProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }

  public async eliminarProducto(
    req: Request,
    res: Response
  ): Promise<Response<void>> {
    try {
      const { productId } = req.params;

      const productService = new ProductService();

      const productEliminated = await productService.eliminarProducto(
        productId as unknown as ObjectId
      );

      return res.status(201).send({ ok: true, productEliminated });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }
}
