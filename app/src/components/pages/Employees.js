import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import Moment from "react-moment";
import AppNav from "../layout/AppNav";
import { Container, Button } from "reactstrap";
import "../../style/pages/Employee.css";
import Modal from "react-awesome-modal";
import AddEmployee from '../popups/AddEmployee'
import EmployeeDetails from '../popups/EmployeeDetails'

class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      visible: false,
      showComponent: false,
      visibleDetails: false
    };
  }

  id = ""
  name = ""
  surname = ""
  dateOfEmployment = ""
  residenceAddress = ""
  embg = ""
  phoneNumber = ""
  officeId = ""
  officeAddress = ""
  officeCity = ""
  departmentId = ""
  departmentName = ""

  openDetailsModal() {
    this.setState({
      visibleDetails: true,
    });
  }

  closeDetailsModal() {
    this.setState({
      visibleDetails: false,
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

  async componentDidMount() {
    const employeeResponse = await fetch("/api/employees");
    const bodyEmployee = await employeeResponse.json();
    this.setState({ employees: bodyEmployee });
  }

  async detailsEmployee(
    id,
    name,
    surname,
    date,
    residence,
    idNumber,
    contact,
    office,
    department,
  ) {
    this.id = id
    this.name = name
    this.surname = surname
    this.dateOfEmployment = date
    this.residenceAddress = residence
    this.embg = idNumber
    this.phoneNumber = contact
    this.officeId = office.id
    this.officeCity = office.city
    this.officeAddress = office.address
    this.departmentId = department.id
    this.departmentName = department.name

    this.setState({ visibleDetails: true });
    this.setState({ showComponent: true });
  }

  async removeEmployee(id) {
    await fetch(`/api/employees/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedEmployees = [...this.state.employees].filter(
        (i) => i.id !== id
      );
      this.setState({ employees: updatedEmployees });
    });
  }

  render() {
    let data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },

        {
          label: "Surname",
          field: "surname",
        },

        {
          label: "Office City",
          field: "officeCity",
        },

        {
          label: "Office Address",
          field: "officeAddress",
        },

        {
          label: "Details",
          field: "details",
          sort: "disabled",
        },

        {
          label: "Delete",
          field: "delete",
          sort: "disabled",
        },
      ],

      rows: [
        ...this.state.employees.map((employee) => ({
          name: employee.name,
          surname: employee.surname,
          date: (
            <Moment
              date={employee.dateOfEmployment}
              format="DD/MM/YYYY"
            ></Moment>
          ),
          address: employee.residenceAddress,
          idNumber: employee.embg,
          officeCity: employee.office.city,
          officeAddress: employee.office.address,
          department: employee.department.name,
          contact: employee.phoneNumber,
          details: (
            <Button
              size="sm"
              color="primary"
              onClick={() =>
                this.detailsEmployee(
                  employee.id,
                  employee.name,
                  employee.surname,
                  employee.dateOfEmployment,
                  employee.residenceAddress,
                  employee.embg,
                  employee.phoneNumber,
                  employee.office,
                  employee.department
                )
              }
            >
              Details
            </Button>
          ),
          delete: (
            <Button
              size="sm"
              color="danger"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete?")) {
                  this.removeEmployee(employee.id);
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
        <Container>
          <Modal
            visible={this.state.visible}
            width="600"
            height="700"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <AddEmployee />
          </Modal>

          <MDBDataTable className="table" responsive data={data} />
          <Button
            className="buttonAddEmployee"
            color="primary"
            onClick={() => this.openModal()}
            width="400px"
          >
            Add Employee
          </Button>

          <Modal
            visible={this.state.visibleDetails}
            width="600"
            height="680"
            effect="fadeInUp"
            onClickAway={() => this.closeDetailsModal()}
          >
            {this.state.showComponent ? (
              <EmployeeDetails
                id = {this.id}
                name = {this.name}
                surname = {this.surname}
                dateOfEmployment = {this.dateOfEmployment}
                residenceAddress = {this.residenceAddress}
                embg = {this.embg}
                phoneNumber = {this.phoneNumber}
                officeId = {this.officeId}
                officeAddress = {this.officeAddress}
                officeCity = {this.officeCity}
                departmentId = {this.departmentId}
                departmentName = {this.departmentName}
              />
            ) : null}
          </Modal>

        </Container>
      </div>
    );
  }
}

export default Employees;
