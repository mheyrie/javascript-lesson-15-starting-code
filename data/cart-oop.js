const cart = {
    cartItems: undefined,

    loadFromStorage() {

    this.cartItems = JSON.parse(localStorage.getItem('cart--oop'));

    if (!this.cartItems) {
        this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
        }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
        }];
    }

    },

    saveToStorage() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
      },


    addToCart(productId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
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
            console.log(quantity)
         // Save the timeout as an Object
        const addedMessageTimeouts = {}

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
            // matchingItem.quantity += quantity
        } else {
            this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: '1',
            });
        }

        this.saveToStorage();
    },

    calculateCartQuantity() {
        let cartQuantity = 0;
      
        this.cartItems.forEach((cartItem) => {
          cartQuantity += cartItem.quantity;
        });
        return cartQuantity
      },

    removeFromCart(productId) {
        const newCart = [];
      
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId) {
            newCart.push(cartItem);
          }
        });
      
        this.cartItems = newCart;
      
        this.saveToStorage();
      },

    updateQuantity(productId, newQuantity){
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
            matchingItem = cartItem;
            }
            
        });

        matchingItem.quantity = newQuantity
        this.saveToStorage()
        },

    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
            matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage()

        }

}

cart.loadFromStorage()

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e')

console.log(cart)



 



 




