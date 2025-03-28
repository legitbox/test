if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/assets/js/workers/CacheWorker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

const pageData = document.getElementsByClassName("scroll");
let blurTimeout;
let el = pageData[0].querySelectorAll(

    ".container, .index_container, .inline_container, .navbar",
);

for (const item of el){
    item.style.backdropFilter = "blur(5px)";
    item.style.boxShadow = "3px 3px 1px 1px rgba(0, 0, 0, 0.5)";
}

pageData[0].addEventListener("scroll", function () {
    for (const item of el) {
        item.style.backdropFilter = "blur(0px)";
        item.style.boxShadow = "none";
        clearTimeout(blurTimeout);
    }
    blurTimeout = setTimeout(() => {
        for (const item of el) {
            item.style.backdropFilter = "blur(5px)";
            item.style.boxShadow = "3px 3px 1px 1px rgba(0, 0, 0, 0.5)";
        }
    }, 150);
});