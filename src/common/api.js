const BASE_URL = 'https://backend.praktikum.antoxer.ru/api/v1/'
axios.defaults.baseURL = BASE_URL;


async function isAuthenticated() {
    const token = await getAuthToken();
    if (!token) {
        return false;
    }
    return await testAPIAuth();
}


async function testAPIAuth() {
    const token = await getAuthToken() || '';
    try {
        const result = await axios.get('comments/templates');
        return true;
    } catch (e) {
        return false;
    }
}


async function sendAuthRequest(username, password) {
    clearHeader();
    const result = {success: true}
    try {
        const response = await axios.post('users/auth/login/', {username, password});
        result.token = response.data.token;
    } catch (e) {
        result.success = false;
        result.errorMessage = e.response.data[0];
    }
    return result;
}


async function sendLogoutRequest() {
    try {
        const response = await axios.post('users/auth/logout/');
        return true;
    } catch (e) {
        return false;
    }
}


async function requestDataOrError(url, errorMessage, params, data) {
    try {
        const response = await axios.get(url, {params: params || {}, data: data || {}});
        return response.data;
    } catch (e) {
        throw new Error(errorMessage)
    }
}


async function getProjectsListRequest() {
    return await requestDataOrError('comments/projects/', 'Не удалось получить список проектов.');
}


async function getCommentTemplatesRequest(params) {
    return await requestDataOrError(
        'comments/templates/',
        'Не удалось получить список шаблонов комментариев.',
        params
    );
}


setHeader();
