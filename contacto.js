
const ajaxController = new AJAXController();

const enviarGmail = document.querySelector('.enviar-gmail')
const alertContainer = document.querySelector('.alert-container')
const telefono = document.querySelector("#telefono")
const email = document.querySelector("#email")
const descripcion = document.querySelector("#descripcion")
const nombre = document.querySelector("#name")
const asunto = document.querySelector("#asunto")

//Spinner
const spinnerContainer = document.querySelector(".spinner")
const spinner = document.querySelector(".lds-heart")

/*Funcionalidad Botones */

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
    }, "700");
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



const sendEmail = e => {
    e.preventDefault()
    let entity = "mensaje"

    //Expresiones regulares

   let erEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
   let erNombreYApellido = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/ 
   let erNumero = /^[0-9]+$/

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

    if(asunto.value.trim().length == 0){
        showAlert("El campo 'Asunto' es obligatorio")
        renderErrorAlert()    
        asunto.classList.add('error')
        setTimeout(()=>{
            asunto.classList.remove('error')
        },"2000") 
        return     
    }
    if(descripcion.value.trim().length == 0){
        showAlert("El campo 'Descripción' es obligatorio")
        renderErrorAlert()    
        descripcion.classList.add('error')
        setTimeout(()=>{
            descripcion.classList.remove('error')
        },"2000") 
        return     
    }
    

    let data = {
        "persona":{
            "nombre":nombre.value,
            "email": email.value,
            "telefono":telefono.value
        },
        "asunto":asunto.value,
        "descripcion": descripcion.value
    }

    ajaxController.create(entity, data).then( () => {
        showAlert("Se envio su mensaje con éxito")
        renderAlert()
        spinnerActive()
        setTimeout(()=>{
            spinnerDeactive()
           window.location.assign("index.html")
        },"4000")
    }, ()=> {
        showAlert("Ocurrio un error al enviar")
        renderErrorAlert() 
    })

    
    
    
}


const init = () => {
    enviarGmail.addEventListener('click', sendEmail)
}

init();