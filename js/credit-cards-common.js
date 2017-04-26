function toBullets(text) {
  var ul = '';
  var items = text.split(';');
  console.log(items.length);
  if (items.length >= 1) {
    ul = '<ul>';
    items.forEach(function(item) {
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