if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
        setInterval(function () {
            console.log('setInterval');
            registration.update();
        }, 2000);
    })
}
