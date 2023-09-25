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
const producto_controller_1 = require("../controllers/producto.controller");
const router = (0, express_1.Router)();
router.put('/producto', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return producto_controller_1.ProductoController.add(request, response); }));
router.post('/producto', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return producto_controller_1.ProductoController.retrieve(request, response); }));
router.post('/producto/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return producto_controller_1.ProductoController.retrieveById(request, response); }));
router.patch('/producto/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return producto_controller_1.ProductoController.modify(request, response); }));
router.delete('/producto/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () { return producto_controller_1.ProductoController.supress(request, response); }));
exports.default = router;
