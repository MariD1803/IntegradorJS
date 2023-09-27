const ajaxController = new AJAXController();

//Productos 
const productPasteles = document.querySelector('.pasteles')
const productCupcakes = document.querySelector('.cupcakes')
const productGalletas = document.querySelector('.galletas')
const filterPasteles = document.querySelector('.filter-pasteles')
const filterCupcakes = document.querySelector('.filter-cupcakes')
const filterGalletas = document.querySelector('.filter-galletas')
const productosContenedorPasteles = document.querySelector('.contenedor-productos-pasteles');
const productosContenedorCupcakes = document.querySelector('.contenedor-productos-cupcakes');
const productosContenedorGalletas = document.querySelector('.contenedor-productos-galletas');
//Botones de los menus
const ulLogin = document.querySelector('#ul-login');
const checkLogin = document.querySelector('.check-login')
const ulCart = document.querySelector('#ul-cart');
const checkCart = document.querySelector('.check-cart')
const ulMenu = document.querySelector('#ul-menu');
const checkMenu = document.querySelector('.check-menu')
//Carro
const cartContainer = document.querySelector('.cart-container')
const addQuantity = document.querySelector('.add-quantity')
const subsQuantity = document.querySelector('.subs-quantity')
const countContainer = document.querySelector('.count-container')
const totalCarrito = document.querySelector('.total-carrito')
const cartContainerButton = document.querySelector('.cart-container-button')
const buttonDelete = document.querySelector('.button-delete')
const alertContainer = document.querySelector('.alert-container')
const questionMessage = document.querySelector('.question-message')
const questionMessageCompra = document.querySelector('.question-message-compra')
const messageContainer = document.querySelector('.message')
const messageContainerCompra = document.querySelector('.message-compra')
const buttonBuy = document.querySelector('.button-buy')
const buttonCancelar = document.querySelector('.button-cancelar')
const buttonCancelarCompra = document.querySelector('.button-cancelar-compra')
const buttonAceptar = document.querySelector('.button-aceptar')
const buttonAceptarCompra = document.querySelector('.button-aceptar-compra')
//opciones de ingreso y Logout
const buttonIngresar = document.querySelector('.ingresar')
const buttonRegistrarse = document.querySelector('.registrarse')
const buttonLogOut = document.querySelector('.logout')
const buttonOrdenes = document.querySelector('.ordenes')
//Spinner
const spinnerContainer = document.querySelector(".spinner")
const spinner = document.querySelector(".lds-heart")

//   Traer productos de la DB 

const getProductos = (data = {}) => {
    entity = "producto"
    return ajaxController.get(entity,data)
}

// Datos del localstorage

let cart = JSON.parse(localStorage.getItem('cart')) || [];

let user = JSON.parse(localStorage.getItem('usuario')) || null;
let total = JSON.parse(localStorage.getItem('total')) || 0;

// Guardar el carro localstorage

const saveLocalStorage = cartLleno => {
    localStorage.setItem('cart', JSON.stringify(cartLleno));
};
const saveLocalStorageTotal = totalCarro => {
    localStorage.setItem('total', JSON.stringify(totalCarro));
};


// Verificar usuario logeado

const verifyUser = () => {
    if(!user){
        buttonIngresar.classList.add('active');
        buttonIngresar.classList.remove('hidden')
        buttonRegistrarse.classList.add('active');
        buttonRegistrarse.classList.remove('hidden')
        buttonLogOut.classList.remove('active');
        buttonLogOut.classList.add('hidden')
        buttonOrdenes.classList.remove('active');
        buttonOrdenes.classList.add('hidden')
        checkCart.classList.remove('active');
        checkCart.classList.add('hidden')
        countContainer.classList.remove("active")
        countContainer.classList.add("hidden")

        return;
    }
    if(user){
        buttonIngresar.classList.remove('active');
        buttonIngresar.classList.add('hidden')
        checkCart.classList.remove('hidden');
        checkCart.classList.add('active')
        buttonRegistrarse.classList.add('hidden');
        buttonRegistrarse.classList.remove('active')
        buttonLogOut.classList.add('active');
        buttonLogOut.classList.remove('hidden')
        buttonOrdenes.classList.add('active');
        buttonOrdenes.classList.remove('hidden')
        countContainer.classList.add("active")
        countContainer.classList.remove("hidden")


        return;
    }
}


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









// Crear producto desde DB

