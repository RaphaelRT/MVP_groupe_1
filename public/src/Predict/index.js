import React, { useState, useRef } from "react";
import './index.css';
import Annotator from "../Annotator";
import VideoStream from "../VideoStream";

export default function Predict(props) {
    props.funcNav(false)
    
    return (
    <div className="predict_container">
        <h1>Droid prediction</h1>
        <div className="input_video_container">
            <h4>Webcam :</h4>
            <div>
                <VideoStream />
            </div>
        </div>
       
    </div>
    );
}