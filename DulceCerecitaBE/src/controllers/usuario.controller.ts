
import {Persona} from '../models/persona'
import {HTTPErrorMessageDict} from "../utils/http"
import {DBError, DBHTTPDict} from "../utils/db"

export abstract class UsuarioController{
    
    static ONLY_ALLOWED_DATA_USER_FIELDS = ['usuario','password']

    static async getSession(request:any, response:any){
        let data = request.body
        if(!this.areDataFieldsUserAllowed(data)){
            return response.status(400).json({error:"Falta o sobran campos en la peticion. Solo se aceptaran los campos 'data' y 'password'. Ambos deben incluirse en la peticion"})
        }
        if(this.isUsuarioEmpty(data)){
            return response.status(400).json({error:"Usuario esta vacio. Complete el valor antes de reintentar nuevamente"})
        }
        if(this.isPasswordEmpty(data)){
            return response.status(400).json({error:"Password esta vacio. Complete el valor antes de reintentar nuevamente"})
        }
        let usuario = await Persona.get(data)
        if(usuario instanceof DBError){
            if (DBHTTPDict[usuario.error] == 404){
                return response.status(403).json({error:"Usuario y/o contraseñas incorrectos. Intente nuevamente"})
            }
            return response.status(DBHTTPDict[usuario.error]).json({error:usuario.details})
        }
        return response.status(200).json(usuario)
    }

    static areDataFieldsUserAllowed(data:any):boolean{
        return JSON.stringify(Object.keys(data).sort().reverse()) === JSON.stringify(this.ONLY_ALLOWED_DATA_USER_FIELDS)
    }
    
    static isUsuarioEmpty(data:any):boolean{
        return data.usuario.trim().length == 0 
    }

    static isPasswordEmpty(data:any):boolean{
        return data.password.trim().length == 0
    }

}