$(document).ready(function () {
  $("#btn-dropdown-score").click(function (e) {
    e.preventDefault();
    $("#custom-dropdown-score").toggleClass("show");
    $("#custom-dropdown-action").removeClass("show");
  });

  $("#btn-dropdown-action").click(function (e) {
    e.preventDefault();
    $("#custom-dropdown-action").toggleClass("show");
  });

  $("#custom-dropdown-score a").click(function () {
    $("#btn-dropdown-score").text($(this).text());
    $("label#score-error").hide();
  });

  $("#custom-dropdown-action a").click(function () {
    $("#btn-dropdown-action").text($(this).text());
    $("label#category-error").hide();
  });

  $("a[class*='link-']").click(function (e) {
    e.preventDefault();
    switch ($(this).attr('class')) {
      case "link-score":
        $('#score').val($(this).data("option"));
        break;
      case "link-action":
        $('#category').val($(this).data("option"));
        break;
    }
  });

  window.onclick = function (event) {
    if (!event.target.matches('.custom-dropbtn')) {
      var dropdowns = document.getElementsByClassName("custom-dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
    if (event.target.matches('#custom-dropdown-score a')) {
      if ($('#category').val() === '') {
        $("#custom-dropdown-action").toggleClass("show");
      }
    }
  };

  $('#cardsForm').validate({
    ignore: [],
    messages: {
      score: "What's your Credit Card Score?",
      category: "What do you want?"
    }
  });

  document.getElementById('btn-get-your-free-credit-score').setAttribute('href', URL_GET_FREE_SCORE);
});