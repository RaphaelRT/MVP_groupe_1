import React from "react";
import './index.css';

export default function TeamCard(props) {
    const {name, jobTitle, img} = props
    return (
    <div className="TeamCard_container" style={props.style}>
        <div className="team_img" style={{backgroundImage: `url(${img})`}} ></div>
        <span>{name}</span>
        <span>{jobTitle}</span>
    </div>
    );
}