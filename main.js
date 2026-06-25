/* ============================================================
   MOHAMMED RINSHAN P - MAIN JS
   First-person portfolio experience
============================================================ */

const portfolioData = {
  nav: [
    { label: "Home", target: "#worldViewport" },
    { label: "About", target: "#about" },
    { label: "Skills", target: "#skills" },
    { label: "Projects", target: "#projects" },
    { label: "Contact", target: "#contact" }
  ],
  skills: [
    { name: "HTML & CSS", short: "UI", level: 95, detail: "Semantic layouts, responsive systems, modern CSS and polished interfaces." },
    { name: "JavaScript (ES6+)", short: "JS", level: 90, detail: "DOM behavior, component logic, data rendering and interaction-heavy pages." },
    { name: "React.js", short: "RX", level: 85, detail: "Reusable UI, hooks, state-driven screens and production-ready frontend flows." },
    { name: "GSAP & Motion", short: "FX", level: 88, detail: "ScrollTrigger stories, smooth transitions and animation systems with restraint." },
    { name: "Python & ML", short: "AI", level: 80, detail: "Data processing, algorithms, and core machine learning fundamentals." },
    { name: "UI Debugging", short: "QA", level: 86, detail: "Fixing layout, timing, responsiveness and browser behavior issues." }
  ],
  storyQuotes: [
    "Every great build starts with a single curious thought.",
    "I chase problems that matter — not just tasks on a list.",
    "Learning is my fuel. Building is how I prove it.",
    "This path is mine — still writing every chapter."
  ],
  projects: [
    {
      title: "E-Commerce UI",
      stack: ["React", "JavaScript", "CSS3", "GSAP"],
      languages: ["HTML", "CSS", "JavaScript"],
      preview: "shop",
      description: "A conversion-focused shopping experience with animated product states, responsive grids, and a bold hero that guides users from discovery to checkout."
    },
    {
      title: "AI Metrics Dashboard",
      stack: ["React", "Chart.js", "TypeScript", "REST API"],
      languages: ["TypeScript", "JavaScript", "HTML", "CSS"],
      preview: "dashboard",
      description: "An analytics dashboard for tracking AI model performance — live metric cards, trend visualizations, and status indicators designed for clarity at a glance."
    },
    {
      title: "Creative Agency Portfolio",
      stack: ["Next.js", "Three.js", "GSAP", "Framer Motion"],
      languages: ["JavaScript", "TypeScript", "CSS"],
      preview: "agency",
      description: "A cinematic portfolio for a creative agency — immersive scroll storytelling, 3D accents, and polished case-study layouts that sell the work before words do."
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  prepareSectionTargets();
  renderNavigation();
  renderHeroEditor();
  renderSkills();
  renderProjects();
  cleanLegacyText();

  initLoader();
  initCursor();
  const lenis = initLenisAndGSAP();
  initThreeJSHero();
  initHeroTyping();
  initFireflies();
  initPOVStory();
  initChapterRail();
  initMobileNav();
  initProfileUpload();
  initContactForm();
  initContactMonitor3D();
  initStoryQuotes(); 

  window.addEventListener("resize", () => {
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  });
});

function prepareSectionTargets() {
  const skillsWrap = document.querySelector(".tech-stack-wrap");
  if (skillsWrap && !skillsWrap.id) skillsWrap.id = "skills";
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderNavigation() {
  const navLinks = document.getElementById("navLinks");
  const drawerLinks = document.getElementById("navDrawerLinks");

  const linkHTML = portfolioData.nav.map((item, index) => `
    <a class="nav-link${index === 0 ? " active" : ""}" href="${item.target}" data-target="${item.target}">
      ${escapeHTML(item.label)}
    </a>
  `).join("");

  if (navLinks) navLinks.innerHTML = linkHTML;
  if (drawerLinks) drawerLinks.innerHTML = linkHTML;
}

function renderHeroEditor() {
  const body = document.querySelector("#codeTerminal .term-body");
  if (!body) return;

  body.id = "heroEditor";
  body.innerHTML = `
    <div class="editor-row"><span class="line-no">01</span><span class="token keyword">const</span> <span class="token variable">rinshan</span> <span class="token operator">=</span> <span class="token punctuation">{</span></div>
    <div class="editor-row"><span class="line-no">02</span>  <span class="token property">role</span><span class="token operator">:</span> <span class="token string">'Frontend Developer'</span><span class="token punctuation">,</span></div>
    <div class="editor-row"><span class="line-no">03</span>  <span class="token property">focus</span><span class="token operator">:</span> <span class="token string">'animated web experiences'</span></div>
    <div class="editor-row"><span class="line-no">04</span><span class="token punctuation">}</span><span class="token punctuation">;</span></div>
    <div class="editor-row live-row"><span class="line-no">05</span><span id="heroTypedCode"></span><span class="t-cursor" id="termCursor">|</span></div>
  `;
}

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  grid.innerHTML = portfolioData.skills.map(skill => `
    <article class="skill-card" data-level="${skill.level}" data-short="${escapeHTML(skill.short)}">
      <div class="sk-head">
        <span>${escapeHTML(skill.name)}</span>
        <span class="sk-pct">0%</span>
      </div>
      <p class="sk-meta">${escapeHTML(skill.detail)}</p>
      <div class="sk-bar"><div class="sk-fill"></div></div>
    </article>
  `).join("");
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = portfolioData.projects.map((project, index) => `
    <article class="proj-card proj-showcase" id="project-${index + 1}" data-index="${index}">
      <div class="project-preview preview-${project.preview}" aria-label="${escapeHTML(project.title)} preview">
        <div class="preview-browser">
          <div class="preview-top"><span></span><span></span><span></span></div>
          <div class="preview-screen">${renderProjectPreview(project.preview)}</div>
        </div>
        <a href="https://github.com/YOUR_USERNAME/${project.title.replace(/\s+/g, '-').toLowerCase()}" target="_blank" class="proj-github-icon" title="View Source on GitHub">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <span class="proj-index">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="project-body">
        <h3>${escapeHTML(project.title)}</h3>
        <p class="proj-desc">${escapeHTML(project.description)}</p>
        <div class="proj-tech-block">
          <span class="proj-tech-label">Tech Stack</span>
          <div class="project-tags">
            ${project.stack.map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function renderProjectPreview(type) {
  if (type === "dashboard") return "<span></span><span></span><span></span><span></span>";
  return "";
}

function cleanLegacyText() {
  const profileIcon = document.querySelector(".p-icon");
  if (profileIcon) profileIcon.textContent = "IMG";
}

function initStoryQuotes() {
  const quoteBar = document.getElementById("storyQuoteBar");
  const quoteText = document.getElementById("storyQuoteText");
  if (!quoteBar || !quoteText || !portfolioData.storyQuotes) return;

  const quotes = portfolioData.storyQuotes;

  if (typeof ScrollTrigger === "undefined") return;

  ScrollTrigger.create({
    trigger: "#worldViewport",
    start: "top top",
    end: () => `+=${getStoryScrollDistance()}`,
    onUpdate: (self) => {
      const progress = self.progress;
      
      let chapter = 0;
      if (progress > 0.15 && progress <= 0.40) chapter = 1;
      else if (progress > 0.40 && progress <= 0.65) chapter = 2;
      else if (progress > 0.65) chapter = 3;

      if (quoteText.textContent !== quotes[chapter]) {
        quoteText.textContent = quotes[chapter];
      }

      const isTransitioning = 
        (progress > 0.08 && progress < 0.22) || 
        (progress > 0.38 && progress < 0.52) || 
        (progress > 0.68 && progress < 0.82);

      if (isTransitioning) {
        quoteBar.classList.add("visible");
      } else {
        quoteBar.classList.remove("visible");
      }
    }
  });
}

function initLoader() {
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderFill");
  if (!loader || !fill) return;

  let progress = 0;
  const intv = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    fill.style.width = `${progress}%`;
    if (progress === 100) {
      clearInterval(intv);
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        document.body.classList.add("loaded");
      }, 500);
    }
  }, 160);
}

function initCursor() {
  const cur = document.getElementById("cur");
  const ring = document.getElementById("curRing");
  if (!cur || !ring || window.matchMedia("(pointer: coarse)").matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cur.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  const interactables = document.querySelectorAll("a, button, input, textarea, .profile-pic-zone, .nav-link");
  interactables.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cur.classList.add("hover");
      ring.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cur.classList.remove("hover");
      ring.classList.remove("hover");
    });
  });
}

function initLenisAndGSAP() {
  const hasGSAP = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  let lenis = null;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.35,
      lerp: 0.08,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
      smoothWheel: true,
      normalizeScroll: true
    });

    window.portfolioLenis = lenis;
    if (hasGSAP) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    lenis.on("scroll", ({ progress, scroll }) => {
      updateScrollUI(progress, scroll);
      updateActiveNavigation();
    });
  } else {
    window.addEventListener("scroll", () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      updateScrollUI(progress, window.scrollY);
      updateActiveNavigation(); 
    }, { passive: true });
  }

  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = target.id === "worldViewport" ? 0 : -90;
      if (lenis) lenis.scrollTo(target, { duration: 1.15, offset });
      else target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  updateActiveNavigation();
  return lenis;
}

function updateScrollUI(progress, scroll) {
  const scrollBar = document.getElementById("scrollBar");
  const nav = document.getElementById("nav");

  if (scrollBar) scrollBar.style.width = `${Math.max(0, Math.min(1, progress)) * 100}%`;
  if (nav) nav.classList.toggle("scrolled", scroll > 20);
}

function updateActiveNavigation() {
  const sections = ["#worldViewport", "#about", "#skills", "#projects", "#contact"];
  let currentTarget = "#worldViewport";

  sections.forEach(id => {
    const el = document.querySelector(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
        currentTarget = id;
      }
    }
  });

  document.querySelectorAll(".nav-link, .nav-drawer-links .nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.target === currentTarget);
  });
}

function initThreeJSHero() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas || typeof THREE === "undefined") return;

  const isMobile = window.innerWidth < 768;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

  const particlesCount = isMobile ? 500 : 900;
  const particlesGeo = new THREE.BufferGeometry();
  const posArray = new Float32Array(particlesCount * 3);
  const colorArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    posArray[i * 3] = (Math.random() - 0.5) * 12;
    posArray[i * 3 + 1] = (Math.random() - 0.5) * 12;
    posArray[i * 3 + 2] = (Math.random() - 0.5) * 12;
    const mix = Math.random();
    colorArray[i * 3] = mix * 0 + (1 - mix) * 0.62;
    colorArray[i * 3 + 1] = mix * 0.83 + (1 - mix) * 0.31;
    colorArray[i * 3 + 2] = mix * 1 + (1 - mix) * 0.87;
  }

  particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
  particlesGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

  const material = new THREE.PointsMaterial({
    size: isMobile ? 0.018 : 0.014,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particlesMesh = new THREE.Points(particlesGeo, material);
  scene.add(particlesMesh);
  camera.position.z = 2.5;

  let mouseX = 0;
  let mouseY = 0;
  let scrollY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  window.addEventListener("touchmove", (e) => {
    if (!e.touches[0]) return;
    mouseX = (e.touches[0].clientX / window.innerWidth) - 0.5;
    mouseY = (e.touches[0].clientY / window.innerHeight) - 0.5;
  }, { passive: true });

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  }, { passive: true });

  function animate() {
    requestAnimationFrame(animate);
    const t = Date.now() * 0.0003;
    particlesMesh.rotation.y = t * 0.8;
    particlesMesh.rotation.x = Math.sin(t) * 0.15;
    particlesMesh.position.x += (mouseX * 0.6 - particlesMesh.position.x) * 0.04;
    particlesMesh.position.y += (-mouseY * 0.6 - particlesMesh.position.y) * 0.04;
    camera.position.z = 2.5 + scrollY * 0.0008;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function initFireflies() {
  const wrap = document.getElementById("fireflyWrap");
  if (!wrap) return;

  const count = window.innerWidth < 600 ? 12 : 24;
  wrap.innerHTML = Array.from({ length: count }, (_, i) => {
    const x = 10 + Math.random() * 80;
    const y = 15 + Math.random() * 70;
    const delay = (i * 0.35).toFixed(2);
    const dur = (3 + Math.random() * 4).toFixed(2);
    return `<div class="firefly" style="left:${x}%;top:${y}%;animation-delay:${delay}s;animation-duration:${dur}s"></div>`;
  }).join("");
}

function getStoryScrollDistance() {
  const w = window.innerWidth;
  if (w < 480) return Math.max(w * 4.2, 3200);
  if (w < 768) return Math.max(w * 4.8, 4200);
  if (w < 1024) return Math.max(w * 5.2, 5000);
  return Math.max(w * 5.8, 5600);
}

function initChapterRail() {
  const rail = document.getElementById("chapterRail");
  if (!rail) return;

  rail.querySelectorAll(".ch-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      const chapter = Number(dot.dataset.chapter);
      const viewport = document.getElementById("worldViewport");
      if (!viewport) return;

      const scrollDist = getStoryScrollDistance();
      const chapterProgress = chapter / 3;
      const targetScroll = viewport.offsetTop + scrollDist * chapterProgress * 0.72;

      const lenis = window.portfolioLenis;
      if (lenis) lenis.scrollTo(targetScroll, { duration: 1.4 });
      else window.scrollTo({ top: targetScroll, behavior: "smooth" });
    });
  });
}

function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const drawer = document.getElementById("navDrawer");
  if (!toggle || !drawer) return;

  function closeDrawer() {
    toggle.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", open ? "false" : "true");
    drawer.setAttribute("aria-hidden", open ? "true" : "false");
    document.body.classList.toggle("nav-open", !open);
  });

  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
}

function initHeroTyping() {
  const typed = document.getElementById("heroTypedCode");
  if (!typed) return;

  const codeLines = [
    "rinshan.build(realWorldIdeas);",
    "passion.drive(everyProject);",
    "journey.continue(learning);",
    "future.create(withCode);"
  ];
  let lineIdx = 0;
  let charIdx = 0;

  function typeCode() {
    const line = codeLines[lineIdx];
    typed.textContent = line.slice(0, charIdx);

    if (charIdx < line.length) {
      charIdx++;
      setTimeout(typeCode, 28 + Math.random() * 42);
      return;
    }

    setTimeout(() => {
      charIdx = 0;
      lineIdx = (lineIdx + 1) % codeLines.length;
      typed.textContent = "";
      typeCode();
    }, 900);
  }

  typeCode();
}

function initPOVStory() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    revealSkillsWithoutGSAP();
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const world = document.getElementById("worldContainer");
  if (!world) return;

  const w = window.innerWidth;
  const isMobile = w < 768;
  const isSmall = w < 480;
  const initialScale = isSmall ? 1.15 : isMobile ? 1.28 : w < 900 ? 1.75 : 2.05;
  const initialRotateX = isMobile ? 0.35 : 0.65;
  const originY = isMobile ? "48vh" : "62vh";

  gsap.set(world, {
    scale: initialScale,
    y: isMobile ? 8 : 28,
    rotateX: initialRotateX,
    transformOrigin: `50vw ${originY}`,
    force3D: true
  });
  gsap.set(".desk-assembly", { y: isMobile ? 0 : 18, scale: isMobile ? 1 : 1.03 });
  gsap.set(".prob-sign", { opacity: 0, z: 500 });
  gsap.set(".insight-wrap", { scale: 0, opacity: 0 });
  gsap.set(".door-panel", { rotateY: 0 });

  const storyTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#worldViewport",
      start: "top top",
      end: () => `+=${getStoryScrollDistance()}`,
      scrub: reducedMotion ? 0.5 : 1.25,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateChapterRail(self.progress);
        updateSceneVignette(self.progress);
      }
    }
  });

  storyTl
    .to(world, { scale: 1, y: 0, rotateX: 0, duration: 1.15, ease: "power2.out" }, 0)
    .to(".desk-assembly", { y: 0, scale: 1, duration: 1.15, ease: "power2.out" }, 0)
    .to("#scene-room .chapter-banner", { opacity: 1, y: 0, duration: 0.6 }, 0.2)
    .to(world, { xPercent: -25, duration: 1.45, ease: "power1.inOut" }, ">")
    .to("#scene-nature .chapter-banner", { opacity: 1, x: 0, duration: 0.8 }, "<0.3")
  storyTl
    .to(world, { xPercent: -50, duration: 1.45, ease: "power1.inOut" }, ">")
    .to(".insight-wrap", { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(2)" }, "<0.5")
    .to(".lightbulb", { rotate: 15, duration: 0.4, yoyo: true, repeat: 3 }, "<")
  storyTl
    .to(world, { xPercent: -75, duration: 1.45, ease: "power1.inOut" }, ">")
    .to(".door-panel", { rotateY: -68, duration: 1.1, ease: "power2.inOut" }, "<0.6")
    .to(world, {
      scale: isSmall ? 25 : isMobile ? 30 : 45,
      y: -20,
      transformOrigin: "87.5% 52%",
      duration: 1.25,
      ease: "power2.inOut"
    }, ">");

  gsap.from(".chapter-banner", { opacity: 0, y: 30, duration: 0.01 });

  gsap.to(".nat-layer", {
    scrollTrigger: {
      trigger: "#worldViewport",
      start: "top top",
      end: () => `+=${getStoryScrollDistance() * 0.55}`,
      scrub: 1.2
    },
    x: (i, el) => -window.innerWidth * parseFloat(el.getAttribute("data-speed") || 0.3),
    ease: "none"
  });

  gsap.to(".butterfly", {
    scrollTrigger: {
      trigger: "#worldViewport",
      start: "top top",
      end: () => `+=${getStoryScrollDistance() * 0.4}`,
      scrub: 1.5
    },
    x: (i) => (i + 1) * 80,
    y: (i) => (i % 2 === 0 ? -40 : 30),
    ease: "none"
  });

  gsap.to(".prob-sign", {
    scrollTrigger: {
      trigger: "#worldViewport",
      start: () => `top+=${getStoryScrollDistance() * 0.42} top`,
      end: () => `+=${getStoryScrollDistance() * 0.18}`,
      scrub: 1
    },
    z: 0,
    opacity: 1,
    stagger: 0.15,
    ease: "back.out(1.5)"
  });

  gsap.to(".dw-glow, #returnStars", {
    scrollTrigger: {
      trigger: "#worldViewport",
      start: () => `top+=${getStoryScrollDistance() * 0.72} top`,
      end: () => `+=${getStoryScrollDistance() * 0.12}`,
      scrub: 1
    },
    opacity: 1
  });

  gsap.to(".firefly", {
    scrollTrigger: {
      trigger: "#worldViewport",
      start: () => `top+=${getStoryScrollDistance() * 0.68} top`,
      end: () => `+=${getStoryScrollDistance() * 0.2}`,
      scrub: 1.2
    },
    opacity: 1,
    stagger: { each: 0.02, from: "random" }
  });

  ScrollTrigger.create({
    trigger: "#about",
    start: "top top",
    end: "+=1200", 
    pin: true,
    scrub: 1,
    animation: gsap.fromTo(".ab-grid-wrap", 
      { scale: 0.2, opacity: 0, y: 100 },
      { scale: 1, opacity: 1, y: 0, ease: "power2.out" }
    )
  });

  animateSkills();
  animateProjectCards();
  animateContactReveal();
}

function updateChapterRail(progress) {
  const rail = document.getElementById("chapterRail");
  if (!rail) return;
  
  let chapter = 0;
  if (progress > 0.15 && progress <= 0.40) chapter = 1;
  else if (progress > 0.40 && progress <= 0.65) chapter = 2;
  else if (progress > 0.65) chapter = 3;

  rail.querySelectorAll(".ch-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === chapter);
  });
}

function updateSceneVignette(progress) {
  const vignette = document.getElementById("sceneVignette");
  if (!vignette) return;
  const chapter = Math.floor(progress * 4);
  vignette.dataset.chapter = String(Math.min(3, chapter));
  vignette.style.opacity = String(0.35 + Math.sin(progress * Math.PI * 4) * 0.15);
}

function animateContactReveal() {
  gsap.from(".contact-copy", {
    scrollTrigger: { trigger: "#contact", start: "top 78%", once: true },
    x: -40, opacity: 0, duration: 0.9, ease: "power3.out"
  });
  gsap.from(".monitor-3d-wrap", {
    scrollTrigger: { trigger: "#contact", start: "top 75%", once: true },
    y: 60, opacity: 0, rotateX: 12, duration: 1.1, ease: "power3.out"
  });
}

function initContactMonitor3D() {
  const wrap = document.getElementById("contactMonitor3D");
  if (!wrap) return;

  let tiltX = 0;
  let tiltY = 0;
  let targetX = 0;
  let targetY = 0;

  function onPointer(clientX, clientY) {
    if(window.innerWidth <= 768) return; 

    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    targetX = ((clientY - cy) / rect.height) * -8;
    targetY = ((clientX - cx) / rect.width) * 10;
  }

  window.addEventListener("mousemove", (e) => onPointer(e.clientX, e.clientY));
  wrap.addEventListener("touchmove", (e) => {
    if (e.touches[0]) onPointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  function renderTilt() {
    if(window.innerWidth > 768) {
      tiltX += (targetX - tiltX) * 0.08;
      tiltY += (targetY - tiltY) * 0.08;
      wrap.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    } else {
      wrap.style.transform = `none`;
    }
    requestAnimationFrame(renderTilt);
  }
  requestAnimationFrame(renderTilt);
}

function animateSkills() {
  document.querySelectorAll(".skill-card").forEach(card => {
    const fill = card.querySelector(".sk-fill");
    const pctText = card.querySelector(".sk-pct");
    const level = Number(card.dataset.level || 0);
    
    ScrollTrigger.create({
      trigger: card,
      start: "top 86%",
      once: true,
      onEnter: () => {
        if (fill) {
          fill.classList.add("loading-sparkle");
          fill.style.width = `${level}%`;
        }
        if (pctText) {
          gsap.to(pctText, {
            innerHTML: level,
            duration: 1.5,
            snap: { innerHTML: 1 },
            onUpdate: function() {
              pctText.innerHTML = Math.round(this.targets()[0].innerHTML) + "%";
            },
            ease: "power2.out"
          });
        }
      }
    });
  });
}

function animateProjectCards() {
  gsap.from(".proj-card", {
    scrollTrigger: {
      trigger: ".projects-section",
      start: "top 75%",
      once: true
    },
    y: 45,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: "power3.out"
  });
}

function revealSkillsWithoutGSAP() {
  document.querySelectorAll(".skill-card").forEach(card => {
    const fill = card.querySelector(".sk-fill");
    if (fill) fill.style.width = `${Number(card.dataset.level || 0)}%`;
  });
}

function initProfileUpload() {
  const pInput = document.getElementById("profileFileInput");
  const pImg = document.getElementById("profileImg");
  const pPlaceholder = document.getElementById("profilePlaceholder");
  const pZone = document.getElementById("profileZone");
  if (!pInput || !pImg || !pZone) return;

  pZone.addEventListener("click", () => pInput.click());
  pInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      pImg.src = ev.target.result;
      pImg.style.opacity = "1";
      if (pPlaceholder) pPlaceholder.style.opacity = "0";
    };
    reader.readAsDataURL(file);
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("efSuccess");
  const consoleLine = document.getElementById("contactConsole");
  const submitBtn = document.getElementById("contactSubmitBtn");
  if (!form) return;

  const fields = ["name", "email", "message"].map(name => form.elements[name]).filter(Boolean);
  const codeFields = form.querySelectorAll(".code-field");

  function setActiveField(field) {
    codeFields.forEach(el => el.classList.toggle("active-line", el.contains(field)));
  }

  function updateConsole() {
    if (!consoleLine) return;
    const filled = fields.filter(field => field.value.trim()).length;
    if (filled === fields.length) {
      consoleLine.textContent = "// ready: sendMessage(name, email, project);";
      consoleLine.classList.add("ready");
      return;
    }
    consoleLine.classList.remove("ready");
    consoleLine.textContent = `// ${filled}/${fields.length} variables assigned...`;
  }

  fields.forEach(field => {
    field.addEventListener("input", updateConsole);
    field.addEventListener("focus", () => setActiveField(field));
    field.addEventListener("blur", () => codeFields.forEach(el => el.classList.remove("active-line")));
  });
  updateConsole();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Compiling...";
    }
    if (consoleLine) {
      consoleLine.textContent = "// compiling payload and sending...";
      consoleLine.classList.remove("ready");
    }
    if (success) success.classList.add("active");

    setTimeout(() => {
      if (success) success.classList.remove("active");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Run sendMessage()";
      }
      form.reset();
      updateConsole();
    }, 3500);
  });
}