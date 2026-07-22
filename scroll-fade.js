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

/* Website search */
document.addEventListener("DOMContentLoaded", () => {
    function getBasePath(){
        const path = window.location.pathname;
        const isProjectDetailPage = path.includes("/pages/Projects/");
        const isPagesPage = path.includes("/pages/");

        if (isProjectDetailPage) return "../../";
        if (isPagesPage) return "../";
        return "";
    }

    const basePath = getBasePath();

    const sitePages = [
        {
            title: "Home",
            category: "Page",
            keywords: "home portfolio graphic design motion design showreel services featured projects",
            url: `${basePath}index.html`
        },
        {
            title: "Projects",
            category: "Page",
            keywords: "projects selected work motion branding video visual identity portfolio",
            url: `${basePath}pages/Projects.html`
        },
        {
            title: "Motion Projects",
            category: "Category",
            keywords: "motion video editing vfx commercials post production color grading showreel",
            url: `${basePath}pages/Motion.html`
        },
        {
            title: "Branding Projects",
            category: "Category",
            keywords: "branding visual identity layout design social media digital design fomu",
            url: `${basePath}pages/branding.html`
        },
        {
            title: "About",
            category: "Page",
            keywords: "about sieben graphic motion designer skills tools experience workflow",
            url: `${basePath}pages/about.html`
        },
        {
            title: "Contact",
            category: "Page",
            keywords: "contact email phone message freelance collaboration hire",
            url: `${basePath}pages/contact.html`
        }
    ];

    const projectPages = [
        {
            title: "SEAT Ibiza Review",
            category: "Motion Project",
            keywords: "seat ibiza affiliate car review video editing color grading vfx commercial automotive storytelling",
            url: `${basePath}pages/Projects/car review.html`
        },
        {
            title: "Sneaker Commercial",
            category: "Motion Project",
            keywords: "sneaker commercial nike product video motion design cinematic editing advertising",
            url: `${basePath}pages/Projects/sneaker.html`
        },
        {
            title: "FOMU",
            category: "Branding Project",
            keywords: "fomu branding layout visual identity graphic design museum photography editorial",
            url: `${basePath}pages/Projects/FOMU.html`
        },
        {
            title: "C-fire Corporate Video",
            category: "Motion Project",
            keywords: "c-fire corporate video company video interview motion graphics lower thirds color grading",
            url: `${basePath}pages/Projects/C-fire.html`
        },
        {
            title: "Loop Earplugs",
            category: "Motion Project",
            keywords: "loop earplugs lokerse feesten 3d product animation sound waves commercial motion",
            url: `${basePath}pages/Projects/loops.html`
        },
        {
            title: "tahiti dynamic machine",
            category: "Motion Project",
            keywords: "dynamic machine 3D 3d tahiti cinema 4D forces rigid body dynamics ",
            url: `${basePath}pages/Projects/tahiti.html`
        },
        {
            title: "Apple Watch Commercial",
            category: "Motion Project",
            keywords: "apple watch hi tech commercial smartwatch product video cinematic motion",
            url: `${basePath}pages/Projects/apple-watch.html`
        },
        {
            title: "AR sports watch",
            category: "Motion Project",
            keywords: "AR sports watch vfx ",
            url: `${basePath}pages/Projects/AR.html`
        },
        {
            title: "Edea ice skates sports commercial",
            category: "Motion Project",
            keywords: "edea ice skates sports commercial ",
            url: `${basePath}pages/Projects/edea.html`
        },
        {
            title: "Winter Wonderland",
            category: "VFX Project",
            keywords: "winter wonderland vfx snow compositing color grading matte painting before after",
            url: `${basePath}pages/Projects/winterwonderland.html`
        },
        {
            title: "SNS Design Website",
            category: "Web Project",
            keywords: "website web development portfolio html css liquid glass responsive design",
            url: `${basePath}pages/Projects/website.html`
        }
    ];

    const searchPages = [...sitePages, ...projectPages];

    function createResultsBox(input){
        let box = input.parentElement.querySelector(".search-results-box");

        if (!box) {
            box = document.createElement("div");
            box.className = "search-results-box";
            input.parentElement.appendChild(box);
        }

        return box;
    }

    function scoreResult(page, query){
        const searchableText = `${page.title} ${page.category} ${page.keywords}`.toLowerCase();
        const title = page.title.toLowerCase();

        if (title === query) return 100;
        if (title.includes(query)) return 80;
        if (searchableText.includes(query)) return 50;

        const words = query.split(" ").filter(Boolean);
        return words.reduce((score, word) => {
            return searchableText.includes(word) ? score + 10 : score;
        }, 0);
    }

    function renderResults(input){
        const query = input.value.trim().toLowerCase();
        const box = createResultsBox(input);

        if (!query) {
            box.classList.remove("is-visible");
            box.innerHTML = "";
            return;
        }

        const results = searchPages
            .map((page) => ({ ...page, score: scoreResult(page, query) }))
            .filter((page) => page.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);

        if (!results.length) {
            box.innerHTML = `
                <div class="search-result-empty">
                    No results found.
                </div>
            `;
            box.classList.add("is-visible");
            return;
        }

        box.innerHTML = results.map((page) => `
            <a class="search-result-item" href="${page.url}">
                <span>${page.category}</span>
                <strong>${page.title}</strong>
            </a>
        `).join("");

        box.classList.add("is-visible");
    }

    function setupSearchInput(input){
        input.setAttribute("autocomplete", "off");

        input.addEventListener("input", () => renderResults(input));

        input.addEventListener("keydown", (event) => {
            const box = createResultsBox(input);
            const firstResult = box.querySelector(".search-result-item");

            if (event.key === "Enter") {
                event.preventDefault();

                if (firstResult) {
                    window.location.href = firstResult.href;
                }
            }

            if (event.key === "Escape") {
                input.value = "";
                box.classList.remove("is-visible");
                box.innerHTML = "";
            }
        });

        document.addEventListener("click", (event) => {
            const box = createResultsBox(input);

            if (!input.contains(event.target) && !box.contains(event.target)) {
                box.classList.remove("is-visible");
            }
        });
    }

    const searchInputs = document.querySelectorAll(
        "#site-search-input, .site-search input, .mobile-menu-search"
    );

    searchInputs.forEach(setupSearchInput);
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        document.body.classList.add("has-scrolled");
    }
}, { once: true });

