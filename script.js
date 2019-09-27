function clicky() {
  var test = document.getElementById('boxtext')
  location.href = "/daily?ticker=" + test.value
}

function goBack(x) {
  location.href = "/"
}
function set5Year(x) {
  location.href = "/stock?ticker=" + x + "&time=5y"
}
function set1Day(x) {
  location.href = "/daily?ticker=" + x
}
function set1Year(x) {
  location.href = "/stock?ticker=" + x + "&time=1y"
}
function set6Month(x) {
  location.href = "/stock?ticker=" + x + "&time=6m"
}
function set1Month(x) {
  location.href = "/stock?ticker=" + x + "&time=1m"
}