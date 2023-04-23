import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { Homes } from "../models/Homes";
import { Exchange, IExchange } from "../models/Exchange";
import { ExchangeService } from "../service/ExchangeService";

export class ExchangeControllers {
  public async createExchange(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    try {
      const createExchange = new ExchangeService();

      let data: IExchange = req.body;

      /*    const error = Exchange.validate(data); */

      const creatingExchange = await createExchange.createExchange(data);

      return res.status(201).json({
        ok: true,
        msg: "exchange creada con exito",
        data: creatingExchange,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }

  public async getExchangeById(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    try {
      const exchangeId = req.params;

      const foundExchange = await Exchange.findOne({
        _id: exchangeId.id as unknown as ObjectId,
      })
        .populate("transmiter", { name: 1, email: 1 })
        .populate("reciver", { name: 1, email: 1 })
        .populate("productTransmiter", {
          productName: 1,
          coments: 1,
          cantidad: 1,
        })
        .populate("productReciver", {
          productName: 1,
          coments: 1,
          cantidad: 1,
        });

      /*  const mapperUser = {
        id: foundUser._id,
        geometry: [foundUser.latitude, foundUser.longitude],
        dataUser: foundUser.userId,
      }; */

      return res.status(201).json({
        ok: true,
        data: foundExchange,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }
  public async getAllExchangesByUser(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    try {
      const exchangeId = req.params;

      const idUser = exchangeId.id;

      const foundExchange = await Exchange.find({
        $or: [{ reciver: idUser }, { transmiter: idUser }],
      })
        .populate("transmiter", { name: 1, email: 1 })
        .populate("reciver", { name: 1, email: 1 })
        .populate("productTransmiter", {
          productName: 1,
          coments: 1,
          cantidad: 1,
        })
        .populate("productReciver", {
          productName: 1,
          coments: 1,
          cantidad: 1,
        });

      /*  const mapperUser = {
        id: foundUser._id,
        geometry: [foundUser.latitude, foundUser.longitude],
        dataUser: foundUser.userId,
      }; */

      return res.status(201).json({
        ok: true,
        data: foundExchange,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }

  public async deleteExchange(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    try {
      const exchangeId = req.params;

      const foundExchange = await Exchange.findOne({
        _id: exchangeId.id as unknown as ObjectId,
      });
      if (!foundExchange) {
        throw new Error("El Trueque no Existe");
      }

      const dataDelete = await Exchange.deleteOne({ _id: foundExchange.id });

      return res.status(201).json({
        ok: true,
        data: dataDelete,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }

  public async traerCasas(req: Request, res: Response): Promise<Response<any>> {
    try {
      const foundCasas = await Homes.find().populate("userId", {
        name: 1,
        email: 1,
      });

      const allHomes = foundCasas.map((casa) => {
        const mapperHome = {
          name: casa.name,
          id: casa._id,
          geometry: [casa.latitude, casa.longitude],
          dataUser: casa.userId,
          isSpecial: casa.isSpecial,
        };

        return mapperHome;
      });

      return res.status(201).json({
        ok: true,
        data: allHomes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  }
}
