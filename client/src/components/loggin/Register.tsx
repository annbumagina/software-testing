import React, {FormEvent, useState} from 'react';
import '../../App.css';

interface RegisterProps {
    setLogin: (login: string) => void
}

export const getFirstName = (form: FormEvent<HTMLFormElement>) => {
    return ((form.target as HTMLFormElement).elements[1] as HTMLFormElement).value;
};

export const getLastName = (form: FormEvent<HTMLFormElement>) => {
    return ((form.target as HTMLFormElement).elements[0] as HTMLFormElement).value;
};

export const getPassword = (form: FormEvent<HTMLFormElement>) => {
    return ((form.target as HTMLFormElement).elements[3] as HTMLFormElement).value;
};

export const getLogin = (form: FormEvent<HTMLFormElement>) => {
    return ((form.target as HTMLFormElement).elements[2] as HTMLFormElement).value;
};

export const checkCredentials = (first: string, last: string, login: string, pass: string) => {
    if (first.length === 0 || last.length === 0 || login.length === 0 || pass.length === 0) {
        return "All fields must be filled in";
    }
    if (!(/^[a-z]+$/i.test(first) && /^[a-z]+$/i.test(last))) {
        return "First and last name should contain only letters";
    }
    if (!/^[a-z0-9_]+$/i.test(login)) {
        return "Login should contain only letters, numbers and underscore";
    }
    if (pass.length < 6) {
        return "Password too short";
    }
    return "Ok";
};

function Register(Props: RegisterProps) {
    const [answer, setAnswer] = useState("");
    const registerUser = (form: FormEvent<HTMLFormElement>) => {
        form.preventDefault();
        const first = getFirstName(form);
        const last = getLastName(form);
        const login = getLogin(form);
        const pass = getPassword(form);
        const check = checkCredentials(first, last, login, pass);
        if (check !== "Ok") {
            setAnswer(check);
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({login: login, password: pass})
        };
        fetch('http://localhost:5000/users/register', requestOptions)
            .then(res => res.text())
            .then(res => {
                setAnswer(res);
            })
            .catch(e => {
                console.log(e);
                setAnswer("Api error");
            })
    };

    return (
        <div className="form">
            <form onSubmit={registerUser}>
                <label htmlFor="fname" className="formText">First Name:</label><br/>
                <input className="formText" type="text" id="first" name="first" /><br/>
                <label htmlFor="fname" className="formText">Last Name:</label><br/>
                <input className="formText" type="text" id="last" name="last" /><br/>
                <label htmlFor="fname" className="formText">Login:</label><br/>
                <input className="formText" type="text" id="login" name="login" /><br/>
                <label htmlFor="fname" className="formText">Password:</label><br/>
                <input className="formText" type="text" id="pass" name="pass" /><br/>
                <input className="submitButton" type="submit" value="Log in" />
            </form>
            <div className="error">
                {answer}
            </div>
        </div>
    );
}

export default Register;
