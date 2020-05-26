const msPerDay = 86400000;
const getWeekInterval = () => {
  const now = new Date();
  const end = Date.parse(now);
  const difCountDays = 6;
  return {
    end: end,
    begin: end - (difCountDays * msPerDay)
  };
};

const getBoundaryDays = (end, begin) => {
  const dateEnd = new Date(end);
  const dateBegin = new Date(begin);
  return {
    from: `${dateEnd.getFullYear()}-${String(dateEnd.getMonth() + 1).padStart(2, "0")}-${String(dateEnd.getDate()).padStart(2, "0")}`,
    to: `${dateBegin.getFullYear()}-${String(dateBegin.getMonth() + 1).padStart(2, "0")}-${String(dateBegin.getDate()).padStart(2, "0")}`
  }
};


const getDaysForAnalytics = (begin) => {
  const daysArray = [];
  const weekDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const countWeekDays = 7;
  for (let ms = begin; ms < begin + (countWeekDays * msPerDay); ms += msPerDay) {
    daysArray.push({
      day: (new Date(ms)).getDate(),
      weekDay: weekDays[(new Date(ms)).getDay()]
    });
  }
  return daysArray;
};

const getMonth = (end, begin) => {
  const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
  return new Date(end).getMonth() === new Date(begin).getMonth() ?
    `${months[new Date(begin).getMonth()]}` : `${months[new Date(begin).getMonth()]}-${months[new Date(end).getMonth()]}`;
};

export const getCountMentionsTitles = (array, word) => {
  let count = 0;
  const re = new RegExp(word, 'gi');
  array.forEach((element) => {
    const result = element.title.match(re);
     result !== null ? count += result.length : count;
  });
  return count;
};

export const getCountMentionsPerDay = (array, word) => {
  const daysArray = [];
  const re = new RegExp(word, 'gi');
  for (const item of days) {
    let count = 0;
    array.forEach((element) => {
      if(item.day === (new Date(element.publishedAt)).getDate()) {
        const resultTtitle = element.title.match(re);
        resultTtitle !== null ? count += resultTtitle.length : count;
        const resultDescription = element.description.match(re);
        resultDescription !== null ? count += resultDescription.length : count;
      }
    });
    daysArray.push(count);
  }
  return daysArray;
};

export const getMaxOfArray = (numArray) => {
  let maxNum = 0;
  numArray.forEach((element) => {
    maxNum > element ? maxNum : maxNum = element;
  })
  return maxNum;
};

export const getScaleNums = (getMaxScale) => {
  return {
    one: 0,
    two: getMaxScale / 4,
    three: getMaxScale / 2,
    four: (getMaxScale * 3) / 4,
    five: getMaxScale
  };
};

export const getFormattedDate = (dateString) => {
  const msDate = new Date(dateString);
  const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];
 return `${msDate.getDate()} ${months[msDate.getMonth()]}, ${msDate.getFullYear()}`
}

export const getMaxScale = (maxCountMentions) => {
  switch(true) {
    case(maxCountMentions <= 8):
      return 8;
    case(maxCountMentions <= 20):
      return 20;
    case(maxCountMentions <= 40):
      return 40;
    case(maxCountMentions <= 80):
      return 80;
    case(maxCountMentions <= 100):
      return 100;
    case(maxCountMentions <= 200):
      return 200;
    case(maxCountMentions <= 300):
      return 300;
    case(maxCountMentions <= 400):
      return 400;
    case(maxCountMentions <= 500):
      return 500;
  };
}

export const interval = getBoundaryDays(getWeekInterval().end,getWeekInterval().begin);
export const days = getDaysForAnalytics(getWeekInterval().begin);
export const month = getMonth(getWeekInterval().end, getWeekInterval().begin);
export const renderNews = (container, block, card, array, i) => {
  return (container.addNews(block, card.create(array[i])));
};
