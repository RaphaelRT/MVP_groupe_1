import React, { useState } from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './index.css';
import Chevron from "../imgs/chevron-down.svg"


export default function ContactForm(props) {
    const title = "Un projet ?"
    const subtitle = "Laisser un message"
    const items = [
        {
            name : "Laisser un message",
            value: 1
        },
        {
            name : "Planifier un appel",
            value: 2
        },
        {
            name : "Planifier une visio",
            value: 3
        },

    ]
    const [selectedMode, SetSelectedMode] = useState(1)
    const [isDrpOpn, SetIsDrpOpn] = useState(false)

    return (
    <div className="ContactForm_container" style={props.style}>
        <h5>{title}</h5>
        
        <div className="dd-wrapper">
            <div className="dd-header">
                <button className="dd-header-title" onClick={()=>{SetIsDrpOpn(!isDrpOpn)}}><span>{items.filter(obj => {return obj.value === selectedMode})[0].name}</span><img className={isDrpOpn ? "rotated" : ""} src={Chevron}></img></button>
            </div>
            <div className="dd-list" style={{display: isDrpOpn ? "flex" : "none"}}>
                {
                items.map((item) => {
                    if(selectedMode !== item.value) {
                        return (
                            <button
                                className="dd-list-item"
                                onClick={()=>{
                                    SetSelectedMode(item.value)
                                    SetIsDrpOpn(false)
                                    }
                                }>{item.name}</button>
                        )
                    }
                })
            }
            </div>
        </div>
        <form className="form_">
            <div class="required form_input_div">
                <label>Nom :</label>
                <input className="form_input" type="text" placeholder="Doe"/>
            </div>
            <div class="required form_input_div">
                <label>Prénom :</label>
                <input className="form_input" type="text" placeholder="John"/>
            </div>
            <div className="form_input_div">
                <label>Société :</label>
                <input className="form_input" type="text" placeholder="John industries"/>
            </div>
            <div class="required form_input_div">
                <label>Adresse email :</label>
                <input className="form_input" type="text" placeholder="john@gmail.com"/>
            </div>
            <div className="form_input_div">
                <label>Téléphone :</label>
                <input className="form_input" type="text" placeholder="0XXXXXXXXX"/>
            </div>
            {selectedMode === 1 ? (
                <div className="form_input_div">
                    <label>Message :</label>
                    <textarea type="text" />
                </div>

            ) : (
                <div>
                    <Calendar></Calendar>
                </div>
                
            )}
            

            <button className="send">
                Envoyer
            </button>
        </form>
    </div>
    );
}