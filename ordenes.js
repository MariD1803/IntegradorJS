const ajaxController = new AJAXController();

const checkSeeOrders = document.querySelector('.button-see-orders')
const ordersContainer = document.querySelector('.orders-container')
const spaceInPage = document.querySelector(".space-in-page")

const alertContainer = document.querySelector('.alert-container')
//Spinner
const spinnerContainer = document.querySelector(".spinner")
const spinner = document.querySelector(".lds-heart")


//Spinner 


const spinnerActive =()=> {
    setTimeout(()=>{
       spinnerContainer.classList.add("lds-heart-active")
       spinnerContainer.classList.remove('hidden')
       spinner.classList.remove('hidden')

    },)
}

const spinnerDeactive = () => {
    setTimeout(()=>{
        spinnerContainer.classList.remove("lds-heart-active")
        spinnerContainer.classList.add('hidden')
        spinner.classList.add('hidden')
    },"900")
}






let user = JSON.parse(localStorage.getItem('usuario')) || null;

//Alertas
const renderErrorAlert = () => {
    alertContainer.classList.remove('hidden')
    alertContainer.classList.add('active-error')
    setTimeout(() => {        
        alertContainer.classList.remove('active-error')
        alertContainer.classList.add('animation')
        alertContainer.classList.add('hidden')
    }, "900");
}

const showAlert = (message) => {
    alertContainer.textContent = message
}



const renderProductOrden = ordenProduct => {
    const {producto, quantity, precio}= ordenProduct
    const {categoria, nombre, imagen}= producto

    
    return `
    
     <tr>
        <td class="text-center background-white"><img class="imagen-orden" src="${imagen}"></img></td>
        <td class="text-center background-white">${categoria}</td>
        <td class="text-center background-white">${nombre}</td>
        <td class="text-center background-white">${quantity}</td>
        <td class="text-center background-white">${precio}</td>
      </tr>
    
    `

}


const renderAllProductsInOrder = (productos) => {
    let orderProducts = ""
    for(product of productos){
        orderProducts = orderProducts + renderProductOrden(product)

    }
    return orderProducts
}

const calculateTotal = (productos) => {
    let total = 0
    for(product of productos){
        total = total + (product.precio * product.quantity)

    }
    return total
}





const renderOrden = (id, lineasOrden) => {
   

    return `


    <table border="1" class="table-container" >
        <tr >
            <th colspan="5" class="titulo-ordenes">Orden ${id}</th>
        </tr>

        <tr class="text-center background">
            <td class="order-rows">Imagen</td>
            <td class="order-rows">Articulo</td>
            <td class="order-rows">Sabor</td>
            <td class="order-rows">Catidad</td>
            <td class="order-rows">SubTotal</td>
        </tr>

        <tbody>
        
            ${renderAllProductsInOrder(lineasOrden)}
        
        </tbody>


        
        

        <tfoot>
            <tr>
                <td colspan="1" class="background-transparent"></td>
                <td colspan="1" class="background-transparent"></td>
                <td colspan="1 "  class="background-transparent"></td>
                <td colspan="1" class="text-center background">Total</td>
                <td colspan="1" class="text-center background ">${calculateTotal(lineasOrden)}</td>
            </tr>
        </tfoot>

    </table>
    `;
};



const traerOrdenesDB = () => {
    
    spinnerActive()

    if (ordersContainer.classList.contains('active')) {
        ordersContainer.classList.remove('active');
        ordersContainer.classList.add('hidden')
        spaceInPage.classList.add("active-space")
        spaceInPage.classList.remove("hidden")
        spinnerDeactive()
        return;
    }

     
    
    spaceInPage.classList.remove("active-space")
    spaceInPage.classList.add("hidden")
    ordersContainer.classList.remove('hidden')
    ordersContainer.classList.add('active')  

    entity = "orden"

    let data = {
        "persona":{
            "id":user.data[0].id
        },
        "include":{
            "persona":true,
            "producto":true
        }
    }


    ajaxController.get(entity, data).then( (response) => {

        let ordenes = ""
        let id = 0

        for(orden of response.data.orden){

            ordenes += renderOrden(++id, orden.lineasOrden, orden.precioTotal)
        }
           
        
            
       
        spaceInPage.classList.remove("active-space")
        spaceInPage.classList.add("hidden")
        ordersContainer.classList.remove('hidden')
        ordersContainer.classList.add('active')        
        ordersContainer.innerHTML = ordenes
        
       

        
      
               
        setTimeout(()=>{
            spinnerDeactive()            
        },"2000") 

    }, (error)=> {
        spaceInPage.classList.add("active-space")
        spaceInPage.classList.remove("hidden")
        ordersContainer.classList.remove('hidden')
        ordersContainer.classList.add('active') 
        ordersContainer.innerHTML = `<div class="mensaje-error">No hay ninguna Orden registrada para el usuario: ${user.data[0].usuario} <br>Volviendo al Inicio
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>`;
        
        spinnerDeactive()
        setTimeout(()=>{           
           spinnerActive()
        },"4000") 
        setTimeout(()=>{           
            window.location.assign("index.html")
        },"5000")  
       
    })
    
}






const init = () => {
    checkSeeOrders.addEventListener('click', traerOrdenesDB);
};
  
init();