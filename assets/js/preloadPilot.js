document.querySelectorAll(".list_link, #settings_title, #home_button").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    if (href) {
      fetch(href, { method: "GET", cache: "reload" })
          .then((response) => {
            if (response.ok) {
              response.text().then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const newContent = doc.querySelector("#main-content"); // Replace with your content area selector
                const currentContent = document.querySelector("#main-content");
                if (newContent && currentContent) {
                  currentContent.innerHTML = newContent.innerHTML;
                  history.pushState(null, "", href); // Update the URL
                }
              });
            }
          })
          .catch((error) => {
            console.error("Error preloading page:", error);
            window.location.href = href; // Fallback to default behavior
          });
    }
  });
});

window.addEventListener("popstate", () => {
  // Handle back/forward navigation
  window.location.reload();
});


