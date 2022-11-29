import React from "react";
import './index.css';

export default function ExpertiseCard(props) {
    const {title, content, img} = props
    
    return (
    <div className="ExpertiseCard_container" style={props.style}>
        <img src={img}></img>
        <div>
            <h5>{title}</h5>
            <span>{content}</span>
        </div>
        
    </div>
    );
}