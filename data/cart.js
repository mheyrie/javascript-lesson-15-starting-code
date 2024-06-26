export let cart;

loadFromStorage()

export function loadFromStorage(){

  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }

}


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


 // Save the timeout as an Object
const addedMessageTimeouts = {}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
   
  // Add to Cart using dropdown numbers
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)

  // Added this because i was getting error when running the test
  if(!quantitySelector){
    console.error('Quantity selector not found');
    return;
  }
  const quantity = Number(quantitySelector.value)

  // Show checked added message
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)

  addedMessage.classList.add('added-to-cart-visible')
    // Set-time out to control when the added message shows and disapper
  setTimeout(() => {
    const previousTimeoutId = addedMessageTimeouts[productId];
    if(!previousTimeoutId) {
      clearTimeout(previousTimeoutId)
    }

    const timeoutId = setTimeout(() =>{
      addedMessage.classList.remove("added-to-cart-visible")
      }, 2000)

      addedMessageTimeouts[productId] = timeoutId
    })
  
  if (matchingItem) {
    // matchingItem.quantity += 1;
    matchingItem.quantity += quantity
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1',
    });
  }

  saveToStorage();

}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}



export function updateQuantity(productId, newQuantity){
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
    
  });

  matchingItem.quantity = newQuantity
  saveToStorage()
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage()

}