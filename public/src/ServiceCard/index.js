import React from "react";
import './index.css';

export default function ServiceCard(props) {
    const {title, content, subcontent} = props
    const newContent = content.split('\\n').map(str => <div><span>{str}</span><br></br></div>);
    console.log(newContent)
    
    return (
    <div className="ServiceCard_container" style={props.style}>
        <h5>{title}</h5>
        <span className="separator"></span>
        <div className="top">
            {newContent}
        </div>
        <div className="bottom">
            <span>{subcontent}</span>
        </div>
        
    </div>
    );
}