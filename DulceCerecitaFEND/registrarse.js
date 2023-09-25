
const ajaxController = new AJAXController();

const usuario = document.querySelector("#user")
const password = document.querySelector("#password")
const nombre = document.querySelector("#nombre")
const apellido = document.querySelector("#apellido")
const email = document.querySelector("#email")
const dni = document.querySelector("#dni")
const telefono = document.querySelector("#telefono")
const registrarsePerson = document.querySelector("#registrarse-person")
const alertContainer =document.querySelector(".alert-container")
//Spinner
const spinnerContainer = document.querySelector(".spinner")
const spinner = document.querySelector(".lds-heart")



//Spinner 


const spinnerActive =()=> {
    setTimeout(()=>{
       spinnerContainer.classList.add("lds-heart-active")
       spinnerContainer.classList.remove('hidden')
       spinner.classList.remove('hidden')

    },"2100")
}

const spinnerDeactive = () => {
    setTimeout(()=>{
        spinnerContainer.classList.remove("lds-heart-active")
        spinnerContainer.classList.add('hidden')
        spinner.classList.add('hidden')
    },"900")
}

const showAlert = (message) => {
    alertContainer.textContent = message
}

const renderAlert = () => {
    alertContainer.classList.remove('hidden')
    alertContainer.classList.add('active')
    setTimeout(() => {        
        alertContainer.classList.remove('active')
        alertContainer.classList.add('animation')
        alertContainer.classList.add('hidden')
    }, "2000");
}
const renderErrorAlert = () => {
    alertContainer.classList.remove('hidden')
    alertContainer.classList.add('active-error')
    setTimeout(() => {        
        alertContainer.classList.remove('active-error')
        alertContainer.classList.add('animation')
        alertContainer.classList.add('hidden')
    }, "2000");
}

const sendPerson = e => {
    e.preventDefault()
    let entity = "persona"

    //Expresiones regulares

   let erEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
   let erNombreYApellido = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/ 
   let erNumero = /^[0-9]+$/

    if(usuario.value.trim().length == 0){
        showAlert("El campo 'Usuario' es obligatorio")
        renderErrorAlert()    
        usuario.classList.add('error')
        setTimeout(()=>{
            usuario.classList.remove('error')
        },"2000")
        return     
    }

    if(password.value.trim().length == 0){ 
        showAlert("El campo 'Contraseña' es obligatorio")
        renderErrorAlert()    
        password.classList.add('error')
        setTimeout(()=>{
            password.classList.remove('error')
        },"2000")
        return     
    }

    if(nombre.value.trim().length == 0){
        showAlert("El campo 'Nombre' es obligatorio")
        renderErrorAlert()  
        nombre.classList.add('error')
        setTimeout(()=>{
            nombre.classList.remove('error')
        },"2000")  
        return     
    }
    if(!erNombreYApellido.test(nombre.value)){
        showAlert("El valor del nombre no es válido")
        renderErrorAlert()  
        nombre.classList.add('error')
        setTimeout(()=>{
            nombre.classList.remove('error')
        },"2000")  
        return     
    }

    if(apellido.value.trim().length == 0){
        showAlert("El campo 'Apellido' es obligatorio")
        renderErrorAlert()
        apellido.classList.add('error')
        setTimeout(()=>{
            apellido.classList.remove('error')
        },"2000")    
        return     
    }
    if(!erNombreYApellido.test(apellido.value)){
        showAlert("El valor del apellido no es válido")
        renderErrorAlert()
        apellido.classList.add('error')
        setTimeout(()=>{
            apellido.classList.remove('error')
        },"2000")      
        return     
    }

    if(email.value.trim().length == 0){
        showAlert("El campo 'Email' es obligatorio")
        renderErrorAlert() 
        email.classList.add('error')
        setTimeout(()=>{
            email.classList.remove('error')
        },"2000")     
        return     
    }
    if(!erEmail.test(email.value)){
        showAlert("El valor del Email no es válido")
        renderErrorAlert() 
        email.classList.add('error')
        setTimeout(()=>{
            email.classList.remove('error')
        },"2000")   
        return     
    }

    if(dni.value.trim().length == 0){
        showAlert("El campo 'DNI' es obligatorio")
        renderErrorAlert()
        dni.classList.add('error')
        setTimeout(()=>{
            dni.classList.remove('error')
        },"2000")    
        return     
    }
    if(!erNumero.test(dni.value)){
        showAlert("El valor del DNI debe ser un número")
        renderErrorAlert() 
        dni.classList.add('error')
        setTimeout(()=>{
            dni.classList.remove('error')
        },"2000")    
        return     
    }

    if(telefono.value.trim().length == 0){
        showAlert("El campo 'Teléfono' es obligatorio")
        renderErrorAlert()    
        telefono.classList.add('error')
        setTimeout(()=>{
            telefono.classList.remove('error')
        },"2000") 
        return     
    }
    if(!erNumero.test(telefono.value)){
        showAlert("El valor del teléfono debe ser un número")
        renderErrorAlert() 
        telefono.classList.add('error')
        setTimeout(()=>{
            telefono.classList.remove('error')
        },"2000")   
        return     
    }


    let data = {
        "usuario":usuario.value,
        "password": password.value,
        "nombre":nombre.value,
        "apellido":apellido.value,
        "email": email.value,
        "dni": dni.value,
        "telefono":telefono.value
    }

    ajaxController.create(entity, data).then( () => {
        showAlert("Se creo el usuario con éxito")
        renderAlert()
        spinnerActive()
       

        setTimeout(()=>{
            spinnerDeactive()
           window.location.assign("ingresar.html")
        },"4000")
    }, ()=> {
        showAlert("Ocurrio un error al crear el usuario")
        renderAlert() 
    })

    
    
    
}


const init = () => {
    registrarsePerson.addEventListener('click', sendPerson)
}

init();