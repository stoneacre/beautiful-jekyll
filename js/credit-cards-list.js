$(document).ready(function () {
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

  var latinoFirst = false;

  var cardsToCompare = [];

  document.getElementById('btn-get-your-free-credit-score').setAttribute('href', URL_GET_FREE_SCORE);

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
  $('#btn-categories-filters').click(function () {
    toggleCategoriesBar(this.id);
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
    if ($('#filters-bar').is(':visible')) {
      $("#left-sidebar").slideUp();
    }

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

    $('#check-latino-first').prop('checked', latinoFirst);

    if (cardsToCompare.length > 0) {
      cardsToCompare.length == 1 ? $('#btn-compare-cards').addClass('disabled') : $('#btn-compare-cards').removeClass('disabled');
      $('#badge-cards-to-compare-count').text(cardsToCompare.length);
      $("#footer-compare").slideDown("fast");
    } else {
      $("#footer-compare").slideUp("fast");
    }
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
          case 'latino-first':
            latinoFirst = $('#' + id).prop('checked');
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
              <td class='title' colspane='2' width='75%'>\
                <h3>%%card_name%% %%card_div_seal_title%%</h3>\
                <div class='text-center no-big' style='width: 100%;'>\
                  <img class='img-responsive btn-block' style='max-width:75%;' src='%%card_image_url%%' />\
                </div>\
              </td>\
              <td class='right-column' rowspan='3'>\
                <table class='table borderless card-actions'>\
                  <tr><td>%%card_div_seal%%<img class='img-responsive btn-block' src='%%card_image_url%%' /></td></tr>\
                  <tr><td><a href='%%card_apply_now_url%%' target='_blank' class='btn btn-success vertical-buttons' onclick=\"trackOutboundLink('%%card_apply_now_url%%'); return false;\">Apply Now</a></td></tr>\
                  <tr><td><a id='toggle-card-details-%%card_id%%' data-id='%%card_id%%' data-toggle='hidden' href='javascript:void(0);' class='btn btn-info vertical-buttons'>View Details</a></td></tr>\
                </table>\
              </td>\
            </tr>\
            <tr>\
              <td>\
                <p>Annual Fee: <strong>%%card_annual_fee%%</strong><br />\
                Rewards rate: <strong>%%card_rewards_rate%%</strong></p>\
                <p>%%card_details%%</p>\
                <div style='width: 100%;' class='text-center no-big'>\
                  <a href='%%card_apply_now_url%%' target='_blank' class='btn btn-success' onclick=\"trackOutboundLink('%%card_apply_now_url%%'); return false;\">Apply Now</a>\
                  <a id='toggle-card-details-horizontal-%%card_id%%' data-id='%%card_id%%' data-toggle='hidden' href='javascript:void(0);' class='btn btn-info'>View Details</a>\
                </div>\
              </td>\
            </tr>\
            <tr>\
              <td class='valign-middle'>\
                <div class='checkbox checkbox-primary'>\
                  <input type='checkbox' id='compare-card-%%card_id%%' %%checked%% data-id='%%card_id%%'>\
                  <label id='label-compare-card-%%card_id%%' for='compare-card-%%card_id%%' data-id='%%card_id%%' class='small text-uppercase'>Compare this card</label>\
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
    var thisCardHtml = '';
    sheetrock({
      url: sheetUrl,
      query: generateQuery(),
      reset: true,
      callback: function (error, options, response) {
        if (!error) {
          if (response.rows.length > 0) {
            response.rows.forEach(function (item) {
              thisCardHtml = replaceTags(cardTemplateHtml, item.cellsArray);
              thisCardHtml = markCardToCompare(thisCardHtml, item.cellsArray);
              cardsHtml += thisCardHtml;
            });
          } else {
            cardsHtml = '<div class="alert alert-block"><h4>No Results</h4><p>It looks like we don\'t have any cards that match your filters</p></div>';
          }
        } else {
          cardsHtml = '<div class="alert alert-block"><h4>No Results</h4><p>It looks like we don\'t have any cards that match your filters</p></div>';
        }
        $('#loading-message').hide();
        $('#page-header').html(fillPageData(pageHeaderTemplateHtml, pageData[category]));
        $('#cards-table').html(cardsHtml);
      }
    });
  }

  function fillPageData(html, values) {
    html = html.replaceAll('%%page_title%%', values[0]);
    html = html.replaceAll('%%page_subtitle%%', values[1]);
    return html;
  }

  function markCardToCompare(html, values) {
    if ($.inArray(parseInt(values[0]), cardsToCompare) != -1) {
      html = html.replaceAll(/%%checked%%/g, 'checked');
    } else {
      html = html.replaceAll(/%%checked%%/g, '');
    }
    return html;
  }

  function generateQuery() {
    var orderBy = 'ORDER BY B';
    var whereCategory = '';
    switch (category) {
      case 'rewards':
        whereCategory = 'G = "Y" ';
        orderBy = 'ORDER BY AA DESC';
        break;
      case 'cashback':
        whereCategory = 'H = "Y" ';
        orderBy = 'ORDER BY AA DESC';
        break;
      case 'travel':
        whereCategory = 'I = "Y" ';
        orderBy = 'ORDER BY AA DESC';
        break;
      case 'lowinterest':
        whereCategory = 'J = "Y" ';
        orderBy = 'ORDER BY R ASC';
        break;
      case 'student':
        whereCategory = 'K = "Y" ';
        orderBy = 'ORDER BY R ASC';
        break;
      case 'improve':
        whereCategory = 'L = "Y" ';
        orderBy = 'ORDER BY R ASC';
        break;
    }

    var whereScore = '';
    switch (score) {
      case 'poor':
        whereScore = 'S = "Y" ';
        break;
      case 'average':
        whereScore = 'T = "Y" ';
        break;
      case 'good':
        whereScore = 'U = "Y" ';
        break;
      case 'excellent':
        whereScore = 'V = "Y" ';
        break;
    }

    var whereNoAnnualFee = '';
    var whereNoBalanceTransferFee = '';
    var whereNoForeignFee = '';
    noFee === true ? whereNoAnnualFee = 'AND M = "N" ' : whereNoAnnualFee = '';
    noBalanceTransferFee === true ? whereNoBalanceTransferFee = 'AND N = "N" ' : whereNoBalanceTransferFee = '';
    noForeignFee === true ? whereNoForeignFee = 'AND O = "N" ' : whereNoForeignFee = '';

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

    latinoFirst === true ? whereLatinoFirst = 'AND F = "Y" ' : whereLatinoFirst = '';

    query = 'SELECT * ';
    query += 'WHERE ' + whereCategory + 'AND ' + whereScore;
    query += whereNoAnnualFee;
    query += whereNoBalanceTransferFee;
    query += whereNoForeignFee;
    query += whereNetwork;
    query += whereFinancial;
    query += whereLatinoFirst;
    query += orderBy;
    return query;
  }

  function updateCardsToCompare(id) {
    var cardId = $('#' + id).data('id');
    if ($('#' + id).prop('checked') && $.inArray(cardId, cardsToCompare) === -1) {
      if (cardsToCompare.length < MAX_CARDS_TO_COMPARE) {
        cardsToCompare.push(cardId);
      } else {
        $('#' + id).prop('checked', false);
        alert('You can compare up to ' + MAX_CARDS_TO_COMPARE + ' cards.');
      }
    } else {
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
    } else {
      $("#details-card-" + cardId).slideUp("fast", function () {
        $("#row-details-card-" + cardId).hide();
      });
      $('#' + id).data('toggle', 'hidden');
      $('#' + id).text('View Details');
    }
  }

  function toggleCategoriesBar(id) {
    var toggle = $('#' + id).data('toggle');
    if (toggle == 'hidden' || toggle == 'undefined') {
      $("#left-sidebar").slideDown();
      $('#' + id).data('toggle', 'visible');
    } else {
      $('#' + id).data('toggle', 'hidden');
      $("#left-sidebar").slideUp();
    }
  }
});