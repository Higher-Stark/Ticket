import React,{Component} from 'react';
export default class SlidersArrows extends Component{
    render(){
        return (
            <div
                className="arrows"
            >
                <span
                    className="arrow arrow-left"
                    onClick={()=>this.props.turn(-1)}
                >
                    &lt;
                </span>
                <span
                    className="arrow arrow-right"
                    onClick={()=>this.props.turn(1)}
                >
                    &gt;
                </span>
            </div>
        )
    }
}