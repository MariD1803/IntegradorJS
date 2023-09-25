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
exports.MensajeController = void 0;
const persona_1 = require("../models/persona");
const mensaje_1 = require("../models/mensaje");
const http_1 = require("../utils/http");
const db_1 = require("../utils/db");
const model_controller_1 = require("./model.controller");
class MensajeController extends model_controller_1.ModelController {
    static add(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mensaje_1.Mensaje.create(request.body);
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
            const includeInfo = request.body.include || {};
            delete request.body.include;
            const result = yield mensaje_1.Mensaje.getById(id, includeInfo);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            return response.json(result);
        });
    }
    static retrieve(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const personaProperties = request.body.persona;
            if (personaProperties != undefined) {
                const personaIdResult = yield persona_1.Persona.getId(personaProperties);
                if (personaIdResult instanceof (db_1.DBError)) {
                    return response.status(db_1.DBHTTPDict[personaIdResult.error]).json({ error: personaIdResult.details });
                }
                request.body.personaId = personaIdResult;
                delete request.body.persona;
            }
            const includeInfo = request.body.include || {};
            delete request.body.include;
            const result = yield mensaje_1.Mensaje.get(request.body, includeInfo);
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
            const result = yield mensaje_1.Mensaje.update(id, dataToUpdate);
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
            const result = yield mensaje_1.Mensaje.delete(id);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            return response.json(result);
        });
    }
}
exports.MensajeController = MensajeController;
