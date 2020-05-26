export default class SearchInput {
  constructor(options) {
    this.options = options;
  }

  // Функции
  _renderLoading(isLoading, block) {
    if(isLoading) {
      block.classList.add('news__find_is-visible');
    } else {
      block.classList.remove('news__find_is-visible');
    }
  }

  
  _checkInputValidity(elementInput, elementError) {
    if (elementInput.validity.tooShort) {
      elementError.classList.remove('lead__search_error-message_type_inactive');
      elementError.textContent = this.options.validationWords.validationInput;
      return;
    }
    this._resetError(elementError);
    return;
  }

  
  _setSubmitButtonState(elementForm, elementButton) {
    if (!elementForm.checkValidity()) {
      elementButton.setAttribute('disabled', true);
      elementButton.classList.remove('lead__button_type_active');
    } else {
      elementButton.removeAttribute('disabled');
      elementButton.classList.add('lead__button_type_active');
    }
  }


  _resetError(element) {
    element.classList.add('lead__search_error-message_type_inactive');
    element.textContent = '';
  }


  renderStartNews() {
    this.options.newsError.classList.remove('news__error_is-visible');
    this.options.newsOut.classList.remove('news__out_is-visible');
    this.options.newsData.classList.remove('news__data_is-visible');
    this.options.newsButton.classList.remove('news__button_is-invisible');
    
    while (this.options.newsContainer.firstChild) {
      this.options.newsContainer.removeChild(this.options.newsContainer.firstChild);
    }
    
    this._renderLoading(true, this.options.newsFind);
    
    this.options.dataStorage.saveStorage(this.options.themeInput)
    .then((data) => {
      
      if (data.length === 0) {
        this._renderLoading(false, this.options.newsFind);
        this.options.newsOut.classList.add('news__out_is-visible');
      } else {
        const maxCountNewsInBlock = 3;
        const newsBlock = this.options.newsCardList.createNewsContainer();
        this.options.newsContainer.appendChild(newsBlock);
        this._renderLoading(false, this.options.newsFind);
        const len = data.length < maxCountNewsInBlock ? data.length : maxCountNewsInBlock;
        
        for (let i = 0; i < len; i += 1) {
          data[i].urlToImage === null ? data[i].urlToImage = "./images/faviconka_ru_1119.png" : data[i].urlToImage;
          this.options.renderNews(this.options.newsCardList, newsBlock, this.options.newsCard, data, i);
          this._setSubmitButtonState(this.options.formSearch, this.options.searchButton);
        };
        this.options.newsData.classList.add('news__data_is-visible');
        
        if(data.length <= maxCountNewsInBlock) {
          this.options.newsButton.classList.add('news__button_is-invisible');
        }
      }
    })
    .catch((err) => {
      this._renderLoading(false, this.options.newsFind);
      this.options.newsError.classList.add('news__error_is-visible');
      console.log(`Ошибка ${err}`);
    });
  }

  //Слушатели
  setEventListeners() {
    this.options.formSearch.addEventListener('input', (event) => {
      this._checkInputValidity(event.target, this.options.errorMessage);
      this._setSubmitButtonState(this.options.formSearch, this.options.searchButton);
    });
  }
}
