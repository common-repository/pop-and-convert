const lazyRetry = function (componentImport, name) {
    return new Promise((resolve, reject) => {
        const hasRefreshed = JSON.parse(
            window.sessionStorage.getItem(`retry-${name}-refreshed`) || 'false'
        );
        componentImport().then((component) => {
            window.sessionStorage.setItem(`retry-${name}-refreshed`, 'false')
            resolve(component);
        }).catch((error) => {
            if (!hasRefreshed) {
                window.sessionStorage.setItem(`retry-${name}-refreshed`, 'true');
                return window.location.reload()
            }
            reject(error);
        });
    });
};

export default lazyRetry