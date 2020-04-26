import React, { Component } from "react";
import PropertyChart from "../charts/PropertyChart";
import LocationChart from "../charts/LocationChart";
import SquareChart from "../charts/SquaresChart";
import AppNav from "../layout/AppNav";
import { Container } from "reactstrap";
import "../../style/pages/Statistics.css";

class Statistics extends Component {
  state = {};
  render() {
    return (
      <div>
        <AppNav />
        <Container className="container">
          <div className="charts">
            <LocationChart />
            <PropertyChart />
            <SquareChart />
          </div>
        </Container>
      </div>
    );
  }
}

export default Statistics;
