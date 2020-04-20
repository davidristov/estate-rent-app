import React, { Component } from "react";
import AppNav from "./AppNav";
import { Container, Button } from "reactstrap";
import "../App.css";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";
import "../style/Record.css";
import Popup from "./Popup";
import Modal from "react-awesome-modal";
import { MDBDataTable } from "mdbreact";

class Records extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      isLoading: false,
      properties: [],
      records: [],
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
    const {isLoading } = this.state;

    if (isLoading) return <div>Loading...</div>;

    let data = {
      columns: [
        {
          label: "Description",
          field: "description",
        },

        {
          label: "Location",
          field: "location",
        },

        {
          label: "Available from",
          field: "avDate",
        },

        {
          label: "Property",
          field: "property",
        },

        {
          label: "Owner",
          field: "owner",
        },

        {
          label: "Contact",
          field: "contact",
        },

        {
          label: "Action",
          field: "action",
        },

        {
          field: "add",
        },
      ],

      rows: [
        ...this.state.records.map((record) => ({
          description: record.description,
          location: record.location,
          avDate: (
            <Moment
              date={record.availableFromDate}
              format="DD/MM/YYYY"
            ></Moment>
          ),
          property: record.property.name,
          owner: record.owner,
          contact: record.phoneNumber,
          action: (
            <Button
              size="sm"
              color="danger"
              onClick={() => this.remove(record.id)}
            >
              Delete
            </Button>
          ),
        })),
      ],
    };

    return (
      <div>
        <AppNav />
        <Container className="container">
        
          <Modal
            visible={this.state.visible}
            width="600"
            height="530"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <Popup />
          </Modal>

          <MDBDataTable className="table" responsive striped hover data={data} />
          <Button
            className="buttonAdd"
            color="primary"
            onClick={() => this.openModal()}
          >
            Add
          </Button>
        </Container>
      </div>
    );
  }
}

export default Records;
