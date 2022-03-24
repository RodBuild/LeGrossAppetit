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
export function displayGeneralError() {
    return `
    <div class="error">
        <h1>There was an error processing your request!</h1>
    </div> `
}

// Get data from the existing API
export async function getDataFromAPI(source, url) {
    try {
        let server1 = await fetch(source + url)
        let data = await server1.json()
        // navigate through [0],[1],etc
        if (url == 'staff') {
            // console.log(data.staff)
            return data.staff;
        }
        else if (url == 'menu'){
            // console.log(data.menu)
            return data.menu;
        }
    } catch (error) {
        console.log(error)
        return 'bad'
    }
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
