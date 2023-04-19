const productPasteles = document.querySelector('.pasteles')
const productCupcakes = document.querySelector('.cupcakes')
const productGalletas = document.querySelector('.galletas')
const filterPasteles = document.querySelector('.filter-pasteles')
const filterCupcakes = document.querySelector('.filter-cupcakes')
const filterGalletas = document.querySelector('.filter-galletas')
const productosContenedorPasteles = document.querySelector('.contenedor-productos-pasteles');
const productosContenedorCupcakes = document.querySelector('.contenedor-productos-cupcakes');
const productosContenedorGalletas = document.querySelector('.contenedor-productos-galletas');
const ulLogin = document.querySelector('#ul-login');
const checkLogin = document.querySelector('.check-login')
const ulCart = document.querySelector('#ul-cart');
const checkCart = document.querySelector('.check-cart')
const ulMenu = document.querySelector('#ul-menu');
const checkMenu = document.querySelector('.check-menu')
const cartContainer = document.querySelector('.cart-container')
const addQuantity = document.querySelector('.add-quantity')
const subsQuantity = document.querySelector('.subs-quantity')
const countContainer = document.querySelector('.count-container')
const totalCarrito = document.querySelector('.total-carrito')
const cartContainerButton = document.querySelector('.cart-container-button')
const buttonDelete = document.querySelector('.button-delete')
const alertContainer = document.querySelector('.alert-container')
const questionMessage = document.querySelector('.question-message')
const messageContainer = document.querySelector('.message')
const buttonBuy = document.querySelector('.button-buy')
const buttonCancelar = document.querySelector('.button-cancelar')
const buttonAceptar = document.querySelector('.button-aceptar')



let cart = JSON.parse(localStorage.getItem('cart')) || [];
const saveLocalStorage = cartLleno => {
    localStorage.setItem('cart', JSON.stringify(cartLleno));
};

const crearProducto = product => {
    const {id, nombre, sabor, topping, relleno, imagen, precio} = product; 
    return `
    <div class="div_menu">
        <div  class="menu_text">
            <h3 class="titulo_menu">${nombre}</h3>
            <p>${sabor}<br>${relleno}<br>${topping}</p>
            <div class="div-precio"><p>Precio: </p><p class="precio_producto">$${precio}</p></div>
            <button class="button-add"
            data-id='${id}'
            data-nombre='${nombre}'
            data-precio='${precio}'
            data-imagen='${imagen}'>Agregar al Carrito</button>
        </div>                
        <img src=${imagen} alt="imagen-producto"  class="menu_img">
    </div>
    
    `
}

const renderizarProductos = (Datos, contenedor) => {
    
    contenedor.innerHTML = Datos.map(crearProducto).join('');
}

