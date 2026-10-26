document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const selectors = [
        "section:not(.services-section)",
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

    const isHome = document.body.dataset.page === "home";
    const fadeItems = Array.from(document.querySelectorAll(selectors.join(", "))).filter((item) => {
        // The automatic home gallery owns its motion; overview cards reveal individually.
        if (item.matches(".featured-projects")) return false;
        if (isHome && item.matches(".featured-projects .project-card")) return false;
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
            threshold: 0,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    requestAnimationFrame(() => {
        fadeItems.forEach((item, index) => {
            if (isBelowViewport(item)) {
                const delay = (index % 3) * 0.06;
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


/* Native scrolling with frame-rate-independent damping; no wheel interception. */
document.addEventListener("DOMContentLoaded", () => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width:901px) and (min-height:650px)");
    const pointer = matchMedia("(hover:hover) and (pointer:fine)");
    const story = document.querySelector('.featured-projects');
    const originalCards = [...(story?.querySelectorAll('.project-card') || [])];
    const cards = [...originalCards];
    // Three repeated sets keep recycling outside the viewport at both ends.
    // Repeats remain clickable but never add duplicate keyboard stops or announcements.
    for(let set=1;set<3;set++){
        originalCards.forEach(original => {
            const copy=original.cloneNode(true);
            copy.classList.add('is-loop-copy');
            copy.setAttribute('aria-hidden','true');
            copy.setAttribute('tabindex','-1');
            copy.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
            copy.querySelectorAll('a,button,input,[tabindex]').forEach(el=>el.setAttribute('tabindex','-1'));
            copy.addEventListener('click',event=>{
                if(event.target.closest('a'))return;
                const link=copy.querySelector('a[href]');if(link)location.href=link.href;
            });
            original.parentElement.append(copy);cards.push(copy);
        });
    }
    // Independent planes give hovered cards a reliable front layer in perspective.
    const planes = cards.map(card => {
        const plane = document.createElement('div');
        plane.className = 'project-plane';
        card.before(plane);plane.append(card);
        return plane;
    });
    const cardHover = cards.map(() => 0);
    let hoveredCard = null, focusedCard = null;
    const updateLayers = () => planes.forEach((plane,index) => {
        plane.classList.toggle('is-front',cards[index] === (hoveredCard || focusedCard));
        plane.style.setProperty('--plane-layer',20-index);
    });
    cards.forEach(card => {
        card.addEventListener('pointerenter',event => { if(event.pointerType==='touch')return;hoveredCard=card;updateLayers();wake(); });
        card.addEventListener('pointerleave',() => { if(hoveredCard===card)hoveredCard=null;updateLayers();wake(); });
        card.addEventListener('pointercancel',() => { hoveredCard=null;updateLayers();wake(); });
        card.addEventListener('focusin',() => {focusedCard=card;updateLayers();wake();});
        card.addEventListener('focusout',event => {if(!card.contains(event.relatedTarget)){focusedCard=null;updateLayers();wake();}});
    });
    updateLayers();
    const controls = story?.querySelector('.gallery-controls');
    const previous = controls?.querySelector('.gallery-prev');
    const next = controls?.querySelector('.gallery-next');
    const counter = controls?.querySelector('.gallery-count');
    const autoplayToggle = controls?.querySelector('.gallery-autoplay');
    let galleryVisible = false, galleryPaused = false, manualTarget = null;
    const collage = document.querySelector('.hero-collage');
    const collageCards = [...(collage?.querySelectorAll('.hero-collage-item') || [])];
    let collageVisible = true;
    const updateFloating = () => collage?.classList.toggle('is-floating',collageVisible && !reduced.matches && !paused);
    const holdCollageCard = card => {
        if(card.classList.contains('is-held'))return;
        card.style.setProperty('--held-transform',getComputedStyle(card).transform);
        card.classList.add('is-held');
    };
    const releaseCollageCard = card => {
        card.classList.remove('is-held');card.style.removeProperty('--held-transform');
    };
    collageCards.forEach(card => {
        card.addEventListener('pointerenter',event => {if(event.pointerType!=='touch')holdCollageCard(card);});
        card.addEventListener('pointerleave',() => {if(!card.matches(':focus-within'))releaseCollageCard(card);});
        card.addEventListener('pointercancel',() => releaseCollageCard(card));
        card.addEventListener('focusin',() => holdCollageCard(card));
        card.addEventListener('focusout',() => {if(!card.matches(':hover'))releaseCollageCard(card);});
    });
    const toggle = document.querySelector('.motion-toggle');
    const openingHero = document.querySelector('.hero:has(.hero-collage)');
    const services = document.querySelector('.services-section');
    let heroProgress = 0;
    // Dissolve outgoing sections while they are still visibly on screen.
    // The gallery uses its own surface so its background dissolves with the cards.
    const exitScenes = document.body.dataset.page === 'home'
        ? [...document.querySelectorAll('body > section, body > .motion-ribbon')].map(section => ({
            section,
            surface:section.querySelector('.projects-stage') || section,
            presence:1
        })) : [];
    // Word splitting and horizontal type motion belong to the index page only.
    // Other pages retain their authored text flow, spacing and punctuation.
    const headings = document.body.dataset.page === 'home'
        ? [...document.querySelectorAll('h1,.section-heading h2,.cta-content h2,.showreel .section-kicker')].filter(h=>h.textContent.trim())
        : [];
    const headingProgress = new WeakMap();
    let paused = false, frame = 0, lastTime = 0, current = 0, lastIndex = -1;
    let tiltX = 0, tiltY = 0, aimX = 0, aimY = 0;
    const movingHeadings = new Set();
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                movingHeadings.add(entry.target);
            } else movingHeadings.delete(entry.target);
        });
        wake();
    }, {rootMargin:'80px'}) : null;
    headings.forEach(heading => {
        if(heading.hasAttribute('data-line-motion')){
            [...heading.querySelectorAll('.kinetic-line')].forEach((line,index) => {
                line.classList.add('kinetic-word');
                line.style.setProperty('--word-index',index);
                line.style.setProperty('--word-direction',index%2 ? -.65:1);
            });
            if(observer){if(!reduced.matches)heading.classList.add('kinetic-ready');observer.observe(heading);}
            return;
        }
        const walker = document.createTreeWalker(heading,NodeFilter.SHOW_TEXT), nodes = [];
        while(walker.nextNode()) nodes.push(walker.currentNode);
        let index=0;
        nodes.forEach(node=>{
            const fragment=document.createDocumentFragment();
            node.textContent.split(/(\s+)/).forEach(part=>{
                if(!part.trim()){fragment.append(document.createTextNode(part));return;}
                const word=document.createElement('span');word.className='kinetic-word';word.textContent=part;
                word.style.setProperty('--word-index',Math.min(index,8));
                word.style.setProperty('--word-direction',index++%2 ? -.65:1);
                fragment.append(word);
            });
            node.replaceWith(fragment);
        });
        if(observer){
            if(!reduced.matches) heading.classList.add('kinetic-ready');
            observer.observe(heading);
        }
    });
    function wake(){if(!frame&&!document.hidden)frame=requestAnimationFrame(render);}
    function drawGallery(){
        const wide=innerWidth>900;
        const spacing=wide ? Math.min(innerWidth*.245,370) : Math.min(innerWidth*.84,440)+20;
        cards.forEach((card,index)=>{
            const count=cards.length;
            const d=((index-current+count/2)%count+count)%count-count/2;
            const x=(wide ? -210:0)+d*spacing;
            const lift=cardHover[index];
            const y=wide ? 75-d*70-lift*18 : -lift*5;
            const z=wide ? -Math.abs(d)*180+lift*130 : 0;
            card.style.setProperty('--card-pose',`translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),${z}px) rotateY(${wide ? -28+lift*15:0}deg) rotateZ(${wide ? -6+lift*3:0}deg) scale(${1+lift*.025})`);
            // Nearest cards cover the distant panels, independently of cycle number.
            planes[index].style.setProperty('--plane-layer',40-Math.round(Math.abs(d)*3));
        });
        const index=((Math.round(current)%originalCards.length)+originalCards.length)%originalCards.length;
        if(index!==lastIndex && counter){
            counter.textContent=`${String(index+1).padStart(2,'0')} / ${String(originalCards.length).padStart(2,'0')}`;
            previous.disabled=false;next.disabled=false;lastIndex=index;
        }
    }
    function render(time){
        frame=0;
        // Re-check on interaction as well as media events (some browsers defer those while focused).
        if(story && controls && originalCards.length>1 && story.classList.contains('is-gallery')===reduced.matches)configure();
        const dt=Math.min(64,lastTime ? time-lastTime:16);lastTime=time;
        const ease=1-Math.exp(-dt/115);
        let unsettled=false;
        if(story?.classList.contains('is-gallery')){
            if(manualTarget!==null){
                current=paused ? manualTarget:current+(manualTarget-current)*ease;
                if(Math.abs(manualTarget-current)<.0005){current=manualTarget;manualTarget=null;}
                else unsettled=true;
            }else if(galleryVisible && !paused && !galleryPaused && !hoveredCard && !focusedCard){
                current+=dt/14000; // One project every 14 seconds; time-based at every refresh rate.
                unsettled=true;
            }
            cardHover.forEach((value,index) => {
                const desired=planes[index].classList.contains('is-front') ? 1:0;
                cardHover[index]=paused ? desired:value+(desired-value)*(1-Math.exp(-dt/170));
                if(Math.abs(desired-cardHover[index])<.001)cardHover[index]=desired;else unsettled=true;
                planes[index].classList.toggle('is-returning',!desired && cardHover[index]>.01);
            });
            drawGallery();
        }
        if(!reduced.matches&&!paused){
            exitScenes.forEach(scene => {
                const rect=scene.section.getBoundingClientRect();
                const start=Math.max(1,Math.min(rect.height*.9,innerHeight*.95));
                const end=Math.min(innerHeight*.32,start*.45);
                const progress=Math.max(0,Math.min(1,(start-rect.bottom)/(start-end)));
                const desired=1-progress*progress*(3-2*progress);
                scene.presence+=(desired-scene.presence)*(1-Math.exp(-dt/65));
                if(Math.abs(desired-scene.presence)<.0005)scene.presence=desired;else unsettled=true;
                scene.surface.style.setProperty('--section-presence',scene.presence);
            });
            if(openingHero){
                const rect=openingHero.getBoundingClientRect();
                const heroTarget=Math.max(0,Math.min(1,-rect.top / Math.min(innerHeight*.85,rect.height*.8)));
                heroProgress+=(heroTarget-heroProgress)*ease;
                if(Math.abs(heroTarget-heroProgress)<.0005)heroProgress=heroTarget;else unsettled=true;
                const travel=Math.min(innerWidth*.48,720);
                openingHero.style.setProperty('--hero-travel',`${heroProgress*travel}px`);
                openingHero.style.setProperty('--hero-fade',1-heroProgress*.85);
                openingHero.style.setProperty('--hero-collage-exit',`${heroProgress*85}px`);
            }
            if(services){
                const rect=services.getBoundingClientRect();
                const layoutTop=rect.top-parseFloat(services.style.getPropertyValue('--section-lift')||'0');
                const reveal=Math.max(0,Math.min(1,(innerHeight-layoutTop)/(innerHeight*.65)));
                services.style.setProperty('--section-lift',`${(1-reveal)*100}px`);
                services.style.setProperty('--section-reveal',.25+reveal*.75);
            }
            movingHeadings.forEach(heading=>{
                const rect=heading.getBoundingClientRect();
                if(openingHero?.contains(heading))return;
                // Section titles use the same scroll motion as the hero.
                const host=heading.closest('.projects-stage') || heading.closest('section') || heading;
                const bounds=host.getBoundingClientRect();
                const range=Math.max(1,Math.min(innerHeight*.85,bounds.height*.8));
                const incoming=Math.max(0,Math.min(1,(bounds.top-innerHeight*.3)/(innerHeight*.7)));
                const desired=bounds.top>0 ? -incoming*.3 : Math.min(1,-bounds.top/range);
                let progress=headingProgress.get(heading) ?? desired;
                progress+=(desired-progress)*ease;
                if(Math.abs(desired-progress)<.0005)progress=desired;else unsettled=true;
                headingProgress.set(heading,progress);
                const travel=Math.min(innerWidth*.48,720)*(innerWidth<=900 ? .6:1);
                heading.style.setProperty('--heading-drift',`${progress*travel}px`);
            });
            tiltX+=(aimX-tiltX)*ease;tiltY+=(aimY-tiltY)*ease;
            if(collage?.classList.contains('is-interactive')){
                collage.style.setProperty('--tilt-x',`${tiltX}deg`);collage.style.setProperty('--tilt-y',`${tiltY}deg`);
                if(Math.abs(aimX-tiltX)+Math.abs(aimY-tiltY)>.01)unsettled=true;
            }
        }
        if(unsettled)wake();else lastTime=0;
    }
    function configure(){
        const enabled=!reduced.matches&&originalCards.length>1&&!!controls;
        story?.classList.toggle('is-gallery',enabled);
        if(controls)controls.hidden=!enabled;
        story?.style.removeProperty('--story-height');
        if(!enabled){
            story?.style.removeProperty('--story-height');
            cards.forEach(card=>{card.style.removeProperty('--card-pose');card.style.removeProperty('--card-layer');});
        }
        collage?.classList.toggle('is-interactive',pointer.matches&&!reduced.matches&&!paused);
        updateFloating();
        exitScenes.forEach(scene => {
            scene.surface.classList.toggle('exit-fade-surface',!reduced.matches&&!paused);
            if(reduced.matches||paused){scene.presence=1;scene.surface.style.removeProperty('--section-presence');}
        });
        openingHero?.classList.toggle('has-scroll-motion',!reduced.matches&&!paused);
        services?.classList.toggle('has-section-reveal',!reduced.matches&&!paused);
        if(reduced.matches||paused){
            heroProgress=0;
            openingHero?.style.removeProperty('--hero-travel');
            openingHero?.style.removeProperty('--hero-fade');
            openingHero?.style.removeProperty('--hero-collage-exit');
            services?.style.removeProperty('--section-lift');
            services?.style.removeProperty('--section-reveal');
            aimX=aimY=tiltX=tiltY=0;
            collage?.style.removeProperty('--tilt-x');collage?.style.removeProperty('--tilt-y');
            headings.forEach(h=>{h.classList.add('is-revealed');h.style.removeProperty('--heading-drift');headingProgress.delete(h);});
            document.querySelectorAll('[style*="opacity: 0"]').forEach(el=>{el.style.opacity='1';el.style.transform='none';});
        }
        wake();
    }
    function goTo(index,instant=false){
        if(!story?.classList.contains('is-gallery'))return;
        if(instant){
            current=index;manualTarget=null;
            story.querySelector('.projects-viewport').scrollLeft=0;
            drawGallery();
        }else manualTarget=index;
        wake();
    }
    previous?.addEventListener('click',()=>goTo(Math.round(current)-1));
    next?.addEventListener('click',()=>goTo(Math.round(current)+1));
    autoplayToggle?.addEventListener('click',()=>{
        galleryPaused=!galleryPaused;
        autoplayToggle.setAttribute('aria-pressed',String(galleryPaused));
        autoplayToggle.setAttribute('aria-label',galleryPaused ? 'Resume project loop':'Pause project loop');
        autoplayToggle.textContent=galleryPaused ? 'Play':'Pause';wake();
    });
    // Keep pointer focus from scrolling transformed cards between press and release.
    story?.querySelector('.projects-grid')?.addEventListener('mousedown',event=>{
        if(event.button===0 && story.classList.contains('is-gallery') && event.target.closest('.project-card'))event.preventDefault();
    });
    story?.querySelector('.projects-grid')?.addEventListener('focusin',event=>{
        const card=event.target.closest('.project-card');
        if(card && event.target.matches(':focus-visible'))goTo(cards.indexOf(card),true);
    });
    collage?.addEventListener('pointermove',event=>{
        if(paused||reduced.matches||!pointer.matches||event.pointerType==='touch')return;
        const rect=collage.getBoundingClientRect();
        aimX=-Math.max(-1,Math.min(1,(event.clientY-rect.top)/rect.height*2-1))*4;
        aimY=Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width*2-1))*5;wake();
    });
    const reset=()=>{aimX=aimY=0;wake();};
    collage?.addEventListener('pointerleave',reset);collage?.addEventListener('pointercancel',reset);
    toggle?.addEventListener('click',()=>{
        paused=!paused;document.body.classList.toggle('motion-paused',paused);
        toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Resume motion':'Pause motion';configure();
    });
    window.addEventListener('scroll',wake,{passive:true});
    window.addEventListener('resize',configure);
    window.addEventListener('focus',configure);
    window.addEventListener('load',configure,{once:true});
    reduced.addEventListener('change',configure);desktop.addEventListener('change',configure);pointer.addEventListener('change',configure);
    document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;lastTime=0;}else wake();});
    if(story && 'IntersectionObserver' in window){
        const galleryObserver=new IntersectionObserver(entries=>{
            galleryVisible=entries[0].isIntersecting;lastTime=0;wake();
        },{threshold:0});
        galleryObserver.observe(story);
    }else galleryVisible=!!story;
    if(collage && 'IntersectionObserver' in window){
        const floatObserver=new IntersectionObserver(entries=>{
            collageVisible=entries[0].isIntersecting;updateFloating();
        });
        floatObserver.observe(collage);
    }
    document.fonts?.ready.then(configure);configure();
});
