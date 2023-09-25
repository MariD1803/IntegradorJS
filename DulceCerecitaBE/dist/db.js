"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return client_1.Prisma; } });
const prismaClient = new client_1.PrismaClient();
exports.prismaClient = prismaClient;
