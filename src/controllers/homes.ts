import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { Homes } from "../models/Homes";

export class HomeControllers {

  public async crearCasa(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    try {
      let home = req.body;

      home = new Homes(req.body);

      await home.save();

      return ( 
        res.status(201).json({
        ok: true,
        msg: "Casa agregada con exito",
        data: home,
      })
      )
    } catch (error) {
      console.log(error);
      return(
        res.status(500).json({
          ok: false,
          msg: "Por favor hable con el administrador",
        })
      )
      
    }
  };

 public async traerCasa(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    try {
      
      const { userId } = req.params;

      const foundUser = await Homes.findOne({ userId: userId as unknown as ObjectId }).populate(
        "userId",
        { name: 1, email: 1 }
      );

      const mapperUser = {
        id: foundUser._id,
        geometry: [foundUser.latitude, foundUser.longitude],
        dataUser: foundUser.userId,
      };

      return(
        res.status(201).json({
          ok: true,
          data: mapperUser,
        })
      )

      
    } catch (error) {
      console.log(error);
      return (
        res.status(500).json({
          ok: false,
          msg: "Por favor hable con el administrador",
        })

      )
      
    }
  };

  public async traerCasas(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
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


      return(
        res.status(201).json({
          ok: true,
          data: allHomes,
        })
      )
     
    } catch (error) {
      console.log(error);
      return(
        res.status(500).json({
          ok: false,
          msg: "Por favor hable con el administrador",
        })
      )
      
    }
  };

  public async eliminarCasa(
    req: Request,
    res: Response
  ): Promise<Response<any>> {
    try {
      const { homeId } = req.params;

      const dataDelete = await Homes.deleteOne({ _id: homeId });

      return(
        res.status(201).json({
          ok: true,
          data: dataDelete,
        })
      )
     
    } catch (error) {
      console.log(error);
      return(
        res.status(500).json({
          ok: false,
          msg: "Por favor hable con el administrador",
        })
      )
      
    }
  };
}

