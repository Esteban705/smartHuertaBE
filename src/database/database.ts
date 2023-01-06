import mongoose from 'mongoose';
import { DB_CNN } from '../environment/config';


export const dbConnection = () => {
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('Mongo Connection Established');
    });
    connection.on('reconnected', () => {
      console.log('Mongo Connection Reestablished');
    });
    connection.on('disconnected', () => {
      console.log('Mongo Connection Disconnected');
      console.log('Trying to reconnect to Mongo ...');
      setTimeout(() => {
        mongoose.connect(DB_CNN, {
          autoReconnect: true,
          keepAlive: true,
          useNewUrlParser: true,
          useCreateIndex: true,
        });
      }, 3000);
    });
    connection.on('close', () => {
      console.log('Mongo Connection Closed');
    });
    connection.on('error', (error: Error) => {
      console.log('Mongo Connection ERROR: ' + error);
    });

    const run = async () => {
      console.log('URL:' + DB_CNN);
      await mongoose.connect(DB_CNN, {
        autoReconnect: true,
        keepAlive: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
    };
    run().catch((error) => console.log(error));
}