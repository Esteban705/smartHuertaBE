import { Exchange, IExchange } from "../models/Exchange";

export class ExchangeService {
  public async createExchange(dataExchange: IExchange): Promise<any> {
    try {
      dataExchange.status = "PENDING";
      dataExchange.updateAt = new Date();
      const creatingExchange = await Exchange.create(dataExchange);

      console.log("Exchange Creado con exito");
      return creatingExchange;
    } catch (error) {
      console.log(error);
      throw new Error("error in editDataImage");
    }
  }
}
