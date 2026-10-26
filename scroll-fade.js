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

/* Website search: generated page content, immediate results, no external service. */
document.addEventListener("DOMContentLoaded", () => {
    /* SEARCH_INDEX_START */
    const searchRecords = [{"title":"Home","category":"Page","path":"index.html","headings":"MINIMAL VISUALS. CINEMATIC EXECUTION. MOTION , VIDEO AND DIGITAL EXPERIENCES. Video Production Motion Design VFX & Post Production Web & Digital Design SELECTED WORK. Monumentvideo Kasteel van Laarne Circet Bliss Boost Affiliate car review SEAT FOMU Leporello Gerry's Fietsatelier MOTION. VIDEO. DIGITAL.","text":"Graphic & Motion Designer MINIMAL VISUALS. CINEMATIC EXECUTION. I create modern visual experiences through motion design, video production and digital design. With a strong eye for detail and a workflow built around efficiency and collaboration, I focus on creating work that feels cinematic, minimal and technically refined. View Projects About Me Featured project collage Circet project previewK Circet Internal videos Affiliate car review project preview SEAT Ibiza Affiliate Car Review asteel van Laarne Monumentvideo preview Kasteel van Laarne Monumentvideo FOMU project preview FOMU Visual Identity Motion, video and digital design Pause motion Services MOTION , VIDEO AND DIGITAL EXPERIENCES. From motion graphics and post production to digital design and web experiences, each service is built around clean visuals and technically refined execution. 01 Video Production Commercials, editing and full video production workflows from concept development to final delivery. 02 Motion Design Motion graphics, animated visuals and cinematic motion systems focused on rhythm, storytelling and clarity. 03 VFX & Post Production Visual effects, compositing and color grading focused on cinematic and polished final visuals. 04 Web & Digital Design Minimal and modern websites designed around usability, clean layouts and visual consistency. Featured projects Featured Projects SELECTED WORK. Kasteel van Laarne video preview Monumentvideo Kasteel van Laarne A cinematic exploration of Laarne Castle, capturing its historic architecture and atmosphere through carefully composed shots, visual storytelling and thoughtful editing. View Project Circet A series of animated explainer videos created for Circet, transforming complex internal information into clear, engaging visuals through custom illustrations, motion graphics and visual storytelling. View Project Bliss Boost visual identity preview Bliss Boost A vibrant visual identity built around bold typography, playful colors and a cohesive design language, bringing a fresh and recognizable personality to the brand. View Project SEAT Ibiza car review preview Affiliate car review SEAT A cinematic affiliate car review combining dynamic editing, storytelling and clean commercial visuals. View Project FOMU visual identity preview FOMU Leporello An editorial visual identity exploring photography, typography and graphic design. View Project FOMU visual identity preview Gerry's Fietsatelier Creating engaging short-form video content for a local bicycle workshop, combining dynamic editing, authentic visuals and storytelling tailored for social media. View Project View all projects Motion showreel Let’s work MOTION. VIDEO. DIGITAL. Available for freelance projects, creative collaborations and visual production across motion, video and digital design. View Projects Contact Me SNS Design logo","description":"I create modern visual experiences through motion design, video production and digital design.","aliases":"home start portfolio diensten services motion video digital digitaal showreel contact"},{"title":"Motion Projects","category":"Category","path":"pages/Motion.html","headings":"Selected work in motion . Monumentvideo Gerry's Fietsatelier Circet - Explainer videos Affiliate car review Sneaker commercial AR sports watch Winterwonderland A walk in the park","text":"Motion Projects Selected work in motion . This page gives an overview of all the motion projects that I have made in the past. From motion design to video work. Projects Monumentvideo A cinematic exploration of Laarne Castle through filming, editing and visual storytelling. View Project Gerry's Fietsatelier Short-form social content highlighting cycling safety and new products. View Project Circet - Explainer videos Animated explainer videos turning complex information into clear, engaging visuals. View Project Affiliate car review An automotive video focused on cinematic framing, editing and compositing. View Project Sneaker commercial A sneaker commercial combining dynamic visuals, editing and storytelling. View Project AR sports watch An augmented reality concept combining motion tracking, compositing and holographic visuals. View Project Winterwonderland A VFX project transforming a natural landscape into a snowy winter scene. View Project A walk in the park A 2D animation project combining character design, rigging and motion graphics. View Project Back","description":"This page gives an overview of all the motion projects that I have made in the past. From motion design to video work.","aliases":"motion animatie animaties video films montage videomontage vfx nabewerking"},{"title":"Eastpak × Juice WRLD","category":"Branding Project","path":"pages/Projects/999.html","headings":"Eastpak x Juice WRLD. Project gallery","text":"Project Eastpak x Juice WRLD. … … … … Visuals Project gallery A selection of visuals from the project. Back","description":"","aliases":"eastpak juice wrld juicewrld 999 rugzak backpack branding samenwerking"},{"title":"AR Sports Watch","category":"Motion Project","path":"pages/Projects/AR.html","headings":"AR sports watch.","text":"Project AR sports watch. For this project, I designed and integrated a futuristic Apple-inspired holographic interface into live-action footage. The goal was to create a realistic wearable UI that naturally emerged from a sports watch while blending seamlessly with the filmed environment. The interface follows a minimal design language using red, white, blue and fluorescent yellow accents. Performance data such as heart rate, step count, bar charts and circular graphs were animated to create a believable fitness dashboard. Particular attention was given to timing, motion and subtle animations to make the hologram feel responsive and alive. From motion tracking and camera tracking to rotoscoping, compositing and expressions, this project introduced me to several new visual effects techniques. Combined with sci-fi sound effects and an energetic soundtrack, the final result became a polished and immersive motion graphics piece. The biggest challenge was making the hologram feel convincing, which ultimately became the part I'm most proud of. Video Back","description":"For this project, I designed and integrated a futuristic Apple-inspired holographic interface into live-action footage. The goal was to create a realistic wearable UI that naturally emerged from a sports watch while blending seamlessly with the filmed environment.","aliases":"ar sporthorloge horloge hologram augmented reality vfx"},{"title":"C-fire Corporate Video","category":"Motion Project","path":"pages/Projects/C-fire.html","headings":"Corporate video C-fire Project gallery","text":"Project Corporate video C-fire work in progress... Shooting day 1 - Interview technician. Shooting day 2 - Interview Managing director. … Visuals Project gallery A selection of visuals from the project. Back","description":"","aliases":"cfire c fire bedrijfsfilm bedrijfsvideo corporate interview"},{"title":"Circet Explainer Videos","category":"Motion Project","path":"pages/Projects/Circet.html","headings":"Circet - Explainer Videos.","text":"Project Circet - Explainer Videos. For this project, I created a series of animated explainer videos for Circet, focusing on communicating internal information in a clear, engaging and visually appealing way. I combined custom illustrations, motion graphics and animation with voice-overs and subtitles to transform complex topics into accessible visual stories. Throughout the process, I focused on maintaining a consistent visual style aligned with Circet's corporate identity, while keeping the animations dynamic and easy to follow. This project allowed me to further develop my skills in 2D motion design, visual storytelling and corporate communication, while gaining experience creating professional content for a real company. Video Back","description":"For this project, I created a series of animated explainer videos for Circet, focusing on communicating internal information in a clear, engaging and visually appealing way.","aliases":"circet uitleg uitlegvideo instructievideo animatie telecom"},{"title":"Belgian Red Devils","category":"Branding Project","path":"pages/Projects/Devils.html","headings":"Belgian Red Devils. Project gallery","text":"Project Belgian Red Devils. … … … … Visuals Project gallery A selection of visuals from the project. Back","description":"","aliases":"belgian red devils rode duivels voetbal belgie belgium"},{"title":"FOMU Leporello","category":"Branding Project","path":"pages/Projects/FOMU.html","headings":"FOMU Leporello. Project gallery","text":"Project FOMU Leporello. For this project, I designed a photographic leporello inspired by the work of photographer Yaqine Hamzaoui, as part of a fictional exhibition concept for FOMU Antwerp. The goal was to explore visual contrasts through lines, combining original photography with editorial design. I created a series of photographs focusing on contrasting elements such as composition, perspective and lighting. These images were brought together in a fold-out brochure, using typography, layout and visual hierarchy to create a cohesive narrative that unfolds across the different panels. This project allowed me to further develop my skills in photography, photo editing and editorial design, while exploring how visual storytelling can translate into a physical printed format. Visuals Project gallery A selection of visuals from the project. FOMU project collage FOMU exhibition cover design inspired by Yaqine Hamzaoui The full FOMU leporello unfolded on a table Close-up of typography and photography on the centre panels Detail of contrasting photographs and the leporello folds Back cover of the FOMU leporello with exhibition information Back","description":"For this project, I designed a photographic leporello inspired by the work of photographer Yaqine Hamzaoui, as part of a fictional exhibition concept for FOMU Antwerp. The goal was to explore visual contrasts through lines, combining original photography with editorial design.","aliases":"fomu museum fotografie fotograaf fotoboek vouwfolder brochure leporello yaquine yaqine hamzaoui"},{"title":"Gerry’s Fietsatelier","category":"Motion Project","path":"pages/Projects/Gerry's Fietsatelier.html","headings":"Gerry's Fietsatelier - Social content. SOCIAL REELS. Visibility & safety Woom bike unboxing","text":"Project Gerry's Fietsatelier - Social content. For this project, I created two short-form social media videos for Gerry's Fietsatelier, a local cycling café where visitors can enjoy a drink and have their bicycles serviced or repaired. The goal was to create engaging content that highlights different aspects of the business and connects with its cycling community. The first reel focuses on cycling visibility and safety, using nighttime footage and a visual comparison to demonstrate the importance of reflective clothing and lights. The second reel introduces Woom bicycles to the shop through a short unboxing video, combining behind-the-scenes footage with product shots. Both videos were edited for social media, with attention to pacing, text overlays and visual storytelling. This project allowed me to further develop my skills in filming, editing and short-form content creation, while gaining experience communicating both informative and promotional messages for a real local business. Video SOCIAL REELS. Reel: cycling visibility and safety Reel zichtbaarheid Your browser does not support this video. Reel zichtbaarheid Open the visibility reel . 01 / Social content Visibility & safety Being seen makes the difference. Reel: Woom bike unboxing Woom bike reel Your browser does not support this video. Woom bike reel Open the Woom bike reel . 02 / Social content Woom bike unboxing A new arrival at the atelier. Back","description":"For this project, I created two short-form social media videos for Gerry's Fietsatelier, a local cycling café where visitors can enjoy a drink and have their bicycles serviced or repaired. The goal was to create engaging content that highlights different aspects of the business and connects with its cycling community.","aliases":"gerry gerrys atelier fiets fietsen fietsenwinkel fietscafe reels zichtbaarheid veiligheid woom unboxing"},{"title":"Kasteel van Laarne","category":"Motion Project","path":"pages/Projects/Kasteel van Laarne.html","headings":"Monumentvideo \"Kasteel van Laarne\".","text":"Project Monumentvideo \"Kasteel van Laarne\". For this project, I created a short cinematic video about the Castle of Laarne, focusing on its history, architecture and atmosphere. I combined cinematic footage with a voice-over, music, sound design and motion graphics to tell the story of the castle within a short format. During the project, I focused on shot variation, pacing and creating a balanced mix between visuals and audio. This project allowed me to further develop my skills in filming, editing, storytelling and motion design while creating a cohesive visual story around a historical location. Video Back","description":"For this project, I created a short cinematic video about the Castle of Laarne, focusing on its history, architecture and atmosphere.","aliases":"kasteel laarne monument monumentvideo erfgoed geschiedenis castle"},{"title":"Bliss Boost","category":"Branding Project","path":"pages/Projects/bliss boost.html","headings":"Bliss boost. Project gallery","text":"Project Bliss boost. For this project, I developed a complete brand identity for Bliss Boost, a fictional smoothie brand designed for the European market. The goal was to create a recognizable and approachable identity based on the Caregiver and Everyman brand archetypes, targeting active, family-oriented consumers. Starting with market research and concept development, I translated the brand's values into a cohesive visual identity, including logo design, typography, colors and a consistent graphic style. The identity was then applied across packaging, promotional materials and social media visuals, supported by a brandbook outlining the design guidelines. This project allowed me to further develop my skills in brand strategy, visual identity design and advertising, while learning how to build a consistent brand experience from initial research to final applications. Visuals Project gallery A selection of visuals from the project. Bliss Boost project collage Bliss Boost smoothie packaging in four pastel colours Bliss Boost logo in black and white Bliss Boost brand colour palette and colour codes Bliss Boost advertising poster in an outdoor setting Bliss Boost social media campaign mockups Back","description":"For this project, I developed a complete brand identity for Bliss Boost, a fictional smoothie brand designed for the European market. The goal was to create a recognizable and approachable identity based on the Caregiver and Everyman brand archetypes, targeting active, family-oriented consumers.","aliases":"blissboost smoothie smoothies drankjes blikjes verpakking verpakkingen huisstijl logo kleuren kleurenpalet caregiver everyman"},{"title":"SEAT Ibiza Review","category":"Motion Project","path":"pages/Projects/car review.html","headings":"Affiliate car review.","text":"Project Affiliate car review. This project was a group project at school. We had to make an affiliate car review (a review of a car that includes special links or promotions that earn the creator a commission when viewers take action, like buying or booking.) We made the review about the SEAT Ibiza. My tasks in this project were leader of production, director, editor, VFX & color grading. More detailed, I was the one who helped the cameraman and actor on set with framing and making sure we had every take. In postproduction I was the one who chose all the footage, made the cuts and layed the base for sound design. I also did the whole process of color grading. I made the footage go from a cold, rainy day to a beautiful summery, warm day. My final task in this project were the VFX. I applied all the 2D motion graphics, made the plot twist at the end and created zooms. Video Back","description":"This project was a group project at school. We had to make an affiliate car review (a review of a car that includes special links or promotions that earn the creator a commission when viewers take action, like buying or booking.) We made the review about the SEAT Ibiza.","aliases":"seat ibiza auto autoreview review affiliate autovideo"},{"title":"Edea Ice Skates Commercial","category":"Motion Project","path":"pages/Projects/edea.html","headings":"Edea ice skates sports commercial.","text":"Project Edea ice skates sports commercial. This project was all about completely changing the vibe of an existing video only via VFX. Color grading, background replacement, roto-scoping and transitions all part of this project. First I cut out the walking man via roto-scoping, also known as just masking. After that I replaced the background. This was done via Adobe Photoshop. Here I added the snow. Once that was done, I made the shot feel colder too, via color grading. After that I added the snow. This was done in Adobe After Effects via the particles tool. The last step was creating the transition from the original video to the new one. I did this via a simple wipe effect. Video Back","description":"This project was all about completely changing the vibe of an existing video only via VFX. Color grading, background replacement, roto-scoping and transitions all part of this project.","aliases":"edea schaatsen schaats kunstschaatsen sport commercial"},{"title":"Loop Earplugs × Lokerse Feesten","category":"Motion Project","path":"pages/Projects/loops.html","headings":"loop earplugs x Lokerse Feesten commercial.","text":"Project loop earplugs x Lokerse Feesten commercial. This was the first video I made in school. We had to make an attractive commercial about a sneaker of choice. I went for the classic Nike Air Force 1. The project was focused on storytelling in video but also commercially well thought. The strengths in this video were the color grading and the story itself. First the color grading. Noticed it? Probably not. But the first part of the story was shot in broad daylight and graded to nighttime in Davinci Resolve. The other strength of this video is the storytelling. I added an emotional part to the commercial via realm, which all was supported by audio, color grading and the camera angles. Video Back","description":"This was the first video I made in school. We had to make an attractive commercial about a sneaker of choice. I went for the classic Nike Air Force 1. The project was focused on storytelling in video but also commercially well thought.","aliases":"loop loops oordoppen oordopjes lokerse feesten productanimatie 3d"},{"title":"Nike Air Force 1","category":"Motion Project","path":"pages/Projects/sneaker.html","headings":"Sneaker commercial.","text":"Project Sneaker commercial. This was the first video I made in school. We had to make an attractive commercial about a sneaker of choice. I went for the classic Nike Air Force 1. The project was focused on storytelling in video but also commercially well thought. The strengths in this video were the color grading and the story itself. First the color grading. Noticed it? Probably not. But the first part of the story was shot in broad daylight and graded to nighttime in Davinci Resolve. The other strength of this video is the storytelling. I added an emotional part to the commercial via realm, which all was supported by audio, color grading and the camera angles. Video Back","description":"This was the first video I made in school. We had to make an attractive commercial about a sneaker of choice. I went for the classic Nike Air Force 1. The project was focused on storytelling in video but also commercially well thought.","aliases":"nike af1 air force sneaker sneakers schoenen commercial productvideo"},{"title":"Tahiti Dynamic Machine","category":"Motion Project","path":"pages/Projects/tahiti.html","headings":"tahiti soap dynamic machine.","text":"Project tahiti soap dynamic machine. … … … Video Back","description":"","aliases":"tahiti zeep soap dynamische machine rigid body cinema 4d"},{"title":"A Walk in the Park","category":"Motion Project","path":"pages/Projects/walk in the park.html","headings":"A walk in the park.","text":"Project A walk in the park. For this assignment I designed, rigged and animated a custom character for a 15-second commercial celebrating Park Spoor Noord. I also designed the whole environment, in style & colors of the Park Spoor Noord logo. From concept and illustration to character rigging, animation and sound design, the project focused on creating a playful story while showcasing professional 2D motion workflows. Video Back","description":"For this assignment I designed, rigged and animated a custom character for a 15-second commercial celebrating Park Spoor Noord. I also designed the whole environment, in style & colors of the Park Spoor Noord logo.","aliases":"walk park wandeling wandelen 2d illustratie animatie"},{"title":"Winter Wonderland","category":"VFX Project","path":"pages/Projects/winterwonderland.html","headings":"Winterwonderland.","text":"Project Winterwonderland. This project was all about completely changing the vibe of an existing video only via VFX. Color grading, background replacement, roto-scoping and transitions all part of this project. First I cut out the walking man via roto-scoping, also known as just masking. After that I replaced the background. This was done via Adobe Photoshop. Here I added the snow. Once that was done, I made the shot feel colder too, via color grading. After that I added the snow. This was done in Adobe After Effects via the particles tool. The last step was creating the transition from the original video to the new one. I did this via a simple wipe effect. Video Back","description":"This project was all about completely changing the vibe of an existing video only via VFX. Color grading, background replacement, roto-scoping and transitions all part of this project.","aliases":"winter wonderland sneeuw seizoen vfx compositing"},{"title":"Projects","category":"Page","path":"pages/Projects.html","headings":"PROJECTS IN MOTION AND BRANDING . Motion Design & Video Branding & Visual Identity","text":"Projects PROJECTS IN MOTION AND BRANDING . From commercials and motion graphics to branding and digital design, each project is built around storytelling, precision and clean visual direction. Motion Motion Design & Video Editing, VFX, 2D motion, compositing and 3D visuals. View Motion Projects Branding Branding & Visual Identity Layout, typography, concept and visual identity design. View Branding Projects","description":"From commercials and motion graphics to branding and digital design, each project is built around storytelling, precision and clean visual direction.","aliases":"projecten werk portfolio projectenoverzicht"},{"title":"About","category":"Page","path":"pages/about.html","headings":"Clean visuals. Detail-focused execution. Interested in working together ?","text":"About me Clean visuals. Detail-focused execution. I create visual work that feels modern, cinematic and purpose-driven. From motion graphics and editing to branding and digital design, I focus on creating visuals that are both technically refined and visually clear. View Projects SNS Design logo Who I am I am Sieben and I am currently studying Graphic & Digital Media at AP Hogeschool Antwerp. I’m a multidisciplinary creative focused on motion, video and digital design. By combining multiple creative disciplines into one workflow, I’m able to create projects that feel visually consistent, efficient and technically refined from start to finish. Project experience Throughout my studies and personal work, I’ve created projects ranging from cinematic commercials and affiliate reviews to branding concepts, motion pieces and digital layouts. My portfolio includes motion-driven commercials, visual identity work, affiliate content, branding concepts and experimental digital projects focused on storytelling and visual impact. Work ethic I like being closely involved throughout the entire creative process, from concept development to final delivery. By combining efficiency, flexibility and attention to detail, I aim to create work that feels both visually strong and professionally executed. I’m someone who always pushes projects further than expected, both creatively and technically. I focus on delivering clean visuals, efficient workflows and a collaborative experience throughout every stage of production. Strengths Cinematic video & editing Branding systems & layouts 2D motion graphics & VFX Social media visuals Web development Let’s connect Interested in working together ? Explore my projects or get in touch for collaborations, freelance work or creative opportunities. View Projects Contact Me","description":"I create visual work that feels modern, cinematic and purpose-driven.","aliases":"over mij sieben nopens opleiding ervaring vaardigheden software tools"},{"title":"Branding Projects","category":"Category","path":"pages/branding.html","headings":"Selected work in branding . FOMU Bliss Boost","text":"Branding Projects Selected work in branding . This page gives an overview of all the branding projects that I have made in the past. From branding concepts to visual identity. Projects FOMU A project focused on design for both digital and physical userflow. View Project Bliss Boost A project focused on creating a visual style and branding for a conceptual soda can brand. View Project Back","description":"This page gives an overview of all the branding projects that I have made in the past. From branding concepts to visual identity.","aliases":"branding huisstijl grafisch ontwerp logo visuele identiteit"},{"title":"Contact","category":"Page","path":"pages/contact.html","headings":"Let’s bring your vision to life. Contact details Where to find me Send me an e-mail","text":"Contact Let’s bring your vision to life. Interested in working together, collaborating on a project or just getting in touch? Feel free to reach out. I’m open to freelance work, creative collaborations and new opportunities. SNS Design logo Get in touch Contact details Email contact@snsdesign.org Phone +32 473 49 72 04 Message Send message Availability Open for freelance, collaborations and creative opportunities Online Where to find me LinkedIn Sieben Nopens Instagram sieben.ns14 YouTube snsdesign E-Mail Send me an e-mail Use the form below to quickly get in touch.","description":"Interested in working together, collaborating on a project or just getting in touch? Feel free to reach out. I’m open to freelance work, creative collaborations and new opportunities.","aliases":"contact contacteren email e mail telefoon bellen freelance samenwerken inhuren"}];
    /* SEARCH_INDEX_END */
    const scriptURL = [...document.scripts].find(script => /\/scroll-fade\.js(?:[?#]|$)/.test(script.src))?.src;
    const rootURL = new URL('.', scriptURL || document.baseURI);
    const normalize = text => String(text).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’'`]/g,'').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
    const stopWords = new Set(['de','het','een','van','voor','en','the','a','an','of','for','and','in','on','to']);
    const pages = searchRecords.map(page => ({...page,
        titleKey:normalize(page.title),
        aliasKey:normalize(page.aliases),
        headingKey:normalize(page.headings),
        contentKey:normalize(page.text),
        categoryKey:normalize(page.category),
        url:new URL(page.path.split('/').map(encodeURIComponent).join('/'),rootURL).href
    }));
    let boxNumber = 0;
    const boxes = new WeakMap();
    const close = input => {
        boxes.get(input)?.classList.remove('is-visible');
        input.setAttribute('aria-expanded','false');
    };
    function score(page,query,words){
        const all = `${page.titleKey} ${page.aliasKey} ${page.headingKey} ${page.contentKey} ${page.categoryKey}`;
        if(!words.every(word=>all.includes(word)))return 0;
        let points=page.titleKey===query ? 250:page.titleKey.includes(query) ? 140:0;
        for(const word of words){
            points+=page.titleKey.includes(word) ? 65:page.aliasKey.includes(word) ? 35:page.headingKey.includes(word) ? 25:8;
        }
        return points;
    }
    function render(input,expanded=false){
        const box=boxes.get(input);const query=normalize(input.value);
        box.replaceChildren();
        if(!query){close(input);return;}
        const tokens=query.split(' ');const useful=tokens.filter(word=>!stopWords.has(word));const words=useful.length ? useful:tokens;
        const results=pages.map(page=>({page,score:score(page,query,words)})).filter(result=>result.score>0).sort((a,b)=>b.score-a.score||a.page.title.localeCompare(b.page.title));
        const status=document.createElement('div');status.className='search-results-status';status.setAttribute('role','status');
        status.textContent=results.length ? `${results.length} ${results.length===1 ? 'result':'results'}`:'No results found. Try a project name or topic.';box.append(status);
        const shown=expanded ? results:results.slice(0,8);
        shown.forEach(({page})=>{
            const link=document.createElement('a');link.className='search-result-item';link.href=page.url;
            const category=document.createElement('span');category.textContent=page.category;
            const title=document.createElement('strong');title.textContent=page.title;link.append(category,title);
            if(page.description){const description=document.createElement('p');description.className='search-result-description';description.textContent=page.description.length>145 ? page.description.slice(0,142).trimEnd()+'…':page.description;link.append(description);}
            box.append(link);
        });
        if(results.length>shown.length){
            const more=document.createElement('button');more.type='button';more.className='search-results-more';more.textContent=`Show all ${results.length} results`;
            more.addEventListener('click',()=>{render(input,true);boxes.get(input).querySelectorAll('.search-result-item')[shown.length]?.focus();});box.append(more);
        }
        box.classList.add('is-visible');input.setAttribute('aria-expanded','true');
    }
    const inputs=[...document.querySelectorAll('#site-search-input, .site-search input, .mobile-menu-search')];
    inputs.forEach(input=>{
        input.setAttribute('autocomplete','off');input.setAttribute('aria-expanded','false');
        if(!input.hasAttribute('aria-label'))input.setAttribute('aria-label','Search the website');
        const box=document.createElement('div');box.className='search-results-box';box.id=`site-search-results-${++boxNumber}`;box.setAttribute('aria-label','Search results');
        input.parentElement.append(box);boxes.set(input,box);input.setAttribute('aria-controls',box.id);
        input.addEventListener('input',()=>render(input));
        input.addEventListener('focus',()=>{if(normalize(input.value))render(input);});
        input.addEventListener('keydown',event=>{
            if(event.key==='Enter'){event.preventDefault();const first=box.querySelector('.search-result-item');if(first)location.href=first.href;}
            if(event.key==='ArrowDown'){event.preventDefault();box.querySelector('.search-result-item')?.focus();}
            if(event.key==='Escape'){input.value='';close(input);}
        });
        box.addEventListener('keydown',event=>{
            const controls=[...box.querySelectorAll('a,button')];const index=controls.indexOf(document.activeElement);
            if(event.key==='ArrowDown'||event.key==='ArrowUp'){
                event.preventDefault();const direction=event.key==='ArrowDown' ? 1:-1;const next=index+direction;
                if(next<0)input.focus();else controls[Math.min(next,controls.length-1)]?.focus();
            }
            if(event.key==='Escape'){event.preventDefault();input.focus();close(input);}
        });
    });
    document.addEventListener('click',event=>inputs.forEach(input=>{if(!input.contains(event.target)&&!boxes.get(input).contains(event.target))close(input);}));
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
