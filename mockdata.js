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

