class DarkModeToggle {
  isDarkMode = null;

  constructor({ $target }) {
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $target.appendChild($DarkModeToggle);

    $DarkModeToggle.addEventListener("change", (e) => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }

  initColorMode() {
    // 초기화
    // isDarkMode 상태, checkbox 상태
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.$DarkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      "color-mode",
      isDarkMode ? "dark" : "light"
    );
  }
  render() {}
}
