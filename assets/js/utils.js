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