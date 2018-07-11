import React,{Component} from 'react';

export default class SlidersItem extends Component{
    render(){
        let style={
            width:100+'%',
            left:this.props.index*-100+'%',
            transitionDuration:this.props.speed+'s'
        };
        return (
            <ul className="sliders" style={style}>
                {
                    this.props.images.map((item,index)=>(
                        <li
                            className="slider"
                            key={index}
                        >
                            <img src={item} alt=""/>
                        </li>
                    ))
                }
            </ul>
        )
    }
}