import {
    getLocalStorage,
    loadHeaderFooter,
    setLocalStorage
} from "./utils.js";

loadHeaderFooter();

// // LISTEN TO ADD/REDUCE CART ITEMS
// const addElement = document.querySelectorAll('.fa-plus')
// console.log(addElement)
// for (let i=0; i< addElement.length; i++) {
//     addElement[i].addEventListener('click', function() {
//         console.log('Clicked ADD, #',i)
//         // When item found, we look for the current quantity and add it...
//         // LATER REPLACE WITH LocalStorage
//         var currentQuant = document.querySelectorAll('.quantity-number')
//         var q = parseInt(currentQuant[i].textContent,10) + 1;
//         console.log(q)
//         currentQuant[i].innerHTML = q
//     })
// }

async function addListeners(cartContents) {
    let contents = await document.querySelectorAll('.product');
    contents.forEach(c => {
        let plus =  c.querySelectorAll('.fa-plus');
        let minus =  c.querySelectorAll('.fa-minus');
        let trash =  c.querySelectorAll('.product-delete');

        // plus first...
        plus.forEach(p => {
            // add click listener  
            p.addEventListener('click', function () {
                // get target name -> to refer to the local storage
                let name = p.parentElement.parentElement.querySelector('.product-name').textContent;
                // get target quantity -> to increase the number
                let qua = p.parentElement.parentElement.querySelector('.quantity-number');
                qua.innerHTML = parseInt(qua.textContent) + 1;
                // now update the localStorage
                cartContents.forEach(cc => {
                    if (cc[0] == name)
                        cc[2] += 1;
                })
                setLocalStorage('so-cart', cartContents);
                // update price HTML...
                const element = document.querySelector('.cart-total');
                // console.log(element.children[1].children[1].innerHTML);
                const price = element.children[0].children[1];
                const quantity = element.children[1].children[1];
                let q1 = 0;
                let p1 = 0;
                cartContents.forEach(cc => {
                    console.log(cc[2]);
                    q1 += cc[2];
                    p1 += (cc[1] * cc[2])
                });
                price.innerHTML = `$${p1}`;
                quantity.innerHTML = q1;
            })
        })
        // minus second...
        minus.forEach(m => {
            m.addEventListener('click', function () {
                // get target name -> to refer to the local storage
                let name = m.parentElement.parentElement.querySelector('.product-name').textContent;
                // get target quantity -> to decrease the number
                let qua = m.parentElement.parentElement.querySelector('.quantity-number');
                let newQuant = parseInt(qua.textContent) - 1;
                if (newQuant <= 0) {
                    let index = 0;
                    for (let i = 0; i < cartContents.length; i++) {
                        if (cartContents[i][0] == name) {
                            break;
                        }
                        index++;
                    }
                    // delete from array
                    cartContents.splice(index, 1);
                    // delete element
                    m.parentElement.parentElement.parentElement.remove();
                } else {
                    qua.innerHTML = newQuant;
                    cartContents.forEach(cc => {
                        if (cc[0] == name)
                            cc[2] -= 1;
                    })
                }
                setLocalStorage('so-cart', cartContents);
                // update price HTML...
                const element = document.querySelector('.cart-total');
                // console.log(element.children[1].children[1].innerHTML);
                const price = element.children[0].children[1];
                const quantity = element.children[1].children[1];
                let q1 = 0;
                let p1 = 0;
                cartContents.forEach(cc => {
                    // console.log(cc[2]);
                    q1 += cc[2];
                    p1 += (cc[1] * cc[2])
                });
                price.innerHTML = `$${p1}`;
                quantity.innerHTML = q1;
                // check if localStorage is empty
                const empty = getLocalStorage('so-cart');
                if (empty.length == 0) {
                    document.querySelector('.cart-total').remove();
                    document.querySelector('.products').remove();
                    document.querySelector('.empty').innerHTML = `<h2>Your Cart Is Empty! 😔</h2>`;
                }
            })
        })

        // trash last...
        trash.forEach(t => {
            console.log(t)
            t.addEventListener('click', function () {
                // get target name -> to refer to the local storage
                let name = t.parentElement.parentElement.querySelector('.product-name').textContent;
                let index = 0;
                for (; index < cartContents.length; index++) {
                    if (name == cartContents[index][0])
                        break;
                }
                // delete array item
                cartContents.splice(index, 1);
                // delete element
                t.parentElement.parentElement.remove();
                // console.log(t.parentElement.parentElement.remove())
                // update local storage
                setLocalStorage('so-cart', cartContents);
                // update price HTML...
                const element = document.querySelector('.cart-total');
                // console.log(element.children[1].children[1].innerHTML);
                const price = element.children[0].children[1];
                const quantity = element.children[1].children[1];
                let q1 = 0;
                let p1 = 0;
                cartContents.forEach(cc => {
                    console.log(cc[2]);
                    q1 += cc[2];
                    p1 += (cc[1] * cc[2])
                });
                price.innerHTML = `$${p1}`;
                quantity.innerHTML = q1;
                // check if localStorage is empty
                const empty = getLocalStorage('so-cart');
                if (empty.length == 0) {
                    document.querySelector('.cart-total').remove();
                    document.querySelector('.products').remove();
                    document.querySelector('.empty').innerHTML = `<h2>Your Cart Is Empty! 😔</h2>`;
                }
            })
        })
    })
}

// We probably want to connect to the API to retrieve the price
async function renderCartItems(productOutput) {
    const cartContents = getLocalStorage('so-cart');
    await cartContents.forEach(e => {
        productOutput.innerHTML += cartHTML(e);
    });
    // after rendering, add event listeners.... XD
    addListeners(cartContents);
}

function renderPrice(priceOutput) {
    const cartContents = getLocalStorage('so-cart');
    priceOutput.innerHTML = priceHTML(cartContents);
}

function cartHTML(e) {
    // for now, we force the same picture.....
    // We also force the same price....
    return `
    <div class="product">
        <img src="assets/pictures/food/menu/egg1.jpg">
        <div class="product-info">
            <h3 class="product-name">${e[0]}</h3>
            <h4 class="product-price">$${e[1]}</h4>
            <p class="product-quantity">Quantity: <span class="quantity-number">${e[2]}</span></p>
            <p class="product-add-remove">
                <i class="fa fa-plus" aria-hidden="true"></i>
                <i class="fa fa-minus" aria-hidden="true"></i>
            </p>
            <p class="product-delete">
                <i class="fa fa-trash" aria-hidden="true"></i>
                <span class="remove">Remove</span>
            </p>
        </div>
    </div>
    `
}

function priceHTML(cc) {
    let price = 0;
    let quantity = 0;
    cc.forEach(c => {
        quantity += c[2];
        price += (c[1] * c[2])
    });
    return `
    <p>
        <span>Total Price</span>
        <span>$${price}</span>
    </p>
    <p>
        <span>Number of Items</span>
        <span>${quantity}</span>
    </p>
    <p>
        <span>Taxes and Fees</span>
        <span>$15</span>
    </p>
    <a href="#">Proceed to Checkout</a>
    `
}




const products = document.querySelector('.products');
const price = document.querySelector('.cart-total');
renderCartItems(products);
// var x = JSON.parse(localStorage.getItem('so-cart'));
// console.log(x[0]);
if (getLocalStorage('so-cart').length != 0) {
    // document.querySelector('.empty').innerHTML = ``
    renderPrice(price);
} else {
    price.remove();
    products.remove();
    document.querySelector('.empty').innerHTML = `<h2>Your Cart Is Empty! 😔</h2>`
}