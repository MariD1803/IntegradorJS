import {Orden} from '../models/orden'
import {Persona} from '../models/persona'
import {HTTPErrorMessageDict} from "../utils/http"
import {DBError, DBHTTPDict} from "../utils/db"
import {ModelController} from "./model.controller"


export abstract class OrdenController extends ModelController{

    static async add(request:any,response:any){
        const result = await Orden.create(request.body)
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
        const includeInfo = request.body.include || {}
        delete request.body.include
        const result = await Orden.getById(id,includeInfo)
        if (result instanceof (DBError)){
            return response.status(DBHTTPDict[result.error]).json({error:result.details})
        }
        return response.json(result)
    }

    static async retrieve(request:any,response:any){
        const personaProperties = request.body.persona
        const includeInfo = request.body.include || {}
        delete request.body.include
        let result: Record<string, any> = {}
        if(personaProperties != undefined){
            const personaResult = await Persona.get(personaProperties)
            if (personaResult instanceof (DBError)){
                return response.status(DBHTTPDict[personaResult.error]).json({error:personaResult.details})
            }
            request.body.personaId = personaResult[0].id
            delete request.body.persona
            if(includeInfo.persona == true){
                includeInfo.persona = false
                result.persona = personaResult[0]
            } else{
                result.persona = {}
                result.persona.id = personaResult[0].id
            }
        }
        result.orden = await Orden.get(request.body,includeInfo)
        if (result instanceof (DBError)){
            return response.status(DBHTTPDict[result.error]).json({error:result.details})
        }
        if (result.orden instanceof (DBError)){
            return response.status(DBHTTPDict[result.orden.error]).json({error:result.orden.details})
        }
        if(result.hasOwnProperty('persona')){
            result.orden.map((linea:any) => {delete linea.personaId})
        }
        response.json(result)
    }

}