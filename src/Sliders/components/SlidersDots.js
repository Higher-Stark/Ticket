import React,{Component} from 'react';
export default class SlidersDots extends Component{
    render(){
        return (
            <div
                className="dots"
            >
                {
                    this.props.images.map((item,index)=>(
                        <span
                            key={index}
                            className={"dot "+(index===this.props.index?'active':'')}
                            onClick={()=>this.props.turn(index-this.props.index)}
                        >
                        </span>
                    ))
                }
            </div>
        )
    }
}