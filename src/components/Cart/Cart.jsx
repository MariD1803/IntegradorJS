import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'


const StyledContainerIcons = styled.div`
  position: absolute;
  width: 2%;
  right: 0px;
  top: 49px;
  margin: 0;
  border: none;
  background: none;
  height: 3.5rem;

  @media (max-width: 2500px) {
    width: 4%;
  }
  @media (max-width: 940px) {
    width: 8%;
  }
  @media (max-width: 480px) {
    width: 17%;
  }
`;
const StyledContainerCart = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 145px;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    width: 70px;
  }
`;
const StyledAlertDialog = styled(AlertDialog)`
  z-index: 1000;

  
`;
const StyledAlertDialogContent = styled(AlertDialogContent)`
  z-index: 1000;

  
`;
const StyledButtonAlert = styled(Button)`
  border-radius: 10px;
  background-image: linear-gradient(to left,  #f7b9c6 , var(--pink),  #f7b9c6 ); 
  color: white;
  font-weight: 800;
  border: grey solid 1px;

  @media (max-width: 700px) {
    font-size: 14px;
  }

  
`;
const StyledDivContent = styled.div`
  height: 100%;
    z-index: 1000;
    background: white;
    width: 52%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1rem;

    @media (max-width: 700px) {
      width: 70%;
    }

  
`;

export const Cart = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
  updateLsCart,
  children, setActive,
  active, 
  setCountTimes, 
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  
  let countCon = localStorage.getItem('countContainer') || 0
  let totalCon = JSON.parse(localStorage.getItem('totalContainer')) || 0
  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
    setCountTimes(0)
    localStorage.removeItem("cartContainer");
    localStorage.removeItem("totalContainer");
    localStorage.removeItem("countContainer");
  };
  const onCleanCartButtonCompra = () => {
    
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
    setCountTimes(0)
    localStorage.removeItem("cartContainer");
    localStorage.removeItem("totalContainer");
    localStorage.removeItem("countContainer");
    alert("¡Su compra se realizó con éxito!")
  };

  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id); // Todos los productos distintos del que estoy clickeando
    alert("Desea eliminar el producto?");
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    delete product.selectedTalla;
    setAllProducts(results)
    let resultsCount = countCon - product.quantity
    let resultsTotal = totalCon - (product.price * product.quantity)
    localStorage.setItem("cartContainer", JSON.stringify(results))
    localStorage.setItem("countContainer", JSON.stringify(resultsCount))
    localStorage.setItem("totalContainer", JSON.stringify(resultsTotal))
  };

  const [count, setCount] = useState(0);

  function handleClickSum(product) {
    if (allProducts.find((item) => item.id === product.id)) {
      product.quantity = product.quantity + 1;
      setCount(count + 1);
      setTotal(parseInt(total) + parseInt(product.price));      
      let resultsCount =  parseInt(countCon) + 1
      let resultsTotal =  parseInt(totalCon) +  parseInt(product.price)
      localStorage.setItem("countContainer", JSON.stringify(resultsCount))
      localStorage.setItem("totalContainer", JSON.stringify(resultsTotal))
    }

    setCountProducts(countProducts + 1);
    updateLsCart();
  }

  function handleClickSubstrat(product) {
    if (product.quantity <= 1) {
      return;
    }
    product.quantity = product.quantity - 1;
    setCount(count - 1);
    setCountProducts(countProducts - 1);
    setTotal(total - product.price);
    let resultsCount =  parseInt(countCon) - 1
    let resultsTotal =  parseInt(totalCon) -  parseInt(product.price)
    localStorage.setItem("countContainer", JSON.stringify(resultsCount))
    localStorage.setItem("totalContainer", JSON.stringify(resultsTotal))
   
  }





  return (
    <>
      <StyledContainerIcons>
        <div>
          <div onClick={() =>setActive(!active)}>{children}</div>
          <div className="count-products">
            <span id="contador-productos">{countCon}</span>
          </div>
        </div>

        <div
          className={`container-cart-products ${active ? "" : "hidden-cart"}`}
        > 
          {allProducts.length ? ( // Si mi carrito no está vacio muestra mi <p>
            <>
              <div className="position-fixed-cart" >
                <div className="position-aboslute-cart" >
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <img
                        className="cartProductImagen"
                        src={product.imageurl}
                        alt="product img"
                      />

                      <div className="space">
                        <StyledContainerCart>
                          <p className="titulo-producto-carrito">
                            {product.name}
                          </p>
                          <span className="talla-carrito">
                            Talla: {product.selectedTalla}
                          </span>
                          <span className="precio-producto-carrito">
                            ${product.price}
                          </span>
                        </StyledContainerCart>
                        <div className="container-quantity">
                          <button
                            className="button-cart-sumandsubs"
                            onClick={() => handleClickSum(product)}
                          >
                            +
                          </button>

                          <span className="cantidad-producto-carrito">
                            Cantidad: {product.quantity}
                          </span>

                          <button
                            className={`button-cart-sumandsubs ${
                              product.quantity === 1
                                ? "hidden-cart-subs"
                                : "button-cart-sumandsubs"
                            }`}
                            onClick={() => handleClickSubstrat(product)}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                    <svg //Este es el boton de borrar
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${totalCon}</span>
              </div>

              <button className="btn-clear-buy" onClick={onOpen}>
                Comprar
              </button>
              <StyledAlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay className="position-fixed-cart">
                  <StyledAlertDialogContent className="position-aboslute-alert">
                    <StyledDivContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold' className="titulo-producto-carrito">
                      Continuar con la Compra
                    </AlertDialogHeader>

                    <AlertDialogBody className="titulo-producto-carrito">
                      Estas seguro de continuar con esta acción?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <StyledButtonAlert ref={cancelRef} onClick={onClose}>
                        Cancelar
                      </StyledButtonAlert>
                      <StyledButtonAlert colorScheme='red' onClick={()=>{ onClose(); onCleanCartButtonCompra()}} ml={3}>
                        Comprar
                      </StyledButtonAlert>
                    </AlertDialogFooter>


                    </StyledDivContent>
                  </StyledAlertDialogContent>
                </AlertDialogOverlay>
              </StyledAlertDialog>



              <button className="btn-clear-all" onClick={onCleanCart}>
                Vaciar Carrito
              </button>
              </div>
              </div>
            </>
          ) : (
                <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </StyledContainerIcons>
    </>
  );
};

export default Cart;
