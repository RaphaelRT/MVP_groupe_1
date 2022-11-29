import React from "react";
import './index.css';
import chair from "../imgs/chair.png";

export default function Card(props) {
    return (
    <div className="card_container" style={props.style}>
        <div className="illustration" style={{backgroundImage: "url(" + chair + ")"}}>
        </div>
        <div className="card_content_container">
            <div className="content_l">
                <span>Images annotées</span>
                <h5>🪑 Chaise</h5>
            </div>
            <div className="content_r">
                <span>Dataset de 5000 <br></br>
                    images<br></br>
                </span>
            </div>
        </div>
    </div>
    );
}