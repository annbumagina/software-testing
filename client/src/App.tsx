import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Nav from "./components/main/Nav";
import Home from "./components/main/Home";
import Color from "./components/main/Color";
import Textt from "./components/main/Textt";
import LoginNav from "./components/loggin/LoginNav";
import Loggin from "./components/loggin/Loggin";
import Register from "./components/loggin/Register";

function App() {
  const [login, setLogin] = useState("");

  const setLoginFunc = (login: string) => {
      setLogin(login);
  };

  if(login.length === 0) {
    return (
        <div className="App">
          <BrowserRouter>
            <LoginNav />
            <Switch>
              <Route path="/register" component={() => <Register setLogin={setLoginFunc}/>}/>
              <Route path="/" component={() => <Loggin setLogin={setLoginFunc}/>}/>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }

  return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path="/color" component={Color}/>
            <Route path="/text" component={Textt}/>
            <Route path="/" exact component={Home}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
