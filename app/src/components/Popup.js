import React from "react";
import { Input, Container, Button, Label, FormGroup, Form } from "reactstrap";
import "../App.css";
import Calendar from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Popup extends React.Component {
  emptyItem = {
    id: "",
    description: "",
    location: "",
    availableFromDate: new Date(),
    owner: "",
    phoneNumber: "",
    property: { id: 1, name: "" },
  };

  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      records: [],
      item: this.emptyItem,
    };

    this.submitRecord = this.submitRecord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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

  handleDateChange(dateChanged) {
    let item = { ...this.state.item };
    item.availableFromDate = dateChanged;
    this.setState({ item });
    console.log(item);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
    console.log(item);
  }

  async submitRecord(event) {
    const item = this.state.item;

    await fetch(`/api/records`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    event.preventDefault();
    this.props.history.push("/records");

    console.log(this.state);
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
    const { properties } = this.state;

    let propertiesList = properties.map((property) => (
      <option key={property.id}>{property.name}</option>
    ));

    return (
      <Container>
        <Form onSubmit={this.submitRecord} className="form">
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              style={{ width: "50%" }}
              onChange={this.handleChange}
              autoComplete="name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="property">Property</Label>
            <select name="property" onChange={this.handleChange}>
              {propertiesList}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="date">Available from</Label>
            <Calendar
              selected={this.state.item.availableFromDate}
              style={{ width: "20px" }}
              onChange={this.handleDateChange}
            />
          </FormGroup>
          <FormGroup className="LocationInput">
            <Label for="location">Location</Label>
            <Input
              type="text"
              name="location"
              id="location"
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="owner">Owner</Label>
            <Input
              type="text"
              name="owner"
              id="owner"
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Contact</Label>
            <Input
              type="text"
              name="phoneNumber"
              id="phone"
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Save
          </Button>{" "}
        </Form>
      </Container>
    );
  }
}

export default Popup;