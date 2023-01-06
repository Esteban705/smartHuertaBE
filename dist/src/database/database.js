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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../config");
const dbConnection = () => {
    const connection = mongoose_1.default.connection;
    connection.on('connected', () => {
        console.log('Mongo Connection Established', config_1.DB_CNN);
    });
    connection.on('reconnected', () => {
        console.log('Mongo Connection Reestablished');
    });
    connection.on('disconnected', () => {
        console.log('Mongo Connection Disconnected');
        console.log('Trying to reconnect to Mongo ...');
        setTimeout(() => {
            mongoose_1.default.connect(config_1.DB_CNN, {
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
    connection.on('error', (error) => {
        console.log('Mongo Connection ERROR: ' + error);
    });
    const run = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('URL:' + config_1.DB_CNN);
        yield mongoose_1.default.connect(config_1.DB_CNN, {
            autoReconnect: true,
            keepAlive: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    });
    run().catch((error) => console.log(error));
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=database.js.map