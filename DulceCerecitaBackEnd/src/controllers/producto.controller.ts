import {Producto} from '../models/producto'
import {HTTPErrorMessageDict} from "../utils/http"
import {DBError, DBHTTPDict} from "../utils/db"
import {ModelController} from "./model.controller"


export abstract class ProductoController extends ModelController{

    static async add(request:any,response:any){
        const result = await Producto.create(request.body)
        if (result instanceof (DBError)){
            return response.status(DBHTTPDict[result.error]).json({error:result.details})
        }
        response.json(result)
    }

    static async retrieveById(request:any,response:any){
        const id = +request.params.id
        if(isNaN(id)){
            return response.status(400).json({error:HTTPErrorMessageDict.idMustBeNumericErrorMsg})
        }
        const result = await Producto.getById(id)
        if (result instanceof (DBError)){
            return response.status(DBHTTPDict[result.error]).json({error:result.details})
        }
        return response.json(result)
    }

    static async retrieve(request:any,response:any){
        const result = await Producto.get(request.body)

        if (result instanceof (DBError)){
            return response.status(DBHTTPDict[result.error]).json({error:result.details})
        }
        response.json(result)
    }

    static async modify(request:any,response:any){
        const id = +request.params.id
        if(isNaN(id)){
            return response.status(400).json({error:HTTPErrorMessageDict.idMustBeNumericErrorMsg})
        }
        const dataToUpdate = request.body
        const result = await Producto.update(id,dataToUpdate)
        if (result instanceof (DBError)){
            return response.status(DBHTTPDict[result.error]).json({error:result.details})
        }
        return response.json(result)
    }

    static async supress(request:any,response:any){
        const id = +request.params.id
        if(isNaN(id)){
            return response.status(400).json({error:HTTPErrorMessageDict.idMustBeNumericErrorMsg})
        }
        const result = await Producto.delete(id)
        if (result instanceof (DBError)){
            return response.status(DBHTTPDict[result.error]).json({error:result.details})
        }
        return response.json(result)
    }

}