import React, { Component } from 'react';
import AppNav from './AppNav'

class Property extends Component {

    state = {  
        isLoading : true,
        Properties : []
    }
 
    async componentDidMount(){
        
        const response=await fetch('/api/properties');
        const body = await response.json();
        this.setState({Properties : body , isLoading: false});
    }

    render() { 
        const {Properties , isLoading} = this.state;
        if(isLoading) 
            return (<div>Loading...</div>);
        
        return ( 
                <div>
                    <AppNav/>
                    <h2>Properties</h2>
                    {
                        Properties.map( property => 
                            <div id={property.id}>
                                {property.name}
                            </div>
                        )

                    }

                </div>
         );
    }
}
 
export default Property;