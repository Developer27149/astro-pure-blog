const currentTheme = localStorage.getItem("theme");

function getPreferTheme() {
  // If the user has set a theme before, use it
  if (currentTheme) return currentTheme;
  // If the user has not set a theme before, use the system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();

function setPreferenceTheme() {
  localStorage.setItem("theme", themeValue);
  reflectPreferenceTheme();
}

function reflectPreferenceTheme() {
  const body = document.body;

  document.querySelectorAll(".theme-toggle").forEach((el) => {
    el.setAttribute("aria-label", themeValue);
  });

  if (themeValue === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  if (body) {
    const computed = window.getComputedStyle(body);
    const bgColor = computed.backgroundColor;

    // set the background color in meta tag
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", bgColor);
  }
}

// 尽早设置主题，以免出现背景色闪烁
reflectPreferenceTheme();

window.onload = () => {
  function setThemeFeature() {
    reflectPreferenceTheme();

    document.querySelectorAll(".theme-toggle").forEach((el) => {
      el.addEventListener("click", () => {
        themeValue = themeValue === "dark" ? "light" : "dark";
        // 设置主题
        setPreferenceTheme();
      });
    });
  }

  setThemeFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);
};

// Listen for changes in system preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    themeValue = e.matches ? "dark" : "light";
    setPreferenceTheme();
  });
