/**
 * ============================================================================
 * MATLON / METTALON SOLAR — Central Configuration & Conversion Engine
 * Location: Raipur, Chhattisgarh, India
 * ============================================================================
 * INSTRUCTIONS FOR DEPLOYMENT TEAM:
 * 1. `whatsappNumber` is configured to official number: "919777139122" (+91 97771 39122).
 * 2. `companyVideoUrl` is configured to "assets/matlon-solar-intro.mp4" (also supports YouTube or Vimeo URLs).
 * 3. Add your Meta Pixel ID to `analytics.metaPixelId` below when ready — the page will automatically
 *    load and initialize the Meta Pixel script and fire PageView + Contact events.
 */

const SITE_CONFIG = {
  // Official WhatsApp Business Number (Country code 91 + 9777139122)
  whatsappNumber: "919777139122",

  // Exact Prefilled Consultation Message (Section 8 Requirement)
  whatsappMessage:
    "Hello Mettalon Solar, I am interested in installing rooftop solar at my home. I would like to know about the ₹1,08,000 government subsidy, estimated installation costs, and potential electricity savings. Please arrange a free consultation.",

  // Official Company Introduction Video URL (Supports direct .mp4, YouTube, or Vimeo URL)
  companyVideoUrl: "assets/matlon-solar-intro.mp4",

  // Synchronized Story Chapters for the Built-in Company Introduction Video
  videoChapters: [
    {
      start: 0,
      end: 5.5,
      badge: "01 • Chhattisgarh's Best Solar Installation Team",
      caption:
        "Mettalon Solar engineers clean, high-yield rooftop solar systems for modern homes across Raipur & Chhattisgarh.",
    },
    {
      start: 5.5,
      end: 10.5,
      badge: "02 • High-Grade Solar Materials",
      caption:
        "High-efficiency monocrystalline modules & anodized mounting structures built for decades of performance.",
    },
    {
      start: 10.5,
      end: 15.5,
      badge: "03 • 40-Member Professional Team",
      caption:
        "End-to-end structural installation and complete guidance for up to ₹1,08,000 government solar subsidy*.",
    },
    {
      start: 15.5,
      end: 25,
      badge: "04 • 200+ Homes Across Chhattisgarh",
      caption:
        "Trusted by homeowners across Chhattisgarh with 7+ awards & recognitions. Start your free consultation today.",
    },
  ],

  // Analytics & Conversion Tracking Readiness (Paste Meta Pixel ID here when ready)
  analytics: {
    metaPixelId: "", // <-- Paste your Meta Pixel ID here later (e.g. "123456789012345")
    ga4MeasurementId: "", // <-- Optional: Paste GA4 Measurement ID here (e.g. "G-XXXXXXXXXX")
    enableConsoleDebug: true,
    ga4EventName: "whatsapp_consultation_click",
    metaPixelEventName: "Contact",
  },
};

