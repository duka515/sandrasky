(function () {
  var c = window.SITE || {}; var popup = c.popup || {}; var currentUrl = popup.url || "";
  function setText(id, value) { var el = document.getElementById(id); if (el && value != null) el.textContent = value; }
  setText("creatorName", c.name); setText("popupName", c.name); setText("footerName", c.name); setText("tagline", c.tagline); setText("flag", c.flag); setText("videoCount", c.videos); setText("photoCount", c.photos); setText("photoCountLabel", c.photos); setText("year", new Date().getFullYear());
  if (c.name) document.title = c.name;
  var avatar = document.getElementById("avatar"); if (avatar && c.avatar) avatar.src = c.avatar;
  var headlines = { live: "Join my live show for free", premium: "Unlock exclusive content", photos: "Unlock private photos" };
  var kickers = { live: "Live now", premium: "Members only", photos: "Private gallery" };
  var headline = document.getElementById("popupHeadline"); if (headline && popup.headline) headline.textContent = popup.headline;
  var steps = document.getElementById("popupSteps"); if (steps && popup.steps) steps.innerHTML = popup.steps.map(function (s) { return "<div>" + s + "</div>"; }).join("");
  var overlay = document.getElementById("funnelOverlay"); var join = document.getElementById("popupJoin");
  function openOffer(url, kind) { currentUrl = url || popup.url || ""; if (headline) headline.textContent = headlines[kind] || popup.headline || "Create a free account to continue"; var kicker = document.getElementById("popupKicker"); if (kicker) kicker.textContent = kickers[kind] || "Exclusive access"; if (!overlay) return; overlay.hidden = false; overlay.style.cssText = "position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:rgba(8,6,15,.72)"; document.documentElement.classList.add("funnel-open"); document.body.classList.add("funnel-open"); }
  function bind(selector, url, kind) { document.querySelectorAll(selector).forEach(function (el) { el.removeAttribute("href"); el.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); openOffer(url, kind); }); }); }
  bind(".js-live", c.liveUrl, "live"); bind(".js-premium", c.premiumUrl, "premium"); bind(".js-photos", c.photosUrl, "photos");
  if (join) { join.removeAttribute("href"); join.addEventListener("click", function (e) { e.preventDefault(); if (currentUrl) window.open(currentUrl, "_blank", "noopener"); }); }
  function closeFunnel(e) { if (e) e.preventDefault(); if (!overlay) return; overlay.hidden = true; overlay.style.display = "none"; document.documentElement.classList.remove("funnel-open"); document.body.classList.remove("funnel-open"); }
  var closeBtn = document.getElementById("popupClose"); if (closeBtn) closeBtn.addEventListener("click", closeFunnel);
  if (overlay) overlay.addEventListener("click", function (e) { if (e.target === overlay) closeFunnel(e); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeFunnel(); });
})();
