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