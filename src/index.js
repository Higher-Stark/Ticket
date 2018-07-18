import React, {Component} from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {CookiesProvider} from 'react-cookie';

class Root extends Component {
    render() {
        return (
            <CookiesProvider>
                <App/>
            </CookiesProvider>
        )
    }
}

ReactDom.render(<Root/>, document.getElementById("root"));