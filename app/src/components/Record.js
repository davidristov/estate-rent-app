import React, { Component } from "react";
import AppNav from "./AppNav";
import { Table, Container, Button } from "reactstrap";
import "../App.css";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";
import "../style/Record.css";
import Popup from "./Popup";
import Modal from "react-awesome-modal";

class Records extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      isLoading: false,
      properties: [],
      records: [],
      item: this.emptyItem,
      showPopup: false,
      visible: false,
    };
  }

  openModal() {
    this.setState({
      visible: true,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
  }

  async remove(id) {
    await fetch(`/api/records/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedRecords = [...this.state.records].filter((i) => i.id !== id);
      this.setState({ records: updatedRecords });
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  async componentDidMount() {
    const response = await fetch("/api/properties");
    const body = await response.json();
    this.setState({ properties: body, isLoading: false });

    const recordResponse = await fetch("/api/records");
    const bodyRecord = await recordResponse.json();
    this.setState({ records: bodyRecord, isLoading: false });
  }

  render() {
    const { records, isLoading } = this.state;

    if (isLoading) return <div>Loading...</div>;

    let rows = records.map((record) => (
      <tr key={record.id}>
        <td>{record.description}</td>
        <td>{record.location}</td>
        <td>
          <Moment date={record.availableFromDate} format="DD/MM/YYYY"></Moment>
        </td>
        <td>{record.property.name}</td>
        <td>{record.owner}</td>
        <td>{record.phoneNumber}</td>
        <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.remove(record.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNav />
        <Container className="container">
          <div className="tableDiv">
            <Table>
              <thead>
                <tr>
                  <th width="30%">Description</th>
                  <th width="10%">Location</th>
                  <th width="20%">Available from</th>
                  <th width="10%">Property</th>
                  <th width="10%">Owner</th>
                  <th width="10%">Contact</th>
                  <th width="10%">Action</th>
                </tr>
              </thead>

              <tbody>{rows}</tbody>
            </Table>
          </div>
          <Button
            className="buttonAdd"
            color="primary"
            onClick={() => this.openModal()}
          >
            Add
          </Button>
          <Modal
            visible={this.state.visible}
            width="600"
            height="500"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <Popup />
          </Modal>
        </Container>
      </div>
    );
  }
}

export default Records;
