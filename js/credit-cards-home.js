$(document).ready(function () {
  $("#btn-dropdown-score").click(function (e) {
    e.preventDefault();
    document.getElementById("custom-dropdown-score").classList.toggle("show");
  });

  $("#btn-dropdown-action").click(function (e) {
    e.preventDefault();
    document.getElementById("custom-dropdown-action").classList.toggle("show");
  });

  $('#custom-dropdown-score a').click(function (e) {
    e.preventDefault();
    $('#btn-dropdown-score').text($(this).text());
    $("#btn-dropdown-action").trigger("click");
  });

  $('#custom-dropdown-action a').click(function (e) {
    e.preventDefault();
    $('#btn-dropdown-action').text($(this).text());
  });

  $('#cardsForm').validate({
    messages: {
      score: "Choose Your Credit Card Score",
      category: "Choose What You Would Like to Do"
    }
  });
  document.getElementById('btn-get-your-free-credit-score').setAttribute('href', URL_GET_FREE_SCORE);
});