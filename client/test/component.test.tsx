import React from 'react';
import Register from "../src/components/loggin/Register";
import Loggin from "../src/components/loggin/Loggin";
import LoginNav from "../src/components/loggin/LoginNav";

const TestRenderer = require('react-test-renderer');

describe('renders logging pages', () => {
    it('register', () => {
        const testRenderer = TestRenderer.create(<Register setLogin={(_) => {} } />);
        const testInstance = testRenderer.root;
        expect(testInstance.findByProps({className: "error"}).children[0]).toEqual("");
        expect(testInstance.findByType('form').children[0].children[0]).toEqual("First Name:");
    });

    it('login', () => {
        const testRenderer = TestRenderer.create(<Loggin setLogin={(_) => {} } />);
        const testInstance = testRenderer.root;
        expect(testInstance.findByProps({className: "error"}).children[0]).toEqual("");
        expect(testInstance.findByType('form').children[0].children[0]).toEqual("Login:");
    });
});