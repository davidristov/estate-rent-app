import React, { Component } from "react";
import { Input, Container, Button, Label, FormGroup, Form } from "reactstrap";
import Calendar from "react-datepicker";

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.emptyItem,
      offices: [],
      departments: [],
      selectedValue: this.props.officeId
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.handleDepartment = this.handleDepartment.bind(this);
    this.handleOffice = this.handleOffice.bind(this);
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
    let item = this.emptyItem;
    item[name] = value;
    this.setState({ item });
    console.log(item);
  }

  handleOffice(event) {
    const target = event.target;
    const targetName = target.name;
    const name = target.value;
    const id = event.target.selectedOptions[0].id;
    let item = { ...this.state.item };
    item[targetName] = { id: id, name };
    console.log(item);
    this.setState({selectedValue: name})
    this.setState({ item });
  }

  handleDepartment(event) {
    const target = event.target;
    console.log(target);
    const targetName = target.name;
    const name = target.value;
    const id = event.target.selectedOptions[0].id;
    let item = { ...this.state.item };
    item[targetName] = { id: id, name };
    console.log(item);
    this.setState({ item });
  }

  async componentDidMount() {
    const response = await fetch("/api/offices");
    const body = await response.json();
    this.setState({ offices: body });

    const departmentResponse = await fetch("/api/departments");
    const bodyDepartment = await departmentResponse.json();
    this.setState({ departments: bodyDepartment });
  }

  async updateDetails() {
    const item = this.state.item;
    console.log(item);

    await fetch(`/api/employees/${item.id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  emptyItem = {
    id: this.props.id,
    name: this.props.name,
    surname: this.props.surname,
    dateOfEmployment: new Date(this.props.dateOfEmployment),
    residenceAddress: this.props.residenceAddress,
    embg: this.props.embg,
    phoneNumber: this.props.phoneNumber,
    office: {
      id: this.props.officeId,
      city: this.props.officeCity,
      name: this.props.officeAddress,
    },
    department: {
      id: 1,
      name: this.props.departmentName,
    },
  };

  render() {
    const { departments } = this.state;
    const { offices } = this.state;

    let officeList = offices.map((office) => (
      <option id={office.id} key={office.id} value={office.id}>
        {`${office.city} ${office.address}`}
      </option>
    ));

    let departmentList = departments.map((department) => (
      <option id={department.id} key={department.id} value={department.id}>
        {department.name}
      </option>
    ));

    return (
      <Container>
        <Form onSubmit={this.updateDetails} className="form">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={this.handleChange}
              defaultValue={this.state.item.name}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="surname">Surname</Label>
            <Input
              type="text"
              name="surname"
              id="surname"
              onChange={this.handleChange}
              defaultValue={this.props.surname}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date of employment</Label>
            <Calendar
              className="calendar"
              selected={this.state.item.dateOfEmployment}
              onChange={this.handleDateChange}
              dateFormat="d MMMM, yyyy"
            />
          </FormGroup>
          <FormGroup>
            <Label for="residenceAddress">Residence address</Label>
            <Input
              type="text"
              name="residenceAddress"
              id="residenceAddress"
              onChange={this.handleChange}
              defaultValue={this.props.residenceAddress}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="owner">ID Number</Label>
            <Input
              type="text"
              name="embg"
              id="embg"
              onChange={this.handleChange}
              defaultValue={this.props.embg}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              id="phone"
              onChange={this.handleChange}
              defaultValue={this.props.phoneNumber}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="office">Office</Label>
            <select
              name="office"
              className="office"
              onChange={this.handleOffice}
              value={this.state.selectedValue}
            >
              {officeList}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="department">Department</Label>
            <select
              name="department"
              className="department"
              onChange={this.handleDepartment}
              value={this.props.departmentId}
            >
              {departmentList}
            </select>
          </FormGroup>
          <Button color="primary" type="submit">
            Update
          </Button>{" "}
        </Form>
      </Container>
    );
  }
}

export default EmployeeDetails;
