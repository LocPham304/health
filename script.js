(function () {
  "use strict";

  function renderSharedChrome() {
    var headerMount = document.querySelector("[data-site-header]");
    if (headerMount) {
      headerMount.outerHTML = [
        '<header class="site-header">',
        '<div class="wrap nav-row">',
        '<a class="brand" href="index.html" aria-label="Healthcare Alliance home"><img class="brand-logo" src="assets/images/all-image/logo.png" width="300" height="91" alt="Healthcare Alliance"></a>',
        '<nav class="nav-items" aria-label="Primary navigation">',
        '<div class="nav-group"><a class="nav-link" data-nav="about" href="about.html">About</a><div class="mega-menu"><a href="about.html">Overview</a><a href="about.html#purpose">Vision &amp; Mission</a><a href="about.html#founder">Founder</a><a href="leadership.html">Leadership</a></div></div>',
        '<div class="nav-group"><a class="nav-link" data-nav="projects" href="projects.html">Projects</a></div>',
        '<div class="nav-group"><a class="nav-link" data-nav="partners" href="partners.html">Partners</a><div class="mega-menu"><a href="partners.html">Overview</a><a href="partner-detail.html?id=humiley">HUMILEY</a><a href="partner-detail.html?id=estuary">ESTUARY</a><a href="partner-detail.html?id=wa">W&amp;A</a><a href="partner-detail.html?id=aivision">AIVISION</a><a href="partner-detail.html?id=qui-long">QUI LONG</a></div></div>',
        '<div class="nav-group"><a class="nav-link" data-nav="insights" href="insights.html">Insights</a></div>',
        "</nav>",
        '<a class="contact-link desktop-contact" href="index.html#contact">Contact Us →</a>',
        '<button class="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu"><span></span><span></span><span></span></button>',
        "</div>",
        "</header>",
        '<nav class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation" aria-hidden="true">',
        '<div class="mobile-acc"><button class="mobile-acc-toggle" type="button" aria-expanded="false" aria-controls="mobileAbout">About<span class="acc-icon">+</span></button><div class="mobile-acc-panel" id="mobileAbout" aria-hidden="true" hidden inert><a href="about.html">Overview</a><a href="about.html#purpose">Vision &amp; Mission</a><a href="about.html#founder">Founder</a><a href="leadership.html">Leadership</a></div></div>',
        '<a class="mobile-link" href="projects.html">Projects</a>',
        '<div class="mobile-acc"><button class="mobile-acc-toggle" type="button" aria-expanded="false" aria-controls="mobilePartners">Partners<span class="acc-icon">+</span></button><div class="mobile-acc-panel" id="mobilePartners" aria-hidden="true" hidden inert><a href="partners.html">Overview</a><a href="partner-detail.html?id=humiley">HUMILEY</a><a href="partner-detail.html?id=estuary">ESTUARY</a><a href="partner-detail.html?id=wa">W&amp;A</a><a href="partner-detail.html?id=aivision">AIVISION</a><a href="partner-detail.html?id=qui-long">QUI LONG</a></div></div>',
        '<a class="mobile-link" href="insights.html">Insights</a><a class="btn mobile-contact" href="index.html#contact">Contact Us →</a>',
        "</nav>",
      ].join("");
    }
    var footerMount = document.querySelector("[data-site-footer]");
    if (footerMount) {
      footerMount.outerHTML = [
        '<footer class="site-footer"><div class="wrap"><div class="footer-grid">',
        '<div><a class="footer-brand" href="index.html" aria-label="Healthcare Alliance home"><img class="footer-logo" src="assets/images/all-image/logo.png?v=20260816" width="300" height="91" alt="Healthcare Alliance"></a><p class="footer-tagline">A Specialized Ecosystem for Healthcare Success.</p></div>',
        '<div><h2>Company</h2><ul><li><a href="about.html">About</a></li><li><a href="about.html#purpose">Vision &amp; Mission</a></li><li><a href="leadership.html">Leadership</a></li></ul></div>',
        '<div><h2>Resources</h2><ul><li><a href="projects.html">Projects</a></li><li><a href="insights.html">Insights</a></li><li><a href="index.html#clients">Clients</a></li></ul><h2 style="margin-top:24px">Contact</h2><ul><li>Ho Chi Minh City, Vietnam</li><li><a href="mailto:linh.nguyen@healthalliance.vn">linh.nguyen@healthalliance.vn</a></li><li><a href="tel:+84909152515">+84 909 15 25 15</a></li></ul></div>',
        '</div><div class="footer-bottom"><span>© 2026 Healthcare Alliance Vietnam. All rights reserved.</span><a href="#top">Back to top ↑</a></div></div></footer>',
      ].join("");
    }
  }
  renderSharedChrome();

  var page = document.body.getAttribute("data-page") || "home";
  var activeMap = {
    about: "about",
    leadership: "about",
    projects: "projects",
    partners: "partners",
    "partner-detail": "partners",
    insights: "insights",
    "ecosystem-detail": "ecosystem",
  };
  var activeNav = activeMap[page];
  if (activeNav) {
    document
      .querySelectorAll('[data-nav="' + activeNav + '"]')
      .forEach(function (link) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      });
  }

  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");
  var previouslyFocusedElement = null;
  var menuInertElements = [];
  var menuFocusableSelector =
    'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function setAccordionState(toggle, panel, isOpen) {
    if (!toggle || !panel) {
      return;
    }
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    panel.classList.toggle("open", isOpen);
    panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
    panel.hidden = !isOpen;
    if (isOpen) {
      panel.removeAttribute("inert");
    } else {
      panel.setAttribute("inert", "");
    }
    var icon = toggle.querySelector(".acc-icon");
    if (icon) {
      icon.textContent = isOpen ? "−" : "+";
    }
  }

  function setMenuBackgroundInert(shouldBeInert) {
    if (shouldBeInert) {
      menuInertElements = [
        document.querySelector(".skip-link"),
        document.querySelector(".site-header .brand"),
        document.querySelector("main"),
        document.querySelector(".site-footer"),
      ].filter(function (element) {
        return element && !element.hasAttribute("inert");
      });
      menuInertElements.forEach(function (element) {
        element.setAttribute("inert", "");
      });
      return;
    }
    menuInertElements.forEach(function (element) {
      element.removeAttribute("inert");
    });
    menuInertElements = [];
  }

  function getMobileMenuFocusables() {
    if (!burger || !mobileMenu) {
      return [];
    }
    return [burger]
      .concat(Array.from(mobileMenu.querySelectorAll(menuFocusableSelector)))
      .filter(function (element) {
        return !element.closest("[hidden]") && !element.hasAttribute("inert");
      });
  }

  function closeMobileMenu(returnFocus) {
    if (!burger || !mobileMenu) {
      return;
    }
    burger.classList.remove("open");
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    mobileMenu
      .querySelectorAll(".mobile-acc-toggle")
      .forEach(function (toggle) {
        setAccordionState(
          toggle,
          document.getElementById(toggle.getAttribute("aria-controls")),
          false,
        );
      });
    setMenuBackgroundInert(false);
    var focusTarget =
      previouslyFocusedElement && previouslyFocusedElement.isConnected
        ? previouslyFocusedElement
        : burger;
    previouslyFocusedElement = null;
    if (returnFocus && focusTarget) {
      focusTarget.focus();
    }
  }
  function openMobileMenu() {
    previouslyFocusedElement = document.activeElement;
    burger.classList.add("open");
    mobileMenu.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    setMenuBackgroundInert(true);
  }
  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      if (mobileMenu.classList.contains("open")) {
        closeMobileMenu(false);
      } else {
        openMobileMenu();
      }
    });
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileMenu(true);
      });
    });
    mobileMenu
      .querySelectorAll(".mobile-acc-toggle")
      .forEach(function (toggle) {
        toggle.addEventListener("click", function () {
          var panel = document.getElementById(
            toggle.getAttribute("aria-controls"),
          );
          var wasOpen = toggle.getAttribute("aria-expanded") === "true";
          mobileMenu
            .querySelectorAll(".mobile-acc-toggle")
            .forEach(function (item) {
              setAccordionState(
                item,
                document.getElementById(item.getAttribute("aria-controls")),
                false,
              );
            });
          if (!wasOpen && panel) {
            setAccordionState(toggle, panel, true);
          }
        });
      });
    document.addEventListener("keydown", function (event) {
      if (!mobileMenu.classList.contains("open")) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu(true);
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      var focusables = getMobileMenuFocusables();
      if (!focusables.length) {
        return;
      }
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          focusables.indexOf(document.activeElement) === -1)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    document.addEventListener("focusin", function (event) {
      if (!mobileMenu.classList.contains("open")) {
        return;
      }
      if (event.target === burger || mobileMenu.contains(event.target)) {
        return;
      }
      burger.focus();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1100 && mobileMenu.classList.contains("open")) {
        closeMobileMenu(mobileMenu.contains(document.activeElement));
      }
    });
  }

  var ecosystemData = [
    {
      id: "healthcare-talent",
      name: "Healthcare Talent",
      summary: "Executive Search & HR Solutions",
      logo: "assets/images/all-image/logo_talent.png",
      logoAlt: "Healthcare Talent logo",
    },
    {
      id: "museco",
      name: "MUSECO",
      summary: "Strategic Advisory & Market Access",
      logo: "assets/images/all-image/logo_museco.png",
      logoAlt: "MUSECO logo",
    },
    {
      id: "hcx-coaching",
      name: "HCX Coaching",
      summary: "Capability Development, Training & Coaching",
      logo: "assets/images/all-image/logo_hcx.png",
      logoAlt: "HCX Coaching logo",
    },
    {
      id: "ghme",
      name: "GHME",
      summary: "First Aid Training & Health Education",
      logo: "assets/images/all-image/logo_ghme.png",
      logoAlt: "GHME logo",
    },
    {
      id: "healthcare-insights",
      name: "Healthcare Insights",
      summary: "Market Intelligence & Industry Knowledge",
      logo: "assets/images/all-image/logo_insights.png",
      logoAlt: "Healthcare Insights logo",
    },
  ];
  var ecoButtons = document.querySelectorAll("#ecoList button");
  function prefersReducedMotion() {
    return Boolean(
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }
  function revealMobileEcosystemResult() {
    var result = document.getElementById("ecoResult");
    if (
      !result ||
      window.innerWidth > 640 ||
      typeof result.scrollIntoView !== "function"
    ) {
      return;
    }
    var rect = result.getBoundingClientRect();
    var viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < 92 || rect.bottom > viewportHeight - 24) {
      result.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "nearest",
      });
    }
  }
  function setEcosystem(index) {
    var item = ecosystemData[index];
    if (!item) {
      return;
    }
    ecoButtons.forEach(function (button) {
      button.classList.remove("active");
      button.setAttribute("aria-pressed", "false");
    });
    var selected = document.querySelector(
      '#ecoList button[data-index="' + index + '"]',
    );
    if (selected) {
      selected.classList.add("active");
      selected.setAttribute("aria-pressed", "true");
    }
    var logo = document.getElementById("ecoLogo");
    var title = document.getElementById("ecoTitle");
    var description = document.getElementById("ecoDescription");
    var discover = document.getElementById("ecoDiscover");
    if (logo) {
      logo.src = item.logo;
      logo.alt = item.logoAlt;
    }
    if (title) {
      title.textContent = item.name;
    }
    if (description) {
      description.textContent = item.summary;
    }
    if (discover) {
      discover.href = "ecosystem-detail.html?id=" + item.id;
      discover.textContent = "Discover " + item.name + " →";
    }
    revealMobileEcosystemResult();
  }
  ecoButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setEcosystem(Number(button.getAttribute("data-index")));
    });
  });

  var spotlightData = [
    {
      id: "healthcare-talent",
      name: "Healthcare Talent",
      position: "Executive Search & Human Capital Solutions",
      description:
        "Connecting healthcare organizations with exceptional talent and leadership.",
      image: "assets/images/all-image/bu_talent.jpg",
      imageAlt: "Healthcare Talent executive search consultation",
      capabilities: [
        "Executive Search",
        "Talent Acquisition",
        "Organization Design",
        "Leadership Development",
        "HR Transformation",
      ],
    },
    {
      id: "museco",
      name: "MUSECO",
      position: "Strategic Advisory & Market Access",
      description: "Helping healthcare businesses grow in Vietnam.",
      image: "assets/images/all-image/bu_museco.jpg",
      imageAlt: "MUSECO strategic advisory meeting",
      capabilities: [
        "Market Entry",
        "Business Matching",
        "Market Access",
        "Commercial Strategy",
        "Strategic Advisory",
      ],
    },
    {
      id: "hcx-coaching",
      name: "HCX Coaching",
      position: "Capability Development, Training & Coaching",
      description:
        "Developing stronger healthcare leaders, high-performing teams, and sustainable organizational capability.",
      image: "assets/images/all-image/bu_hcx.jpg",
      imageAlt: "HCX Coaching capability development workshop",
      capabilities: [
        "Leadership Development",
        "Executive Coaching",
        "Sales Excellence",
        "Customized Learning",
        "Organizational Development",
      ],
    },
    {
      id: "ghme",
      name: "GHME",
      position: "First Aid Training & Health Education",
      description:
        "Building safer communities through practical health education.",
      image: "assets/images/all-image/bu_ghme.jpg",
      imageAlt: "GHME practical first aid training",
      capabilities: [
        "First Aid Training",
        "CPR & AED",
        "Workplace Safety",
        "Community Education",
        "Emergency Preparedness",
      ],
    },
    {
      id: "healthcare-insights",
      name: "Healthcare Insights",
      position: "Market Intelligence & Healthcare Media",
      description: "Turning healthcare data into strategic decisions.",
      image: "assets/images/all-image/bu_insights.jpg",
      imageAlt: "Healthcare Insights market intelligence team",
      capabilities: [
        "Industry News",
        "Market Intelligence",
        "Research & Reports",
        "Healthcare Media",
        "Executive Insights",
      ],
    },
  ];
  var spotTabs = document.querySelectorAll("#spotTabs button");
  function setSpotlight(index) {
    var item = spotlightData[index];
    if (!item) {
      return;
    }
    spotTabs.forEach(function (button) {
      button.classList.remove("active");
      button.setAttribute("aria-selected", "false");
      button.setAttribute("tabindex", "-1");
    });
    var selected = document.querySelector(
      '#spotTabs button[data-index="' + index + '"]',
    );
    if (selected) {
      selected.classList.add("active");
      selected.setAttribute("aria-selected", "true");
      selected.setAttribute("tabindex", "0");
    }
    var label = document.getElementById("spotLabel");
    var title = document.getElementById("spotTitle");
    var description = document.getElementById("spotDescription");
    var caps = document.getElementById("spotCapabilities");
    var photo = document.getElementById("spotPhoto");
    var image = document.getElementById("spotImage");
    var cta = document.getElementById("spotCta");
    var panel = document.getElementById("spotPanel");
    if (label) {
      label.textContent =
        String(index + 1).padStart(2, "0") + " — " + item.name;
    }
    if (title) {
      title.textContent = item.position;
    }
    if (description) {
      description.textContent = item.description;
    }
    if (caps) {
      caps.innerHTML = item.capabilities
        .map(function (capability) {
          return "<span>" + capability + "</span>";
        })
        .join("");
    }
    if (photo) {
      photo.setAttribute("data-caption", item.name);
    }
    if (image) {
      image.src = item.image;
      image.alt = item.imageAlt;
    }
    if (cta) {
      cta.href = "ecosystem-detail.html?id=" + item.id;
      cta.textContent = "Explore " + item.name + " →";
    }
    if (panel && selected) {
      panel.setAttribute("aria-labelledby", selected.id);
    }
    if (
      selected &&
      window.innerWidth <= 640 &&
      typeof selected.scrollIntoView === "function"
    ) {
      selected.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }
  spotTabs.forEach(function (button) {
    button.addEventListener("click", function () {
      setSpotlight(Number(button.getAttribute("data-index")));
    });
    button.addEventListener("keydown", function (event) {
      var currentIndex = Array.prototype.indexOf.call(spotTabs, button);
      var nextIndex = currentIndex;
      if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % spotTabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + spotTabs.length) % spotTabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = spotTabs.length - 1;
      } else {
        return;
      }
      event.preventDefault();
      setSpotlight(nextIndex);
      spotTabs[nextIndex].focus();
    });
  });

  var clientData = {
    healthcare: {
      src: "assets/images/all-image/clients_healthcare.png",
      alt: "Healthcare client logos including Stada, Mega We Care, Santen, DKSH, Novo Nordisk, AstraZeneca, Organon, Egis, Pfizer, Servier, Zuellig Pharma and Astellas",
    },
    other: {
      src: "assets/images/all-image/clients_nonhealth.png",
      alt: "Client logos including Schneider Electric, Warburg Pincus, Sedbergh Vietnam, Estuary, Marico, Amazon, Heineken and VPBank",
    },
  };
  var clientWall = document.getElementById("clientWall");
  function renderClients(group) {
    var item = clientData[group];
    if (clientWall && item) {
      clientWall.innerHTML =
        '<img src="' + item.src + '" alt="' + item.alt + '" loading="lazy">';
    }
  }
  if (clientWall) {
    renderClients("healthcare");
    document
      .querySelectorAll("[data-client-filter]")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          document
            .querySelectorAll("[data-client-filter]")
            .forEach(function (item) {
              item.classList.remove("active");
              item.setAttribute("aria-pressed", "false");
            });
          button.classList.add("active");
          button.setAttribute("aria-pressed", "true");
          renderClients(button.getAttribute("data-client-filter"));
        });
      });
  }

  document.querySelectorAll("[data-project-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-project-filter");
      document
        .querySelectorAll("[data-project-filter]")
        .forEach(function (item) {
          item.classList.remove("active");
          item.setAttribute("aria-pressed", "false");
        });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      document
        .querySelectorAll("[data-project-category]")
        .forEach(function (project) {
          var categories = project
            .getAttribute("data-project-category")
            .split(" ");
          project.classList.toggle(
            "is-hidden",
            filter !== "all" && categories.indexOf(filter) === -1,
          );
        });
    });
  });

  var ecosystemDetails = {
    "healthcare-talent": {
      name: "Healthcare Talent",
      position: "Executive Search & Human Capital Solutions",
      tagline:
        "Connecting Healthcare Organizations with Exceptional Talent & Leadership",
      description:
        "Healthcare-focused executive search and human capital solutions that strengthen leadership, talent, and organizational capability.",
      capabilities: [
        [
          "Executive Search",
          "Identify and recruit C-level and senior healthcare leaders.",
        ],
        [
          "Talent Acquisition",
          "Recruit high-performing professionals across commercial, medical, operations, and support functions.",
        ],
        [
          "Organization Design",
          "Workforce planning, succession planning, talent mapping, and organization review.",
        ],
        [
          "Leadership Development",
          "Leadership assessment, executive coaching, capability building, and development programs.",
        ],
        [
          "HR Transformation",
          "HR strategy, performance management, talent management, and employee experience.",
        ],
      ],
      impacts: [
        [
          "Stronger Leadership",
          "Build high-performing leadership teams for sustainable growth.",
        ],
        [
          "Better Talent",
          "Access qualified healthcare professionals faster and more effectively.",
        ],
        [
          "Organizational Excellence",
          "Design agile organizations with future-ready workforce strategies.",
        ],
        [
          "Leadership Capability",
          "Develop stronger leaders through assessment, coaching, and capability building.",
        ],
        [
          "Sustainable HR Growth",
          "Transform HR practices to improve performance, engagement, and long-term business success.",
        ],
      ],
      expertise: [
        "Healthcare Focus",
        "Executive Search",
        "Nationwide Network",
        "Leadership Hiring",
        "Trusted Partner",
      ],
    },
    museco: {
      name: "MUSECO",
      position: "Strategic Advisory & Market Access",
      tagline: "Helping Healthcare Businesses Grow in Vietnam",
      description:
        "Local strategic advisory, business matching, and market access support for healthcare organizations entering or expanding in Vietnam.",
      capabilities: [
        ["Market Entry", "Launch products and expand into Vietnam."],
        ["Business Matching", "Connect with trusted partners."],
        ["Market Access", "Navigate the healthcare ecosystem."],
        ["Commercial Strategy", "Accelerate sustainable business growth."],
        [
          "Strategic Advisory",
          "Support business expansion and transformation.",
        ],
      ],
      impacts: [
        ["Faster Market Entry", "Launch with confidence."],
        ["Strong Partnerships", "Connect with the right ecosystem."],
        ["Sustainable Growth", "Build long-term business success."],
        ["Lower Business Risk", "Make informed strategic decisions."],
        ["Local Expertise", "Work with healthcare market specialists."],
      ],
      expertise: [
        "Vietnam Market",
        "Strategic Partnerships",
        "Business Growth",
        "Market Access",
        "Trusted Advisor",
      ],
    },
    "hcx-coaching": {
      name: "HCX Coaching",
      position: "Capability Development, Training & Coaching",
      tagline:
        "Developing Stronger Healthcare Leaders and High-Performing Teams",
      description:
        "Practical learning, coaching, and organizational development that build sustainable leadership and commercial capability.",
      capabilities: [
        ["Leadership Development", "Develop future healthcare leaders."],
        ["Executive Coaching", "One-on-one leadership coaching."],
        ["Sales Excellence", "Build high-performing commercial teams."],
        ["Customized Learning", "Tailored corporate training solutions."],
        ["Organizational Development", "Strengthen culture and capability."],
      ],
      impacts: [
        ["Stronger Leaders", "Build confident leadership teams."],
        ["Higher Performance", "Improve individual and team results."],
        ["Sustainable Growth", "Develop long-term organizational capability."],
        ["Employee Engagement", "Empower people to perform."],
        [
          "Practical Learning",
          "Deliver real-world healthcare leadership programs.",
        ],
      ],
      expertise: [
        "Executive Coaching",
        "Leadership Development",
        "Sales Excellence",
        "Corporate Learning",
        "Organizational Growth",
      ],
    },
    ghme: {
      name: "GHME",
      position: "First Aid Training & Health Education",
      tagline: "Building Safer Communities Through Health Education",
      description:
        "Practical first aid, emergency response, and health education programs for workplaces and communities.",
      capabilities: [
        ["First Aid Training", "Practical emergency response skills."],
        ["CPR & AED", "Life-saving certification programs."],
        ["Workplace Safety", "Corporate health and safety training."],
        ["Community Education", "Health awareness programs."],
        ["Emergency Preparedness", "Build emergency response capability."],
      ],
      impacts: [
        ["Save Lives", "Respond confidently in emergencies."],
        ["Safer Workplace", "Strengthen employee safety culture."],
        ["Health Awareness", "Promote healthier communities."],
        ["ESG Contribution", "Support corporate social responsibility."],
        [
          "Certified Programs",
          "Provide practical, internationally aligned training.",
        ],
      ],
      expertise: [
        "First Aid Training",
        "CPR & AED",
        "Workplace Safety",
        "Community Health",
        "Certified Programs",
      ],
    },
    "healthcare-insights": {
      name: "Healthcare Insights",
      position: "Market Intelligence & Healthcare Media",
      tagline: "Turning Healthcare Data into Strategic Decisions",
      description:
        "Healthcare market intelligence, research, media, and executive perspectives that support informed decisions and industry visibility.",
      capabilities: [
        ["Industry News", "Curated healthcare news and updates."],
        ["Market Intelligence", "Healthcare market analysis."],
        ["Research & Reports", "Data-driven industry insights."],
        ["Healthcare Media", "Professional healthcare content."],
        ["Executive Insights", "Expert opinions and thought leadership."],
      ],
      impacts: [
        ["Better Decisions", "Support strategic planning."],
        ["Market Awareness", "Stay ahead of industry trends."],
        ["Stronger Visibility", "Build brand authority."],
        ["Trusted Information", "Access reliable healthcare intelligence."],
        ["Thought Leadership", "Shape industry conversations."],
      ],
      expertise: [
        "Industry News",
        "Market Intelligence",
        "Research & Reports",
        "Executive Insights",
        "Healthcare Media",
      ],
    },
  };

  var partnerDetails = {
    humiley: {
      name: "HUMILEY",
      position: "Engineering & Technology Partner",
      description:
        "Advanced engineering solutions that help organizations execute complex projects with confidence, compliance, and innovation.",
      capabilities: [
        [
          "Engineering Consulting",
          "Deliver expert design and engineering for regulated, high-precision environments.",
        ],
        [
          "Cleanroom & Facility Design",
          "End-to-end cleanroom solutions compliant with GMP, ISO 14644, and FDA standards.",
        ],
        [
          "Project Management",
          "Oversee full project lifecycles with disciplined execution, safety, and cost control.",
        ],
        [
          "Renewable Energy (BESS)",
          "Support grid resilience and sustainable energy transitions through BESS manufacturing.",
        ],
      ],
      impacts: [
        [
          "Accelerate Delivery",
          "Execute complex projects on time across regulated industries.",
        ],
        [
          "Ensure Compliance",
          "Meet GMP, ISO 14644, and FDA requirements with confidence.",
        ],
        [
          "Strengthen Operations",
          "Enhance equipment reliability and operational continuity.",
        ],
        [
          "Drive Sustainability",
          "Support renewable energy and sustainable systems.",
        ],
      ],
      expertise: [
        "GMP Engineering",
        "Cleanroom Expertise",
        "Nationwide Projects",
        "End-to-End Support",
      ],
    },
    estuary: {
      name: "ESTUARY",
      position: "SalesTech & Digital Transformation Partner",
      description:
        "SalesTech solutions that help organizations digitize sales operations, engage stakeholders, and grow distribution performance across Asia-Pacific.",
      capabilities: [
        [
          "Sales Automation & CRM",
          "Maximize sales team performance with real-time data, route optimization, and digital customer management.",
        ],
        [
          "Loyalty & Gamification",
          "Engage consumers, influencers, and distributors through digital loyalty programs and gamification.",
        ],
        [
          "Distributor Management System",
          "Streamline distributor interaction, order management, and after-sales service.",
        ],
        [
          "Dashboard & Reporting",
          "Digitize operations, traceability, and reporting for higher efficiency.",
        ],
      ],
      impacts: [
        [
          "Unlock Sales Performance",
          "Digitize and accelerate sales operations at scale.",
        ],
        [
          "Improve Distribution",
          "Manage distributors and agents with real-time visibility.",
        ],
        [
          "Enhance Stakeholder Engagement",
          "Connect consumers, dealers, and field teams on one platform.",
        ],
        [
          "Drive Innovation with AI",
          "Apply AI and AR to boost conversion and reduce returns.",
        ],
        [
          "Sustainable Business Growth",
          "Build long-term competitive advantage through digital transformation.",
        ],
      ],
      expertise: [
        "Sales Transformation",
        "CRM Specialists",
        "APAC Experience",
        "Data-Driven Solutions",
      ],
    },
    wa: {
      name: "W&A",
      position: "Tax, Legal, Finance & HR Advisory Partner",
      description:
        "Integrated advisory across tax, legal compliance, finance, accounting, transactions, governance, and HR for organizations operating in Vietnam.",
      capabilities: [
        [
          "Tax & Customs Advisory",
          "Strategic tax planning, transfer pricing, international tax, customs compliance, and audit support.",
        ],
        [
          "Legal Advisory & Compliance",
          "Legal structuring, FDI consulting, licensing, dispute resolution, and M&A legal due diligence.",
        ],
        [
          "Finance & Accounting",
          "Accounting, IFRS reporting, financial due diligence, valuation, internal audit, and Virtual CFO services.",
        ],
        [
          "M&A & Transaction Advisory",
          "End-to-end support for mergers, acquisitions, capital raising, and corporate restructuring.",
        ],
      ],
      impacts: [
        [
          "Ensure Tax & Legal Compliance",
          "Operate confidently with regulatory and tax compliance in Vietnam.",
        ],
        [
          "Optimize Financial Performance",
          "Improve profitability through effective tax strategies and financial reporting.",
        ],
        [
          "Support M&A Transactions",
          "Support M&A, investment structuring, and capital raising.",
        ],
        [
          "Strengthen Governance & HR",
          "Build strong HR systems, payroll compliance, and internal governance.",
        ],
        [
          "Drive Sustainable Growth",
          "Embed ESG into business strategy for long-term value.",
        ],
      ],
      expertise: [
        "Integrated Advisory",
        "Cross-border Expertise",
        "M&A Specialists",
        "ESG Consulting",
      ],
    },
    aivision: {
      name: "AIVISION",
      position: "AI & Digital Transformation Partner",
      description:
        "Enterprise AI solutions that automate retail operations, analyze real-time data, and drive measurable business performance.",
      capabilities: [
        [
          "AI Display Scoring",
          "Automatically score product display compliance using computer vision.",
        ],
        [
          "Agentic AI Chatbot",
          "Integrate intelligent AI assistants into enterprise systems and workflows.",
        ],
        [
          "AI Camera Analytics",
          "Analyze customer behavior, traffic patterns, and in-store activity in real time.",
        ],
        [
          "Custom AI Software",
          "Build proprietary AI models and enterprise software for specific operations.",
        ],
      ],
      impacts: [
        [
          "Automate Retail Operations",
          "Digitize display checking and shelf compliance across retail points.",
        ],
        [
          "Boost Sales Performance",
          "Improve sell-out through real-time scoring and actionable field insights.",
        ],
        [
          "Detect Fraud in Real Time",
          "Identify display fraud and non-compliance with AI-powered detection.",
        ],
        [
          "Accelerate AI Adoption",
          "Deploy battle-tested enterprise AI solutions.",
        ],
        [
          "Scale Across Markets",
          "Expand AI-supported operations across markets.",
        ],
      ],
      expertise: [
        "Retail AI",
        "AI Chatbots",
        "Camera Analytics",
        "Custom AI",
        "Fraud Detection",
      ],
    },
    "qui-long": {
      name: "QUI LONG",
      position: "HVAC, M&E & Cleanroom Engineering Partner",
      description:
        "Professional design and construction of HVAC, M&E, and cleanroom systems for pharmaceutical, hospital, and industrial facilities.",
      capabilities: [
        [
          "HVAC & Air Conditioning",
          "Design, supply, and install central HVAC systems for factories, hospitals, commercial buildings, and cleanrooms.",
        ],
        [
          "M&E Engineering",
          "Full mechanical and electrical engineering including power, fire protection, BMS/EMS, and utilities.",
        ],
        [
          "Cleanroom Technology",
          "Design and build GMP/WHO-certified cleanrooms for pharmaceutical, biotech, and food manufacturing.",
        ],
        [
          "Wastewater & Fire Protection",
          "Wastewater treatment, fire suppression, lightning protection, and building management systems.",
        ],
      ],
      impacts: [
        [
          "GMP/WHO Compliance",
          "Deliver cleanroom and HVAC systems meeting GMP, WHO, and EU standards.",
        ],
        [
          "Full M&E Turnkey",
          "Provide end-to-end M&E design, supply, installation, and commissioning.",
        ],
        [
          "Pharma Expertise",
          "Support pharmaceutical and healthcare facilities.",
        ],
        ["Nationwide Projects", "Deliver projects across Vietnam."],
        [
          "Proven Track Record",
          "Apply more than 18 years of engineering experience.",
        ],
      ],
      expertise: [
        "HVAC & M&E Systems",
        "Cleanroom Engineering",
        "BMS / EMS Solutions",
        "Wastewater Treatment",
        "Fire Protection",
      ],
    },
  };

  function rowMarkup(items) {
    return items
      .map(function (item) {
        return (
          '<div class="detail-row"><h3>' +
          item[0] +
          "</h3><p>" +
          item[1] +
          "</p></div>"
        );
      })
      .join("");
  }
  var detailMediaByName = {
    "Healthcare Talent": {
      src: "assets/images/all-image/bu_talent.jpg",
      alt: "Healthcare Talent executive search consultation",
    },
    MUSECO: {
      src: "assets/images/all-image/bu_museco.jpg",
      alt: "MUSECO strategic advisory meeting",
    },
    "HCX Coaching": {
      src: "assets/images/all-image/bu_hcx.jpg",
      alt: "HCX Coaching capability development workshop",
    },
    GHME: {
      src: "assets/images/all-image/bu_ghme.jpg",
      alt: "GHME practical first aid training",
    },
    "Healthcare Insights": {
      src: "assets/images/all-image/bu_insights.jpg",
      alt: "Healthcare Insights market intelligence team",
    },
    HUMILEY: {
      src: "assets/images/all-image/pt_humiley.jpg",
      alt: "HUMILEY engineering and technology project",
    },
    ESTUARY: {
      src: "assets/images/all-image/pt_estuary.jpg",
      alt: "ESTUARY sales technology presentation",
    },
    "W&A": {
      src: "assets/images/all-image/pt_wa.jpg",
      alt: "W and A advisory team meeting",
    },
    AIVISION: {
      src: "assets/images/all-image/pt_aivision.jpg",
      alt: "AIVISION artificial intelligence technology",
    },
    "QUI LONG": {
      src: "assets/images/all-image/pt_quilong.jpg",
      alt: "QUI LONG cleanroom engineering facility",
    },
  };
  function populateDetail(data, kind) {
    var detailPage = document.getElementById("detailPage");
    var notFound = document.getElementById("notFound");
    if (!data) {
      if (detailPage) {
        detailPage.hidden = true;
      }
      if (notFound) {
        notFound.hidden = false;
      }
      document.title = "Content not found — Healthcare Alliance";
      return;
    }
    document.title = data.name + " — Healthcare Alliance";
    document.getElementById("detailBreadcrumb").textContent = data.name;
    document.getElementById("detailKicker").textContent =
      kind === "partner" ? "Strategic Partner" : "Our Ecosystem";
    document.getElementById("detailName").textContent = data.name;
    document.getElementById("detailPosition").textContent = data.position;
    document.getElementById("detailDescription").textContent =
      data.tagline || data.description;
    var intro = document.getElementById("detailIntro");
    if (intro) {
      intro.textContent = data.description;
    }
    document.getElementById("capabilityRows").innerHTML = rowMarkup(
      data.capabilities,
    );
    document.getElementById("impactRows").innerHTML = rowMarkup(data.impacts);
    document.getElementById("expertiseItems").innerHTML = data.expertise
      .map(function (item) {
        return '<div class="expertise-item">' + item + "</div>";
      })
      .join("");
    var detailMedia = document.getElementById("detailMedia");
    var media = detailMediaByName[data.name];
    if (detailMedia && media) {
      detailMedia.src = media.src;
      detailMedia.alt = media.alt;
    }
    var cta = document.getElementById("detailCta");
    if (cta) {
      cta.href =
        "mailto:linh.nguyen@healthalliance.vn?subject=" +
        encodeURIComponent("Healthcare Alliance enquiry — " + data.name);
    }
  }

  if (page === "ecosystem-detail") {
    var ecosystemId = new URLSearchParams(window.location.search).get("id");
    populateDetail(ecosystemDetails[ecosystemId], "ecosystem");
  }
  if (page === "partner-detail") {
    var partnerId = new URLSearchParams(window.location.search).get("id");
    populateDetail(partnerDetails[partnerId], "partner");
  }
})();
