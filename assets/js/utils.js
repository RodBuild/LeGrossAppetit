// give a path to an html file that has content
export async function createTemplate(path) {
    const content = await (await fetch(path)).text();
    const template = document.createElement('template');
    template.innerHTML = content;
    return template;
}
// render with template object and callback element
export async function renderTemplate(template, element) {
    let clone = template.content.cloneNode(true);
    element.appendChild(clone);
}
// load header/footer
export async function loadHeaderFooter() {
    const header = await createTemplate('../../head-foot/header.html');
    const headerElement = document.getElementById('main-header');
    const footer = await createTemplate('../../head-foot/footer.html'); 
    const footerElement = document.getElementById('main-footer');
    // now, render
    renderTemplate(header, headerElement);
    renderTemplate(footer, footerElement);

}
// General HTML to display an error
export function displayGeneralError(error) {
    return `
    <div class="error">
        <h1>There was an error processing your request!</h1>
        <h2>${error}</h2>
    </div> `
}

// Get data from the existing API
// extra, is for anything specific that we want from the API
export async function getDataFromAPI(source,outputElement,type,extra) {
    await fetch(source, {
        method: 'GET',
        headers: {},
    })
    // check for proper response
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error);
        }
        return response.json();
    })
    // now visualize data of JSON from API
    .then (data => {
        // clear "loading screen..."
        outputElement.innerHTML = ``;
        // loop through response data and add it to the html
        for (let i = 0; i < data.length; i++) {
            if (type === 'menu')
                outputElement.innerHTML += renderMenu(data[i]);
            else if (type === 'staff') {
                if (extra.username == data[i].username && extra.password == data[i].password) {
                    console.log(data[i].name);
                   outputElement.innerHTML += renderStaff(data[i]);
                    break;
                }
                // outputElement.innerHTML += renderStaff(data[i]);
            }
        }
    })
    .catch(function (err) {
        outputElement.innerHTML = displayGeneralError(err);
    })
}

// to post...
export async function postDataToAPI(source, outputElement, type, extra) {
    await fetch(source, {
        method: 'POST',
        headers: {extra},
    })
    .then((response) => {
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
}

// renderHTML
function renderMenu(item) {
    return `
    <div class="menu-item">
        <img src="data:image/jpeg;base64,${item.image}">
        <h3>${item.item}</h3>
        <p>${item.description}</p>
        <p>${item.price}</p>
        <button>Add to Cart</button>
    </div>
    `
}
function renderStaff(item) {
    // here we render the staff content from the getAPI
    // salary, hours, picture, etc...
    // console.log(item.);
    return `
    <form class="login-form" id="login-form">
        <div class="form-title">
            Personnel Information
        </div>
        <div class="form-input">
            <label for="username">New Username</label>
            <input type="text" id="username">
        </div>
        <div class="form-input">
            <label for="password">New Password</label>
            <input type="password" id="password">
        </div>
        <div class="form-input">
            <p class="role"><b>Role in restaurant:</b> ${item.position}</p>
            <p class="hours"><b>Hours per week:</b> 40</p>
            <p class="payment"><b>Payment per hour:</b> 20</p>
            <p class="description"><b>Description:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia maxime enim
                animi hic ullam! Delectus numquam nisi sequi earum vero odit libero, laudantium, porro deserunt facere
                ullam sapiente? Officia, placeat?</p>

        </div>
        <button type="submit" class="form-submit" id="form-update">Update</button>
    </form>
    `
}

// CHIKA
// Local Storage
// retrieve data from localStorage API
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// create/update localStorage object
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// clear localStorage
export function clearLocalStorage() {
    localStorage.clear();
}
