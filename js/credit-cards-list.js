$(document).ready(function () {
  var sheetUrl = "https://docs.google.com/spreadsheets/d/14nDVwVvubdeUDVDRKxkq1P5hgaqUNk_k1ekHLKyqooY/edit#gid=0";

  var category = null;
  var score = null;

  var noFee = false;
  var noBalanceTransferFee = false;
  var noForeignFee = false;

  var networkAmex = false;
  var networkDiscover = false;
  var networkVisaMastercard = false;

  var financialAmex = false;
  var financialBankOfAmerica = false;
  var financialBarclaycard = false;
  var financialCapitalOne = false;
  var financialChase = false;
  var financialCiti = false;
  var financialDiscover = false;
  var financialWellsFargo = false;

  var latinoFriendly = false;

  var cardsToCompare = [];

  var pageData = {
    'rewards': [
      'Rewards Credit Cards',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ],
    'cashback': [
      'Cash Back Credit Cards',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ],
    'travel': [
      'Travel Credit Cards',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ],
    'lowinterest': [
      'Low Interest Credit Cards',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ],
    'student': [
      'Student Credit Cards',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ]
  };

  loadData();
  updateView();
  loadCardsTable();

  $("a[id*='category-']").click(function () {
    updateSelection(this.id);
  });
  $("a[id*='score-']").click(function () {
    updateSelection(this.id);
  });
  $("input[id*='check-']").click(function () {
    updateSelection(this.id);
  });
  $('#btn-compare-cards').click(function () {
    compareCards();
  });
  $('#btn-reset-cards-to-compare').click(function () {
    resetCardsToCompare();
  });
  $('body').on('click', "input[id*='toggle-card-details-']", function () {
    toggleDetails(this.id);
  });
  $('body').on('click', "input[id*='compare-card-']", function () {
    updateCardsToCompare(this.id);
  });
  $('body').on('click', "input[id*='label-compare-card-']", function () {
    updateCardsToCompare(this.id);
  });

  function updateView() {
    $("a[id*='category']").removeClass('active');
    $("a[id*='score']").removeClass('active');
    $("input[id*='check-']").prop('checked', false);

    $('#category-' + category).addClass('active');
    $('#score-' + score).addClass('active');

    $('#check-no-fee').prop('checked', noFee);
    $('#check-no-balance-transfer-fee').prop('checked', noBalanceTransferFee);
    $('#check-no-foreign-fee').prop('checked', noForeignFee);

    $('#check-network-amex').prop('checked', networkAmex);
    $('#check-network-discover').prop('checked', networkDiscover);
    $('#check-network-visa-mastercard').prop('checked', networkVisaMastercard);

    $('#check-financial-amex').prop('checked', financialAmex);
    $('#check-financial-bank-of-america').prop('checked', financialBankOfAmerica);
    $('#check-financial-barclaycard').prop('checked', financialBarclaycard);
    $('#check-financial-capital-one').prop('checked', financialCapitalOne);
    $('#check-financial-chase').prop('checked', financialChase);
    $('#check-financial-citi').prop('checked', financialCiti);
    $('#check-financial-discover').prop('checked', financialDiscover);
    $('#check-financial-wells-fargo').prop('checked', financialWellsFargo);

    $('#check-latino-friendly').prop('checked', latinoFriendly);

    if (cardsToCompare.length > 0) {
      cardsToCompare.length == 1 ? $('#btn-compare-cards').addClass('disabled') : $('#btn-compare-cards').removeClass('disabled');
      $('#badge-cards-to-compare-count').text(cardsToCompare.length);
      $("#footer-compare").slideDown("fast");
    }
    else { $("#footer-compare").slideUp("fast"); }
  }

  function loadData() {
    category = url('?category') != 'undefined' ? url('?category') : category = 'improve';
    score = url('?score') != 'undefined' ? url('?score') : score = 'excellent';
  }

  function updateSelection(id) {
    var type = id.split('-')[0];
    var value = id.substring(id.indexOf('-') + 1)

    switch (type) {
      case 'category':
        category = value;
        break;
      case 'score':
        score = value;
        break;
      case 'check':
        switch (value) {
          case 'latino-friendly':
            latinoFriendly = $('#' + id).prop('checked');
            break;
          case 'no-fee':
            noFee = $('#' + id).prop('checked');
            break;
          case 'no-balance-transfer-fee':
            noBalanceTransferFee = $('#' + id).prop('checked');
            break;
          case 'no-foreign-fee':
            noForeignFee = $('#' + id).prop('checked');
            break;
          case 'network-amex':
            networkAmex = $('#' + id).prop('checked');
            break;
          case 'network-discover':
            networkDiscover = $('#' + id).prop('checked');
            break;
          case 'network-visa-mastercard':
            networkVisaMastercard = $('#' + id).prop('checked');
            break;
          case 'financial-amex':
            financialAmex = $('#' + id).prop('checked');
            break;
          case 'financial-bank-of-america':
            financialBankOfAmerica = $('#' + id).prop('checked');
            break;
          case 'financial-barclaycard':
            financialBarclaycard = $('#' + id).prop('checked');
            break;
          case 'financial-capital-one':
            financialCapitalOne = $('#' + id).prop('checked');
            break;
          case 'financial-chase':
            financialChase = $('#' + id).prop('checked');
            break;
          case 'financial-citi':
            financialCiti = $('#' + id).prop('checked');
            break;
          case 'financial-discover':
            financialDiscover = $('#' + id).prop('checked');
            break;
          case 'financial-wells-fargo':
            financialWellsFargo = $('#' + id).prop('checked');
            break;
        }
        break;
    }
    updateView();
    loadCardsTable();
  }

  function loadCardsTable() {
    $('#page-header').empty();
    $('#cards-table').empty().data('sheetrockLoaded', false);

    var pageHeaderTemplateHtml =
      "<h1>%%page_title%%</h1>\
        <p class='post-meta'>%%page_subtitle%%</p>";

    var cardTemplateHtml =
      "<table class='table card shadow'>\
          <tbody>\
            <tr>\
              <td colspane='2' width='75%'><h3>%%card_name%%</h3></td>\
              <td rowspan='4'>\
                <table class='table borderless card-actions'>\
                  <tr><td><img class='img-responsive' src='%%card_image_url%%' /></td></tr>\
                  <tr><td><a href='%%card_apply_now_url%%' target='_blank' class='btn btn-success'>Apply Now</a></td></tr>\
                  <tr><td><a id='toggle-card-details-%%card_id%%' data-id='%%card_id%%' href='javascript:void(0);' class='btn btn-info'>View Details</a></td></tr>\
                </table>\
              </td>\
            </tr>\
            <tr><td>Annual Fee: <strong>%%card_annual_fee%%</strong><br />\
            Rewards rate: <strong>%%card_rewards_rate%%</strong></td></tr>\
            <tr><td><p>%%card_details%%</p></td></tr>\
            <tr>\
              <td>\
                <div class='checkbox checkbox-primary'>\
                  <input type='checkbox' id='compare-card-%%card_id%%' %%checked%% data-id='%%card_id%%'>\
                  <label id='label-compare-card-%%card_id%%' for='compare-card-%%card_id%%' data-id='%%card_id%%' class='small text-uppercase'>Compare this card</label>\
                </div>\
              </td>\
            </tr>\
            <tr id='details-card-%%card_id%%' style='display: none;'>\
              <td colspan='3'><p>Details</p></td>\
            </tr>\
          </tbody>\
        </table>";

    $('#loading-message').show();
    var cardsHtml = '';
    sheetrock({
      url: sheetUrl,
      query: generateQuery(),
      reset: true,
      callback: function (error, options, response) {
        if (!error) {
          if (response.rows.length > 1) {  // Because it always returns the first row
            rowNumber = 0;
            response.rows.forEach(function (item) {
              if (rowNumber > 0) {
                cardsHtml += fillCardTable(cardTemplateHtml, item.cellsArray);
              }
              else {
                rowNumber = 1;
              }
            });
          }
          else {
            cardsHtml = '<h3>No Results</h3><p>We currently don\'t have an offer that matches that criteria.</p>';
          }
          $('#loading-message').hide();
          $('#page-header').html(fillPageData(pageHeaderTemplateHtml, pageData[category]));
          $('#cards-table').html(cardsHtml);
        }
      }
    });
  }

  function fillPageData(html, values) {
    html = html.replace('%%page_title%%', values[0]);
    html = html.replace('%%page_subtitle%%', values[1]);
    return html;
  }

  function fillCardTable(html, values) {
    html = html.replace(/%%card_id%%/g, values[0]);
    html = html.replace(/%%card_name%%/g, values[1]);
    html = html.replace(/%%card_rewards_rate%%/g, values[2]);
    html = html.replace(/%%card_annual_fee%%/g, values[3]);
    html = html.replace(/%%card_image_url%%/g, values[4]);
    html = html.replace(/%%card_apply_now_url%%/g, values[5]);
    if ($.inArray(parseInt(values[0]), cardsToCompare) != -1) {
      html = html.replace(/%%checked%%/g, 'checked');
    }
    else {
      html = html.replace(/%%checked%%/g, '');
    }
    return html;
  }

  function generateQuery() {
    var whereCategory = '';
    switch (category) {
      case 'rewards':
        whereCategory = 'G = "Y" ';
        break;
      case 'cashback':
        whereCategory = 'H = "Y" ';
        break;
      case 'travel':
        whereCategory = 'I = "Y" ';
        break;
      case 'lowinterest':
        whereCategory = 'J = "Y" ';
        break;
      case 'student':
        whereCategory = 'K = "Y" ';
        break;
    }

    var whereScore = 'Q LIKE "%' + score + '%" ';

    var whereNoAnnualFee = '';
    var whereNoBalanceTransferFee = '';
    var whereNoForeignFee = '';
    noFee === true ? whereNoAnnualFee = 'AND L = "N" ' : whereNoAnnualFee = '';
    noBalanceTransferFee === true ? whereNoBalanceTransferFee = 'AND M = "N" ' : whereNoBalanceTransferFee = '';
    noForeignFee === true ? whereNoForeignFee = 'AND N = "N" ' : whereNoForeignFee = '';

    var whereNetwork = '';
    if (networkAmex || networkDiscover || networkVisaMastercard) {
      var used = false;
      whereNetwork = 'AND (';
      if (networkAmex) {
        whereNetwork += 'D = "American Express"';
        used = true;
      }
      if (networkDiscover) {
        if (used) whereNetwork += ' OR ';
        whereNetwork += 'D = "Discover"';
        used = true;
      }
      if (networkVisaMastercard) {
        if (used) whereNetwork += ' OR ';
        whereNetwork += 'D = "Visa/Mastercard"';
      }
      whereNetwork += ') ';
    }

    var whereFinancial = '';
    if (financialAmex || financialBankOfAmerica || financialBarclaycard || financialCapitalOne || financialChase || financialCiti || financialDiscover || financialWellsFargo) {
      var used = false;
      whereFinancial = 'AND (';
      if (financialAmex) {
        whereFinancial += 'E = "American Express"';
        used = true;
      }
      if (financialBankOfAmerica) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'E = "Bank of America"';
        used = true;
      }
      if (financialBarclaycard) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'E = "Barclaycard"';
        used = true;
      }
      if (financialCapitalOne) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'E = "Capital One"';
        used = true;
      }
      if (financialChase) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'E = "Chase"';
        used = true;
      }
      if (financialCiti) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'E = "Citi"';
        used = true;
      }
      if (financialDiscover) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'E = "Discover"';
        used = true;
      }
      if (financialWellsFargo) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'E = "Wells Fargo"';
      }
      whereFinancial += ') ';
    }

    latinoFriendly === true ? whereLatinoFriendly = 'AND F = "Y" ' : whereLatinoFriendly = '';

    query = 'SELECT A, B, U, R, Y, Z ';
    query += 'WHERE ' + whereCategory + 'AND ' + whereScore;
    query += whereNoAnnualFee;
    query += whereNoBalanceTransferFee;
    query += whereNoForeignFee;
    query += whereNetwork;
    query += whereFinancial;
    query += whereLatinoFriendly;
    query += 'ORDER BY B';
    console.log(query);
    return query;
  }

  function updateCardsToCompare(id) {
    var cardId = $('#' + id).data('id');
    if ($('#' + id).prop('checked') && $.inArray(cardId, cardsToCompare) === -1) {
      cardsToCompare.push(cardId);
    }
    else {
      cardsToCompare.splice($.inArray(cardId, cardsToCompare), 1);
    }
    updateView();
  }

  function resetCardsToCompare() {
    cardsToCompare = [];
    $("input[id*='compare-card-']").prop('checked', false);
    updateView();
  }

  function compareCards() {
    if (cardsToCompare.length > 0) {
      window.location.href = '/credit-cards-compare/?cards=' + cardsToCompare.join('-');
    }
  }
});