(function () {
  var items = Array.prototype.slice.call(
    document.querySelectorAll(".talks-list a, .post-list a")
  );
  if (!items.length) return;

  var activeIndex = -1;

  function clear() {
    if (activeIndex >= 0) items[activeIndex].closest("li").classList.remove("vim-active");
  }

  function setActive(idx) {
    clear();
    activeIndex = Math.max(0, Math.min(idx, items.length - 1));
    var li = items[activeIndex].closest("li");
    li.classList.add("vim-active");
    li.scrollIntoView({ block: "nearest" });
  }

  function isTyping() {
    var el = document.activeElement;
    return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
  }

  document.addEventListener("keydown", function (e) {
    if (isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === "j") {
      e.preventDefault();
      setActive(activeIndex + 1);
    } else if (e.key === "k") {
      e.preventDefault();
      setActive(activeIndex - 1);
    } else if ((e.key === "Enter" || e.key === "o") && activeIndex >= 0) {
      e.preventDefault();
      window.location.href = items[activeIndex].getAttribute("href");
    } else if (e.key === "Escape") {
      clear();
      activeIndex = -1;
    }
  });
})();
