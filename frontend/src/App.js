console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.loading = new Loading({
      $target,
    });

    this.darkModeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        //show
        this.loading.show();

        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);

          //hide
          this.loading.hide();
        });
      },
    });

    this.randomSearchButton = new RandomSearchButton({
      $target,
      onRandomSearch: () => {
        //show
        this.loading.show();

        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          //hide
          this.loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
