import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import Moment from "react-moment";
import AppNav from "./AppNav";
import { Container, Button } from "reactstrap";
import "../style/Employee.css";
import Modal from "react-awesome-modal";
import AddEmployee from './Popups/AddEmployee'

class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
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
    city,
    address,
    department
  ) {}

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
              color="warning"
              onClick={() =>
                this.detailsEmployee(
                  employee.id,
                  employee.name,
                  employee.surname,
                  employee.dateOfEmployment,
                  employee.residenceAddress,
                  employee.embg,
                  employee.phoneNumber,
                  employee.office.city,
                  employee.office.name,
                  employee.department.name
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
            height="820"
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
        </Container>
      </div>
    );
  }
}

export default Employees;
