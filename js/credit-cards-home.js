$(document).ready(function() {
  $('#cardsForm').validate({
    messages: {
      score: "Choose Your Credit Card Score",
      category: "Choose What You Would Like to Do"
    }
  });
  document.getElementById('btn-get-your-free-credit-score').setAttribute('href', URL_GET_FREE_SCORE);
});