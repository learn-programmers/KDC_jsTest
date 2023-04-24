import Empty from './Empty.js';

class SearchResult {
  $searchResult = null;
  data = null; // == items == array 
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement('section');
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.Empty = new Empty({
      $target: $wrapper
    })

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.Empty.show(nextData);
  }

  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item, index) => {
      // 아이템이 화면에 보일 떄
      if (item.isIntersecting) {        
        // 이미지를 로드한다. 
        item.target.querySelector('img').src = item.target.querySelector('img').dataset.src;
        // 마지막 요소를 찾아낸다
        // console.log(this.data.length);        
        let dataIndex = Number(item.target.dataset.index);
        // console.log(dataIndex);
        // 마지막 요소라면? nextPage 호출
        if (dataIndex + 1 === this.data.length) {
          this.onNextPage();
        }
      }      
    })
  });

  render() {
    if (this.data === null || this.data.length === 0) {
      this.$searchResult.style.display = 'none';  
      return;
    }
    this.$searchResult.style.display = 'grid';
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <li class="item" data-index=${index}>
            <img src="https://via.placeholder.com/200x300" data-src=${cat.url} alt=${cat.name} />
            <div class="content">
              ${cat.name}
            </div>
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });

      this.listObserver.observe($item);
    });

  }
}

export default SearchResult;