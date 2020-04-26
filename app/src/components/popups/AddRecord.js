import React from "react";
import { Input, Container, Button, Label, FormGroup, Form } from "reactstrap";
import "../../App.css";
import Calendar from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/RecordPopup.css";

class Popup extends React.Component {
  emptyItem = {
    id: "",
    description: "",
    location: "",
    availableFromDate: new Date(),
    owner: "",
    phoneNumber: "",
    price: "",
    squareFoot: "",
    property: { id: 1, name: "Apartman" },
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
    this.handleProperty = this.handleProperty.bind(this);
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

  handleProperty(event) {
    const target = event.target;
    const targetName = target.name;
    const name = target.value;
    const id = event.target.selectedOptions[0].id;
    let item = { ...this.state.item };
    item[targetName] = { id: id, name };
    console.log(item);
    this.setState({ item });
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
      <option id={property.id} key={property.id}>
        {property.name}
      </option>
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
              onChange={this.handleChange}
              autoComplete="name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="property">Property</Label>
            <select
              name="property"
              className="property"
              onChange={this.handleProperty}
            >
              {propertiesList}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="date">Available from</Label>
            <Calendar
              className="calendar"
              selected={this.state.item.availableFromDate}
              onChange={this.handleDateChange}
              dateFormat="d MMMM, yyyy"
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
          <FormGroup className="price">
            <Label for="price">Price</Label>
            <Input
              type="text"
              name="price"
              id="price"
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="squareFoot">
            <Label for="price">m2</Label>
            <Input
              type="number"
              name="squareFoot"
              id="squareFoot"
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
