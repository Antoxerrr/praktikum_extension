function createRoot(target) {
    const element = document.createElement( 'div');
    target.appendChild(element);
    element.setAttribute('class', 'templates-wrapper');
}

function renderTemplatesUI() {
    const targetNodes = document.getElementsByClassName('source-tree__comment-editor');
    for (const node of targetNodes) {
        createRoot(node)
    }
}