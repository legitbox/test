document.querySelectorAll(".list_link, #settings_title, #home_button").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const href = e.target.getAttribute("href");
    if (href) {
      fetch(href, { method: "GET", cache: "force-cache" })
          .then((response) => {
            if (response.ok) {
              window.location.href = href;
            }
          })
          .catch((error) => {
            console.error("Error preloading page:", error);
            window.location.href = href;
          });
    }
  });
});