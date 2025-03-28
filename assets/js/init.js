if (navigator.userAgent.indexOf('AppleWebKit') != -1) {
    // Select all elements on the page
    const allElements = document.querySelectorAll('*');

    // Iterate through each element and set the font to a default sans-serif font
    allElements.forEach(element => {
        element.style.fontFamily = 'sans-serif';
    });
}
let body = document.querySelector('body');
body.style.filter = "saturate(1)";
