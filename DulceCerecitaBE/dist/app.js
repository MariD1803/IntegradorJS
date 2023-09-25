"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const persona_routes_1 = __importDefault(require("./routes/persona.routes"));
const mensaje_routes_1 = __importDefault(require("./routes/mensaje.routes"));
const orden_routes_1 = __importDefault(require("./routes/orden.routes"));
const producto_routes_1 = __importDefault(require("./routes/producto.routes"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const app = (0, express_1.default)();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(express_1.default.json());
app.use(allowCrossDomain);
app.use('/api', persona_routes_1.default);
app.use('/api', mensaje_routes_1.default);
app.use('/api', orden_routes_1.default);
app.use('/api', producto_routes_1.default);
app.use('/api', usuario_routes_1.default);
app.listen(3000);
console.log("Server on port", 3000);
