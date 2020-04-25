import React, { Component } from "react";
import {  Bar  } from "react-chartjs-2";
import colors from "nice-color-palettes";

class LocationChart extends Component {
  state = {
    labels: [],
    uniqueLabels: [],
    value: [],
  };

  async componentDidMount() {
    const response = await fetch("/api/properties");
    const body = await response.json();
    this.setState({ properties: body, isLoading: false });

    const recordResponse = await fetch("/api/records");
    const bodyRecord = await recordResponse.json();
    this.setState({ records: bodyRecord, isLoading: false });

    // for bar chart

    let len = Object.keys(bodyRecord).length;

    console.log(bodyRecord);

    // gets all municipalities including duplicate names
    for (let i = 0; i < len; i++) {
      this.setState({
        labels: this.state.labels.concat(bodyRecord[i].location),
      });
    }

    let counts = {};

    // get number of occurences for each municipality, ex. Karposh 1: 2, Karposh 2: 2 etc.
    this.state.labels.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    console.log(counts);
    console.log(this.state.labels);

    //removes duplicate municipality names
    let uniqueNames = Array.from(new Set(this.state.labels));
    this.setState({
      uniqueLabels: uniqueNames,
    });

    let lenCounts = Object.keys(counts).length;
    console.log(lenCounts);

    // extracts the number of occurences from counts and stores in array
    for (let i = 0; i < lenCounts; i++) {
      this.setState({
        value: this.state.value.concat(counts[Object.keys(counts)[i]]),
      });
    }
  }

  render() {
    let BarChartData = {
      labels: this.state.uniqueLabels,

      datasets: [
        {
          data: this.state.value,
          backgroundColor: colors[5].concat(colors[8].concat(colors[9])),
          borderColor: "rgb(0,0,0)",
          borderWidth: 1,
        },
      ],

      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };

    return (
      <div className="chart">
        <Bar
          data={BarChartData}
          options={{
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default LocationChart;
