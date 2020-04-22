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
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";

class Records extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      isLoading: false,
      properties: [],
      records: [],
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

  async componentDidMount() {
    const response = await fetch("/api/properties");
    const body = await response.json();
    this.setState({ properties: body, isLoading: false });

    const recordResponse = await fetch("/api/records");
    const bodyRecord = await recordResponse.json();
    this.setState({ records: bodyRecord, isLoading: false });
  }

  createDynamicURL(){
    alert("DA")
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) return <div>Loading...</div>;

    let data = {
      columns: [
        {
          label: "Description",
          field: "description",
          sort: "asc",
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
          label: "Price",
          field: "price",
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
          sort: "disabled",
        },
      ],

      rows: [
        ...this.state.records.map((record) => ({
          description: record.description,
          location: <a className="locationLink" href={`https://maps.google.com/?q=${record.location}`}>{record.location}</a>,
          avDate: (
            <Moment
              date={record.availableFromDate}
              format="DD/MM/YYYY"
            ></Moment>
          ),
          property: record.property.name,
          price: record.price,
          owner: record.owner,
          contact: record.phoneNumber,
          action: (
            <Button
              size="sm"
              color="danger"
              onClick={() => {if(window.confirm('Are you sure you want to delete?')){this.remove(record.id)};}}
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
            height="640"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <Popup />
          </Modal>

          <MDBDataTable className="table" responsive data={data} />
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
