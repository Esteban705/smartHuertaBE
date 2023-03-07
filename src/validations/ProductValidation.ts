import { ObjectId } from "mongoose";
import { Product } from "../models/Product";
import { IDataProduct } from "../types/ProductType";

export class ProductValidation {
  public validateDataIsNotEmpty(productData: IDataProduct): Boolean {
    const { cantidad, coments, home, productName, categories, images } =
      productData;

    if (!cantidad || !coments || !productName) {
      return false;
    }

    if (!home.length || !categories.length || !images.length || !home.length) {
      return false;
    }

    return true;
  }

  public async validateProductExist(productId): Promise<Boolean> {
    const getProduct = await Product.findById({
      _id: productId as unknown as ObjectId,
    });

    if (!getProduct) {
      return false;
    }

    return true;
  }
}
