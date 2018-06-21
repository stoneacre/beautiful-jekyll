window.addEventListener("pageshow", function (event) {
  var historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
  if (historyTraversal) {
    // Handle page restore.
    window.location.reload();
  }
});

$(document).ready(function () {
  $('#score').val('');
  $('#category').val('');

  $("#btn-dropdown-score").click(function (e) {
    e.preventDefault();
    $("#custom-dropdown-score").toggleClass("show");
    $("#custom-dropdown-action").removeClass("show");
  });

  $("#btn-dropdown-action").click(function (e) {
    e.preventDefault();
    $("#custom-dropdown-action").toggleClass("show");
    $("#custom-dropdown-score").removeClass("show");
  });

  $("#custom-dropdown-score a").click(function () {
    if ($(this).attr('id') != 'btn-get-your-free-credit-score') {
      $("#btn-dropdown-score").text($(this).text());
    }
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
    var target = $(event.target);
    if (!target.is('.custom-dropbtn')) {
      var dropdowns = document.getElementsByClassName("custom-dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
    if (target.is('#custom-dropdown-score a')) {
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
});