import { Request, Response } from "express";

export class ValidateRoute {

  public ValidateExistRoute(req: Request, res: Response): void {
    const err = Error(`Requested path ${req.path} not found`);
    res.status(404).send({
      success: false,
      message: `Requested path ${req.path} not found`,
      stack: err.stack,
    });
  }
}
