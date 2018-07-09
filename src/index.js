import React, {Component} from 'react';
import ReactDom from 'react-dom';
import App from './App';

class Root extends Component {
    render() {
        return (
            <App/>
        )
    }
}

ReactDom.render(<Root/>, document.getElementById("root"));