$(document).ready(function () {
  var cardsToCompare = [];
  var cardsData = [];

  loadData();
  if (cardsToCompare.length == 0) {
    location.href = '/credit-cards-list.html';
  } else if (cardsToCompare.length > MAX_CARDS_TO_COMPARE) {
    cardsToCompare = cardsToCompare.slice(0, MAX_CARDS_TO_COMPARE);
  }

  loadCardsData();

  // Because it is async
  var timer = setInterval(function () {
    $('#loading-message').show();
    if (cardsData.length == cardsToCompare.length) {
      clearInterval(timer);
      $('#loading-message').hide();
      $('#card-compare').show();
      loadPageData();
    }
  }, 100);

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
            cellHtml = cardScore(card);
            break;
          case 2:
            cellHtml = '<h6 class="section-title">Annual Fee</h6><p>' + card[22] + '</p>';
            break;
          case 3:
            cellHtml = '<h6 class="section-title">Great For</h6>' + toBullets(whatsGreatFor(card), 'empty-list-style');
            break;
          case 4:
            cellHtml = '<h6 class="section-title">Rewards</h6><p>' + card[25] + '</p>';
            break;
          case 5:
            cellHtml = '<h6 class="section-title">APR</h6><p>' + card[16] + '</p>';
            break;
          case 6:
            cellHtml = '<h6 class="section-title">Bonus Offer</h6><p>' + card[23] + '</p>';
            break;
          case 7:
            cellHtml = '<h6 class="section-title">Pros</h6>' + toBullets(card[31]);
            break;
          case 8:
            cellHtml = '<h6 class="section-title">Cons</h6>' + toBullets(card[32]);
            break;
        }
        $(this).html(cellHtml);
      });
    });
  }

  function cardHeader(data) {
    var html =
      "<div class='img-wrapper'>\
        <img class='card-image img-responsive' src='%%card_image_url%%' />\
        %%card_div_seal_comparison%%\
      </div>\
      <h4 class='card-name'>%%card_name%%</h4>\
      <a href='%%card_apply_now_url%%' target='_blank' class='btn btn-success'>Apply Now</a>";
    return replaceTags(html, data);
  }

  function cardScore(data) {
    var html =
      '<h6 class="section-title">Recommended Credit Score</h6>\
      <div class="credit-score">' + toBullets(getCreditScoreString([data[18], data[19], data[20], data[21]])) + '</div>';
    html += "<a id='btn-get-your-free-credit-score' href='" + URL_GET_FREE_SCORE + "' target='_blank' class='btn btn-info'>Get Your Free Score</a>";
    return html;
  }

  function whatsGreatFor(data) {
    var categories = '';
    if (data[6] == 'Y') {
      categories += '<i class="fa fa-trophy" aria-hidden="true"></i>Rewards;';
    }
    if (data[7] == 'Y') {
      categories += '<i class="fa fa-money" aria-hidden="true"></i>Cash Back;';
    }
    if (data[8] == 'Y') {
      categories += '<i class="fa fa-plane" aria-hidden="true"></i>Travel;';
    }
    if (data[9] == 'Y') {
      categories += '<i class="fa fa-percent" aria-hidden="true"></i>Low Interest;';
    }
    if (data[10] == 'Y') {
      categories += '<i class="fa fa-graduation-cap" aria-hidden="true"></i>Students;';
    }
    if (data[11] == 'Y') {
      categories += '<i class="fa fa-level-up" aria-hidden="true"></i>Improve Score;';
    }
    return categories;
  }
});