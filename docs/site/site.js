(() => {
  "use strict";
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  function markSection() {
    const threshold = document.querySelector('.topbar').getBoundingClientRect().height + 80;
    let active = 0;
    sections.forEach((section,index) => { if (section.getBoundingClientRect().top <= threshold) active = index; });
    navLinks.forEach((link,index) => { if (index===active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
  }
  window.addEventListener('scroll',markSection,{passive:true}); markSection();
  document.querySelectorAll("[data-comparison]").forEach(comparison => {
    const range = document.getElementById(comparison.dataset.comparison);
    function update(value) {
      range.value = Math.max(0, Math.min(100, Math.round(value)));
      comparison.style.setProperty("--position", `${range.value}%`);
      if (range.id === "photo-range") document.querySelector("#photo-position").textContent = `${range.value}%`;
    }
    range.addEventListener("input", () => update(range.value));
    function fromPointer(event) { const bounds = comparison.getBoundingClientRect(); update((event.clientX - bounds.left) / bounds.width * 100); }
    comparison.addEventListener("pointerdown", event => {
      if (!event.isPrimary || event.button !== 0) return;
      comparison.setPointerCapture(event.pointerId); fromPointer(event);
    });
    comparison.addEventListener("pointermove", event => { if (comparison.hasPointerCapture(event.pointerId)) fromPointer(event); });
    comparison.addEventListener("pointerup", event => { if (comparison.hasPointerCapture(event.pointerId)) comparison.releasePointerCapture(event.pointerId); });
  });
  document.querySelector('#reset-photo').addEventListener('click', () => {
    const range = document.querySelector('#photo-range');
    range.value = 50; range.dispatchEvent(new Event('input'));
  });

  // Korean is the page source; English replaces it in place, and the original Korean is restored from a snapshot.
  const english = {
    "meta.title": "ImageUpscaler — Small images, made sharper.",
    "meta.description": "Upscale photos, illustrations, transparent images and pixel art up to 8×. A single-EXE image upscaler for Windows.",
    "meta.og": "Four methods, up to 8× larger. Your images are processed on your PC.",
    "skip": "Skip to content",
    "nav.label": "Main menu", "nav.sections": "Section shortcuts", "nav.language": "Language",
    "nav.top": "Intro", "nav.preview": "Try the app", "nav.modes": "Methods", "nav.start": "How to use", "nav.download": "Download",
    "hero.title": "Small images,<br><span class=\"gradient\">made sharper.</span>",
    "hero.lead": "From photo detail to the lines of a drawing.<br>Up to 8× larger, the way each image needs.<br>All processing stays on your PC.",
    "hero.download": "Download for Windows", "hero.compare": "Compare before and after",
    "hero.fine": "Windows 10/11 · 64-bit · one executable",
    "hero.icon": "ImageUpscaler icon in pink, lavender and blue",
    "hero.after": "Mountain and moon illustration enlarged 4× with Image AI",
    "label.original": "Original", "hero.afterLabel": "Image AI · 4×", "hero.try": "Try the comparison yourself",
    "hero.range": "Comparison line between the original and the 4× result",
    "hero.note": "A real result from the app. Move the line to compare.",
    "facts.label": "Feature summary", "facts.scale": "The size you need", "facts.formats": "Familiar image formats",
    "facts.alpha": "Transparent backgrounds", "facts.alphaNote": "Even soft edges stay intact", "facts.local": "On your PC", "facts.localNote": "Nothing is uploaded",
    "preview.title": "See the new detail<br>right in the app.",
    "preview.lead": "A sample actually processed with Photo AI.<br>Drag the line inside the window to compare.",
    "demo.label": "Photo comparison inside an ImageUpscaler app window", "demo.version": "GitHub repository, version",
    "demo.web": "Web demo", "demo.list": "Sample image list", "app.library": "Library", "demo.thumb": "Mountain lake sample thumbnail",
    "app.done": "Done", "demo.libraryNote": "Your images too,<br>with a single drop.",
    "demo.stage": "Move the line to inspect the trees and mountains.",
    "demo.after": "Real Photo AI 4× result of the mountains, lake and trees", "demo.afterLabel": "Photo AI · 4×",
    "demo.line": "Comparison", "demo.range": "Comparison line between the original and the Photo AI 4× result",
    "demo.resetLabel": "Center the comparison line", "demo.reset": "Center",
    "demo.engine": "Photo AI / Real-ESRGAN x4plus", "demo.done": "4× upscale done",
    "demo.settings": "Upscale settings used for this sample", "app.settings": "Upscale settings", "app.scale": "Scale", "app.method": "Method",
    "app.photo": "Photo · AI restore", "app.photoNote": "Natural texture and detail",
    "app.illustration": "Illustration · AI restore", "app.illustrationNote": "Crisper drawings and lines",
    "app.faithful": "Faithful", "app.faithfulNote": "Smooth, with no invented detail",
    "app.pixel": "Pixel art", "app.pixelNote": "Keeps pixel edges exact", "app.format": "Format",
    "demo.download": "Upscale my images",
    "demo.caption": "This web demo recreates the app window; the photo is the app's real 4× result. Photo by <a href=\"https://unsplash.com/@thomas0504\">Thomas Roach</a> on <a href=\"https://unsplash.com/photos/snow-capped-mountain-reflected-in-a-calm-lake-t-197CjKce8\">Unsplash</a>. AI estimates detail.",
    "modes.title": "The right method<br>for every image.",
    "modes.lead": "Add new detail, or keep what is there.<br>The method is part of the file name, so results are easy to tell apart.",
    "modes.group": "Choose a method to learn about", "modes.photo": "Photo AI", "modes.image": "Image AI", "modes.faithfulNote": "Smooth, with no invented detail",
    "modes.filename": "Saved file name", "modes.duplicate": "If the name exists, <code>-2</code> or <code>-3</code> is added.",
    "modes.care": "<strong>Your originals stay untouched.</strong> Transparency is enlarged separately, and results with severe color damage are never saved.",
    "start.title": "Simple to start.", "start.lead": "No installer, no account.<br>The models and runtime are inside the EXE.",
    "start.run": "Run it from any folder", "start.runNote": "Download and run <code>ImageUpscaler.exe</code>. A <code>bin</code> folder for settings and work files appears right next to it.",
    "start.pick": "Pick images and options", "start.pickNote": "Drop files in and choose the scale, method and format. PNG or WebP is recommended for transparent images.",
    "start.compare": "Upscale and compare", "start.compareNote": "Start upscaling and check the before and after. Results go to <code>output</code> next to the EXE by default, or to any folder you choose.",
    "start.batch": "Many images at once", "start.batchNote": "Images are processed in the order you add them, with progress and a result for each file. Remove one with its X, or select several with Ctrl·Shift and clear them at once. Original files stay untouched.",
    "start.zoom": "Zoom in for a closer look", "start.zoomNote": "Zoom with the wheel and drag the comparison line. You can cancel at any time while it runs.",
    "start.tray": "Keeps working from the tray", "start.trayNote": "Minimizing sends it to the tray. Double-click to bring it back; the work keeps going.",
    "download.title": "Got an image you would<br>like to see bigger?", "download.lead": "Start upscaling with a single executable.",
    "download.release": "Get it from GitHub Releases", "download.status": "Use the SHA-256 below to check that your download is the same file.",
    "download.before": "Before you run it",
    "download.ai": "AI modes", "download.aiNote": "They need a GPU and driver with Vulkan support. The app checks at start-up; on PCs without support it marks AI modes unavailable and selects Faithful.",
    "download.alpha": "Transparent images", "download.alphaNote": "PNG, WebP and AVIF keep transparency. Saving a transparent image as JPG is stopped with a notice.",
    "download.update": "Automatic updates", "download.updateNote": "A new version is installed only after its SHA-256 is verified, then the app restarts. The completion window closes after 5 seconds.",
    "download.settings": "Settings and backup", "download.settingsNote": "Settings are saved to <code>bin/settings.json</code> next to the EXE. Move this file along when you move the app.",
    "download.hash": "Checks that your EXE is the same file", "download.copyLabel": "Copy the EXE SHA-256", "download.copy": "Copy",
    "faq.title": "Questions you might have.",
    "faq.modeQ": "Which mode should I use for photos and icons?",
    "faq.modeA": "Start with Photo AI for photos and Image AI for illustrations and icons. Use Faithful to keep the original look as closely as possible, and Pixel art for grid-based drawings. AI estimates detail, so compare the results before choosing.",
    "faq.eightQ": "How does 8× work?",
    "faq.eightA": "It runs the 2× upscale first, then enlarges that result 4×. In AI modes both steps use AI, with a damage check after each. The result must stay within 48 megapixels, so 8× works for images up to about 750,000 pixels (for example 1000 × 750).",
    "faq.privacyQ": "Are my images sent to a server?",
    "faq.privacyA": "No. Images are processed on your PC. The app connects to GitHub only to check for and download updates, and never uploads image files.",
    "faq.faithfulQ": "Does Faithful mode keep every bit of information?",
    "faq.faithfulA": "It enlarges without estimating new detail with AI. Output is 8-bit sRGB; HDR, 16-bit precision and animation are not supported. Working images, including AI's internal 4× frame and 8× results, are limited to 48 megapixels.",
    "faq.driveQ": "Is it limited to the F: drive?",
    "faq.driveA": "No. It runs from any drive; pick a location where a working folder can be created next to the EXE. The F: drive rule applies only to development.",
    "footer.changelog": "Changelog", "footer.font": "Font license"
  };
  const descriptions = {
    ko: {
      photo: { title: "사진의 작은 디테일을\n더 크게 만나보세요.", description: "사진의 질감과 세부 표현을 AI로 복원합니다. 새로운 디테일을 추정하므로 원본과 표현이 달라질 수 있습니다.", tags: ["사진에 추천", "Vulkan GPU 필요"] },
      image: { title: "그림의 선과 색을\n또렷하게 키우세요.", description: "일러스트와 아이콘에 어울리는 AI 모델로 선과 색면을 확대합니다. 투명 배경은 별도로 처리해 유지합니다.", tags: ["일러스트 · 아이콘", "Vulkan GPU 필요"] },
      faithful: { title: "원본의 표현을\n부드럽게 확대하세요.", description: "AI로 새 디테일을 만들지 않고 기존 픽셀을 보간합니다. 색상 계산은 선형 색공간에서 처리하며 출력은 8bit sRGB입니다.", tags: ["새 디테일 추정 없음", "GPU 없이 사용"] },
      pixel: { title: "한 칸의 픽셀을\n정확한 여러 칸으로.", description: "픽셀 경계를 흐리지 않고 정수 배율로 확대합니다. 도트 그림과 작은 게임 그래픽의 격자를 유지하고 싶을 때 사용하세요.", tags: ["픽셀 경계 유지", "GPU 없이 사용"] }
    },
    en: {
      photo: { title: "See the fine detail\nof your photos, larger.", description: "Restores photo texture and detail with AI. Because it estimates new detail, the result can differ from the original.", tags: ["Best for photos", "Needs a Vulkan GPU"] },
      image: { title: "Enlarge the lines and colors\nof your artwork crisply.", description: "Enlarges lines and flat colors with an AI model suited to illustrations and icons. Transparent backgrounds are handled separately and kept.", tags: ["Illustrations · icons", "Needs a Vulkan GPU"] },
      faithful: { title: "Enlarge the original look,\nsmoothly.", description: "Interpolates existing pixels without creating new detail with AI. Color math runs in linear light and the output is 8-bit sRGB.", tags: ["No invented detail", "Works without a GPU"] },
      pixel: { title: "Turn each pixel into\nan exact block of pixels.", description: "Enlarges by whole-number steps without blurring pixel edges. Use it to keep the grid of pixel art and small game graphics.", tags: ["Pixel edges kept", "Works without a GPU"] }
    }
  };
  const modeInfo = {
    photo: { kicker: "PHOTO / REAL-ESRGAN X4PLUS", filename: "sample-photo-ai-4x.png" },
    image: { kicker: "ILLUSTRATION / X4PLUS-ANIME 6B", filename: "sample-image-ai-4x.png" },
    faithful: { kicker: "FAITHFUL / LANCZOS", filename: "sample-faithful-4x.png" },
    pixel: { kicker: "PIXEL ART / NEAREST NEIGHBOR", filename: "sample-pixel-art-4x.png" }
  };
  const copyMessages = { ko: ["SHA-256을 복사했습니다.", "선택된 검증값을 Ctrl+C로 복사하세요."], en: ["SHA-256 copied.", "The checksum is selected. Press Ctrl+C to copy it."] };
  const version = document.querySelector(".demo-version span").textContent.replace(/^v/, "");
  const korean = new Map();
  const remember = (element, slot, value) => { const saved = korean.get(element) || {}; if (!(slot in saved)) saved[slot] = value; korean.set(element, saved); return saved[slot]; };
  let language = "ko";

  const buttons = [...document.querySelectorAll("[data-mode]")];
  function selectMode(button) {
    const content = { ...modeInfo[button.dataset.mode], ...descriptions[language][button.dataset.mode] };
    buttons.forEach(candidate => candidate.setAttribute("aria-pressed", String(candidate === button)));
    document.querySelector("#mode-kicker").textContent = content.kicker;
    const title = document.querySelector("#mode-title");
    title.replaceChildren();
    content.title.split("\n").forEach((line, index) => { if (index) title.append(document.createElement("br")); title.append(document.createTextNode(line)); });
    document.querySelector("#mode-description").textContent = content.description;
    document.querySelector("#mode-filename").textContent = content.filename;
    document.querySelector("#mode-tags").replaceChildren(...content.tags.map(text => { const span = document.createElement("span"); span.textContent = text; return span; }));
  }
  buttons.forEach(button => {
    button.addEventListener("click", () => selectMode(button));
    button.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
      const next = buttons[(buttons.indexOf(button) + direction + buttons.length) % buttons.length];
      next.focus(); selectMode(next);
    });
  });

  function applyLanguage(next) {
    language = next === "en" ? "en" : "ko";
    const en = language === "en";
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const original = remember(element, "text", element.textContent);
      element.textContent = en ? english[element.dataset.i18n] ?? original : original;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(element => {
      const original = remember(element, "html", element.innerHTML);
      element.innerHTML = en ? english[element.dataset.i18nHtml] ?? original : original;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(element => {
      element.dataset.i18nAttr.split(",").forEach(pair => {
        const [attribute, key] = pair.split(":");
        const original = remember(element, "@" + attribute, element.getAttribute(attribute));
        let value = en ? english[key] ?? original : original;
        if (en && key === "demo.version") value += " " + version;
        element.setAttribute(attribute, value);
      });
    });
    document.documentElement.lang = language;
    document.querySelectorAll("[data-lang]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lang === language)));
    selectMode(buttons.find(button => button.getAttribute("aria-pressed") === "true") || buttons[0]);
    document.querySelector("#copy-status").textContent = "";
    try { localStorage.setItem("imageupscaler-language", language); } catch { }
  }
  document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));
  // URL parameter, then the viewer's last choice, then the browser language: Korean only for Korean browsers.
  const requested = new URLSearchParams(location.search).get("lang");
  let stored = null; try { stored = localStorage.getItem("imageupscaler-language"); } catch { }
  const initial = ["ko", "en"].includes(requested) ? requested : ["ko", "en"].includes(stored) ? stored : (navigator.language || "").toLowerCase().startsWith("ko") ? "ko" : "en";
  applyLanguage(initial);

  document.querySelector("#copy-hash").addEventListener("click", async () => {
    const hash = document.querySelector("#checksum");
    const status = document.querySelector("#copy-status");
    try { await navigator.clipboard.writeText(hash.textContent.trim()); status.textContent = copyMessages[language][0]; }
    catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(hash); selection.removeAllRanges(); selection.addRange(range); status.textContent = copyMessages[language][1]; }
  });
})();
