Vue.filter("date", function (val) {
  return val.toDateString();
});

Vue.filter("money", function (val, decimalPlaces, symbol) {
  if (symbol === undefined) symbol = "$";
  if (decimalPlaces === undefined) decimalPlaces = 2;
  return symbol + val.toFixed(decimalPlaces);
});