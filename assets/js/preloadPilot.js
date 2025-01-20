document.querySelectorAll(".list_link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const href = e.target.getAttribute("href");
    if (href) {
      fetch(href, { method: "GET", cache: "reload" })
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


