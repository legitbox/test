document.querySelectorAll(".list_link, #settings_title, #home_button").forEach((link) => {
  link.addEventListener("click", async (e) => {
    e.preventDefault();

    const href = e.target.getAttribute("href");
    if (href) {
      try {
        // Start page fade-out (optional, requires CSS)
        document.body.classList.add("fade-out");

        // Preload the page content
        const response = await fetch(href, { method: "GET", cache: "reload" });
        if (response.ok) {
          // Optional: Smoothly replace the DOM with fetched content
          const html = await response.text();
          const parser = new DOMParser();
          const newDoc = parser.parseFromString(html, "text/html");
          document.documentElement.innerHTML = newDoc.documentElement.innerHTML;

          // Restore the scroll position
          window.scrollTo(0, 0);
        } else {
          console.error("Failed to fetch the page:", response.statusText);
          // Fallback to default navigation
          window.location.href = href;
        }
      } catch (error) {
        console.error("Error preloading page:", error);
        // Fallback to default navigation
        window.location.href = href;
      }
    }
  });
});
