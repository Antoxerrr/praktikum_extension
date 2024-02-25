const CLASSES_TO_FIND_CONTAINER = ['source-tree__line-comment-wrapper', 'source-tree__comment-editor'];

const observerTarget = document.querySelector('.tabs__content.tabs-default__content.review__tabs-content');
const config = { childList: true, subtree: true };


function containsOneOf(target, items) {
    for (const item of items) {
        if (target.contains(item)) {
            return true
        }
    }
    return false;
}


function callback(mutationList, observer) {
    for (const mutation of mutationList) {
        for (const node of mutation.addedNodes) {
            if (node.classList && containsOneOf(node.classList, CLASSES_TO_FIND_CONTAINER)) {
                renderUI().then(r => {});
                return;
            }
        }
    }
}

const observer = new MutationObserver(callback);
observer.observe(observerTarget, config);
