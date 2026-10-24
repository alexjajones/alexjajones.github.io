(function () {
  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  if (!input || !results) return;

  var index = null;
  var activeIndex = -1;

  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch(window.location.origin + "/index.json")
      .then(function (res) { return res.json(); })
      .then(function (data) { index = data; return data; });
  }

  function render(items) {
    results.innerHTML = "";
    activeIndex = -1;
    if (!items.length) {
      results.hidden = true;
      return;
    }
    items.slice(0, 8).forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.href;
      a.innerHTML = '<span class="result-title">' + item.title + '</span><span class="result-date">' + item.date + '</span>';
      li.appendChild(a);
      results.appendChild(li);
    });
    results.hidden = false;
  }

  function showSuggestions() {
    loadIndex().then(function (items) {
      var posts = items.filter(function (item) {
        return item.href.indexOf("/posts/") === 0;
      });
      var talks = items.filter(function (item) {
        return item.href.indexOf("/talks/") === 0;
      });
      render(posts.slice(0, 4).concat(talks.slice(0, 3)));
    });
  }

  input.addEventListener("focus", function () {
    if (!input.value.trim()) showSuggestions();
  });

  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();
    if (!q) {
      showSuggestions();
      return;
    }
    loadIndex().then(function (items) {
      var matches = items.filter(function (item) {
        return item.title.toLowerCase().indexOf(q) !== -1 ||
          item.content.toLowerCase().indexOf(q) !== -1;
      });
      render(matches);
    });
  });

  function focusOption(idx, options) {
    if (idx < 0) {
      activeIndex = -1;
      input.focus();
      return;
    }
    activeIndex = Math.min(idx, options.length - 1);
    options[activeIndex].focus();
  }

  function handleNav(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      results.hidden = true;
      activeIndex = -1;
      input.blur();
      return;
    }

    var options = results.querySelectorAll("a");
    if (results.hidden || !options.length) return;

    var forward = e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey);
    var backward = e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey);

    if (forward) {
      e.preventDefault();
      focusOption(activeIndex + 1, options);
    } else if (backward) {
      e.preventDefault();
      focusOption(activeIndex - 1, options);
    }
  }

  input.addEventListener("keydown", handleNav);
  results.addEventListener("keydown", handleNav);

  document.addEventListener("click", function (e) {
    if (!results.contains(e.target) && e.target !== input) {
      results.hidden = true;
    }
  });

  document.addEventListener("keydown", function (e) {
    var isMod = e.metaKey || e.ctrlKey;
    if (isMod && e.key.toLowerCase() === "k") {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });
})();
