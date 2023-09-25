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
exports.Persona = void 0;
const model_1 = require("./model");
const db_1 = require("../utils/db");
class Persona extends model_1.Model {
    constructor() {
        super(...arguments);
        this.entity = "persona";
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const persona = yield db_1.prismaClient.persona.create({ data: data });
                return persona;
            }
            catch (error) {
                return db_1.DBErrorController.getDBError(this.name, error);
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const persona = yield db_1.prismaClient.persona.findFirst({
                where: {
                    id: id
                }
            });
            if (!persona) {
                return db_1.DBErrorController.getNotFoundDBError('Persona no encontrada');
            }
            return persona;
        });
    }
    static get(whereProperties = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personas = yield db_1.prismaClient.persona.findMany({
                    where: whereProperties
                });
                if (personas.length == 0) {
                    return db_1.DBErrorController.getNotFoundDBError('No se encontraron personas que coincidan con el criterio');
                }
                return personas;
            }
            catch (error) {
                return db_1.DBErrorController.getDBError(this.name, error);
            }
        });
    }
    static update(id, overwritePropertiesValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const persona = yield db_1.prismaClient.persona.update({
                where: {
                    id: id
                },
                data: overwritePropertiesValues
            });
            if (!persona) {
                return db_1.DBErrorController.getNotFoundDBError('Persona no encontrada');
            }
            return persona;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const persona = yield db_1.prismaClient.persona.delete({
                where: {
                    id: id
                }
            });
            if (!persona) {
                return db_1.DBErrorController.getNotFoundDBError('Persona no encontrada');
            }
            return persona;
        });
    }
    static getId(whereProperties = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                if (whereProperties.id != undefined) {
                    result = yield this.getById(whereProperties.id);
                }
                else {
                    result = yield this.get(whereProperties);
                }
                if (result instanceof db_1.DBError) {
                    return result;
                }
                if (result instanceof Array) {
                    result = result[0];
                }
                return result.id;
            }
            catch (error) {
                return db_1.DBErrorController.getDBError(this.name, error);
            }
        });
    }
}
exports.Persona = Persona;
