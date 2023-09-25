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
exports.UsuarioController = void 0;
const persona_1 = require("../models/persona");
const db_1 = require("../utils/db");
class UsuarioController {
    static getSession(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = request.body;
            if (!this.areDataFieldsUserAllowed(data)) {
                return response.status(400).json({ error: "Falta o sobran campos en la peticion. Solo se aceptaran los campos 'data' y 'password'. Ambos deben incluirse en la peticion" });
            }
            if (this.isUsuarioEmpty(data)) {
                return response.status(400).json({ error: "Usuario esta vacio. Complete el valor antes de reintentar nuevamente" });
            }
            if (this.isPasswordEmpty(data)) {
                return response.status(400).json({ error: "Password esta vacio. Complete el valor antes de reintentar nuevamente" });
            }
            let usuario = yield persona_1.Persona.get(data);
            if (usuario instanceof db_1.DBError) {
                if (db_1.DBHTTPDict[usuario.error] == 404) {
                    return response.status(403).json({ error: "Usuario y/o contraseñas incorrectos. Intente nuevamente" });
                }
                return response.status(db_1.DBHTTPDict[usuario.error]).json({ error: usuario.details });
            }
            return response.status(200).json(usuario);
        });
    }
    static areDataFieldsUserAllowed(data) {
        return JSON.stringify(Object.keys(data).sort().reverse()) === JSON.stringify(this.ONLY_ALLOWED_DATA_USER_FIELDS);
    }
    static isUsuarioEmpty(data) {
        return data.usuario.trim().length == 0;
    }
    static isPasswordEmpty(data) {
        return data.password.trim().length == 0;
    }
}
exports.UsuarioController = UsuarioController;
UsuarioController.ONLY_ALLOWED_DATA_USER_FIELDS = ['usuario', 'password'];
