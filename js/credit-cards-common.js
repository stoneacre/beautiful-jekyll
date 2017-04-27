var sheetUrl = "https://docs.google.com/spreadsheets/d/14nDVwVvubdeUDVDRKxkq1P5hgaqUNk_k1ekHLKyqooY/edit#gid=0";
var MAX_CARDS_TO_COMPARE = 3;

function toBullets(text) {
  var ul = '';
  var items = text.split(';');
  if (items.length >= 1) {
    ul = '<ul>';
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
  html = html.replace(/%%card_id%%/g, data[0]);
  html = html.replace(/%%card_name%%/g, data[1]);
  html = html.replace(/%%card_details%%/g, data[4]);
  html = html.replace(/%%card_rewards_rate%%/g, data[24]);
  html = html.replace(/%%card_annual_fee%%/g, data[21]);
  html = html.replace(/%%card_image_url%%/g, data[28]);
  html = html.replace(/%%card_apply_now_url%%/g, data[29]);
  html = html.replace(/%%card_introductory_apr%%/g, data[15]);
  html = html.replace(/%%card_introductory_reward%%/g, data[25]);
  html = html.replace(/%%card_apr%%/g, data[16]);
  html = html.replace(/%%card_balance_transfer_fee%%/g, data[22]);
  html = html.replace(/%%card_foreign_transaction_fee%%/g, data[23]);
  html = html.replace(/%%card_pros%%/g, toBullets(data[31]));
  html = html.replace(/%%card_cons%%/g, toBullets(data[32]));

  if (data[5] == 'Y') {
    html = html.replace(/%%card_div_seal%%/g, "<div id='card-seal-%%card_id%%' class='card-seal'></div>");
  } else {
    html = html.replace(/%%card_div_seal%%/g, '');
  }

  return html;
}