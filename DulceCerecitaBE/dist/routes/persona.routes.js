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
const persona_controller_1 = require("../controllers/persona.controller");
const router = (0, express_1.Router)();
router.put('/persona', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return persona_controller_1.PersonaController.add(request, response); }));
router.post('/persona', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return persona_controller_1.PersonaController.retrieve(request, response); }));
router.post('/persona/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return persona_controller_1.PersonaController.retrieveById(request, response); }));
router.patch('/persona/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return persona_controller_1.PersonaController.modify(request, response); }));
router.delete('/persona/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return persona_controller_1.PersonaController.supress(request, response); }));
exports.default = router;
