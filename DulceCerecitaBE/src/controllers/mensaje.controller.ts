import {Persona} from '../models/persona'
import {Mensaje} from '../models/mensaje'
import {HTTPErrorMessageDict} from "../utils/http"
import {DBError, DBHTTPDict} from "../utils/db"
import {ModelController} from "./model.controller"


export abstract class MensajeController extends ModelController{

    static async add(request:any,response:any){
        const result = await Mensaje.create(request.body)
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
        const result = await Mensaje.getById(id,includeInfo)
        if (result instanceof (DBError)){
            return response.status(DBHTTPDict[result.error]).json({error:result.details})
        }
        return response.json(result)
    }

    static async retrieve(request:any,response:any){
        const personaProperties = request.body.persona
        if(personaProperties != undefined){
            const personaIdResult = await Persona.getId(personaProperties)
            if (personaIdResult instanceof (DBError)){
                return response.status(DBHTTPDict[personaIdResult.error]).json({error:personaIdResult.details})
            }
            request.body.personaId = personaIdResult
            delete request.body.persona
        }
        const includeInfo = request.body.include || {}
        delete request.body.include
        const result = await Mensaje.get(request.body,includeInfo)
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
        const result = await Mensaje.update(id,dataToUpdate)
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
        const result = await Mensaje.delete(id)
        if (result instanceof (DBError)){
            return response.status(DBHTTPDict[result.error]).json({error:result.details})
        }
        return response.json(result)
    }
}