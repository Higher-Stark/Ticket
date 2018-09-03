import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: null,
        };
    }

    render() {
        const {admin} = this.state;

        return (
            <div>
                <h2>Administrator</h2>
            </div>
        );
    }
}

export default App;
