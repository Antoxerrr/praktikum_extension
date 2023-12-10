const CLASS_TO_FIND_CONTAINER = 'source-tree__line-comment-wrapper';

const observerTarget = document.querySelector('.tabs__content.tabs-default__content.review__tabs-content');
const config = { childList: true, subtree: true };

function callback(mutationList, observer) {
    for (const mutation of mutationList) {
        for (const node of mutation.addedNodes) {
            if (node.classList && node.classList.contains(CLASS_TO_FIND_CONTAINER)) {
                renderTemplatesUI();
                return;
            }
        }
    }
}

const observer = new MutationObserver(callback);
observer.observe(observerTarget, config);

console.log(browser.storage.local.get('a').then(console.log))