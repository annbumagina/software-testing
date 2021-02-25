import React from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';

function LoginNav() {
    const navStyle = {
        color: 'green',
        textDecoration: 'none',
        fontSize: 24
    };

    return (
        <nav>
            <ul className='nav-links'>
                <Link to="/" style={navStyle}>
                    <li>Log in</li>
                </Link>
                <Link to="/register" style={navStyle}>
                    <li>Register</li>
                </Link>
            </ul>
        </nav>
    );
}

export default LoginNav;
