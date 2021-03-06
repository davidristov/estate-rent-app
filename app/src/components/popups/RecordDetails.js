import React from "react";
import { Input, Container, Button, Label, FormGroup, Form } from "reactstrap";
import "../../App.css";
import Calendar from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/RecordPopup.css";

class PopupUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      records: [],
      item: this.emptyItem,
      selectedValue: this.props.propertyId
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleProperty = this.handleProperty.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
  }

  emptyItem = {
    id: this.props.id,
    description: this.props.description,
    location: this.props.location,
    availableFromDate: new Date(this.props.date),
    owner: this.props.owner,
    phoneNumber: this.props.phoneNumber,
    price: this.props.price,
    squareFoot: this.props.squareFoot,
    property: { id: this.props.propertyId, name: this.props.propertyName },
  };

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
    let item = this.emptyItem;
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

    this.setState({selectedValue: name})

    console.log(item);
    this.setState({ item });
  }
  async componentDidMount() {
    const response = await fetch("/api/properties");
    const body = await response.json();
    this.setState({ properties: body, isLoading: false });

    const recordResponse = await fetch("/api/records");
    const bodyRecord = await recordResponse.json();
    this.setState({ records: bodyRecord, isLoading: false });
  }

  async updateRecord() {
    const item = this.state.item;

    await fetch(`/api/records/${item.id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  render() {
    const { properties } = this.state;

    let propertiesList = properties.map((property) => (
      <option id={property.id} key={property.id} value={property.id}>
        {property.name}
      </option>
    ));

    return (
      <Container>
        <Form onSubmit={this.updateRecord} className="form">
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              onChange={this.handleChange}
              autoComplete="name"
              defaultValue={this.props.description}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="property">Property</Label>
            <select
              name="property"
              className="property"
              onChange={this.handleProperty}
              value={this.state.selectedValue}
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
              defaultValue={this.props.location}
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
              defaultValue={this.props.price}
            />
          </FormGroup>
          <FormGroup className="squareFoot">
            <Label for="squareFoot">Square Footage</Label>
            <Input
              type="text"
              name="squareFoot"
              id="squareFoot"
              onChange={this.handleChange}
              required
              defaultValue={this.props.squareFoot}
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
              defaultValue={this.props.owner}
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
              defaultValue={this.props.phoneNumber}
            />
          </FormGroup>
          <Button color="primary">Save</Button>{" "}
        </Form>
      </Container>
    );
  }
}

export default PopupUpdate;
