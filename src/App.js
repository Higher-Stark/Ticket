import React, {Component} from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Welcome from './Welcome'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                <Route exact path='/' component={Welcome}/>
                <Route path='/homepage' component={ResponsiveDrawer}/>
                </div>
            </Router>
        );
    }
}

export default App;
