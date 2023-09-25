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
exports.OrdenController = void 0;
const orden_1 = require("../models/orden");
const persona_1 = require("../models/persona");
const http_1 = require("../utils/http");
const db_1 = require("../utils/db");
const model_controller_1 = require("./model.controller");
class OrdenController extends model_controller_1.ModelController {
    static add(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield orden_1.Orden.create(request.body);
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
            const result = yield orden_1.Orden.getById(id, includeInfo);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            return response.json(result);
        });
    }
    static retrieve(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const personaProperties = request.body.persona;
            const includeInfo = request.body.include || {};
            delete request.body.include;
            let result = {};
            if (personaProperties != undefined) {
                const personaResult = yield persona_1.Persona.get(personaProperties);
                if (personaResult instanceof (db_1.DBError)) {
                    return response.status(db_1.DBHTTPDict[personaResult.error]).json({ error: personaResult.details });
                }
                request.body.personaId = personaResult[0].id;
                delete request.body.persona;
                if (includeInfo.persona == true) {
                    includeInfo.persona = false;
                    result.persona = personaResult[0];
                }
                else {
                    result.persona = {};
                    result.persona.id = personaResult[0].id;
                }
            }
            result.orden = yield orden_1.Orden.get(request.body, includeInfo);
            if (result instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.error]).json({ error: result.details });
            }
            if (result.orden instanceof (db_1.DBError)) {
                return response.status(db_1.DBHTTPDict[result.orden.error]).json({ error: result.orden.details });
            }
            if (result.hasOwnProperty('persona')) {
                result.orden.map((linea) => { delete linea.personaId; });
            }
            response.json(result);
        });
    }
}
exports.OrdenController = OrdenController;
