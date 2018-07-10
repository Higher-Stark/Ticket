import React, {Component} from 'react';
import '../css/Sliders.css';
import SlidersItem from './SlidersItem';
import SlidersArrows from './SlidersArrows';
import SlidersDots from './SlidersDots';


export default class Sliders extends Component {
    constructor() {
        super();
        this.state = {index: 0}
    }

    componentDidMount() {
        if (this.props.autoPlay) {
            this.go();
        }
    }

    go = () => {
        this.timer = setInterval(() => {
            this.turn(1)
        }, this.props.delay * 1000)
    };
    turn = (step) => {
        let index = this.state.index + step;
        if (index >= this.props.images.length) {
            index = 0;
        }
        if (index < 0) {
            index = this.props.images.length - 1;
        }
        this.setState({index: index})
    };

    render() {
        return (
                <div
                    className="wrapper"
                    onMouseOver={() => clearInterval(this.timer)}
                    onMouseOut={this.go}
                >
                    <SlidersItem
                        images={this.props.images}
                        speed={this.props.speed}
                        index={this.state.index}
                    />
                    <SlidersArrows
                        turn={this.turn}
                    />
                    <SlidersDots
                        images={this.props.images}
                        turn={this.turn}
                        index={this.state.index}
                    />
                </div>
        )
    }
};