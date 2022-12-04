const { response } = require("express");
const mongoose = require("mongoose");
const Homes = require("../models/Homes");

const crearCasa = async (req, res = response) => {
  try {
    let home = req.body;

    home = new Homes(req.body);

    await home.save();

    res.status(201).json({
      ok: true,
      msg: "Casa agregada con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const traerCasa = async (req, res = response) => {
  try {
    let { userId } = req.params;
    const foundUser = await Homes.find({ userId: userId });

    res.status(201).json({
      ok: true,
      data: foundUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  crearCasa,
  traerCasa,
};
