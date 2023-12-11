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


function getAuthErrorContainer() {
    return document.getElementsByClassName('auth-error-container')[0];
}


function setAuthErrorMessage(message) {
    getAuthErrorContainer().innerText = message;
}


function checkAuth() {
    showLoading();
    isAuthenticated().then(authenticated => {
        if (authenticated) {
            showContent();
        } else {
            showAuth();
            storage.local.remove('token');
        }
    });
}


async function authenticate() {
    setAuthErrorMessage('');
    const login = document.getElementById('login-field').value;
    const password = document.getElementById('password-field').value;
    const result = await sendAuthRequest(login, password);
    if (result.success) {
        await storage.local.set({token: result.token});
        setHeader();
        checkAuth();
    } else {
        setAuthErrorMessage(result.errorMessage)
    }
}

async function logout() {
    const success = await sendLogoutRequest();
    if (success) {
        checkAuth();
    }
}

document.getElementById('auth-btn').addEventListener('click', authenticate);
document.getElementById('logout-btn').addEventListener('click', logout);
checkAuth();