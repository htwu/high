/*
Task: Render a line chart showing revenue and expenses for an organisation

Your task is to use data from an existing service to render a line chart that represents the revenue and expenses of an organisation.

Resources at your disposal:
 - jQuery. We don't use it at Xero but it's fairly common so suitable for exercises like this
 - highCharts. a simple charting library
 - String.format method - you might find it useful
 - Google - feel free to use it, any dev who claims not to use stack overflow is a liar or a goose
 - mockdata and a scaffold dataloaded handler
*/
'use strict';

// Handy polyfill for formatting strings
// e.g. "Hiya {0} {1}".format("odd", "chap"); // "Hiya odd chap"
var formatString = function (str) {
  var reg;
  var values = Array.prototype.slice.call(arguments, 1);
  var i;
  for (i = 0; i < values.length; i++) {
    reg = new RegExp("\\{" + i + "\\}", "gm");
    str = str.replace(reg, values[i]);
  }
  return str;
}

var getPeriodName = function (monthDataItem) {
  return monthDataItem.Label;
}

var getPeriodRevenueFigures = function (monthDataItem) {
  return monthDataItem.Series[0].Value;
}

var getPeriodExpenseFigures = function (monthDataItem) {
  if (monthDataItem.Series[1] === undefined) {
    return 0;
  }
  return monthDataItem.Series[1].Value;
}

var createChart = function (data, target) {
  $(target).highcharts(data);
}


function onDataLoaded(response) {
  var responseObj = JSON.parse(response);
  var data = {};
  data.title = {
    text: formatString('Revenue and Expenses for {0}', responseObj["OrgName"]),
    x: -20 //center
  }
  data.subtitle = {
    text: '',
    x: -20
  }
  data.xAxis = {
    categories: responseObj.Cashflow.map(getPeriodName)
  }
  data.yAxis = {
    title: {
      text: formatString('Currency ({0})', responseObj["Currency"])
    }
  }
  data.tooltip = {
    valueSuffix: ''
  }
  data.legend = {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
  }
  data.series = [{
    name: 'Revenue',
    color: '#00AA00',
    data: responseObj.Cashflow.map(getPeriodRevenueFigures)
  },
    {
      name: 'Expenses',
      color: '#AA0000',
      data: responseObj.Cashflow.map(getPeriodExpenseFigures)
    }]

  $('#container').highcharts(data);
}


$(function () {
  onDataLoaded(getMockData());
});

