import React, { Component } from 'react';
import AppNav from './AppNav'
import { Table,Input, Container,Button,Label, FormGroup, Form} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../App.css'
import Calendar from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment'

class Records extends Component {

    emptyItem = {
        id: 900,
        description : '' ,
        location : '',
        availableDate : new Date(),
        owner: '',
        phone: '',
        property : {id:1 , name:'Kukja'}
    }

constructor(props){
    super(props);

    this.state = {
        date: new Date(),
        isLoading: false,
        properties: [],
        records: [],
        item : this.emptyItem
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
}

async remove(id){
    await fetch(`/api/records/${id}` , {
      method: 'DELETE' ,
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }

    }).then(() => {
      let updatedRecords = [...this.state.records].filter(i => i.id !== id);
      this.setState({records : updatedRecords});
    });

}

handleDateChange(dateChanged){
    let item={...this.state.item};
    item.availableDate= dateChanged;
    this.setState({item});
    console.log(item);
  
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item={...this.state.item};
    item[name] = value;
    this.setState({item});
    console.log(item);
  }

async handleSubmit(event){
     
    const item = this.state.item;
  
    await fetch(`/api/records`, {
      method : 'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(item),
    });
    
    event.preventDefault();
    this.props.history.push("/records");

     console.log(this.state);

  }


async componentDidMount(){
    const response = await fetch('/api/properties');
    const body = await response.json();
    this.setState({properties : body, isLoading : false})

    const recordResponse = await fetch('/api/records');
    const bodyRecord = await recordResponse.json();
    this.setState({records : bodyRecord, isLoading : false})

}

    render() { 
        const title = <h3>Add estate</h3>
        const {properties} = this.state;
        const {records, isLoading} = this.state;

        if (isLoading)
            return (<div>Loading...</div>)

        let propertiesList =
        
            properties.map(property =>
                <option value={property.id} key={property.id}>
                    {property.name}
                </option>
                )
        
        let rows = records.map(record =>
            <tr key={record.id}>
                <td>{record.description}</td>
                <td>{record.location}</td>
                <td><Moment date={record.availableFromDate} format="DD/MM/YYYY"></Moment></td>
                <td>{record.property.name}</td>
                <td>{record.owner}</td>
                <td>{record.phoneNumber}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(record.id)}>Delete</Button></td>
            </tr>
            )        

        return ( 
            <div>
                <AppNav/>
                <Container>
                    {title}

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="text" name="description" id="description" onChange={this.handleChange} autoComplete="name"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="property">Property</Label>
                            <select onChange={this.handleChange}>
                                {propertiesList}
                            </select>      
                        </FormGroup>

                        <FormGroup>
                            <Label for="date">Available from</Label>
                            <Calendar selected={this.state.item.availableDate} onChange={this.handleDateChange}/>
                        </FormGroup>

                        {/* <div className="row"> */}
                        <FormGroup className="LocationInput">
                            <Label for="location">Location</Label>
                            <Input type="text" name="location" id="location" onChange={this.handleChange}/>
                        </FormGroup>
                        {/* </div> */}

                        <FormGroup>
                            <Label for="owner">Owner</Label>
                            <Input type="text" name="owner" id="owner" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="phone">Contact</Label>
                            <Input type="text" name="phone" id="phone" onChange={this.handleChange}/>
                        </FormGroup>

                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button tag={Link} to="/records">Cancel</Button>

                    </Form>
                </Container>
                {''}
                <Container>
                    <h3>Estate list</h3>
                    <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="30%">Description</th>
                            <th width="10%">Location</th>
                            <th width="20%">Available from</th>
                            <th width="10%">Property</th>
                            <th width="10%">Owner</th>
                            <th width="10%">Contact</th>
                            <th width="10%">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows}
                    </tbody>

                    </Table>
                </Container>
            </div>

        );
    }
}
 
export default Records;