(() => {
  const params = new URLSearchParams(location.search);
  if (params.get("entryOnly") === "1") {
    document.body.classList.add("poc-entry-only");
    document.querySelector(".artifact-record--poc")?.classList.add("is-visible");
  }
  document.querySelectorAll(".entry-image-media.is-carousel").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const dots = [...carousel.querySelectorAll(".carousel-dots span")];
    if (!track || !dots.length) return;
    const update = () => {
      const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    };
    track.addEventListener("scroll", update, {passive:true}); update();
  });
})();
