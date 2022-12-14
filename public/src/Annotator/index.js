import React, {useState} from "react";
import './index.css';
import chair from "../imgs/0a319b48_d1241b81-421b-4aa5-a7bc-6ccb11e0fb48_multiple.jpg"
import Canvas from "../Canvas";

export default function Annotator() {
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
      };
    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
        console.log(key)
        if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }
        
        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setInput(poppedTag);
        }
        
        setIsKeyReleased(false);
    };
      
    const onKeyUp = () => {
        setIsKeyReleased(true);
    }
    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }
    return (
    <div className="annotator">
        <div className="Annotator">
            <div className="Annotator_img">
                <img id="test_img" src={chair} style={{display:'none'}}/>
                <Canvas />
            </div>
            <div className="Annotator_menu">
                {tags.map((tag, index) => (
                    <div className="tag">
                        {tag}
                        <button onClick={() => deleteTag(index)}>x</button>
                    </div>
                ))}
                <input
                    value={input}
                    placeholder="Enter a tag"
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                />

            </div>

       </div>
    </div>
    );
}