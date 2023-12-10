const BASE_URL = 'https://backend.praktikum.antoxer.ru/api/v1/'
axios.defaults.baseURL = BASE_URL;

async function getAuthToken() {
    const result = await browser.storage.local.get('token');
    console.log(result.token)
    return result && result.token ? result.token : null;
}


function setHeader() {
    getAuthToken().then(token => {
        if (!token) {
            clearHeader();
        }
        axios.defaults.headers.common.Authorization = `Token ${token}`;
    })
}


function clearHeader() {
    axios.defaults.headers.common.Authorization = null;
}


async function isAuthenticated() {
    const result = await browser.storage.local.get('token');
    if (!result || !result.token) {
        return false;
    }
    return await testAPIAuth();
}


async function testAPIAuth() {
    const token = await getAuthToken() || '';
    try {
        const result = await axios.get('comments/templates');
        console.log(result)
        return true;
    } catch (e) {
        console.log(e.request)
        return false;
    }
}


async function sendAuthRequest(username, password) {
    try {
        const result = await axios.post('users/auth/login', {username, password});
        console.log(result)
    } catch (e) {
        console.log(e)
    }
}


// setHeader();
