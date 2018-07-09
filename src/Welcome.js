import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Welcome extends Component {
    render() {
        return (
            <Link to='/homepage'>
                <div id="background">
                    <div className="bg"/>
                    <div className="bg bg2"/>
                    <div className="bg bg3"/>
                    <div className="content">
                        <h1 className="animated rotateIn">Ticket Website</h1>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Welcome;