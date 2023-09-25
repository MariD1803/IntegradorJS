import {Model} from './model'
import {prismaClient, DBErrorController, DBError} from '../utils/db'

export abstract class Persona extends Model{

    entity = "persona"
    
    static async create(data:any): Promise<any> {
        try{
            const persona = await prismaClient.persona.create({data:data})
            return persona
        }catch(error){
            return DBErrorController.getDBError(this.name,error)
        }
    }

    static async getById(id:number): Promise<any> {
        const persona = await prismaClient.persona.findFirst({
            where: {
                id:id
            }
        })
        if(!persona){
            return DBErrorController.getNotFoundDBError('Persona no encontrada')
        }
        return persona
    }

    static async get(whereProperties:any = {}): Promise<any>{
        try{
            const personas = await prismaClient.persona.findMany({
                where: whereProperties
            })
            if(personas.length==0){
                return DBErrorController.getNotFoundDBError('No se encontraron personas que coincidan con el criterio')
            }
            return personas
        }catch(error){
            return DBErrorController.getDBError(this.name,error)
        }
    }

    static async update(id:number,overwritePropertiesValues:any): Promise<any>{
        const persona = await prismaClient.persona.update({
            where: {
                id: id
            },
            data: overwritePropertiesValues
        })
        if(!persona){
            return DBErrorController.getNotFoundDBError('Persona no encontrada')
        }
        return persona
    }

    static async delete(id:number): Promise<any>{
        const persona = await prismaClient.persona.delete({
            where: {
                id: id
            }
        })
        if(!persona){
            return DBErrorController.getNotFoundDBError('Persona no encontrada')
        }
        return persona
    }

    static async getId(whereProperties:any = {}): Promise<any>{
        let result
        try{
            if(whereProperties.id != undefined){
                result = await this.getById(whereProperties.id)            
            }else{
                result = await this.get(whereProperties)
            }
            if(result instanceof DBError){
                return result
            }
            if(result instanceof Array){
                result = result[0]
            }
            return result.id
        } catch(error) {
            return DBErrorController.getDBError(this.name,error)
        }
        
    }
}