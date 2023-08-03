class DarkModeToggle {
  constructor({ $target, onSearch }) {
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $target.appendChild($DarkModeToggle);

    $DarkModeToggle.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    console.log("DarkModeToggle created.", this);
  }
  render() {}
}
