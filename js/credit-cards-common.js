String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

$(".navbar").addClass("top-nav-short");

var sheetUrl = "https://docs.google.com/spreadsheets/d/14nDVwVvubdeUDVDRKxkq1P5hgaqUNk_k1ekHLKyqooY/edit#gid=0";
var MAX_CARDS_TO_COMPARE = 10;
var URL_GET_FREE_SCORE = 'https://track.flexlinkspro.com/a.ashx?foid=1114602.1707657&foc=1&fot=9999&fos=1&url=https%3A%2F%2Fwww1.myfico.com%2Fproducts%2Fcredit-reports-and-fico-scores';

$('body').on('click mouseenter', 'a[data-tooltip]', function () {
  $(this).qtip({
    content: {
      title: 'Latino First<sup>&reg;</sup>',
      text: 'Our Latino First<sup>&reg;</sup> badge is granted to those financial products that are the best fit for the Latino community'
    },
    style: {
      classes: 'qtip-bootstrap'
    },
    position: {
      viewport: $(window)
    },
    hide: {
      fixed: true,
      delay: 300
    },
    overwrite: false,
    show: {
      ready: true
    }
  });
});

function toBullets(text, cssClass) {
  var ul = '';
  var items = text.split(';');
  if (items.length >= 1) {
    ul = '<ul>';
    if (typeof (cssClass) != 'undefined') { ul = "<ul class='" + cssClass + "'>"; }
    items.forEach(function (item) {
      if (item != '') {
        ul += '<li class="text-left">' + item + '</li>';
      }
    });
    ul += '</ul>';
  }
  return ul;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCreditScoreString(data) {
  var string = '';
  var labels = ['Poor', 'Average', 'Good', 'Excellent'];
  data.forEach(function (score, index) {
    if (data[index] == 'Y') string += labels[index] + ';';
  });
  return string;
}

function replaceTags(html, data) {
  if (data[5] == 'Y') {
    html = html.replaceAll(/%%card_div_seal%%/g, "<div id='card-seal-%%card_id%%' class='card-seal'><a href='javascript:void(0);' data-tooltip><img src='../img/seal_mid.png' /></a></div>");
    html = html.replaceAll(/%%card_div_seal_comparison%%/g, "<div class='card-seal'><a href='javascript:void(0);' data-tooltip><img src='../img/seal.png' /></a></div>");
    html = html.replaceAll(/%%card_div_seal_title%%/g, "<a href='javascript:void(0);' data-tooltip><img class='card-seal-small' src='../img/seal_small.png' data-tooltip width='30'/></a>");
  } else {
    html = html.replaceAll(/%%card_div_seal%%/g, '');
    html = html.replaceAll(/%%card_div_seal_comparison%%/g, "");
    html = html.replaceAll(/%%card_div_seal_title%%/g, '');
  }

  html = html.replaceAll(/%%card_id%%/g, data[0]);
  html = html.replaceAll(/%%card_name%%/g, data[1]);
  html = html.replaceAll(/%%card_details%%/g, data[4]);
  html = html.replaceAll(/%%card_introductory_apr%%/g, data[15]);
  html = html.replaceAll(/%%card_apr%%/g, data[16]);
  html = html.replaceAll(/%%card_annual_fee%%/g, data[22]);
  html = html.replaceAll(/%%card_balance_transfer_fee%%/g, data[23]);
  html = html.replaceAll(/%%card_foreign_transaction_fee%%/g, data[24]);
  html = html.replaceAll(/%%card_rewards_rate%%/g, data[25]);
  html = html.replaceAll(/%%card_introductory_reward%%/g, data[27]);
  html = html.replaceAll(/%%card_image_url%%/g, data[28]);
  html = html.replaceAll(/%%card_apply_now_url%%/g, data[29]);
  html = html.replaceAll(/%%card_pros%%/g, toBullets(data[31]));
  html = html.replaceAll(/%%card_cons%%/g, toBullets(data[32]));
  html = html.replaceAll(/%%get_free_credit_score%%/g, URL_GET_FREE_SCORE);

  return html;
}