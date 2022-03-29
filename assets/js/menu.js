// const server = 'https://le-gros-appetit.herokuapp.com/feed/';
const server = 'https://le-gros-appetit.herokuapp.com/menu';
import { displayGeneralError, getDataFromAPI, getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.js";

loadHeaderFooter();

class Menu {
    constructor(outputElement) {
        this.outputElement = outputElement;
    }
    // setup all the data
    async init() {
        this.menuItems = await getDataFromAPI(server,this.outputElement,'menu');
        this.listenToaddToCart();
        // console.log(test);
        // this.menuItems.forEach(arr => {
        //     arr.forEach(e => {
        //       Object.keys(e).forEach(k => console.log(k))
        //     })
        // })
    }
    // displayMenu() {
    //     if (this.menuItems == 'bad') {
    //         this.outputElement.innerHTML = displayGeneralError();
    //         console.log(displayGeneralError())
    //     }
    //     else {
    //         // es7
    //         let newHTML = ''
    //         Object.keys(this.menuItems).forEach(key => {
    //             // console.log(this.menuItems[key]);
    //             newHTML += this.renderItem(this.menuItems[key])
    //         })
    //         this.outputElement.innerHTML = newHTML;
    //     }
    // }
    // getHTML() {
    //     // For now we are using a static picture
    //     // Change to item.image later... depending on API
    //     //<img src= "${item.image}" alt="picture">
    //     return `
    //     <div class="menu-item">
    //         <img src="assets/pictures/food/chad-montano-MqT0asuoIcU-unsplash.jpg">
    //         <h3>item</h3>
    //         <p>descrip</p>
    //         <p>price</p>
    //         <button>Add to Cart</button>
    //     </div>
    //     `
    // }
    listenToaddToCart() {
        const items = document.querySelectorAll('.menu-item');
        // console.log(items);
        items.forEach(item => {
            item.addEventListener('click', function() {
                console.log(item);
                // get item name....
                // console.log(item.children[0].getAttribute('src'));
                const picture = item.children[0].getAttribute('src');
                const plate = item.children[1].innerHTML;
                const price = item.children[3].innerHTML;
                let cartContents =  getLocalStorage('so-cart');
                // if empty, create new
                if (!cartContents) {
                    cartContents = [];
                    cartContents.push([picture,plate,price,1]);
                    setLocalStorage('so-cart',cartContents);
                }
                // else not empty
                else {
                    // we assume item does not exist
                    let exists = false;
                    cartContents.forEach(e => {
                        if (e[1] == plate) {
                            e[3] += 1;
                            // item exists, so we increase size
                            exists = true;
                        }
                    })
                    // item does not exist, we add it as new
                    if (exists == false) {
                        cartContents.push([picture,plate,price,1]);
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

