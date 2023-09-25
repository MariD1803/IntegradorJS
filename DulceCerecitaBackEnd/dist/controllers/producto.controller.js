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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoController = void 0;
const producto_1 = require("../models/producto");
const http_1 = require("../utils/http");
const db_1 = require("../utils/db");
const model_controller_1 = require("./model.controller");
class ProductoController extends model_controller_1.ModelController {
    static add(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield producto_1.Producto.create(request.body);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            response.json(result);
        });
    }
    static retrieveById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = +request.params.id;
            if (isNaN(id)) {
                return response.status(400).json({ error: http_1.HTTPErrorMessageDict.idMustBeNumericErrorMsg });
            }
            const result = yield producto_1.Producto.getById(id);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            return response.json(result);
        });
    }
    static retrieve(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield producto_1.Producto.get(request.body);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            response.json(result);
        });
    }
    static modify(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = +request.params.id;
            if (isNaN(id)) {
                return response.status(400).json({ error: http_1.HTTPErrorMessageDict.idMustBeNumericErrorMsg });
            }
            const dataToUpdate = request.body;
            const result = yield producto_1.Producto.update(id, dataToUpdate);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            return response.json(result);
        });
    }
    static supress(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = +request.params.id;
            if (isNaN(id)) {
                return response.status(400).json({ error: http_1.HTTPErrorMessageDict.idMustBeNumericErrorMsg });
            }
            const result = yield producto_1.Producto.delete(id);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            return response.json(result);
        });
    }
}
exports.ProductoController = ProductoController;
