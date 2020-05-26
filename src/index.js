import './index.css';

//Импорт 
import NewsApi from './js/modules/newsApi';
import DataStorage from './js/modules/dataStorage';
import NewsCard from './js/components/newsCard';
import NewsCardList from './js/components/newsCardList';
import SearchInput from './js/components/searchInput';
import {
  renderNews,
  interval,
  getFormattedDate
} from './js/utils/utils';
import {
  formSearch,
  themeInput,
  apiKey,
  pageSize,
  newsContainer,
  newsButton,
  newsData,
  newsFind,
  newsOut,
  validationWords,
  errorMessage,
  searchButton,
  newsError
} from './js/constants/indexConstants';

const news = new NewsApi({
  apiKey: apiKey,
  from: interval.from,
  to: interval.to,
  pageSize: pageSize,
  newsError: newsError
});
const dataStorage = new DataStorage({
  news: news
});
const newsCard = new NewsCard({
  getFormattedDate: getFormattedDate
});
const newsCardList = new NewsCardList();
const searchInput = new SearchInput({
  newsCard: newsCard,
  newsCardList: newsCardList,
  dataStorage: dataStorage,
  newsData: newsData,
  newsContainer: newsContainer,
  newsButton: newsButton,
  newsFind: newsFind,
  newsOut: newsOut,
  themeInput: themeInput,
  validationWords: validationWords,
  searchButton: searchButton,
  errorMessage: errorMessage,
  formSearch: formSearch,
  newsError: newsError,
  renderNews: renderNews
});
const handleKeyWord = (event) => {
  countNews = 3;
  event.preventDefault();
  searchInput.renderStartNews();
  formSearch.reset();
};
const handleAddNews = () => {
  const newsArray = dataStorage.getNewsArray();
  const newsAddBlock = newsCardList.createNewsContainer();
  newsContainer.appendChild(newsAddBlock);
  
  for (let i = countNews; i < countNews + 3 && i <= newsArray.length; i += 1) {
    
    if (i === newsArray.length - 1) {
      newsArray[i].urlToImage === null ? newsArray[i].urlToImage = "./images/faviconka_ru_1119.png" : newsArray[i].urlToImage;
      renderNews(newsCardList, newsAddBlock, newsCard, newsArray, i);
      newsButton.classList.add('news__button_is-invisible');
      return;
    }
    
    newsArray[i].urlToImage === null ? newsArray[i].urlToImage = "./images/faviconka_ru_1119.png" : newsArray[i].urlToImage;
    renderNews(newsCardList, newsAddBlock, newsCard, newsArray, i);
  };
  countNews += 3;
};


let countNews;

//Слушатели
searchInput.setEventListeners();
formSearch.addEventListener('submit', handleKeyWord);
newsButton.addEventListener('click', handleAddNews);