
class AJAXController{
    API_PORT = 3000
    API_URL = `http://127.0.0.1:${this.API_PORT}`

    entities = ['persona','mensaje','orden','producto','usuario']

    forbiddenModificationEntities = ['orden']

    checkIfEntityInAllowed(entity){
        return this.entities.includes(entity)
    }    

    checkIfEntityInForbiddenModificationEntities(entity){
        return this.forbiddenModificationEntities.includes(entity)
    }

    async create(entity,data){
        if(!this.checkIfEntityInAllowed(entity)){
            return `${entity} no es una entidad permitida`
        }
        return axios({
            method: 'put',
            url: `${this.API_URL}/api/${entity}`,
            data: data
        })
    }

    async get(entity,data){
        if(!this.checkIfEntityInAllowed(entity)){
            return `${entity} no es una entidad permitida`
        }
        data = data
        return axios({
            method: 'post',
            url: `${this.API_URL}/api/${entity}`,
            data: data
        })
    }

    async getById(entity,id,includeInfo){
        if(!this.checkIfEntityInAllowed(entity)){
            return `${entity} no es una entidad permitida`
        }
        if(isNaN(id)){
            return 'id debe ser un numero'
        }
        data = includeInfo
        return axios({
            method: 'post',
            url: `${this.API_URL}/api/${entity}/${id}`,
            data: data
        })
    }

    async update(entity,id){
        if(!this.checkIfEntityInAllowed(entity)){
            return `${entity} no es una entidad permitida`
        }
        if(isNaN(id)){
            return 'id debe ser un numero'
        }
        if(this.checkIfEntityInForbiddenModificationEntities(entity)){
            return `no esta permitida esta operacion en ${entity}`
        }
        return axios({
            method: 'patch',
            url: `${this.API_URL}/api/${entity}/${id}`,
            data: data
        })
    }

    async delete(entity,id){
        if(!this.checkIfEntityInAllowed(entity)){
            return `${entity} no es una entidad permitida`
        }
        if(isNaN(id)){
            return 'id debe ser un numero'
        }
        if(this.checkIfEntityInForbiddenModificationEntities(entity)){
            return `no esta permitida esta operacion en ${entity}`
        }
        return axios({
            method: 'delete',
            url: `${this.API_URL}/api/${entity}/${id}`,
        })
    }
}