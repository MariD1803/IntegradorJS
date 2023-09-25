import {Model} from './model'
import {prismaClient, DBErrorController, DBError} from '../utils/db'

export abstract class Orden extends Model{

    entity = "orden"
    
    static async create(data:any): Promise<any> {
        try{
            if (data.lineasOrden != undefined){
                const aux = data.lineasOrden
                data.lineasOrden = {}
                data.lineasOrden.create = aux
            }
            const orden = await prismaClient.orden.create({data:data})
            return orden
        }catch(error){
            console.log(error)
            return DBErrorController.getDBError(this.name,error)
        }
    }

    static async getById(id:number, includeInfo:any): Promise<any> {
        const orden = await prismaClient.orden.findFirst({
            where: {
                id:id
            },
            include:{
                persona: includeInfo.persona,
                lineasOrden: {
                    include:{
                        producto:includeInfo.producto
                    }
                },
            }
        })
        if(!orden){
            return DBErrorController.getNotFoundDBError('Orden no encontrada')
        }
        return orden
    }

    static async get(whereProperties:any = {}, includeInfo:any = {}): Promise<any>{
        try{
            const ordenes = await prismaClient.orden.findMany({
                where: whereProperties,
                include:{
                    persona: includeInfo.persona,
                    lineasOrden: {
                        include:{
                            producto:includeInfo.producto
                        }
                    },
                }
            })
            if(ordenes.length==0){
                return DBErrorController.getNotFoundDBError('No se encontraron ordenes que coincidan con el criterio')
            }
            return ordenes
        }catch(error){
            return DBErrorController.getDBError(this.name,error)
        }
    }
}