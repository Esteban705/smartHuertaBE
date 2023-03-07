import { Images, Image } from "./../models/Images";

export class ImageValidation {
  public async ValidateImageExist(dataImg: string): Promise<Image> {
    const existImage = await Images.findOne({ dataImg });

    return existImage;
  }
}
