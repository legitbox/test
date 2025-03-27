const observer = new IntersectionObserver(
    (entries) => {
      // Batch process entries
      for (const entry of entries) {
        const item = entry.target;
        if (entry.isIntersecting) {
          item.style.opacity = 1;
        } else {
          item.style.opacity = 0;
        }
      }
    },
    { root: null, rootMargin: "500px", threshold: 0 }
);

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

    ".container, .navbar, .index_container, .inline_container",
);
for (const item of el){
    item.style.backdropFilter = "blur(5px)";
    item.style.boxShadow = "5px 5px 1px 1px #0000008f";
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
            item.style.boxShadow = "5px 5px 1px 1px #0000008f";
        }
    }, 100);
});
