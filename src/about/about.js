import './about.css';

//Импорт
import '../../node_modules/swiper/css/swiper.min.css';
import Swiper from 'swiper';
import {
  getFormattedDate
} from '../js/utils/utils';
import GithubApi from '../js/modules/githubApi';
import CommitsCardList from '../js/components/commitCardList';
import CommitCard from '../js/components/commitCard';

//Slider
const initSwiper = () => {
  const mySwiper = new Swiper ('.swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    direction: 'horizontal',
    loop: true,
    simulateTouch: true,
    spaceBetween: 16,
    pagination: {
      el: '.commits__pagination',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.commits__button_type_right',
      prevEl: '.commits__button_type_left',
    }
  });
};

// Реализация GITHUB API
const githubApi = new GithubApi();
const commitCard = new CommitCard({
  getFormattedDate: getFormattedDate
});
const commitsCardList = new CommitsCardList({
  commitCard: commitCard,
  githubApi: githubApi,
  initSwiper: initSwiper
});

commitsCardList.renderCommits();
