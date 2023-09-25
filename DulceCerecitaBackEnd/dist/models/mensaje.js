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
exports.Mensaje = void 0;
const model_1 = require("./model");
const persona_1 = require("./persona");
const db_1 = require("../utils/db");
class Mensaje extends model_1.Model {
    constructor() {
        super(...arguments);
        this.entity = "mensaje";
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const personaEnMensaje = data.persona;
            try {
                const persona = personaEnMensaje.hasOwnProperty("id") ?
                    yield db_1.prismaClient.persona.findFirst({
                        where: {
                            id: +personaEnMensaje.id
                        }
                    })
                    : yield db_1.prismaClient.persona.create({
                        data: personaEnMensaje
                    });
                if (!persona) {
                    return db_1.DBErrorController.getInternalError(persona_1.Persona.name);
                }
                const mensaje = yield db_1.prismaClient.mensaje.create({
                    data: {
                        asunto: data.asunto,
                        descripcion: data.descripcion,
                        personaId: persona.id
                    },
                });
                return mensaje;
            }
            catch (error) {
                return db_1.DBErrorController.getDBError(this.name, error);
            }
        });
    }
    static getById(id, includeInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const mensaje = yield db_1.prismaClient.mensaje.findFirst({
                where: {
                    id: id
                },
                include: {
                    persona: includeInfo.persona,
                }
            });
            if (!mensaje) {
                return db_1.DBErrorController.getNotFoundDBError('Mensaje no encontrado');
            }
            return mensaje;
        });
    }
    static get(whereProperties = {}, includeInfo = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mensajes = yield db_1.prismaClient.mensaje.findMany({
                    where: whereProperties,
                    include: {
                        persona: includeInfo.persona,
                    }
                });
                if (mensajes.length == 0) {
                    return db_1.DBErrorController.getNotFoundDBError('No se encontraron mensajes que coincidan con el criterio');
                }
                return mensajes;
            }
            catch (error) {
                return db_1.DBErrorController.getDBError(this.name, error);
            }
        });
    }
    static update(id, overwritePropertiesValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const mensaje = yield db_1.prismaClient.mensaje.update({
                where: {
                    id: id
                },
                data: overwritePropertiesValues
            });
            if (!mensaje) {
                return db_1.DBErrorController.getNotFoundDBError('Mensaje no encontrado');
            }
            return mensaje;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const mensaje = yield db_1.prismaClient.mensaje.delete({
                where: {
                    id: id
                }
            });
            if (!mensaje) {
                return db_1.DBErrorController.getNotFoundDBError('Persona no encontrada');
            }
            return mensaje;
        });
    }
    static deleteGroup(whereProperties) {
        return __awaiter(this, void 0, void 0, function* () {
            const mensajes = yield db_1.prismaClient.mensaje.delete({
                where: whereProperties
            });
            return mensajes;
        });
    }
}
exports.Mensaje = Mensaje;
