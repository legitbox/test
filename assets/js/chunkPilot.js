function loadHTMLData() {
    return fetch(window.location.pathname.replace("skeleton_pages", "pages"))
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const returnData = parser.parseFromString(data, 'text/html');
            delete data;
            return returnData;
        })
        .catch(error => {
            console.error('Error fetching HTML:', error);
        });
}
async function main() {
    /// data setup
    const skeletonPageData = document.getElementsByClassName("scroll");
    const skeletonPageDataContainers = document.getElementsByClassName("container");
    let skeletonPageDataContainersLen = skeletonPageDataContainers.length;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let el = skeletonPageData[0].querySelectorAll(

        ".container, .navbar, .index_container, .inline_container",
    );

    for (const item of el) {
        item.style.backdropFilter = "blur(2px)";
    }

    let blurTimeout;

    let currentIndex = 45;
    const increment = 1000000000;

    // chunk pilot
    async function appendContainers() {
        const fullPageDataUnparsed = await loadHTMLData();
        const fullPageDataContainers = fullPageDataUnparsed.getElementsByClassName("container");
        const nextLimit = currentIndex + increment;

        for (let i = currentIndex; i < nextLimit && i < fullPageDataContainers.length; i++) {
            skeletonPageData[0].appendChild(fullPageDataContainers[i]);
            skeletonPageDataContainersLen++;
        }
        currentIndex = nextLimit;
    }

    document.addEventListener("DOMContentLoaded", function() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    observer.unobserve(entry.target);

                    document.querySelector(".loading_thingy_container").style.opacity = 1;
                    appendContainers();
                    if (currentIndex < skeletonPageDataContainersLen) {
                        console.log(`observing ${currentIndex}`);
                        observer.observe(skeletonPageDataContainers[currentIndex]);
                        el = skeletonPageData[0].querySelectorAll(
                            ".container, .navbar, .index_container, .inline_container",
                        );
                    } else {
                        document.querySelector(".loading_thingy_container").style.opacity = 0;
                        console.log(`${currentIndex} nad ${skeletonPageDataContainersLen}`);
                        console.log("All containers have been loaded.");
                    }
                }
            });
        });

        if (currentIndex <= skeletonPageDataContainers.length) {
            console.log(`observing ${currentIndex}`);
            observer.observe(skeletonPageDataContainers[currentIndex]);
        }

        // occlusion pilot
        skeletonPageData[0].addEventListener("scroll", function () {
            for (const item of el) {
                item.style.backdropFilter = "blur(0px)";
                clearTimeout(blurTimeout);
            }
            blurTimeout = setTimeout(() => {
                for (const item of el) {
                    item.style.backdropFilter = "blur(2px)";
                }
            }, 100);
        });
    });
}
main();
