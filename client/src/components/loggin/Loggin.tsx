import React, {FormEvent, useState} from 'react';
import '../../App.css';

interface LogginProps {
    setLogin: (login: string) => void
}

export const getPassword = (form: FormEvent<HTMLFormElement>) => {
    return ((form.target as HTMLFormElement).elements[1] as HTMLFormElement).value;
};

export const getLogin = (form: FormEvent<HTMLFormElement>) => {
    return ((form.target as HTMLFormElement).elements[0] as HTMLFormElement).value;
};

export const empty = (login: string, pass: string) => {
    return login.length === 0 || pass.length === 0;
};

const Loggin = (Props: LogginProps) => {
    const [answer, setAnswer] = useState("");
    const checkCredentials = (form: FormEvent<HTMLFormElement>) => {
        form.preventDefault();
        const login = getLogin(form);
        const pass = getPassword(form);
        if (empty(login, pass)) {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({login: login, password: pass})
        };
        fetch('http://localhost:5000/users/login', requestOptions)
            .then(res => res.text())
            .then(res => {
                setAnswer(res);
                if (res === "Ok") {
                    Props.setLogin(getLogin(form));
                }
            })
            .catch(e => {
                console.log(e);
                setAnswer("Api error");
            })
    };

    return (
        <div className="form">
            <form onSubmit={checkCredentials}>
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
};

export default Loggin;
