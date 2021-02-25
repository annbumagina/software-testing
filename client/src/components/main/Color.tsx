import React, {useEffect, useState} from 'react';
import '../../App.css';

function Color() {
    const [color, setColor] = useState("white");
    const generateColor = () => {
        fetch('http://localhost:5000/color/generate')
            .then(res => res.text())
            .then(res => setColor(res));
    };

    const getColor = () => {
        fetch('http://localhost:5000/color/get')
            .then(res => res.text())
            .then(res => setColor(res));
    };

    useEffect(() => {
        getColor();
    }, []);

    return (
        <div className="color" style={{backgroundColor: color}}>
            <button className="colorButton" onClick={generateColor}><h1>change color</h1></button>
        </div>
    );
}

export default Color;
