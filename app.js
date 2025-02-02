const litespeed_ui_events = [
  "mouseover",
  "click",
  "keydown",
  "wheel",
  "touchmove",
  "touchstart",
];
var urlCreator = window.URL || window.webkitURL;
function litespeed_load_delayed_js_force() {
  console.log("[LiteSpeed] Start Load JS Delayed"),
    litespeed_ui_events.forEach((e) => {
      window.removeEventListener(e, litespeed_load_delayed_js_force, {
        passive: !0,
      });
    }),
    document.querySelectorAll("iframe[data-litespeed-src]").forEach((e) => {
      e.setAttribute("src", e.getAttribute("data-litespeed-src"));
    }),
    "loading" == document.readyState
      ? window.addEventListener("DOMContentLoaded", litespeed_load_delayed_js)
      : litespeed_load_delayed_js();
}
litespeed_ui_events.forEach((e) => {
  window.addEventListener(e, litespeed_load_delayed_js_force, { passive: !0 });
});
async function litespeed_load_delayed_js() {
  let t = [];
  for (var d in (document
    .querySelectorAll('script[type="litespeed/javascript"]')
    .forEach((e) => {
      t.push(e);
    }),
  t))
    await new Promise((e) => litespeed_load_one(t[d], e));
  document.dispatchEvent(new Event("DOMContentLiteSpeedLoaded")),
    window.dispatchEvent(new Event("DOMContentLiteSpeedLoaded"));
}
function litespeed_load_one(t, e) {
  console.log("[LiteSpeed] Load ", t);
  var d = document.createElement("script");
  d.addEventListener("load", e),
    d.addEventListener("error", e),
    t.getAttributeNames().forEach((e) => {
      "type" != e &&
        d.setAttribute("data-src" == e ? "src" : e, t.getAttribute(e));
    });
  let a = !(d.type = "text/javascript");
  !d.src &&
    t.textContent &&
    ((d.src = litespeed_inline2src(t.textContent)), (a = !0)),
    t.after(d),
    t.remove(),
    a && e();
}
function litespeed_inline2src(t) {
  try {
    var d = urlCreator.createObjectURL(
      new Blob([t.replace(/^(?:<!--)?(.*?)(?:-->)?$/gm, "$1")], {
        type: "text/javascript",
      })
    );
  } catch (e) {
    d =
      "data:text/javascript;base64," +
      btoa(t.replace(/^(?:<!--)?(.*?)(?:-->)?$/gm, "$1"));
  }
  return d;
}
