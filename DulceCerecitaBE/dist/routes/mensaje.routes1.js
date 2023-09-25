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
const express_1 = require("express");
const db_1 = require("../utils/db");
const router = (0, express_1.Router)();
router.put('/mensaje', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const personaEnMensaje = request.body.persona;
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
        return response.status(500).json({ error: 'Error Interno, no se pudo generar el mensaje' });
    }
    const newMensaje = yield db_1.prismaClient.mensaje.create({
        data: {
            asunto: request.body.asunto,
            descripcion: request.body.descripcion,
            personaId: persona.id
        },
    });
    response.json(newMensaje);
}));
router.get('/mensaje', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const mensajes = yield db_1.prismaClient.mensaje.findMany();
    response.json(mensajes);
}));
router.get('/mensaje/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const necesitaInfoPersona = request.body.includePersonaInfo ? true : false;
    const mensaje = yield db_1.prismaClient.mensaje.findFirst({
        where: {
            id: +request.params.id
        },
        include: {
            persona: necesitaInfoPersona
        }
    });
    if (!mensaje)
        return response.status(404).json({ error: 'Mensaje no encontrado' });
    return response.json(mensaje);
}));
exports.default = router;
