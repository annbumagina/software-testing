import React, {useState, useEffect} from 'react';
import '../../App.css';
import logo from '../../panther.jpg'

function Home() {
    const [color, setColor] = useState("white");
    const getColor = () => {
        fetch('http://localhost:5000/color/get')
            .then(res => res.text())
            .then(res => setColor(res));
    };

    const [text, setText] = useState("");
    const getText = () => {
        fetch('http://localhost:5000/text/get')
            .then(res => res.text())
            .then(res => setText(res));
    };

    useEffect(() => {
       getColor();
       getText();
    }, []);

    return (
        <div className="color" style={{backgroundColor: color}}>
            <img src={logo} alt="logo"/>
            <div className="text">
                {text}
            </div>
        </div>
    );
}

export default Home;
