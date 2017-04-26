$(document).ready(function () {
  var cardsToCompare = [];
  var cardsData = [];

  loadData();
  if (cardsToCompare.length == 0) {
    location.href = '/credit-cards-list.html';
  }

  loadCardsData();

  // Because it is async
  var timer = setInterval(function () {
    if (cardsData.length == cardsToCompare.length) {
      clearInterval(timer);
      loadPageData();
    }
  }, 100);

  $('#card-compare').tableHeadFixer({ 'left': 1 });

  function loadData() {
    var cards = url('?cards');
    if (cards) {
      cardsToCompare = cards.split('-');
    }
  }

  function loadCardsData(cardId) {
    cardsToCompare.forEach(function (cardId) {
      var query = 'SELECT * WHERE A = ' + cardId;
      sheetrock({
        url: sheetUrl,
        query: query,
        reset: true,
        callback: function (error, options, response) {
          if (!error) {
            cardsData.push(response.rows[0].cellsArray);
          }
        }
      });
    });
  }

  function loadPageData() {
    cardsData.forEach(function (card) {
      $("#card-compare tr").append("<td class='card-column'></td>");
      var column = 0;
      $("#card-compare td:last-child").each(function () {
        var cellHtml = '';
        switch (column++) {
          case 0:
            cellHtml = cardHeader(card);
            break;
          case 1:
            cellHtml = toBullets(getCreditScoreString([card[17], card[18], card[19], card[20]]));
            break;
          case 2:
            cellHtml = card[21];
            break;
          case 3:
            cellHtml = toBullets(whatsGreatFor(card));
            break;
          case 4:
            cellHtml = card[21];
            break;
          case 5:
            cellHtml = card[16];
            break;
          case 6:
            cellHtml = card[22];
            break;
          case 7:
            cellHtml = toBullets(card[31]);
            break;
          case 8:
            cellHtml = toBullets(card[32]);
            break;
        }
        $(this).html(cellHtml);
      });
    });
  }

  function cardHeader(data) {
    html =
      "<img class='card-image img-responsive' src='%%card_image_url%%' />\
      <h4 class='card-name'>%%card_name%%</h4>\
      <a href='%%card_apply_now_url%%' target='_blank' class='btn btn-success'>Apply Now</a></td>\
      ";
    return replaceTags(html, data);
  }

  function whatsGreatFor(data) {
    var categories = '';
    if (data[6] == 'Y') {
      categories += 'Rewards;';
    }
    if (data[7] == 'Y') {
      categories += 'Cash Back;';
    }
    if (data[8] == 'Y') {
      categories += 'Travel;';
    }
    if (data[9] == 'Y') {
      categories += 'Low Interest;';
    }
    if (data[10] == 'Y') {
      categories += 'Students;';
    }
    if (data[11] == 'Y') {
      categories += 'Improve Score;';
    }
    return categories;
  }
});