/* Make full project/category cards clickable */
document.addEventListener("DOMContentLoaded", () => {
    const clickableCards = document.querySelectorAll(".project-card, .category-card");

    clickableCards.forEach((card) => {
        const cardLink = card.querySelector("a[href]");

        if (!cardLink) return;

        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "link");

        card.addEventListener("click", (event) => {
            if (event.target.closest("a")) return;
            window.location.href = cardLink.href;
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                window.location.href = cardLink.href;
            }
        });
    });
});

/* Infinite services carousel */
document.addEventListener("DOMContentLoaded", () => {
    const servicesGrid = document.querySelector(".services-grid");

    if (!servicesGrid) return;

    const serviceCards = Array.from(servicesGrid.children);

    const buildCarousel = () => {
        servicesGrid.querySelectorAll(".is-clone").forEach((clone) => clone.remove());

        const setWidth = serviceCards.reduce(
            (width, card) => width + card.getBoundingClientRect().width,
            0
        );

        if (!setWidth) return;

        servicesGrid.style.setProperty("--services-set-width", `${setWidth}px`);

        const copiesNeeded = Math.max(2, Math.ceil(window.innerWidth / setWidth) + 1);

        for (let copy = 1; copy < copiesNeeded; copy += 1) {
            serviceCards.forEach((card) => {
                const clone = card.cloneNode(true);
                clone.setAttribute("aria-hidden", "true");
                clone.classList.add("is-clone");
                servicesGrid.appendChild(clone);
            });
        }
    };

    buildCarousel();

    let resizeTimer;
    window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(buildCarousel, 150);
    });
});
