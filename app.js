const ajaxController = new AJAXController();

const addPersona = () => {
    entity = "persona"
    data = {
        "nombre":"Ignacio",
        "apellido":"Aramburu",
        "email": "ignaciomatiasaramburudeveloper0001110111110@gmail.com",
        "direccion": "San Martin 783",
        "telefono":"11111111"
    }
    ajaxController.create(entity,data).then(
        async (response)=>{
            console.log(response.data)
        },
        async (error) => {
            
            console.log(error)
        }
    )
}

const getPersonas = () => {
    entity = "persona"
    data = {
        "apellido":"Aramburu"
    }
    ajaxController.get(entity,data).then(
        async (response)=>{
           
            console.log(response.data)
        },
        async (error) => {
            
            console.log(error)
        }
    )
}

const getPersonaById = () => {
    entity = "persona"
    data = {}
    id = 1
    ajaxController.getById(entity,id,data).then(
        async (response)=>{
           
            console.log(response.data)
        },
        async (error) => {
            
            console.log(error)
        }
    )
}


const addProducto = () => {
    entity = "producto"
    data = {
        "descripcion":"Tarta Frutilla",
        "precio":10
    }
    ajaxController.create(entity,data).then(
        async (response)=>{
           
            console.log(response.data)
        },
        async (error) => {
            
            console.log(error)
        }
    )
}

const getProductos = () => {
    entity = "producto"
    data = {}
    ajaxController.get(entity,data).then(
        async (response)=>{
        
            console.log(response.data)
        },
        async (error) => {
            
            console.log(error)
        }
    )
}

const getProductoById = () => {
    entity = "producto"
    data = {}
    id = 1
    ajaxController.getById(entity,id,data).then(
        async (response)=>{
            
            console.log(response.data)
        },
        async (error) => {
            
            console.log(error)
        }
    )
}



const addOrden = () => {
    entity = "orden"
    data = {
        "personaId":4,
        "montoTotal":200.23,
        "lineasOrden":[
            {
                "productoId":1,
                "cantidad": 2,
                "subtotal":20
            },
            {
                "productoId":3,
                "cantidad": 10,
                "subtotal":200
            }
        ]
    }
    ajaxController.create(entity,data).then(
        async (response)=>{
           
            console.log(response.data)
        },
        async (error) => {
            
            console.log(error)
        }
    )
}

const getOrdenes = () => {
    entity = "orden"
    data = {
        "persona":{
            "apellido":"Aramburu"
        },
        "include":{
            "persona":true,
            "producto":false
        }
    }
    ajaxController.get(entity,data).then(
        async (response)=>{
           
            console.log(response.data)
        },
        async (error) => {
            
            console.log(error)
        }
    )
}

const getOrdenById = () => {
    entity = "orden"
    data = {
        "include":{
            "persona":true,
            "producto":true
        }
    }
    id = 4
    ajaxController.getById(entity,id,data).then(
        async (response)=>{
           
            console.log(response.data)
        },
        async (error) => {
            
            console.log(error)
        }
    )
}

(() => {
    addPersona()
})()
