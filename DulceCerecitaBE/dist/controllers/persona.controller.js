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
exports.PersonaController = void 0;
const persona_1 = require("../models/persona");
const http_1 = require("../utils/http");
const db_1 = require("../utils/db");
const model_controller_1 = require("./model.controller");
class PersonaController extends model_controller_1.ModelController {
    static add(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield persona_1.Persona.create(request.body);
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
            const result = yield persona_1.Persona.getById(id);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            return response.json(result);
        });
    }
    static retrieve(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield persona_1.Persona.get(request.body);
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
            const result = yield persona_1.Persona.update(id, dataToUpdate);
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
            const result = yield persona_1.Persona.delete(id);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            return response.json(result);
        });
    }
}
exports.PersonaController = PersonaController;
