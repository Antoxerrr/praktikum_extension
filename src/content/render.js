const EDITOR_SELECTOR = '.source-tree__comment-editor:not([data-template_targeted])';

function createRoot(target) {
    const element = document.createElement( 'div');
    target.appendChild(element);
    target.dataset.template_targeted = 'true';
    element.setAttribute('class', 'templates-wrapper');
}

function renderTemplatesUI() {
    const targetNodes = document.querySelectorAll(EDITOR_SELECTOR);
    for (const node of targetNodes) {
        createRoot(node)
    }
}