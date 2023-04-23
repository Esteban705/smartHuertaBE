"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Images_1 = require("./../models/Images");
const Product_1 = require("./../models/Product");
const Usuario_1 = require("../models/Usuario");
const Homes_1 = require("../models/Homes");
const Categories_1 = require("../models/Categories");
class ProductService {
    crearProducto(dataProduct) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { images, home, userId } = dataProduct;
                let imagesCreated = [];
                for (const img of images) {
                    const dataImg = img;
                    const { name, newEncodedPicture } = dataImg;
                    const validateExistImg = yield this.validateImageExist((_a = dataImg.newEncodedPicture) !== null && _a !== void 0 ? _a : dataImg.dataImg);
                    if (validateExistImg) {
                        imagesCreated.push(validateExistImg._id);
                    }
                    if (!validateExistImg) {
                        const creatingImg = yield Images_1.Images.create({
                            name,
                            dataImg: newEncodedPicture,
                            home,
                        });
                        imagesCreated.push(creatingImg._id);
                    }
                }
                const createProduct = yield Product_1.Product.create(Object.assign(Object.assign({}, dataProduct), { idHome: home, idUser: userId, idImagen: imagesCreated }));
                return createProduct;
            }
            catch (error) {
                console.log(error);
                throw new Error("ValidateData is fail");
            }
        });
    }
    productEdit(dataProduct, idProduct) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { images, home, userId } = dataProduct;
                let imagesCreated = [];
                for (const img of images) {
                    const dataImg = img;
                    const validateExistImg = yield this.validateImageExist((_a = dataImg.newEncodedPicture) !== null && _a !== void 0 ? _a : dataImg.dataImg);
                    if (validateExistImg) {
                        imagesCreated.push(validateExistImg._id);
                    }
                    if (!validateExistImg) {
                        const { name, newEncodedPicture } = dataImg;
                        const creatingImg = yield Images_1.Images.create({
                            name,
                            dataImg: newEncodedPicture,
                            home,
                        });
                        imagesCreated.push(creatingImg._id);
                    }
                }
                /*  await this.deleteUnusedImage(imagesCreated, idProduct); */
                const update = Object.assign(Object.assign({}, dataProduct), { idUser: userId, idImagen: imagesCreated, idHome: home });
                const filter = { _id: idProduct };
                const updateProduct = yield Product_1.Product.findOneAndUpdate(filter, update);
                console.log(updateProduct);
                return updateProduct;
            }
            catch (error) {
                console.log(error);
                throw new Error("ValidateData is fail");
            }
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getProduct = yield Product_1.Product.findById({
                _id: productId,
            })
                .populate({ path: "idUser", model: Usuario_1.Usuarios })
                .populate({ path: "categories", model: Categories_1.Categories })
                .populate({ path: "idHome", model: Homes_1.Homes })
                .populate({
                path: "idImagen",
                model: Images_1.Images,
                select: {
                    dataImg: 1,
                    _id: 1,
                    name: 1,
                },
            });
            return getProduct;
        });
    }
    getAllProductByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getProductAllProducts = yield Product_1.Product.find({
                idUser: userId,
            })
                .populate({ path: "idUser", model: Usuario_1.Usuarios })
                .populate({ path: "categories", model: Categories_1.Categories })
                .populate({ path: "idHome", model: Homes_1.Homes })
                .populate({
                path: "idImagen",
                model: Images_1.Images,
                select: {
                    dataImg: 1,
                    _id: 1,
                    name: 1,
                },
            });
            return getProductAllProducts;
        });
    }
    eliminarProducto(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getProduct = yield Product_1.Product.findById({ _id: productId });
            const getAllImages = getProduct.idImagen.map((image) => {
                return Images_1.Images.findByIdAndDelete({
                    _id: image,
                });
            });
            Promise.all(getAllImages);
            const eliminatingProducto = yield Product_1.Product.findByIdAndDelete({
                _id: productId,
            });
            return eliminatingProducto;
        });
    }
    validateImageExist(dataImg) {
        return __awaiter(this, void 0, void 0, function* () {
            const findImage = yield Images_1.Images.findOne({ dataImg });
            return findImage;
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductServices.js.map