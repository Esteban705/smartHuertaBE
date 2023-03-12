import { Images } from "./../models/Images";
import { ObjectId } from "mongoose";
import { IProduct, Product } from "./../models/Product";
import { IDataProduct } from "../types/ProductType";
import { CreateImg } from "../controllers/image";
import { Usuarios } from "../models/Usuario";
import { Homes } from "../models/Homes";
import { Categories } from "../models/Categories";

export type IBodyImg = {
  name: string;
  newEncodedPicture: string;
};

export class ProductService {
  public async crearProducto(dataProduct: IDataProduct): Promise<any> {
    try {
      const { images, home, userId } = dataProduct;

      let imagesCreated = [];

      for (const img of images) {
        const dataImg = img as unknown as IBodyImg;

        const { name, newEncodedPicture } = dataImg;

        const creatingImg: any = await Images.create({
          name,
          dataImg: newEncodedPicture,
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


  public async productEdit(dataProduct: IDataProduct, idProduct: string): Promise<any> {
    try {
      const { images, home, userId } = dataProduct;

      let imagesCreated = [];

      for (const img of images) {
        const dataImg = img as unknown as IBodyImg;

          const validateExistImg = this.validateImageExist(dataImg.newEncodedPicture)


          console.log(validateExistImg)

   /*      const { name, newEncodedPicture } = dataImg;

        const creatingImg: any = await Images.create({
          name,
          dataImg: newEncodedPicture,
          home,
        });

        imagesCreated.push(creatingImg._id); */
      }

/*       const update =
        {
          ...dataProduct,
          idHome: home,
          idUser: userId,
          idImagen: imagesCreated,
        }
      

      const updateProduct = await Product.findOneAndUpdate(idProduct ,update); */

      return 'updateProduct';
    } catch (error) {
      console.log(error);
      throw new Error("ValidateData is fail");
    }
  }

  public async getProductById(productId): Promise<IProduct> {
    const getProduct = await Product.findById({
      _id: productId as unknown as ObjectId,
    })
      .populate({ path: "idUser", model: Usuarios })
      .populate({ path: "categories", model: Categories })
      .populate({ path: "idHome", model: Homes })
      .populate({
        path: "idImagen",
        model: Images,
        select: {
          dataImg: 1,
          _id: 1,
          name: 1,
        },
      });

    return getProduct;
  }

  public async getAllProductByUserId(userId: ObjectId): Promise<IProduct[]> {


    const getProductAllProducts = await Product.find({
      idUser: userId as unknown as ObjectId,
    })
      .populate({ path: "idUser", model: Usuarios })
      .populate({ path: "categories", model: Categories })
      .populate({ path: "idHome", model: Homes })
      .populate({
        path: "idImagen",
        model: Images,
        select: {
          dataImg: 1,
          _id: 1,
          name: 1,
        },
      });

    return getProductAllProducts;
  }

  public async eliminarProducto(productId: ObjectId): Promise<any> {
    const getProduct = await Product.findById({ _id: productId });

    const getAllImages = getProduct.idImagen.map((image) => {
      return Images.findByIdAndDelete({
        _id: image,
      });
    });

    Promise.all(getAllImages);

    const eliminatingProducto = await Product.findByIdAndDelete({
      _id: productId,
    });

    return eliminatingProducto;
  }

  



   private async validateImageExist(dataImg: string): Promise<any> {

    const findImage = Images.findOne({ dataImg })
  

   console.log(findImage)
  }
}
