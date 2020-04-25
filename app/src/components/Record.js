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
import PopupUpdate from "./PopupUpdate";
import { Pie, Bar, Line } from "react-chartjs-2";
import colors from "nice-color-palettes";
import LocationChart from './charts/LocationChart'
import PropertyChart from './charts/PropertyChart'

class Records extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      isLoading: false,
      properties: [],
      records: [],
      visible: false,
      visibleEdit: false,
      showComponent: false,
      propertiesLabels: [],
      propertiesValues: [],
      propertiesUniqueLabels: [],
    };
  }

  id = "";
  location = "";
  date = new Date();
  property = "";
  price = "";
  owner = "";
  phoneNumber = "";
  desc = "";
  propertyId = "";
  propertyName = "";

  emptyItem = {
    id: "",
    description: "",
    location: "",
    availableFromDate: new Date(),
    owner: "",
    phoneNumber: "",
    price: "",
    property: { id: 1, name: "Apartman" },
  };

  openEditModal() {
    this.setState({
      visibleEdit: true,
    });
  }

  closeEditModal() {
    this.setState({
      visibleEdit: false,
      showComponent: false,
    });
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

  async updateRecord(data) {
    await fetch(`/api/records/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  Update(id, description, location, date, property, price, owner, contact) {
    this.id = id;
    this.location = location;
    this.date = date;
    this.property = property;
    this.price = price;
    this.owner = owner;
    this.phoneNumber = contact;
    this.desc = description;
    this.propertyId = property.id;
    this.propertyName = property.name;

    this.setState({ visibleEdit: true });
    this.setState({ showComponent: true });
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <div>Loading...</div>;

    let PieChartData = {
      labels: this.state.propertiesUniqueLabels,

      datasets: [
        {
          data: this.state.propertiesValues,
          backgroundColor: colors[8],
          borderColor: "rgb(0,0,0)",
          borderWidth: 1,
        },
      ],
    };

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
          label: "Update",
          field: "update",
          sort: "disabled",
        },

        {
          label: "Delete",
          field: "delete",
          sort: "disabled",
        },
      ],

      rows: [
        ...this.state.records.map((record) => ({
          description: record.description,
          location: (
            <a
              className="locationLink"
              name={record.location}
              href={`https://maps.google.com/?q=${record.location}`}
            >
              {record.location}
            </a>
          ),
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
          update: (
            <Button
              size="sm"
              color="primary"
              onClick={() =>
                this.Update(
                  record.id,
                  record.description,
                  record.location,
                  record.availableFromDate,
                  record.property,
                  record.price,
                  record.owner,
                  record.phoneNumber
                )
              }
            >
              Update
            </Button>
          ),
          delete: (
            <Button
              size="sm"
              color="danger"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete?")) {
                  this.remove(record.id);
                }
              }}
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
          <Modal
            visible={this.state.visibleEdit}
            width="600"
            height="640"
            effect="fadeInUp"
            onClickAway={() => this.closeEditModal()}
          >
            {this.state.showComponent ? (
              <PopupUpdate
                id={this.id}
                description={this.desc}
                location={this.location}
                date={this.date}
                propertyId={this.propertyId}
                propertyName={this.propertyName}
                price={this.price}
                owner={this.owner}
                phoneNumber={this.phoneNumber}
              />
            ) : null}
          </Modal>
      
        
          <LocationChart/>
          <PropertyChart/>
        </Container>
      </div>
    );
  }
}

export default Records;
