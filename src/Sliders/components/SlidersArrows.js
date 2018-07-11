import React, {Component} from 'react';

export default class SlidersArrows extends Component {
    render() {
        return (
            <div
                className="arrows"
            >
                <span
                    className="arrow arrow-left"
                    onClick={() => this.props.turn(-1)}
                >
                    <img src={this.props.images[(this.props.index-1+this.props.images.length)%this.props.images.length]} alt=""/>
                </span>
                <span
                    className="arrow arrow-right"
                    onClick={() => this.props.turn(1)}
                >
                    <img src={this.props.images[(this.props.index+1)%this.props.images.length]} alt=""/>
                </span>
            </div>
        )
    }
}