const crearProducto = product => {
    const {id, nombre, sabor, topping, relleno, imagen, precio, categoria} = product; 
    return `
    <div class="div_menu">
        <div  class="menu_text">
            <h3 class="titulo_menu">${nombre}</h3> 
            <p class="hidden">${categoria}</p>           
            <p>${sabor}<br>${relleno}<br>${topping}</p>
            <div class="div-precio"><p>Precio: </p><p class="precio_producto">$${precio}</p></div>
            <button class="button-add"
            data-id='${id}'
            data-nombre='${nombre}'
            data-precio='${precio}'
            data-imagen='${imagen}'
            data-categoria='${categoria}'
            data-sabor='${sabor}'
            >Agregar al Carrito</button>
        </div>                
        <img src=${imagen} alt="imagen-producto"  class="menu_img">
    </div>
    
    `
}

const renderizarProductos = (Datos, contenedor) => {
    contenedor.innerHTML = Datos.map(crearProducto).join('');
}

const mostrarProductos= e => {
    if (e.target.dataset.category  == "Pastel") {
    
        if (productPasteles.classList.contains('active')) {
            productPasteles.classList.remove('active');
            productPasteles.classList.add('hidden')            
            spinnerDeactive()
            return;
        }
        if (productCupcakes.classList.contains('active') || productGalletas.classList.contains('active')) {
            productCupcakes.classList.remove('active');
            productCupcakes.classList.add('hidden')
            productGalletas.classList.remove('active');
            productGalletas.classList.add('hidden')

            productPasteles.classList.remove('hidden')
            productPasteles.classList.add('active')            
            spinnerActive()

            let pasteles = getProductos(
                {
                    "categoria":"Pastel"
                }
            ).then(
                (response)=>{
                   
                    renderizarProductos(response.data, productosContenedorPasteles)                    
                    spinnerDeactive()
                },
                (error) => {
                                        
                    spinnerDeactive()
                    console.log(error)
                }
            )
            renderizarProductos(pasteles, productosContenedorPasteles);            
            spinnerDeactive()
            return;
        }
        
        productPasteles.classList.remove('hidden')
        productPasteles.classList.add('active')        
        spinnerActive(0)        
        
        let pasteles = getProductos(
            {
                "categoria":"Pastel"
            }
        ).then(
            (response)=>{
               
                renderizarProductos(response.data, productosContenedorPasteles)                
                spinnerDeactive()
            },
            (error) => {
                
                console.log(error)                
                spinnerDeactive()
            }
        )
        renderizarProductos(pasteles, productosContenedorPasteles);        
        spinnerDeactive()

    }


    if (e.target.dataset.category  == "Cupcake") {
       
    
        if (productCupcakes.classList.contains('active')) {
            productCupcakes.classList.remove('active');
            productCupcakes.classList.add('hidden')            
            spinnerDeactive()
            return;
        }
        if (productPasteles.classList.contains('active') || productGalletas.classList.contains('active')) {
            productPasteles.classList.remove('active');
            productPasteles.classList.add('hidden')
            productGalletas.classList.remove('active');
            productGalletas.classList.add('hidden')

            productCupcakes.classList.remove('hidden')
            productCupcakes.classList.add('active')
            spinnerActive()

            let cupcakes = getProductos(
                {
                    "categoria":"Cupcake"
                }
            ).then(
                (response)=>{
                                       
                    spinnerDeactive()
                    renderizarProductos(response.data, productosContenedorCupcakes)
                },
                (error) => {
                    
                    console.log(error)                    
                    spinnerDeactive()
                }
            )          
            renderizarProductos(cupcakes, productosContenedorCupcakes);
            spinnerDeactive()
            return;
        }
        
        productCupcakes.classList.remove('hidden')
        productCupcakes.classList.add('active')
        spinnerActive()
        let cupcakes = getProductos(
            {
                "categoria":"Cupcake"
            }
        ).then(
            (response)=>{
               
                renderizarProductos(response.data, productosContenedorCupcakes)
                spinnerDeactive()
            },
            (error) => {
                
                console.log(error)                
                spinnerDeactive()
            }
        )          
        renderizarProductos(cupcakes, productosContenedorCupcakes);
        spinnerDeactive()

    }
    if (e.target.dataset.category  == "Galleta") {
       
    
        if (productGalletas.classList.contains('active')) {
            productGalletas.classList.remove('active');
            productGalletas.classList.add('hidden')            
            spinnerDeactive()
            return;
        }
        if (productPasteles.classList.contains('active') || productCupcakes.classList.contains('active')) {
            productPasteles.classList.remove('active');
            productPasteles.classList.add('hidden')
            productCupcakes.classList.remove('active');
            productCupcakes.classList.add('hidden')

            productGalletas.classList.remove('hidden')
            productGalletas.classList.add('active')  
            spinnerActive()      
            let galletas = getProductos(
                {
                    "categoria":"Galleta"
                }
            ).then(
                (response)=>{
                   
                    renderizarProductos(response.data, productosContenedorGalletas)
                    spinnerDeactive()
                },
                (error) => {
                    
                    console.log(error)                    
                    spinnerDeactive()
                }
            )          
            renderizarProductos(galletas, productosContenedorGalletas);
            spinnerDeactive()
            return;
        }
        
        productGalletas.classList.remove('hidden')
        productGalletas.classList.add('active')
        spinnerActive()

        let galletas = getProductos(
            {
                "categoria":"Galleta"
            }
        ).then(
            (response)=>{
               
                renderizarProductos(response.data, productosContenedorGalletas)                
                spinnerDeactive()
            },
            (error) => {
                
                console.log(error)                
                spinnerDeactive()
            }
        )          
        renderizarProductos(galletas, productosContenedorGalletas);
        spinnerDeactive()

    }
   
   
    
}

