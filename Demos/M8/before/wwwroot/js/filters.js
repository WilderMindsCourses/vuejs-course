import Vue from 'vue';

export let DateFilter = Vue.filter("date", function (val) {
  return val.toDateString();
});

export let MoneyFilter = Vue.filter("money", function (val, decimalPlaces, symbol) {
  if (symbol === undefined) symbol = "$";
  if (decimalPlaces === undefined) decimalPlaces = 2;
  return symbol + val.toFixed(decimalPlaces);
});