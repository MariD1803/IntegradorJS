
const enviarGmail = document.querySelector('.enviar-gmail')
const alertContainer = document.querySelector('.alert-container')

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


const sendEmail = e => {

    
    
    e.preventDefault();
    showAlert("Se envio su mensaje con éxito")
    renderAlert() 
}


const init = () => {
    enviarGmail.addEventListener('click', sendEmail)
}

init();