async function getAuthToken() {
    const result = await storage.local.get('token');
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