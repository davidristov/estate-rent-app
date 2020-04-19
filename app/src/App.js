import React, { Component } from 'react';
import {Route,BrowserRouter as Router, Switch} from 'react-router-dom'
import Home from './components/Home';
import Records from './components/Record'

class App extends Component {
    state = {  }
    render() { 
        return ( 

            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/records' exact={true} component={Records}/>
                </Switch>
            </Router>

         );
    }
}
 
export default App;