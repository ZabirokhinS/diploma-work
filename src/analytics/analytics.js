import './analytics.css';
//Импорт
import {
  keyword,
  newsArray,
  queryString,
  countNews,
  countMentionsHeadlines,
  graphDays,
  graphMonth,
  graphNums,
  graphLines,
  graphScalesTwo,
  graphScalesThree,
  graphScalesFour,
  graphScalesFive,
} from '../js/constants/analyticsConstants.js';
import {
  days,
  month,
  getCountMentionsTitles,
  getCountMentionsPerDay,
  getMaxOfArray,
  getScaleNums,
  getMaxScale
} from '../js/utils/utils';
import Statistics from '../js/components/statistics';


const countMentionsPerDay = getCountMentionsPerDay(newsArray, keyword);
const maxCountMentions = getMaxOfArray(countMentionsPerDay);
const statistics = new Statistics({
  days: days,
  graphDays: graphDays,
  month: month,
  graphMonth: graphMonth,
  graphNums: graphNums,
  graphLines: graphLines,
  countMentionsPerDay: countMentionsPerDay,
  maxCountMentions: maxCountMentions,
  graphScalesTwo : graphScalesTwo,
  graphScalesThree : graphScalesThree,
  graphScalesFour : graphScalesFour,
  graphScalesFive : graphScalesFive,
  getScaleNums: getScaleNums,
  getMaxScale: getMaxScale
});

(function() {
  queryString.textContent = `Вы спросили: "${keyword}"`;
  countNews.textContent = `${newsArray.length}`;
  countMentionsHeadlines.textContent = `${getCountMentionsTitles(newsArray, keyword)}`;
  statistics.renderGraphDays();
  statistics.renderGraphBars();
}());
