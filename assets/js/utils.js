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
export async function getDataFromAPI(source,outputElement,type) {
    await fetch(source, {
        method: 'GET',
        mode: 'cors',
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
            else if (type === 'staff')
                outputElement.innerHTML += renderStaff(data[i]);
        }
    })
    .catch(function (err) {
        outputElement.innerHTML = displayGeneralError(err);
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
function renderStaff() {

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
