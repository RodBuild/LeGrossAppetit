import {
    getLocalStorage,
    loadHeaderFooter,
    setLocalStorage
} from "./utils.js";

loadHeaderFooter();

async function addListeners(cartContents) {
    let contents = await document.querySelectorAll('.product');
    contents.forEach(c => {
        let plus = c.querySelectorAll('.fa-plus');
        let minus = c.querySelectorAll('.fa-minus');
        let trash = c.querySelectorAll('.product-delete');

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
                    if (cc[1] == name)
                        cc[3] += 1;
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
                    // console.log(cc[2]);
                    q1 += cc[3];
                    p1 += (cc[2] * cc[3])
                });
                price.innerHTML = `$${Math.ceil(p1)-0.01}`;
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
                        if (cartContents[i][1] == name) {
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
                        if (cc[1] == name)
                            cc[3] -= 1;
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
                    q1 += cc[3];
                    p1 += (cc[2] * cc[3])
                });
                price.innerHTML = `$${Math.ceil(p1)-0.01}`;
                quantity.innerHTML = q1;
                // check if localStorage is empty
                const empty = getLocalStorage('so-cart');
                if (empty.length == 0) {
                    document.querySelector('.cart-total').remove();
                    document.querySelector('.products').remove();
                    document.querySelector('.information').remove();
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
                    if (name == cartContents[index][1])
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
                    q1 += cc[3];
                    p1 += (cc[2] * cc[3])
                });
                price.innerHTML = `$${Math.ceil(p1)-0.01}`;
                quantity.innerHTML = q1;
                // check if localStorage is empty
                const empty = getLocalStorage('so-cart');
                if (empty.length == 0) {
                    document.querySelector('.cart-total').remove();
                    document.querySelector('.products').remove();
                    document.querySelector('.information').remove();
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
    // Add event listener to checkout button
    document.querySelector('.checkoutBtn').addEventListener('click', () => {
        confirmOrder();
    })

}

function cartHTML(e) {
    // for now, we force the same picture.....
    // We also force the same price....
    return `
    <div class="product">
        <img src="${e[0]}">
        <div class="product-info">
            <h3 class="product-name">${e[1]}</h3>
            <h4 class="product-price">$${e[2]}</h4>
            <p class="product-quantity">Quantity: <span class="quantity-number">${e[3]}</span></p>
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
        quantity += c[3];
        price += (c[2] * c[3])
    });
    price = Math.ceil(price) - 0.01
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
    <a class="checkoutBtn" href="#">Proceed to Checkout</a>
    `
}




const products = document.querySelector('.products');
const price = document.querySelector('.cart-total');
const information = document.querySelector('.information');
renderCartItems(products);
// var x = JSON.parse(localStorage.getItem('so-cart'));
// console.log(x[0]);
if (getLocalStorage('so-cart').length != 0) {
    // document.querySelector('.empty').innerHTML = ``
    renderPrice(price);
} else {
    price.remove();
    products.remove();
    information.remove();
    document.querySelector('.empty').innerHTML = `<h2>Your Cart Is Empty! 😔</h2>`
}


// POST API, TO ACCEPT ORDERS...
// let mockOrder = [
//     {'Order':'131','Card': '1234 1234 1234','Items':[['items','2'],['item2','3'],['item3','4']]},
//     {'Order':'132','Card': '1234 1234 1234','Items':['item4','item5','item6']},
// ]
// const mockAPI = 'https://run.mocky.io/v3/f903a4f3-9b8c-4576-8354-3204c950aecb'
const ordersAPI = 'https://le-gros-appetit.herokuapp.com/orders';
async function confirmOrder() {
    const cartContents = getLocalStorage('so-cart');
    // today's date - unused
    const today = new Date().toISOString().slice(0, 10)
    // list of items in localStorage
    let listItems = []
    let quantity = 0;
    cartContents.forEach(item => {
        // listItems.push([item[1],item[2],item[3]]);
        quantity += item[3];
        listItems.push(item[1]);
    })
    // querySelectors for card, and address
    const name = document.getElementById('name').value;
    const card = document.getElementById('card').value;
    const address = document.getElementById('address').value;
    if (name == '' || address == '' || card == '') {
        console.log('Error should be displayed!')
    } else {
        // let mockOrder = {'Items': listItems, 'Card:':card,'Address':address,'Date':today}
        let mockOrder = {
            'name': name,
            'items': listItems,
            'quantity': quantity,
            'address': address
        }
        console.log(mockOrder)
        await fetch(ordersAPI, {
                method: 'POST',
                mode: 'cors',
                // headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(mockOrder),
            })
            .then(response => {
                if (!response.ok)
                    console.error('Response was bad: ' + response.ok)
                // throw new Error(response.error);
                else
                    return response.json()
            })
            .then(data => {
                console.log(data)
            })
    }
}