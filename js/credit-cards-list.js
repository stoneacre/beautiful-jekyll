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
      'There are many credit cards that offer great reward opportunities. We have researched the cards that will help you put a little extra money in your pocket each time you use it.'
    ],
    'cashback': [
      'Cash Back Credit Cards',
      'Sorting through the variety of credit cards that offer cash back rewards for the purchases you make can be daunting. We gathered below a list of the best cash back credit cards we could find for you to make a better decision.'
    ],
    'travel': [
      'Travel Credit Cards',
      'Traveling can be expensive. Luckily there are credit cards that are up to the task on lessening the burden. We gathered together a list of credit cards that offer great travel reward benefits.'
    ],
    'lowinterest': [
      'Low Interest Credit Cards',
      'Having a credit card with a low interest rate can save you money. While some credit cards offer 0% interest as an introductory rate, others will have a low ongoing rate. It’s important to keep an eye on what your APR is - as you might end up paying more for an ongoing balance.'
    ],
    'student': [
      'Student Credit Cards',
      'Building a positive credit history and establishing good credit will impact you greatly in the future. Credit cards help determine your eligibility for car loans, renting an apartment/house, purchasing a home, or even gaining employment. Below is a list of credit cards we gathered that are the best for students.'
    ],
    'improve': [
      'Improve Credit Score',
      'Whether you’re buying a home, car, boat or paying for college tuition, your credit score is critical. Most of us have had bumps in the road of life. For some of us, this means a credit score which is lower than we would like. Below is a list of credit cards we gathered that can help you to rebuild your credit.'
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
  $('body').on('click', "a[id*='toggle-card-details-']", function () {
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
              <td rowspan='3'>\
                <table class='table borderless card-actions'>\
                  <tr><td>%%card_div_seal%%<img class='img-responsive' src='%%card_image_url%%' /></td></tr>\
                  <tr><td><a href='%%card_apply_now_url%%' target='_blank' class='btn btn-success'>Apply Now</a></td></tr>\
                  <tr><td><a id='toggle-card-details-%%card_id%%' data-id='%%card_id%%' data-toggle='hidden' href='javascript:void(0);' class='btn btn-info'>View Details</a></td></tr>\
                </table>\
              </td>\
            </tr>\
            <tr><td><p>Annual Fee: <strong>%%card_annual_fee%%</strong><br />\
            Rewards rate: <strong>%%card_rewards_rate%%</strong></p>\
            <p>%%card_details%%</p></td></tr>\
            <tr>\
              <td class='valign-middle'>\
                <div class='checkbox checkbox-primary'>\
                  <input type='checkbox' id='compare-card-%%card_id%%' %%checked%% data-id='%%card_id%%'>\
                  <label id='label-compare-card-%%card_id%%' for='compare-card-%%card_id%%' data-id='%%card_id%%' data-toggle='hidden' class='small text-uppercase'>Compare this card</label>\
                </div>\
              </td>\
            </tr>\
            <tr id='row-details-card-%%card_id%%' style='display: none;'>\
              <td colspan='3' class='card-details'>\
                <div id='details-card-%%card_id%%' class='row' style='display: none;'>\
                  <div class='col-sm-6'>\
                    <table class='table'>\
                      <tbody>\
                        <tr><td>Introductory APR Offer</td><td class='details-values'>%%card_introductory_apr%%</td></tr>\
                        <tr><td>Introductory Reward Bonus</td><td class='details-values'>%%card_introductory_reward%%</td></tr>\
                        <tr><td>APR</td><td class='details-values'>%%card_apr%%</td></tr>\
                        <tr><td>Reward Rate</td><td class='details-values'>%%card_rewards_rate%%</td></tr>\
                        <tr><td>Balance Transfer Fee</td><td class='details-values'>%%card_balance_transfer_fee%%</td></tr>\
                        <tr><td>Foreign Transaction Fee</td><td class='details-values'>%%card_foreign_transaction_fee%%</td></tr>\
                      </tbody>\
                    </table>\
                  </div>\
                  <div class='col-sm-3'>\
                    <table class='table'>\
                      <tbody>\
                        <tr><td><i class='fa fa-thumbs-o-up'></i>Pros</td></tr>\
                        <tr><td>%%card_pros%%</td></tr>\
                      </tbody>\
                    </table>\
                  </div>\
                  <div class='col-sm-3'>\
                    <table class='table'>\
                      <tbody>\
                        <tr><td><i class='fa fa-thumbs-o-down'></i>Cons</td></tr>\
                        <tr><td>%%card_cons%%</td></tr>\
                      </tbody>\
                    </table>\
                  </div>\
                </div>\
              </td>\
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
            cardsHtml = '<div class="alert alert-block"><h4>No Results</h4><p>It looks like we don\'t have any cards that match your filters</p></div>';
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
    html = html.replace(/%%card_details%%/g, values[2]);
    html = html.replace(/%%card_rewards_rate%%/g, values[3]);
    html = html.replace(/%%card_annual_fee%%/g, values[4]);
    html = html.replace(/%%card_image_url%%/g, values[5]);
    html = html.replace(/%%card_apply_now_url%%/g, values[6]);
    html = html.replace(/%%card_introductory_apr%%/g, values[7]);
    html = html.replace(/%%card_introductory_reward%%/g, values[8]);
    html = html.replace(/%%card_apr%%/g, values[9]);
    html = html.replace(/%%card_balance_transfer_fee%%/g, values[10]);
    html = html.replace(/%%card_foreign_transaction_fee%%/g, values[11]);
    html = html.replace(/%%card_pros%%/g, toBullets(values[13]));
    html = html.replace(/%%card_cons%%/g, toBullets(values[14]));

    if (values[15] == 'Y') {
      html = html.replace(/%%card_div_seal%%/g, "<div id='card-seal-%%card_id%%' class='card-seal'></div>");
    }
    else {
      html = html.replace(/%%card_div_seal%%/g, '');
    }

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
      case 'improve':
        whereCategory = 'L = "Y" ';
        break;
    }

    var whereScore = 'R LIKE "%' + score + '%" ';

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
        whereNetwork += 'C = "American Express"';
        used = true;
      }
      if (networkDiscover) {
        if (used) whereNetwork += ' OR ';
        whereNetwork += 'C = "Discover"';
        used = true;
      }
      if (networkVisaMastercard) {
        if (used) whereNetwork += ' OR ';
        whereNetwork += 'C = "Visa/Mastercard"';
      }
      whereNetwork += ') ';
    }

    var whereFinancial = '';
    if (financialAmex || financialBankOfAmerica || financialBarclaycard || financialCapitalOne || financialChase || financialCiti || financialDiscover || financialWellsFargo) {
      var used = false;
      whereFinancial = 'AND (';
      if (financialAmex) {
        whereFinancial += 'D = "American Express"';
        used = true;
      }
      if (financialBankOfAmerica) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'D = "Bank of America"';
        used = true;
      }
      if (financialBarclaycard) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'D = "Barclaycard"';
        used = true;
      }
      if (financialCapitalOne) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'D = "Capital One"';
        used = true;
      }
      if (financialChase) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'D = "Chase"';
        used = true;
      }
      if (financialCiti) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'D = "Citi"';
        used = true;
      }
      if (financialDiscover) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'D = "Discover"';
        used = true;
      }
      if (financialWellsFargo) {
        if (used) whereFinancial += ' OR ';
        whereFinancial += 'D = "Wells Fargo"';
      }
      whereFinancial += ') ';
    }

    latinoFriendly === true ? whereLatinoFriendly = 'AND F = "Y" ' : whereLatinoFriendly = '';

    query = 'SELECT A, B, E, V, S, Z, AA, P, W, Q, T, U, AB, AC, AD, F ';
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

  function toggleDetails(id) {
    var cardId = $('#' + id).data('id');
    var toggle = $('#' + id).data('toggle');
    if (toggle == 'hidden' || toggle == 'undefined') {
      $("#row-details-card-" + cardId).show();
      $("#details-card-" + cardId).slideDown("fast");
      $('#' + id).data('toggle', 'visible');
      $('#' + id).text('Hide Details');
    }
    else {
      $("#details-card-" + cardId).slideUp("fast", function () {
        $("#row-details-card-" + cardId).hide();
      });
      $('#' + id).data('toggle', 'hidden');
      $('#' + id).text('View Details');
    }
  }

  function toBullets(text) {
    var ul = '';
    var items = text.split(';');
    if (items.length >= 1) {
      ul = '<ul>';
      items.forEach(function (item) {
        if (item != '') {
          ul += '<li>' + item + '</li>';
        }
      });
      ul += '</ul>';
    }
    return ul;
  }
});