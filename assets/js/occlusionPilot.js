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

