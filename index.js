if ('serviceWorker' in navigator) {
    console.log('serviceworker supported');
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log("service worker registered"))
            .catch(err => console.log `serviceworker error: ${err}`)
    });
}