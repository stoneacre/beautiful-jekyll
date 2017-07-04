$(document).ready(function () {
  $("#btn-dropdown-score").click(function () {
    $("#custom-dropdown-score").toggleClass("show");
    $("#custom-dropdown-action").removeClass("show");
  });

  $("#btn-dropdown-action").click(function () {
    $("#custom-dropdown-action").toggleClass("show");
    $("#custom-dropdown-score").removeClass("show");
  });

  $("#custom-dropdown-score a").click(function () {
    $("#btn-dropdown-score").text($(this).text());
  });

  $("#custom-dropdown-action a").click(function () {
    $("#btn-dropdown-action").text($(this).text());
  });

  $("a[class*='link-']").click(function(e) {
    e.preventDefault();
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
      $("#custom-dropdown-action").toggleClass("show");
    }
  }

  document.getElementById("btn-get-your-free-credit-score").setAttribute("href", URL_GET_FREE_SCORE);
});