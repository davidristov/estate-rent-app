import React, { Component } from "react";
import { Input, Container, Button, Label, FormGroup, Form } from "reactstrap";
import Calendar from "react-datepicker";

class AddEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.emptyItem,
      departments: [],
      offices: [],
    };

    this.submitEmployee = this.submitEmployee.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDepartment = this.handleDepartment.bind(this);
    this.handleOffice = this.handleOffice.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/api/departments");
    const body = await response.json();
    this.setState({ departments: body, isLoading: false });

    const responseOffice = await fetch("/api/offices");
    const bodyOffice = await responseOffice.json();
    this.setState({ offices: bodyOffice });
  }

  emptyItem = {
    id: "",
    name: "",
    surname: "",
    dateOfEmployment: new Date(),
    residenceAddress: "",
    embg: "",
    phoneNumber: "",
    office: { id: 1, city: "", address: "" },
    department: { id: 1, name: "" },
  };

  handleDateChange(dateChanged) {
    let item = { ...this.state.item };
    item.dateOfEmployment = dateChanged;
    this.setState({ item });
    console.log(item);
  }

  handleDepartment(event) {
    const target = event.target;
    let item = { ...this.state.item };
    const value = target.value;
    const id = event.target.selectedOptions[0].id;
    item.department.id = id;
    item.department.name = value;
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

  handleOffice(event) {
    const target = event.target;
    let item = { ...this.state.item };
    const value = target.value;
    const id = event.target.selectedOptions[0].id;
    item.office.id = id;
    this.setState({ item });
    console.log(item);
  }

  async submitEmployee(event) {
    const item = this.state.item;

    await fetch(`/api/employees`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    event.preventDefault();
    this.props.history.push("/employees");

    console.log(this.state);
  }

  render() {
    const { departments } = this.state;
    const { offices } = this.state;

    let officeList = offices.map((office) => (
      <option id={office.id} key={office.id}>
        {`${office.city} ${office.address}`}
      </option>
    ));

    let departmentList = departments.map((department) => (
      <option id={department.id} key={department.id}>
        {department.name}
      </option>
    ));

    return (
      <div>
        <Container>
          <Form onSubmit={this.submitEmployee} className="form">
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
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
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="office">Offices</Label>
              <select
                name="office"
                className="office"
                onChange={this.handleOffice}
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
              >
                {departmentList}
              </select>
            </FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>{" "}
          </Form>
        </Container>
      </div>
    );
  }
}

export default AddEmployee;
