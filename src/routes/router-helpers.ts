import { Application } from 'express';
import { UserRouter } from './auth';
import { HomeRouter } from './homes';

export const routes = (app: Application): void => {
  //user
  app.use('/api/auth', new UserRouter().router);
  app.use('/api/homes', new HomeRouter().router);


};