const toggleLogin = () => {
    if (ulLogin.classList.contains('active')) {
        ulLogin.classList.remove('active');
        ulLogin.classList.add('hidden')
        return;
    }
    if (ulCart.classList.contains('active') || ulMenu.classList.contains('active')) {
        ulCart.classList.remove('active');
        ulCart.classList.add('hidden')
        ulMenu.classList.remove('active');
        ulMenu.classList.add('hidden-menu')

        ulLogin.classList.remove('hidden')
        ulLogin.classList.add('active')
        return;
    }
    
    ulLogin.classList.remove('hidden')
    ulLogin.classList.add('active')
    
}
const toggleMenu = () => {
    if (ulMenu.classList.contains('active')) {
        ulMenu.classList.remove('active');
        ulMenu.classList.add('hidden-menu')
        return;
    }
    /* Si está abierto el menú que cierre el resto */
    if (ulCart.classList.contains('active') || ulLogin.classList.contains('active')) {

        ulCart.classList.remove('active');
        ulCart.classList.add('hidden')
        ulLogin.classList.remove('active');
        ulLogin.classList.add('hidden')
        
        ulMenu.classList.remove('hidden-menu')
        ulMenu.classList.add('active')
        return;
    }
    
    ulMenu.classList.remove('hidden-menu')
    ulMenu.classList.add('active')
    
}

const toggleCart = () => {
    if (ulCart.classList.contains('active')) {
        ulCart.classList.remove('active');
        ulCart.classList.add('hidden')
        return;
    }
    if (ulLogin.classList.contains('active') || ulMenu.classList.contains('active') ) {
        ulLogin.classList.remove('active');
        ulLogin.classList.add('hidden')
        ulMenu.classList.remove('active');
        ulMenu.classList.add('hidden-menu')
        ulCart.classList.remove('hidden')
        ulCart.classList.add('active')
        return;
    }
    
    ulCart.classList.remove('hidden')
    ulCart.classList.add('active')    
    
}

const cerrarAlScrollear = () => {
    if (
      !ulLogin.classList.contains('active') && !ulMenu.classList.contains('active')
    ) return;
  
    
    ulLogin.classList.remove('active');
    ulMenu.classList.remove('active');
    ulLogin.classList.add('hidden');
    ulMenu.classList.add('hidden-menu');
    
};

/* Logica carro */

const renderProductCart = cartProduct => {
    const { id, nombre,sabor,categoria, precio, imagen, quantity } = cartProduct; 
    return `
    <div class="cart-item" data-id=${id}>
        <img src=${imagen} alt="imagen-product" class="imagen-cart"/>
        <div class="container-description"> 
            <div class="description-cart">
                         
                <h3 class="titulo-product" >${categoria} de</h3>
                <h3 class="titulo-product" >${nombre}</h3>
                <h3 class="hidden" >${sabor}</h3>   
                <span class="price-cart">$${precio}</span>
            </div>
            <div class="quantity-cart">
                <label for="cart-sum" class="add-quantity"><i class="fa-solid fa-plus button-sumandsubs"></i></label>
                <span class="item-quantity"> ${quantity} </span>
                <label for="cart-subs" class="subs-quantity"><i class="fa-solid fa-minus button-sumandsubs"></i></label>
            </div>
        </div>
        
    
    </div>
    `;
};

