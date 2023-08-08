class RandomSearchButton {
  $wrapper = null;

  constructor({ $target, onRandomSearch }) {
    this.$wrapper = $target.querySelector("#SearchWrapper");

    const $randomSearchButton = document.createElement("button");
    this.$randomSearchButton = $randomSearchButton;
    this.$randomSearchButton.textContent = "랜덤고양이";
    this.$randomSearchButton.className = "RandomSearchButton";

    this.$wrapper.appendChild($randomSearchButton);

    $randomSearchButton.addEventListener("click", (e) => {
      onRandomSearch();
    });
  }
}
