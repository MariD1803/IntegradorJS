const ajaxController = new AJAXController();

const usuario = document.querySelector("#user")
const password = document.querySelector("#password")
const buttonLogin = document.querySelector("#button-login")

const alertContainer = document.querySelector('.alert-container')
//Spinner
const spinnerContainer = document.querySelector(".spinner")
const spinner = document.querySelector(".lds-heart")

const login = (data = {}) => {
    entity = "usuario"
    return ajaxController.get(entity,data)
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

const renderErrorAlert = () => {
    alertContainer.classList.remove('hidden')
    alertContainer.classList.add('active-error')
    setTimeout(() => {        
        alertContainer.classList.remove('active-error')
        alertContainer.classList.add('animation')
        alertContainer.classList.add('hidden')
    }, "2000");
}




const sendUser = e => {
    e.preventDefault()
    

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
    let data = {
        "usuario":usuario.value,
        "password": password.value
    }

    login(data).then( (response) => {
        
        localStorage.setItem('usuario', JSON.stringify(response));
        showAlert("Se logueo el usuario con éxito")
        renderAlert()
        spinnerActive()
       

        setTimeout(()=>{
            spinnerDeactive()
           window.location.assign("index.html")
        },"4000")

    }, (error)=> {
        showAlert(error.response.data.error)
        renderErrorAlert() 
    })

    
    
    
}


const init = () => {
    buttonLogin.addEventListener('click', sendUser)
}

init();