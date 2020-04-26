import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import colors from "nice-color-palettes";
import '../../style/charts/PropertyChart.css'

class PropertyChart extends Component {
  state = {
    propertiesLabels: [],
    propertiesValues: [],
    propertiesUniqueLabels: [],
  };

  async componentDidMount() {
    const response = await fetch("/api/properties");
    const body = await response.json();
    this.setState({ properties: body, isLoading: false });

    const recordResponse = await fetch("/api/records");
    const bodyRecord = await recordResponse.json();
    this.setState({ records: bodyRecord, isLoading: false });

    let len = Object.keys(bodyRecord).length;

    // for pie chart

    for (let i = 0; i < len; i++) {
      this.setState({
        propertiesLabels: this.state.propertiesLabels.concat(
          bodyRecord[i].property.name
        ),
      });
    }

    let countsPie = {};

    this.state.propertiesLabels.forEach(function (x) {
      countsPie[x] = (countsPie[x] || 0) + 1;
    });

    let propertiesUniqueLabels = Array.from(
      new Set(this.state.propertiesLabels)
    );
    this.setState({
      propertiesUniqueLabels: propertiesUniqueLabels,
    });

    let lenCountsPie = Object.keys(countsPie).length;

    for (let i = 0; i < lenCountsPie; i++) {
      this.setState({
        propertiesValues: this.state.propertiesValues.concat(
          countsPie[Object.keys(countsPie)[i]]
        ),
      });
    }
  }

  render() {
    let PieChartData = {
      labels: this.state.propertiesUniqueLabels,

      datasets: [
        {
          data: this.state.propertiesValues,
          backgroundColor: colors[2],
          borderColor: "rgb(0,0,0)",
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="pieChart">
        <Pie
          widht="300px"
          data={PieChartData}
          options={{
            
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              yAxes: [
                {
                  display: false,
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default PropertyChart;
