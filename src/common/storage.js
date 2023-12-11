let storage;

if (typeof browser !== 'undefined') {
    storage = browser.storage;
} else if (typeof chrome !== 'undefined') {
    storage = chrome.storage;
} else {
    throw 'Unable to find storage';
}
