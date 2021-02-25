import React from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';

function Nav() {
    const navStyle = {
        color: 'green',
        textDecoration: 'none',
        fontSize: 24
    };

    return (
        <nav>
            <ul className='nav-links'>
                <Link to="/" style={navStyle}>
                    <li>Home</li>
                </Link>
                <Link to="/color" style={navStyle}>
                    <li>Color</li>
                </Link>
                <Link to="/text" style={navStyle}>
                    <li>Text</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
