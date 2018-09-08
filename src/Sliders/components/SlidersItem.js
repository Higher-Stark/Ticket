import React,{Component} from 'react';

export default class SlidersItem extends Component{
    render(){

        return (
            <ul className="sliders" style={this.props.style}>
                <li
                    className="slider"
                    key={-1}
                >
                    <img src={this.props.images[this.props.images.length-1].image} alt=""/>
                </li>
                {
                    this.props.images.map((item,index)=>(
                        <li
                            className="slider"
                            key={index}
                        >
                            <img src={item.image} alt=""/>
                        </li>
                    ))
                }
                <li
                    className="slider"
                    key={this.props.images.length}
                >
                    <img src={this.props.images[0].image} alt=""/>
                </li>
                <li
                    className="slider"
                    key={this.props.images.length+1}
                >
                    <img src={this.props.images[1].image} alt=""/>
                </li>
                <li
                    className="slider"
                    key={this.props.images.length+2}
                >
                    <img src={this.props.images[2].image} alt=""/>
                </li>
            </ul>
        )
    }
}