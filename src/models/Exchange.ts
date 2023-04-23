import { Document, model, Schema } from "mongoose";

export interface IExchange extends Document {
  transmiter: string;
  reciver: string;
  productTransmiter: string;
  productReciver: string;
  createdAt: Date;
  updateAt?: Date;
  status: "PENDING" | "REFUSED" | "ACCEPTED";
}

const ExchangeSchema: Schema<IExchange> = new Schema({
  transmiter: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    require: true,
  },
  reciver: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    require: true,
  },
  productTransmiter: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  productReciver: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  updateAt: {
    type: Date,
    require: false,
  },
});

export const Exchange = model<IExchange>("Exchange", ExchangeSchema);