const renderAlert = () => {
    alertContainer.classList.remove('hidden')
    alertContainer.classList.add('active')
    setTimeout(() => {        
        alertContainer.classList.remove('active')
        alertContainer.classList.add('animation')
        alertContainer.classList.add('hidden')
    }, "600");
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




const addUnitProduct = e => {
    let productId = e.target.closest(".cart-item").getAttribute("data-id")
    for (cartProduct of cart) {
        if (cartProduct.id === productId){
            cartProduct.quantity++;
            break
        }
    }
    countCart()
    countTotal()
    chequearCarro()
};

const removeUnitProduct = e => {
    let productId = e.target.closest(".cart-item").getAttribute("data-id")
    for (const[i,cartProduct] of cart.entries()) {
        if (cartProduct.id === productId){
            cartProduct.quantity--;
            if (!cartProduct.quantity){
                cart.splice(i,1)
            }
            break
        }
    }
    countCart()
    countTotal()
    chequearCarro()
}



const renderCart = () => {
    if (!cart.length) {        
        cartContainerButton.classList.remove('active')
        cartContainerButton.classList.add('hidden')
        cartContainer.classList.add('border')
        cartContainer.innerHTML = `<p class="cart-empty">No hay nada en el carrito</p>`;
      return;
    }
    cartContainer.innerHTML = cart.map(renderProductCart).join('');
    cartContainer.classList.remove('border')
    cartContainerButton.classList.remove('hidden')
    cartContainerButton.classList.add('active')
    addCartProductsEvents()
};

const addCartProductsEvents = () => {
    let addButtons = cartContainer.getElementsByClassName("add-quantity")
    let subsButtons = cartContainer.getElementsByClassName("subs-quantity")
    for(element of addButtons) element.addEventListener("click",addUnitProduct)
    for(element of subsButtons) element.addEventListener("click",removeUnitProduct)
}




const chequearCarro = () => {
    saveLocalStorage(cart)
    renderCart(cart)
}

const addProduct = e => {
    if (!e.target.classList.contains('button-add')) return;
    if(!user){
        showAlert("El usuario debe estar logueado")
        renderErrorAlert()
        return;
    }
    const { id, nombre, precio, imagen, categoria, sabor } = e.target.dataset;

    const datosDelProducto = (id, nombre, precio, imagen,  categoria, sabor) => {
        return { id, nombre, precio, imagen,  categoria, sabor };
    };
  
    const product = datosDelProducto(id, nombre, precio, imagen,  categoria, sabor)
  
    if (cart.find(item => item.id === product.id)) {
        cart = cart.map(cartProduct =>
            cartProduct.id === product.id
              ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
              : cartProduct
        );
        
    } else {
        cart = [...cart, { ...product, quantity: 1 }];
    }
    showAlert("Se agregó un producto al carrito")
    renderAlert()
    chequearCarro()
};




const countCart = () => {
    let countQuantity = 0
    cart.map(product =>countQuantity = product.quantity + countQuantity)
    countContainer.innerHTML = countQuantity    
};
const countTotal = () => {
    let countTotal = 0
    cart.map(product =>countTotal = (parseInt(product.precio) * parseInt(product.quantity)) + countTotal)
  
    saveLocalStorageTotal(countTotal)
    totalCarrito.innerHTML = parseInt(countTotal)
};

const showQuestion = (message) => {
    messageContainer.textContent = message
}
const showQuestionCompra = (message) => {
    messageContainerCompra.textContent = message
}
const showAlert = (message) => {
    alertContainer.textContent = message
}


// Cerrar seccion 

const functionalityLogOut = () => {
    spinnerActive()
    localStorage.removeItem("cart");
    localStorage.removeItem("usuario");
    countCart()
    countTotal()  
    renderCart() 
    verifyUser() 
   

    setTimeout(() => {
        showAlert("Se realizó la solicitud con éxito")
        renderAlert() 
    }, "900");
    
    setTimeout(()=>{
        spinnerDeactive()
        location.reload()
    },"1500")
     
}

//Agregar la orden de compra a la DB

const functionalityAccept = () => {
    spinnerActive()
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
    countCart()
    countTotal()    
    questionMessage.classList.remove('active')
    questionMessage.classList.add('hidden')
    
    
   
    setTimeout(() => {
        showAlert("Se realizó la solicitud con éxito")
        renderAlert() 
    }, "900");
    
    setTimeout(()=>{
        spinnerDeactive()
        location.reload()
    },"1500")
     
}
const functionalityAcceptBuy = () => {
    
    questionMessageCompra.classList.remove('active')
    questionMessageCompra.classList.add('hidden')
    
   
    entity = "orden"

    let data = {
        "personaId":user.data[0].id,
        "precioTotal":total,
        "lineasOrden":getOrderRows(cart)
    }

    ajaxController.create(entity, data).then( () => {
        localStorage.removeItem("cart");
        localStorage.removeItem("total");
        countCart()
        countTotal()    
        questionMessageCompra.classList.remove('active')
        questionMessageCompra.classList.add('hidden')
        
        showAlert("Se guardó su compra")
        renderAlert() 
        spinnerActive()
       
        setTimeout(()=>{
            spinnerDeactive()
            location.reload()
        },"4000")

    }, (error)=> {
        showAlert(error.response.data.error)
        renderErrorAlert() 
    })
     
}

const functionalityCancel = () => {
    questionMessage.classList.remove('active')
    questionMessage.classList.add('hidden')
    questionMessageCompra.classList.remove('active')
    questionMessageCompra.classList.add('hidden')
    ulCart.classList.remove('hidden')    
    ulCart.classList.add('active')    
    cartContainerButton.classList.remove('hidden')
    cartContainerButton.classList.add('active')

}
const functionalityCancelCompra = () => {
    questionMessageCompra.classList.remove('active')
    questionMessageCompra.classList.add('hidden')
    questionMessage.classList.remove('active')
    questionMessage.classList.add('hidden')
    ulCart.classList.remove('hidden')    
    ulCart.classList.add('active')    
    cartContainerButton.classList.remove('hidden')
    cartContainerButton.classList.add('active')

}



const deleteCart = () => {
    questionMessage.classList.remove('hidden')
    questionMessage.classList.add('active')
    showQuestion("¿Desea eliminar el carrito?")
    cartContainerButton.classList.remove('active')
    cartContainerButton.classList.add('hidden')
    ulCart.classList.remove('active');
    ulCart.classList.add('hidden')


}  ;

const getOrderRows = (cart)=> {
    let orderRows = []
    for (let row of cart){
        orderRows.push({
            "productoId":parseInt(row.id),
            "quantity": row.quantity,
            "precio":parseFloat(row.precio)
        })
    }
    return orderRows
}


const buyCart = () => {
    questionMessageCompra.classList.remove('hidden')
    questionMessageCompra.classList.add('active')
    showQuestionCompra("¿Desea continuar con la compra?")
    cartContainerButton.classList.remove('active')
    cartContainerButton.classList.add('hidden')
    ulCart.classList.remove('active');
    ulCart.classList.add('hidden')
   

}  ;






const init = () => {
    filterPasteles.addEventListener('click', mostrarProductos);
    filterCupcakes.addEventListener('click', mostrarProductos);
    filterGalletas.addEventListener('click', mostrarProductos);
    checkLogin.addEventListener('click', toggleLogin);
    checkCart.addEventListener('click', toggleCart);
    checkMenu.addEventListener('click', toggleMenu);
    window.addEventListener('scroll', cerrarAlScrollear);
    window.addEventListener('load', countCart);
    window.addEventListener('load', countTotal);
    document.addEventListener('DOMContentLoaded', renderCart);
    document.addEventListener('DOMContentLoaded', verifyUser);
    productosContenedorPasteles.addEventListener('click', addProduct)
    productosContenedorPasteles.addEventListener('click', countCart)
    productosContenedorPasteles.addEventListener('click', countTotal)
    productosContenedorCupcakes.addEventListener('click', addProduct)
    productosContenedorCupcakes.addEventListener('click', countCart)
    productosContenedorCupcakes.addEventListener('click', countTotal)
    productosContenedorGalletas.addEventListener('click', addProduct)
    productosContenedorGalletas.addEventListener('click', countCart)
    productosContenedorGalletas.addEventListener('click', countTotal)
    buttonDelete.addEventListener('click', deleteCart);
    buttonBuy.addEventListener('click', buyCart);
    buttonAceptar.addEventListener('click', functionalityAccept);
    buttonAceptarCompra.addEventListener('click', functionalityAcceptBuy);
    buttonCancelar.addEventListener('click', functionalityCancel); 
    buttonCancelarCompra.addEventListener('click', functionalityCancelCompra); 

    buttonLogOut.addEventListener("click", functionalityLogOut)
};
  
init();