const mostrarProductos= e => {
    if (e.target.dataset.category  == "pasteles") {

    
    
        if (productPasteles.classList.contains('active')) {
            productPasteles.classList.remove('active');
            productPasteles.classList.add('hidden')
            return;
        }
        if (productCupcakes.classList.contains('active') || productGalletas.classList.contains('active')) {
            productCupcakes.classList.remove('active');
            productCupcakes.classList.add('hidden')
            productGalletas.classList.remove('active');
            productGalletas.classList.add('hidden')

            productPasteles.classList.remove('hidden')
            productPasteles.classList.add('active')            
            let pasteles = baseDeDatos.filter(item => item.categoria === 'pasteles')
            renderizarProductos(pasteles, productosContenedorPasteles);
            return;
        }
        
        productPasteles.classList.remove('hidden')
        productPasteles.classList.add('active')
        let pasteles = baseDeDatos.filter(item => item.categoria === 'pasteles')
        renderizarProductos(pasteles, productosContenedorPasteles);

    }
    if (e.target.dataset.category  == "cupcakes") {
       
    
        if (productCupcakes.classList.contains('active')) {
            productCupcakes.classList.remove('active');
            productCupcakes.classList.add('hidden')
            return;
        }
        if (productPasteles.classList.contains('active') || productGalletas.classList.contains('active')) {
            productPasteles.classList.remove('active');
            productPasteles.classList.add('hidden')
            productGalletas.classList.remove('active');
            productGalletas.classList.add('hidden')

            productCupcakes.classList.remove('hidden')
            productCupcakes.classList.add('active')
            let cupcakes = baseDeDatos.filter(item => item.categoria === 'cupcakes')            
            renderizarProductos(cupcakes, productosContenedorCupcakes);
            return;
        }
        
        productCupcakes.classList.remove('hidden')
        productCupcakes.classList.add('active')
        let cupcakes = baseDeDatos.filter(item => item.categoria === 'cupcakes')
    
        renderizarProductos(cupcakes, productosContenedorCupcakes);

    }
    if (e.target.dataset.category  == "galletas") {
       
    
        if (productGalletas.classList.contains('active')) {
            productGalletas.classList.remove('active');
            productGalletas.classList.add('hidden')
            return;
        }
        if (productPasteles.classList.contains('active') || productCupcakes.classList.contains('active')) {
            productPasteles.classList.remove('active');
            productPasteles.classList.add('hidden')
            productCupcakes.classList.remove('active');
            productCupcakes.classList.add('hidden')

            productGalletas.classList.remove('hidden')
            productGalletas.classList.add('active')
            let galletas = baseDeDatos.filter(item => item.categoria === 'galletas')            
            renderizarProductos(galletas, productosContenedorGalletas);
            return;
        }
        
        productGalletas.classList.remove('hidden')
        productGalletas.classList.add('active')
        let galletas = baseDeDatos.filter(item => item.categoria === 'galletas')            
        renderizarProductos(galletas, productosContenedorGalletas);

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
    const { id, nombre, precio, imagen, quantity } = cartProduct; 
    return `
    <div class="cart-item" data-id=${id}>
        <img src=${imagen} alt="imagen-product" class="imagen-cart"/>
        <div class="container-description"> 
            <div class="description-cart">
                <h3 class="titulo-product" >${nombre}</h3>
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
    }, "700");
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
        cartContainer.innerHTML = `<p>No hay nada en el carrito</p>`;
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
    const { id, nombre, precio, imagen } = e.target.dataset;

    const datosDelProducto = (id, nombre, precio, imagen) => {
        return { id, nombre, precio, imagen };
    };
  
    const product = datosDelProducto(id, nombre, precio, imagen)
  
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
    totalCarrito.innerHTML = parseInt(countTotal)
};

const showQuestion = (message) => {
    messageContainer.textContent = message
}
const showAlert = (message) => {
    alertContainer.textContent = message
}

const functionalityAccept = () => {
    localStorage.removeItem("cart");
    countCart()
    countTotal()    
    questionMessage.classList.remove('active')
    questionMessage.classList.add('hidden')
    
    
   
    location.reload()
    renderCart() 

    showAlert("Se realizó la solicitud con éxito")
    renderAlert() 
     
}
const functionalityAcceptBuy = () => {
    localStorage.removeItem("cart");
    countCart()
    countTotal()    
    questionMessage.classList.remove('active')
    questionMessage.classList.add('hidden')
    
   
    location.reload()
    renderCart() 

    showAlert("Se realizó la solicitud con éxito")
    renderAlert() 
     
}

const functionalityCancel = () => {
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
const buyCart = () => {
    questionMessage.classList.remove('hidden')
    questionMessage.classList.add('active')
    showQuestion("¿Desea continuar con la compra?")
    cartContainerButton.classList.remove('active')
    cartContainerButton.classList.add('hidden')
    ulCart.classList.remove('active');
    ulCart.classList.add('hidden')
     
    let OrdenesDeCompra = JSON.parse(localStorage.getItem('OrdenesDeCompra')) || JSON.parse(localStorage.getItem('cart'));
    let OrdenDeCompra = JSON.parse(localStorage.getItem('cart'))
    localStorage.setItem('OrdenesDeCompra', JSON.stringify(OrdenesDeCompra = [...OrdenesDeCompra, OrdenDeCompra]));
   

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
    buttonCancelar.addEventListener('click', functionalityCancel); 
};
  
init();