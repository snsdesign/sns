document.addEventListener("DOMContentLoaded", () => {
    const selectors = [
        "section",
        ".project-card",
        ".tool-item",
        ".category-card",
        ".projects-hero-content",
        ".cta-content",
        ".showreel-video",
        "#btn-center"
    ];

    const excludedSelectors = [
        "header",
        ".dropdown-menu",
        ".search-results-box",
        ".hero-buttons",
        ".nav-links",
        ".site-search",
        ".language-switch"
    ];

    const fadeItems = Array.from(document.querySelectorAll(selectors.join(", "))).filter((item) => {
        return !excludedSelectors.some(
            (selector) => item.matches(selector) || item.closest(selector)
        );
    });

    if (!fadeItems.length) {
        return;
    }

    const setVisible = (item) => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
    };

    const setHidden = (item, delay) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(32px)";
        item.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`;
    };

    const isBelowViewport = (item) => {
        const rect = item.getBoundingClientRect();
        return rect.top > window.innerHeight * 0.92;
    };

    fadeItems.forEach((item) => {
        setVisible(item);
    });

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setVisible(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    requestAnimationFrame(() => {
        fadeItems.forEach((item, index) => {
            if (isBelowViewport(item)) {
                const delay = Number((index * 0.04).toFixed(2));
                setHidden(item, delay);
                observer.observe(item);
            }
        });
    });
});

/* Mobile floating liquid glass menu */
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".mobile-menu-toggle")) return;

    const toggle = document.createElement("button");
    toggle.className = "mobile-menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "<span></span>";

    const panel = document.createElement("nav");
    panel.className = "mobile-menu-panel";
    panel.setAttribute("aria-label", "Mobile menu");

    const path = window.location.pathname;
const isProjectDetailPage = path.includes("/pages/Projects/");
const isPagesPage = path.includes("/pages/");
const basePath = isProjectDetailPage ? "../../" : isPagesPage ? "../" : "";

const links = [
    ["home", `${basePath}index.html`],
    ["projects", `${basePath}pages/Projects.html`],
    ["about", `${basePath}pages/about.html`],
    ["contact", `${basePath}pages/contact.html`]
];

    links.forEach(([label, href]) => {
        const a = document.createElement("a");
        a.href = href;
        a.textContent = label;
        panel.appendChild(a);
    });

    const search = document.createElement("input");
    search.className = "mobile-menu-search";
    search.type = "search";
    search.placeholder = "search...";
    panel.appendChild(search);

    document.body.appendChild(panel);
    document.body.appendChild(toggle);

    const closeMenu = () => {
        toggle.classList.remove("is-open");
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("is-open");
        panel.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", panel.classList.contains("is-open"));
    });

    panel.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });
});