const LOADING_WINDOW_CLS = 'loading-window';
const CONTENT_WINDOW_CLS = 'content-window';
const AUTH_WINDOW_CLS = 'auth-window';
const DISPLAY_NONE_CLS = 'd-none';

function hideAllWindows() {
    const allWindowsClasses = [
        LOADING_WINDOW_CLS,
        CONTENT_WINDOW_CLS,
        AUTH_WINDOW_CLS
    ]
    for (const windowCls of allWindowsClasses) {
        document.getElementsByClassName(windowCls)[0].classList.add(DISPLAY_NONE_CLS);
    }
}


function showByClass(cls) {
    hideAllWindows();
    document.getElementsByClassName(cls)[0].classList.remove(DISPLAY_NONE_CLS);
}


function showLoading() {
    showByClass(LOADING_WINDOW_CLS);
}


function showAuth() {
    showByClass(AUTH_WINDOW_CLS);
}


function showContent() {
    showByClass(CONTENT_WINDOW_CLS);
}

function checkAuth() {
    showLoading();
    isAuthenticated().then(result => {
        result ? showContent() : showAuth();
    });
}


async function Authenticate() {
    const login = document.getElementById('login-field').value;
    const password = document.getElementById('password-field').value;
    sendAuthRequest(login, password).then(console.log)
}

document.getElementById('auth-btn').addEventListener('click', Authenticate);

checkAuth();