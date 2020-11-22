"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function loadNews() {
  return _loadNews.apply(this, arguments);
}

function _loadNews() {
  _loadNews = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var API_KEY, url;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_KEY = '1b492488a06f476880d9b54d4e64fbbb';
            url = 'https://newsapi.org/v2/top-headlines?' + 'country=ru&' + 'apiKey=' + API_KEY;
            _context.next = 4;
            return fetch(url, {
              mode: 'cors'
            }).then(function (response) {
              return response.json();
            });

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadNews.apply(this, arguments);
}

function displayMoreNews(count) {
  if (typeof displayMoreNews.displayed == 'undefined') displayMoreNews.displayed = 0;
  var start = displayMoreNews.displayed;
  var end = displayMoreNews.displayed + count;
  var newsBlock = document.querySelector('main');

  for (var index = start; index < end; index++) {
    var newSection = document.createElement('section');

    if (news.articles.length <= index) {
      newSection.innerText = "No news for today";
      document.getElementById('more-button').style.display = 'none';
      newsBlock.appendChild(newSection);
      return;
    }

    newSection.classList.add('news-item');
    var article = news.articles[index];
    var title = document.createElement('h2');
    title.innerText = article.title;
    var author = document.createElement('em');
    author.innerText = 'Источник: ' + article.source.name;
    var img = document.createElement('img');
    img.src = article.urlToImage;
    var description = document.createElement('p');
    description.innerText = article.description;
    var link = document.createElement('a');
    link.innerText = "Подробнее в источнике";
    link.href = article.url;
    newSection.appendChild(img);
    newSection.appendChild(title);
    newSection.appendChild(author);
    newSection.appendChild(description);
    newSection.appendChild(link);
    newsBlock.appendChild(newSection);
    displayMoreNews.displayed++;
    addSource(article.source.name);
  }

  document.getElementById('not-found').style.display = 'none';
}

function addSource(source) {
  if (typeof addSource.sources == 'undefined') addSource.sources = [];

  if (addSource.sources.indexOf(source) < 0) {
    addSource.sources.push(source);
    var newOption = document.createElement('option');
    newOption.innerHTML = source;
    newOption.value = source;
    document.getElementById('filter').appendChild(newOption);
  }
}

var news;

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return loadNews();

          case 2:
            news = _context2.sent;
            addSource('Все источники');
            console.log(news);
            displayMoreNews(5);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _init.apply(this, arguments);
}

document.getElementById('more-button').addEventListener('click', function (e) {
  e.preventDefault();
  displayMoreNews(5);
});
document.getElementById('search-btn').addEventListener('click', function () {
  filter();
});
document.getElementById("search").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search-btn").click();
  }
});
document.getElementById('filter').addEventListener('change', function (e) {
  filter();
});

function filter() {
  var val = document.getElementById('search').value;
  var source = document.getElementById('filter').value;
  var newsItems = document.getElementsByClassName('news-item');
  var found = false;

  for (var index = 0; index < newsItems.length; index++) {
    var newsSource = newsItems[index].getElementsByTagName('em')[0];

    if (newsSource.innerHTML.indexOf(source) >= 0 || source == 'Все источники') {
      if (newsItems[index].innerHTML.indexOf(val) >= 0 || val == '') {
        newsItems[index].style.display = 'block';
        found = true;
      } else {
        newsItems[index].style.display = 'none';
      }
    } else {
      newsItems[index].style.display = 'none';
    }
  }

  if (!found) {
    document.getElementById('not-found').style.display = 'block';
  } else {
    document.getElementById('not-found').style.display = 'none';
  }
}

init();