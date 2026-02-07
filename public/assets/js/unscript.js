const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const yearSpan = document.getElementById("year");
const links = document.querySelectorAll(".nav-links a");
const sections = Array.from(document.querySelectorAll("main section"));

const setTheme = (theme) => {
  body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
};

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  setTheme(storedTheme);
}

themeToggle?.addEventListener("click", () => {
  const current = body.dataset.theme === "light" ? "dark" : "light";
  setTheme(current);
});

yearSpan.textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 },
);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`,
          );
        });
      }
    });
  },
  { threshold: 0.6 },
);

sections.forEach((section) => {
  if (section.id) {
    sectionObserver.observe(section);
  }
});
