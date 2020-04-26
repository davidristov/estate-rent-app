import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import colors from "nice-color-palettes";
import '../../style/charts/SquaresChart.css';

class SquaresChart extends Component {
  state = {
    zeroTwenty: 0,
    twentyOneForty: 0,
    fortyOneSixty: 0,
    sixtyOneEighty: 0,
    eightyOneHundred: 0,
    hundredPlus: 0,
  };

  async componentDidMount() {
    const response = await fetch("/api/properties");
    const body = await response.json();
    this.setState({ properties: body, isLoading: false });

    const recordResponse = await fetch("/api/records");
    const bodyRecord = await recordResponse.json();
    this.setState({ records: bodyRecord, isLoading: false });

    let len = Object.keys(bodyRecord).length;

    for (let i = 0; i < len; i++) {
      console.log(bodyRecord[i].squareFoot);

      if (bodyRecord[i].squareFoot < 21) {
        this.setState({ zeroTwenty: this.state.zeroTwenty + 1 });
      } else if (
        bodyRecord[i].squareFoot > 20 &&
        bodyRecord[i].squareFoot < 41
      ) {
        this.setState({ twentyOneForty: this.state.twentyOneForty + 1 });
      } else if (
        bodyRecord[i].squareFoot > 40 &&
        bodyRecord[i].squareFoot < 61
      ) {
        this.setState({ fortyOneSixty: this.state.fortyOneSixty + 1 });
      } else if (
        bodyRecord[i].squareFoot > 60 &&
        bodyRecord[i].squareFoot < 81
      ) {
        this.setState({ sixtyOneEighty: this.state.sixtyOneEighty + 1 });
      } else if (
        bodyRecord[i].squareFoot > 80 &&
        bodyRecord[i].squareFoot < 101
      ) {
        this.setState({ eightyOneHundred: this.state.eightyOneHundred + 1 });
      }

      if (bodyRecord[i].squareFoot > 101) {
        this.setState({ hundredPlus: this.state.hundredPlus + 1 });
      }
    }
  }

  render() {
    let chartData = {
      labels: ["0-20", "21-40", "41-60", "61-80", "81-100", "101+"],

      datasets: [
        {
          data: [
            this.state.zeroTwenty,
            this.state.twentyOneForty,
            this.state.fortyOneSixty,
            this.state.sixtyOneEighty,
            this.state.eightyOneHundred,
            this.state.hundredPlus,
          ],
          backgroundColor: colors[8],
          borderColor: "rgb(0,0,0)",
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="squaresChart">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            legend: {
                display: false
            },
            scales: {
              yAxes: [
                {
                //   display: false,
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default SquaresChart;
