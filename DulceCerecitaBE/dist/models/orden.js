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
exports.Orden = void 0;
const model_1 = require("./model");
const db_1 = require("../utils/db");
class Orden extends model_1.Model {
    constructor() {
        super(...arguments);
        this.entity = "orden";
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (data.lineasOrden != undefined) {
                    const aux = data.lineasOrden;
                    data.lineasOrden = {};
                    data.lineasOrden.create = aux;
                }
                const orden = yield db_1.prismaClient.orden.create({ data: data });
                return orden;
            }
            catch (error) {
                console.log(error);
                return db_1.DBErrorController.getDBError(this.name, error);
            }
        });
    }
    static getById(id, includeInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const orden = yield db_1.prismaClient.orden.findFirst({
                where: {
                    id: id
                },
                include: {
                    persona: includeInfo.persona,
                    lineasOrden: {
                        include: {
                            producto: includeInfo.producto
                        }
                    },
                }
            });
            if (!orden) {
                return db_1.DBErrorController.getNotFoundDBError('Orden no encontrada');
            }
            return orden;
        });
    }
    static get(whereProperties = {}, includeInfo = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ordenes = yield db_1.prismaClient.orden.findMany({
                    where: whereProperties,
                    include: {
                        persona: includeInfo.persona,
                        lineasOrden: {
                            include: {
                                producto: includeInfo.producto
                            }
                        },
                    }
                });
                if (ordenes.length == 0) {
                    return db_1.DBErrorController.getNotFoundDBError('No se encontraron ordenes que coincidan con el criterio');
                }
                return ordenes;
            }
            catch (error) {
                return db_1.DBErrorController.getDBError(this.name, error);
            }
        });
    }
}
exports.Orden = Orden;
