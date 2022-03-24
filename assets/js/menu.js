const server = 'https://le-gros-appetit.herokuapp.com/feed/';
import { displayGeneralError, getDataFromAPI, getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.js";

loadHeaderFooter();

class Menu {
    constructor(outputElement) {
        this.outputElement = outputElement;
    }
    // setup all the data
    async init() {
        this.menuItems = await getDataFromAPI(server,'menu');
        this.displayMenu();
        this.listenToaddToCart();
    }
    displayMenu() {
        if (this.menuItems == 'bad') {
            this.outputElement.innerHTML = displayGeneralError();
            console.log(displayGeneralError())
        }
        else {
            // es7
            let newHTML = ''
            Object.keys(this.menuItems).forEach(key => {
                // console.log(this.menuItems[key]);
                newHTML += this.renderItem(this.menuItems[key])
            })
            this.outputElement.innerHTML = newHTML;
        }
    }
    renderItem(item) {
        // For now we are using a static picture
        // Change to item.image later... depending on API
        //<img src= "${item.image}" alt="picture">
        return `
        <div class="menu-item">
            <img src="assets/pictures/food/chad-montano-MqT0asuoIcU-unsplash.jpg">
            <h3>${item.item}</h3>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <button>Add to Cart</button>
        </div>
        `
    }
    listenToaddToCart() {
        const items = document.querySelectorAll('.menu-item');
        console.log(items);
        items.forEach(item => {
            item.addEventListener('click', function() {
                console.log(item);
                // get item name....
                const plate = item.children[1].innerHTML;
                const price = item.children[3].innerHTML;
                let cartContents =  getLocalStorage('so-cart');
                // if empty, create new
                if (!cartContents) {
                    cartContents = [];
                    cartContents.push([plate,price,1]);
                    setLocalStorage('so-cart',cartContents);
                }
                // else not empty
                else {
                    // we assume item does not exist
                    let exists = false;
                    cartContents.forEach(e => {
                        if (e[0] == plate) {
                            e[2] += 1;
                            // item exists, so we increase size
                            exists = true;
                        }
                    })
                    // item does not exist, we add it as new
                    if (exists == false) {
                        cartContents.push([plate,price,1]);
                    }
                    setLocalStorage('so-cart',cartContents);
                }
            })
        })
    }
} 

// ask backend team to add a uniqueID for each food item
const m = new Menu(document.querySelector('.menu'))
m.init();

