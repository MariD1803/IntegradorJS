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
const venta_controller_1 = require("../controllers/venta.controller");
const router = (0, express_1.Router)();
router.put('/venta', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return venta_controller_1.VentaController.add(request, response); }));
router.get('/venta', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return venta_controller_1.VentaController.retrieve(request, response); }));
router.get('/venta/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return venta_controller_1.VentaController.retrieveById(request, response); }));
exports.default = router;
