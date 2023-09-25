"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBErrorController = void 0;
const db_1 = require("../utils/db");
class DBErrorController {
    processError(entity, error) {
        if (error instanceof db_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && error.meta != undefined) {
                const errorTarget = error.meta.target;
                return new db_1.DBError("duplicatedUnique", `El valor del campo '${errorTarget}' ya existe para otro registro en ${entity} y no puede repetirse`);
            }
        }
        let stringError = String(error);
        if (stringError.indexOf('is missing') != -1) {
            const errorTarget = stringError.slice(stringError.indexOf('Argument') + 10, -13);
            return new db_1.DBError("missingField", `El valor del campo '${errorTarget}' en ${entity} no esta asignado en los datos ingresados`);
        }
        if (stringError.indexOf('Unknown argument') != -1) {
            const errorTarget = stringError.slice(stringError.indexOf('Unknown argument') + 18, stringError.indexOf('Did') - 3);
            return new db_1.DBError("notField", `No existe en ${entity} un campo '${errorTarget}'`);
        }
        return new db_1.DBError("internalError", `Ocurrio un error al procesar esta request en la base de datos`);
    }
}
exports.DBErrorController = DBErrorController;
