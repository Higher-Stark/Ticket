import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Root extends Component {
    render() {
        return (
            <div>
                <h1>Ticket</h1>
            </div>
        )
    }
}

ReactDom.render(<Root/>, document.getElementById("root"));