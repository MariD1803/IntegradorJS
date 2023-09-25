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
exports.Producto = void 0;
const model_1 = require("./model");
const db_1 = require("../utils/db");
class Producto extends model_1.Model {
    constructor() {
        super(...arguments);
        this.entity = "producto";
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const producto = yield db_1.prismaClient.producto.create({ data: data });
                return producto;
            }
            catch (error) {
                return db_1.DBErrorController.getDBError(this.name, error);
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = yield db_1.prismaClient.producto.findFirst({
                where: {
                    id: id
                }
            });
            if (!producto) {
                return db_1.DBErrorController.getNotFoundDBError('Producto no encontrado');
            }
            return producto;
        });
    }
    static get(whereProperties = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productos = yield db_1.prismaClient.producto.findMany({
                    where: whereProperties
                });
                if (productos.length == 0) {
                    return db_1.DBErrorController.getNotFoundDBError('No se encontraron productos que coincidan con el criterio');
                }
                return productos;
            }
            catch (error) {
                return db_1.DBErrorController.getDBError(this.name, error);
            }
        });
    }
    static update(id, overwritePropertiesValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = yield db_1.prismaClient.producto.update({
                where: {
                    id: id
                },
                data: overwritePropertiesValues
            });
            if (!producto) {
                return db_1.DBErrorController.getNotFoundDBError('Producto no encontrado');
            }
            return producto;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = yield db_1.prismaClient.producto.delete({
                where: {
                    id: id
                }
            });
            if (!producto) {
                return db_1.DBErrorController.getNotFoundDBError('Producto no encontrado');
            }
            return producto;
        });
    }
}
exports.Producto = Producto;
