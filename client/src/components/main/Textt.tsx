import React, {FormEvent, useEffect, useState} from 'react';
import '../../App.css';

export const getWord = (word: FormEvent<HTMLFormElement>) => {
    return ((word.target as HTMLFormElement).elements[0] as HTMLFormElement).value;
};

function Textt() {
    const [text, setText] = useState("");
    const generateText = () => {
        fetch('http://localhost:5000/text/generate')
            .then(res => res.text())
            .then(res => setText(res));
    };

    const addWord = (word: FormEvent<HTMLFormElement>) => {
        word.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({word: getWord(word)})
        };
        fetch('http://localhost:5000/text/add', requestOptions)
            .then(res => console.log(res));
    };

    const getText = () => {
        fetch('http://localhost:5000/text/get')
            .then(res => res.text())
            .then(res => setText(res));
    };

    useEffect(() => {
        getText();
    }, []);

    return (
        <div className="color">
            <div className="form">
                <form onSubmit={addWord}>
                    <input className="formText" type="text" id="word" name="word" />
                    <input className="formText" id="submitWord" type="submit" value="Add word" />
                </form>
                <button className="formText" id="genText" onClick={generateText}>Generate text</button>
            </div>
            <div className="text">{text}</div>
        </div>
    );
}

export default Textt;
