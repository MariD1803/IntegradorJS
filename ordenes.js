const checkSeeOrders = document.querySelector('.button-see-orders')
const ordersContainer = document.querySelector('.orders-container')

const toggleButton = () => {
    if (ordersContainer.classList.contains('active')) {
        ordersContainer.classList.remove('active');
        ordersContainer.classList.add('hidden')
        return;
    }
   
    
    ordersContainer.classList.remove('hidden')
    ordersContainer.classList.add('active')    
    
}


const init = () => {
    checkSeeOrders.addEventListener('click', toggleButton);
};
  
init();