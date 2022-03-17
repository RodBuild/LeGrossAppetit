import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

// LISTEN TO ADD/REDUCE CART ITEMS
const addElement = document.querySelectorAll('.fa-plus')
console.log(addElement)
for (let i=0; i< addElement.length; i++) {
    addElement[i].addEventListener('click', function() {
        console.log('Clicked ADD, #',i)
        // When item found, we look for the current quantity and add it...
        // LATER REPLACE WITH LocalStorage
        var currentQuant = document.querySelectorAll('.quantity-number')
        var q = parseInt(currentQuant[i].textContent,10) + 1;
        console.log(q)
        currentQuant[i].innerHTML = q
    })
}

