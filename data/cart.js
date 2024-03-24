export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


// Save the timeout as an Object



export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const addedMessageTimeouts = {}
  // Add to Cart using dropdown numbers
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)
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
    matchingItem.quantity += 1;
    matchingItem.quantity += quantity
  } else {
    cart.push({
      productId,
      quantity
    });
  }

  saveToStorage();

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