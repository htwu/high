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

function onDataLoaded(response){
	var responseObj = JSON.parse(response);
	var data = {};
  data.title = {
  	text: 'Revenue and Expenses for {0}'.format(responseObj["OrgName"]),
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
      text: 'Currency ({0})'.format(responseObj["Currency"])
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

function getPeriodName(monthDataItem) {
	return monthDataItem.Label;
}

function getPeriodRevenueFigures(monthDataItem){
	//if (monthDataItem.Series[0] === undefined) {
  //	console.log("Missing data");
  //}
  return monthDataItem.Series[0].Value;
}

function getPeriodExpenseFigures(monthDataItem) {
	if (monthDataItem.Series[1] === undefined) {
  	//console.log("Missing data");
    return 0;
  }
  return  monthDataItem.Series[1].Value;
}

/*
Render a highCharts basic line chart at a dom element
This is an example data object. For more info check out: http://www.highcharts.com/docs/chart-and-series-types/line-chart
var data = {
  title: {
    text: 'Cashflow for {0}',
    x: -20 //center
  },
  subtitle: {
    text: '{0} to {1}',
    x: -20
  },
  xAxis: {
    categories: []
  },
  yAxis: {
    title: {
      text: 'Currency ({0})'
    },
    plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
    }]
  },
  tooltip: {
    valueSuffix: ''
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
  },
  series: [{
    name: '',
    data: [25, 0, -500]
  }]
};
*/

function createChart(data, target){
	$(target).highcharts(data);
}

/* Mocked Ajax response with data for rendering the chart. This is what the API returns so you have to work with this data structure */
function getMockData(){
	return JSON.stringify({
    "OrgName": "Walt\'s Meth Lab",
    "Currency": "USD",
    "Cashflow": [
      {
        "Label": "October",
        "Series": [
          {
            "Type": "Revenue",
            "Value": 2538.458
          },
          {
            "Type": "Expenses",
            "Value": 444.78
          }
        ]
      },
      {
        "Label": "November",
        "Series": [
          {
            "Type": "Revenue",
            "Value": 859
          },
          {
            "Type": "Expenses",
            "Value": 8585
          },
					{
          	"Type": "Projected",
            "Value": 8585
          }
        ]
      },
      {
        "Label": "December",
        "Series": [
          {
            "Type": "Revenue",
            "Value": 4458.3
          }
        ]
      },
      {
        "Label": "January",
        "Series": [
          {
            "Type": "Revenue",
            "Value": 4458
          },
          {
            "Type": "Expenses",
            "Value": 7741
          }
        ]
      },
      {
        "Label": "February",
        "Series": [
          {
            "Type": "Revenue",
            "Value": 8459.58
          },
          {
            "Type": "Expenses",
            "Value": 1221
          }
        ]
      },
      {
        "Label": "March",
        "Series": [
          {
            "Type": "Revenue",
            "Value": 11489.5
          },
          {
            "Type": "Expenses",
            "Value": 587
          },
          {
          	"Type": "Projected",
            "Value": 2500
          }
        ]
      }
    ]
  });
}

$(function () {
	onDataLoaded(getMockData());
});

// Handy polyfill for formatting strings
// e.g. "Hiya {0} {1}".format("odd", "chap"); // "Hiya odd chap"
String.prototype.format = function() {
  var str = this;
  for (var i = 0; i < arguments.length; i++) {       
    var reg = new RegExp("\\{" + i + "\\}", "gm");             
    str = str.replace(reg, arguments[i]);
  }
  return str;
}