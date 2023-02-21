import { Product } from "./../models/Product";
import { IDataProduct } from "../types/ProductType";
import { Images } from "../models/Images";
import { CreateImg } from "../controllers/image";

export class ProductService {
  public async crearProducto(dataProduct: IDataProduct): Promise<any> {
    try {
      const { images, home, userId } = dataProduct;

      let imagesCreated = [];

      for (const img of images) {
        const dataImg = (img as unknown as CreateImg).dataImg;

        const creatingImg: any = await Images.create({
          dataImg,
          home,
        });

        imagesCreated.push(creatingImg._id);
      }

      const createProduct = await Product.create({
        ...dataProduct,
        idHome: home,
        idUser: userId,
        idImagen: imagesCreated,
      });
      console.log({ createProduct });
      return createProduct;
    } catch (error) {
      console.log(error);
      throw new Error("ValidateData is fail");
    }
  }
}
