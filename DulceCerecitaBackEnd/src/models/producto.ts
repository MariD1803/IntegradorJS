import {Model} from './model'
import {prismaClient, DBErrorController} from '../utils/db'

export abstract class Producto extends Model{

    entity = "producto"
    
    static async create(data:any): Promise<any> {
        try{
            const producto = await prismaClient.producto.create({data:data})
            return producto
        }catch(error){
            return DBErrorController.getDBError(this.name,error)
        }
    }

    static async getById(id:number): Promise<any> {
        const producto = await prismaClient.producto.findFirst({
            where: {
                id:id
            }
        })
        if(!producto){
            return DBErrorController.getNotFoundDBError('Producto no encontrado')
        }
        return producto
    }

    static async get(whereProperties:any = {}): Promise<any>{
        try{
            const productos = await prismaClient.producto.findMany({
                where: whereProperties
            })
            if(productos.length==0){
                return DBErrorController.getNotFoundDBError('No se encontraron productos que coincidan con el criterio')
            }
            return productos
        }catch(error){
            return DBErrorController.getDBError(this.name,error)
        }
    }

    static async update(id:number,overwritePropertiesValues:any): Promise<any>{
        const producto = await prismaClient.producto.update({
            where: {
                id: id
            },
            data: overwritePropertiesValues
        })
        if(!producto){
            return DBErrorController.getNotFoundDBError('Producto no encontrado')
        }
        return producto
    }

    static async delete(id:number): Promise<any>{
        const producto = await prismaClient.producto.delete({
            where: {
                id: id
            }
        })
        if(!producto){
            return DBErrorController.getNotFoundDBError('Producto no encontrado')
        }
        return producto
    }
}