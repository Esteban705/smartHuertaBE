const { response } = require("express");
const mongoose = require("mongoose");
const { Homes } = require("../models/Homes");

class Casas {
  static crearCasa = async (req, res = response) => {
    try {
      let home = req.body;

      home = new Homes(req.body);

      await home.save();

      res.status(201).json({
        ok: true,
        msg: "Casa agregada con exito",
        data: home,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  };

  static traerCasa = async (req, res = response) => {
    try {
      const { userId } = req.params;

      const foundUser = await Homes.find({ userId: userId }).populate(
        "userId",
        { name: 1, email: 1 }
      );

      const mapperUser = {
        id: foundUser[0]._id,
        geometry: [foundUser[0].latitude, foundUser[0].longitude],
        dataUser: foundUser[0].userId,
      };

      res.status(201).json({
        ok: true,
        data: mapperUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  };

  static traerCasas = async (req, res = response) => {
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

      res.status(201).json({
        ok: true,
        data: allHomes,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  };

  static eliminarCasa = async (req, res = response) => {
    try {
      const { homeId } = req.params;

      const dataDelete = await Homes.deleteOne({ _id: homeId });

      res.status(201).json({
        ok: true,
        data: dataDelete,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
    }
  };
}
module.exports = {
  Casas,
};
