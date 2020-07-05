import search from './search.js';
const dataSet = require('./data.json');
const summariesList = dataSet.summaries.map( sumObj => sumObj.summary);

export const getBook = function(id){
  return ({
    id,
    title: dataSet.titles[id],
    author: dataSet.authors[id].author,
    summary: dataSet.summaries[id].summary,
  });
}

export const getTitles = function({ query, count}){
  const ids =  search({ list: summariesList, query, count});
  return ids.map( id => dataSet.titles[id]);
}

export const debounce = function (fn, delay, value) {
  let timer = null;
  return function () {
    let context = this,
      args = arguments[0].target.value;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.call(context, args);
    }, delay);
  };
}