const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const yearSpan = document.getElementById("year");
const projectsToggle = document.getElementById("projectsToggle");
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

const projectCards = Array.from(
  document.querySelectorAll(".projects .project-card"),
);
let projectsExpanded = false;
const recruiterProjectsLimit = 6;

const applyProjectsVisibility = () => {
  const sortedCards = [...projectCards].sort(
    (a, b) => Number(a.style.order || 0) - Number(b.style.order || 0),
  );

  const hasMoreThanLimit = sortedCards.length > recruiterProjectsLimit;

  sortedCards.forEach((card, index) => {
    const shouldHide =
      hasMoreThanLimit && !projectsExpanded && index >= recruiterProjectsLimit;
    card.classList.toggle("is-collapsed", shouldHide);
  });

  if (projectsToggle) {
    projectsToggle.hidden = !hasMoreThanLimit;
    projectsToggle.textContent = projectsExpanded ? "Voir moins" : "Voir plus";
    projectsToggle.setAttribute("aria-expanded", String(projectsExpanded));
  }
};

projectsToggle?.addEventListener("click", () => {
  projectsExpanded = !projectsExpanded;
  applyProjectsVisibility();
});

applyProjectsVisibility();
