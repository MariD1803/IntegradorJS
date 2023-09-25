import {Model} from './model'
import {Persona} from './persona'
import {prismaClient, DBErrorController} from '../utils/db'

export abstract class Mensaje extends Model{

    entity = "mensaje"
    
    static async create(data:any): Promise<any> {
        const personaEnMensaje = data.persona
        try{
            const persona = personaEnMensaje.hasOwnProperty("id")?
                await prismaClient.persona.findFirst({
                    where:{
                        id: +personaEnMensaje.id
                    }
                })
                :await prismaClient.persona.create({
                    data:personaEnMensaje
                })
            if(!persona){
                return DBErrorController.getInternalError(Persona.name)
            }
            const mensaje = await prismaClient.mensaje.create({
                data: {
                    asunto:data.asunto,
                    descripcion:data.descripcion,
                    personaId: persona.id
                },
            })
            return mensaje
        }catch(error){
            return DBErrorController.getDBError(this.name,error)
        }
    }

    static async getById(id:number, includeInfo: any): Promise<any> {
        const mensaje = await prismaClient.mensaje.findFirst({
            where: {
                id:id
            },
            include: {
                 persona: includeInfo.persona,
            }
        })
        if(!mensaje){
            return DBErrorController.getNotFoundDBError('Mensaje no encontrado')
        }
        return mensaje
    }

    static async get(whereProperties:any = {}, includeInfo: any = {}): Promise<any>{
        try{
            const mensajes = await prismaClient.mensaje.findMany({
                where: whereProperties,
                include: {
                    persona: includeInfo.persona,
                }
            })
            if(mensajes.length==0){
                return DBErrorController.getNotFoundDBError('No se encontraron mensajes que coincidan con el criterio')
            }
            return mensajes
        }catch(error){
            return DBErrorController.getDBError(this.name,error)
        }
    }

    static async update(id:number,overwritePropertiesValues:any): Promise<any>{
        const mensaje = await prismaClient.mensaje.update({
            where: {
                id: id
            },
            data: overwritePropertiesValues
        })
        if(!mensaje){
            return DBErrorController.getNotFoundDBError('Mensaje no encontrado')
        }
        return mensaje
    }

    static async delete(id:number): Promise<any>{
        const mensaje = await prismaClient.mensaje.delete({
            where: {
                id: id
            }
        })
        if(!mensaje){
            return DBErrorController.getNotFoundDBError('Persona no encontrada')
        }
        return mensaje
    }

    static async deleteGroup(whereProperties:any): Promise<any>{
        const mensajes = await prismaClient.mensaje.delete({
            where: whereProperties
        })
        return mensajes
    }
}