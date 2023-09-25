"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBErrorController = exports.DBHTTPDict = exports.DBError = exports.Prisma = exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return client_1.Prisma; } });
const prismaClient = new client_1.PrismaClient();
exports.prismaClient = prismaClient;
class DBError {
    constructor(error, details, target) {
        this.error = error;
        this.details = details;
    }
}
exports.DBError = DBError;
const DBHTTPDict = {
    duplicatedUnique: 409,
    notFound: 404,
    missingField: 400,
    notField: 400,
    internalError: 500
};
exports.DBHTTPDict = DBHTTPDict;
class DBErrorController {
    static getDBError(entity, error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && error.meta != undefined) {
                const errorTarget = error.meta.target;
                return new DBError("duplicatedUnique", `El valor del campo '${errorTarget}' ya existe para otro registro en ${entity} y no puede repetirse`);
            }
        }
        let stringError = String(error);
        if (stringError.indexOf('is missing') != -1) {
            const errorTarget = stringError.slice(stringError.indexOf('Argument') + 10, -13);
            return new DBError("missingField", `El valor del campo '${errorTarget}' en ${entity} no esta asignado en los datos ingresados`);
        }
        if (stringError.indexOf('Unknown argument') != -1) {
            const errorTarget = stringError.slice(stringError.indexOf('Unknown argument') + 18, stringError.indexOf('Did') - 3);
            return new DBError("notField", `No existe en ${entity} un campo '${errorTarget}'`);
        }
        return DBErrorController.getInternalError(entity);
    }
    static getInternalError(entity) {
        return new DBError('internalError', 'Ocurrio un error interno al procesar los datos de ' + entity);
    }
    static getNotFoundDBError(textMessage) {
        return new DBError('notFound', textMessage);
    }
}
exports.DBErrorController = DBErrorController;
