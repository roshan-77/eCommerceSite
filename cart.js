if(document.readyState = 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

var cart= document.querySelector('.cart')

cart.addEventListener('click', function(){
    var cart_display = document.querySelector(".cart-display")
    
    if(cart_display.style.display == 'none'|| cart_display.style.display ==''){
        cart_display.style.display = 'inline-block';
    }else {
        cart_display.style.display = 'none';
    }
})

function ready(){
    
    var add_to_cart = document.getElementsByClassName("add-to-cart")

    for (var i = 0; i< add_to_cart.length; i++){
        var button = add_to_cart[i]
        button.addEventListener('click', addToCartClicked)
    }

    
}

function addToCartClicked(event){
    
    
    var button = event.target;
    var item = button.parentElement
    var productName = item.getElementsByClassName('product-name')[0].innerText;
    var productPrice = item.getElementsByClassName('product-price')[0].innerText;

    addItemsToCart(productName,productPrice);

   
}


function addItemsToCart(productName, productPrice){
    var totalCartItems = document.querySelector(".total-cart-items");
    
    //to check if the item has already been added or not.
    var items = document.getElementsByClassName("items")
    for( var i=0; i<items.length; i++){
        if( items[i].innerText === productName){
            alert("Item already in cart")
            return
        }
    }
    //creates a div for the cart items
    var cart_items = document.createElement('div');
    cart_items.classList.add('cart-items');
    totalCartItems.append(cart_items);

    var remove_items = document.createElement("button");
    remove_items.classList.add("remove");
    remove_items.innerText = "X"
    cart_items.append(remove_items);

    var items = document.createElement("li");
    items.classList.add("items");
    items.innerText = productName;
    cart_items.append(items);

    var count = document.createElement("li");
    count.classList.add("count");
    var input = document.createElement("input");
    input.setAttribute("value",1);
    count.append(input)
    cart_items.append(count);

    var price = document.createElement("li");
    price.classList.add("price");
    price.innerText = productPrice;
    cart_items.append(price);

    

    updateCartTotal();
    //First function to remove items from the cart
    // remove_items.addEventListener('click', ()=>{
    //     totalCartItems.removeChild(cart_items);
    //     updateCartTotal();
    // });
    
    //function to update total when the input field is changed
    input.onchange = function validateInputField(){
    
        if(input.value<1){
            alert("Please enter value greater than 1");
            input.value = 0;
            updateCartTotal()
        }else{
            updateCartTotal()
        }
        getItemsTotal();

    }
    getItemsTotal();
    
    //second function to remove items from the cart
    var btn = document.getElementsByClassName("remove");
    
        for (var i = 0; i<btn.length; i++){
        btn[i].addEventListener('click', removeCartItems)
}
}


function updateCartTotal(){
    var totalCartItems = document.querySelector(".total-cart-items");
    var cartItems = document.getElementsByClassName("cart-items");

    var total = 0;
    for (var i = 0; i<cartItems.length; i++){
        var cartItem = cartItems[i];
        var countElement = cartItem.querySelector("input")
        var priceElement = cartItem.getElementsByClassName("price")[0]

        var price = parseFloat(priceElement.innerText);
        var count = countElement.value
        total = total+(price*count)
    }

    document.getElementsByClassName("total-amount")[0].innerText ="$ "+ total;
    
}


function getItemsTotal(){
    var cartItems = document.querySelectorAll(".cart-items");
    // var count = document.querySelectorAll('input');
    var total_items= document.querySelector('.total-items');

    var totalCount =0
    for(var i=0; i<cartItems.length; i++){
        var cartItem = cartItems[i]
        var countElement = cartItem.querySelector('input');

        var count = countElement.value
        
        totalCount += parseInt(count)
    }
    total_items.innerText = totalCount;
}

function removeCartItems(e){
    
    // e.preventDefault();
    var bt = e.target
    var it = bt.parentElement;

    var totalCartItems = document.querySelector(".total-cart-items");
    
    totalCartItems.removeChild(it)
    updateCartTotal()
    getItemsTotal()

}


//validate input field

// function validateInputField(){
//     var cartItem = document.querySelector(".cart-items")
//     var countElement = cartItem.querySelector("input")
//     const initialVal = countElement.value;
//     if(countElement.value<1){
//         alert('Please enter value greater than 1');
//         countElement.value = initialVal;
//     }
// }

