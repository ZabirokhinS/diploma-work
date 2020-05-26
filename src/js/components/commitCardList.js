export default class CommitCardList {
  constructor(options) {
    this.options = options;
  }

  addCommit(card) {
    const commitsContainer = document.querySelector('.swiper-wrapper');
    commitsContainer.insertAdjacentHTML('afterbegin', card);
  }

  renderCommits() {
    this.options.githubApi.getCommits().then((commits) => {
      commits.forEach((commit) => {
        this.addCommit(this.options.commitCard.create(commit));
      });
      this.options.initSwiper();
    });
  }
}
