import {PrismaClient, Prisma} from '@prisma/client'

const prismaClient = new PrismaClient()

class DBError{
    error:string
    details:string

    constructor(error:string, details:string,target? :any){
        this.error = error
        this.details = details
    }
}

interface DictInterface{
    [key: string]: number;
}


const DBHTTPDict: DictInterface = {
    duplicatedUnique:409,
    notFound:404,
    missingField:400,
    notField:400,
    internalError:500
}

abstract class DBErrorController {
    static getDBError(entity:string,error:any):DBError{
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && error.meta !=undefined) {
                const errorTarget = error.meta.target
                return new DBError(
                    "duplicatedUnique",
                    `El valor del campo '${errorTarget}' ya existe para otro registro en ${entity} y no puede repetirse`,
                )
            }
        }
        let stringError = String(error)
        if(stringError.indexOf('is missing')!=-1){
            const errorTarget = stringError.slice(stringError.indexOf('Argument')+10,-13)
            return new DBError(
                "missingField",
                `El valor del campo '${errorTarget}' en ${entity} no esta asignado en los datos ingresados`,
            )
        }
        if(stringError.indexOf('Unknown argument')!=-1){
            const errorTarget = stringError.slice(stringError.indexOf('Unknown argument')+18,stringError.indexOf('Did')-3)
            return new DBError(
                "notField",
                `No existe en ${entity} un campo '${errorTarget}'`,
            )
        }
        return DBErrorController.getInternalError(entity)
    }

    static getInternalError(entity:string):DBError{
        return new DBError('internalError','Ocurrio un error interno al procesar los datos de '+entity)
    }

    static getNotFoundDBError(textMessage:any):DBError{
        return new DBError('notFound',textMessage)
    }
}

export {prismaClient, Prisma, DBError, DBHTTPDict, DBErrorController}

