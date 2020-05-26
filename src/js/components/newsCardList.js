export default class NewsCardList {
  createNewsContainer() {
    const newsBlock = document.createElement('div');
    newsBlock.classList.add('news__block');
    return newsBlock;
  }

  addNews(container, card) {
    container.appendChild(card);
  }
}