(function initMatlonSolarLanding() {
  "use strict";

  // Allow instant preview overrides via URL parameters (e.g. ?phone=919777139122&video=https://...&pixel=...)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("phone")) {
    SITE_CONFIG.whatsappNumber = urlParams.get("phone").replace(/[^0-9]/g, "");
  }
  if (urlParams.get("video")) {
    SITE_CONFIG.companyVideoUrl = urlParams.get("video");
  }
  if (urlParams.get("pixel")) {
    SITE_CONFIG.analytics.metaPixelId = urlParams.get("pixel").trim();
  }

  /**
   * Auto-Initialize Meta Pixel & GA4 when IDs are added to SITE_CONFIG
   */
  function initTrackingScripts() {
    const pixelId = (SITE_CONFIG.analytics.metaPixelId || "").trim();
    if (pixelId && typeof window.fbq !== "function") {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
    }

    const gaId = (SITE_CONFIG.analytics.ga4MeasurementId || "").trim();
    if (gaId && typeof window.gtag !== "function") {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaId);
    }
  }

  // Capture Ad Campaign UTM Parameters (Facebook Ads, Instagram Ads, Google Ads)
  const campaignAttribution = {
    utm_source: urlParams.get("utm_source") || "direct",
    utm_medium: urlParams.get("utm_medium") || "none",
    utm_campaign: urlParams.get("utm_campaign") || "none",
    utm_content: urlParams.get("utm_content") || "",
    fbclid: urlParams.get("fbclid") || "",
    gclid: urlParams.get("gclid") || "",
  };

  /**
   * Build Official WhatsApp Deep-Link URL (Compatible with iOS, Android, and Desktop Web/App)
   */
  function buildWhatsAppUrl() {
    let cleanPhone = (SITE_CONFIG.whatsappNumber || "").replace(/[^0-9]/g, "");
    // If a 10-digit Indian mobile number is entered without country code, prepend 91 automatically
    if (cleanPhone.length === 10) {
      cleanPhone = "91" + cleanPhone;
    }
    const encodedText = encodeURIComponent(SITE_CONFIG.whatsappMessage);

    if (cleanPhone.length >= 10) {
      return `https://wa.me/${cleanPhone}?text=${encodedText}`;
    }
    return `https://api.whatsapp.com/send?text=${encodedText}`;
  }

  /**
   * Fire GA4 & Meta Pixel Conversion Events
   */
  function trackConversion(eventType, placementLabel) {
    const payload = {
      placement: placementLabel || "general",
      whatsapp_number: SITE_CONFIG.whatsappNumber,
      subsidy_highlight: "up_to_108000_inr",
      location: "Raipur_Chhattisgarh",
      ...campaignAttribution,
    };

    // 1. Google Analytics 4 (gtag)
    if (typeof window.gtag === "function") {
      if (eventType === "whatsapp_click") {
        window.gtag("event", SITE_CONFIG.analytics.ga4EventName, {
          event_category: "Lead_Generation",
          event_label: placementLabel,
          ...payload,
        });
      } else if (eventType === "video_play") {
        window.gtag("event", "company_video_play", {
          event_category: "Engagement",
          event_label: placementLabel,
          ...payload,
        });
      }
    }

    // 2. Google Tag Manager dataLayer fallback
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventType === "whatsapp_click" ? "whatsapp_consultation_lead" : "company_video_play",
        ...payload,
      });
    }

    // 3. Meta Pixel (Facebook / Instagram Ads)
    if (typeof window.fbq === "function") {
      if (eventType === "whatsapp_click") {
        window.fbq("track", SITE_CONFIG.analytics.metaPixelEventName, {
          content_name: "Matlon Solar WhatsApp Consultation",
          content_category: "Residential Rooftop Solar",
          placement: placementLabel,
        });
        window.fbq("trackCustom", "WhatsAppConsultationClick", payload);
      } else if (eventType === "video_play") {
        window.fbq("trackCustom", "CompanyIntroVideoPlay", payload);
      }
    }

    if (SITE_CONFIG.analytics.enableConsoleDebug) {
      console.info(`[Matlon Solar Conversion Tracking] ${eventType}:`, payload);
    }
  }

  /**
   * Bind all WhatsApp CTAs across the landing page
   */
  function bindWhatsAppLinks() {
    const waLinks = document.querySelectorAll("[data-wa-cta]");
    const targetUrl = buildWhatsAppUrl();

    waLinks.forEach((link) => {
      link.setAttribute("href", targetUrl);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");

      if (!link.dataset.waBound) {
        link.dataset.waBound = "true";
        link.addEventListener("click", () => {
          const placement = link.getAttribute("data-wa-cta") || "cta_button";
          trackConversion("whatsapp_click", placement);
        });
      }
    });
  }

  /**
   * Parse Video URL & Build Embed Element (Supports YouTube, Vimeo, or Direct MP4)
   */
  function parseVideoEmbed(rawUrl) {
    if (!rawUrl || typeof rawUrl !== "string" || !rawUrl.trim()) {
      return null;
    }
    const url = rawUrl.trim();

    // 1. YouTube Detection (watch?v=, youtu.be/, embed/, shorts/)
    const ytMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch && ytMatch[1]) {
      return {
        type: "iframe",
        src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`,
      };
    }

    // 2. Vimeo Detection
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return {
        type: "iframe",
        src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`,
      };
    }

    // 3. Direct MP4 / WebM Video
    return {
      type: "video",
      src: url,
    };
  }

  /**
   * Setup Company Introduction Video Player & Mobile Sticky CTA Coordination
   */
  function setupVideoPlayer() {
    const videoStage = document.getElementById("company-video-stage");
    const embedLayer = document.getElementById("video-embed-layer");
    const mobileStickyBar = document.getElementById("mobile-sticky-bar");
    const secondaryScrollBtn = document.getElementById("scroll-to-video-btn");

    if (!videoStage || !embedLayer) return;

    let isVideoPlaying = false;

    function openVideoPlayer() {
      trackConversion("video_play", "hero_company_video");
      isVideoPlaying = true;
      embedLayer.innerHTML = "";
      embedLayer.classList.add("is-active");
      videoStage.setAttribute("aria-expanded", "true");

      // Hide mobile sticky bar while video is open so it never interferes with video controls
      if (mobileStickyBar) {
        mobileStickyBar.classList.add("is-hidden");
      }

      // Close Button
      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "video-close-btn";
      closeBtn.setAttribute("aria-label", "Close video player");
      closeBtn.innerHTML = "&#10005;";
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeVideoPlayer();
      });
      embedLayer.appendChild(closeBtn);

      const parsed = parseVideoEmbed(SITE_CONFIG.companyVideoUrl);

      if (parsed && parsed.type === "iframe") {
        const iframe = document.createElement("iframe");
        iframe.src = parsed.src;
        iframe.title = "Discover the Matlon Solar Difference";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        embedLayer.appendChild(iframe);
      } else if (parsed && parsed.type === "video") {
        const video = document.createElement("video");
        video.src = parsed.src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.poster = "assets/hero-solar-villa.jpg";
        embedLayer.appendChild(video);

        // Dynamic Chapter HUD Overlay for the Company Film
        const hudOverlay = document.createElement("div");
        hudOverlay.className = "cinema-hud-overlay";
        hudOverlay.innerHTML = `
          <span class="cinema-hud-pill" id="cinema-hud-badge">${SITE_CONFIG.videoChapters[0].badge}</span>
          <div class="cinema-hud-caption" id="cinema-hud-caption">${SITE_CONFIG.videoChapters[0].caption}</div>
        `;
        embedLayer.appendChild(hudOverlay);

        // End-of-Video Consultation Overlay
        const endOverlay = document.createElement("div");
        endOverlay.className = "cinema-end-overlay";
        endOverlay.innerHTML = `
          <span class="video-standby-badge">Mettalon Solar • Raipur, Chhattisgarh</span>
          <h4>Ready to Turn Your Rooftop Into a Lifetime of Savings?</h4>
          <p>Speak directly with our solar engineers on WhatsApp to check your home's eligibility for up to ₹1,08,000 government subsidy*.</p>
          <div class="cinema-end-actions">
            <a href="${buildWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="btn-primary-wa btn-lime" data-wa-cta="video_end_screen_cta">
              <span>Get FREE Solar Consultation</span>
            </a>
            <button type="button" class="cinema-replay-btn" id="cinema-replay-btn">Replay Film</button>
          </div>
        `;
        embedLayer.appendChild(endOverlay);
        bindWhatsAppLinks();

        const badgeEl = hudOverlay.querySelector("#cinema-hud-badge");
        const captionEl = hudOverlay.querySelector("#cinema-hud-caption");
        const replayBtn = endOverlay.querySelector("#cinema-replay-btn");

        video.addEventListener("timeupdate", () => {
          const t = video.currentTime;
          const activeChapter =
            SITE_CONFIG.videoChapters.find((c) => t >= c.start && t < c.end) ||
            SITE_CONFIG.videoChapters[SITE_CONFIG.videoChapters.length - 1];
          if (activeChapter && badgeEl && captionEl) {
            if (badgeEl.textContent !== activeChapter.badge) {
              badgeEl.textContent = activeChapter.badge;
              captionEl.textContent = activeChapter.caption;
            }
          }
        });

        video.addEventListener("ended", () => {
          hudOverlay.style.opacity = "0";
          endOverlay.classList.add("is-visible");
        });

        if (replayBtn) {
          replayBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            endOverlay.classList.remove("is-visible");
            hudOverlay.style.opacity = "1";
            video.currentTime = 0;
            video.play();
          });
        }
      }
    }

    function closeVideoPlayer() {
      isVideoPlaying = false;
      embedLayer.classList.remove("is-active");
      embedLayer.innerHTML = "";
      videoStage.setAttribute("aria-expanded", "false");
      if (mobileStickyBar) {
        mobileStickyBar.classList.remove("is-hidden");
      }
    }

    videoStage.addEventListener("click", (e) => {
      if (!isVideoPlaying && !e.target.closest(".video-embed-layer")) {
        openVideoPlayer();
      }
    });

    videoStage.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && !isVideoPlaying) {
        e.preventDefault();
        openVideoPlayer();
      }
    });

    // Secondary Hero CTA: Smooth scroll to video section and start playback
    if (secondaryScrollBtn) {
      secondaryScrollBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const videoSection = document.getElementById("company-video");
        if (videoSection) {
          videoSection.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => {
            if (!isVideoPlaying) openVideoPlayer();
          }, 600);
        }
      });
    }
  }

  /**
   * Header Scroll Effect & Smart Mobile Sticky Bar Visibility
   */
  function setupScrollEffects() {
    const header = document.getElementById("site-header");
    const mobileStickyBar = document.getElementById("mobile-sticky-bar");
    const closingCtaSection = document.getElementById("closing-cta");
    const embedLayer = document.getElementById("video-embed-layer");

    function onScroll() {
      if (header) {
        if (window.scrollY > 18) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
      }

      // Keep sticky bar unobtrusive when video is playing or when user is directly viewing the final closing CTA
      if (mobileStickyBar && embedLayer && !embedLayer.classList.contains("is-active")) {
        if (closingCtaSection) {
          const rect = closingCtaSection.getBoundingClientRect();
          const isClosingVisible = rect.top < window.innerHeight * 0.78 && rect.bottom > 120;
          if (isClosingVisible) {
            mobileStickyBar.classList.add("is-hidden");
          } else {
            mobileStickyBar.classList.remove("is-hidden");
          }
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /**
   * Subtle Scroll Reveal & Numerical Count-Up in Trust Strip
   */
  function setupRevealAndCounters() {
    const revealEls = document.querySelectorAll(".reveal-up");
    const counterEls = document.querySelectorAll("[data-count-target]");

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -30px 0px" }
      );

      revealEls.forEach((el) => revealObserver.observe(el));

      const counterObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );

      counterEls.forEach((el) => counterObserver.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count-target"), 10);
    const suffix = el.getAttribute("data-count-suffix") || "";
    if (isNaN(target)) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 1300;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      el.textContent = `${current}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    }

    requestAnimationFrame(tick);
  }

  // Initialize on DOM Ready
  document.addEventListener("DOMContentLoaded", () => {
    initTrackingScripts();
    bindWhatsAppLinks();
    setupVideoPlayer();
    setupScrollEffects();
    setupRevealAndCounters();
  });
})();
