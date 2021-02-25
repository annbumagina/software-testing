import React, {FormEvent} from 'react';
import {empty} from '../src/components/loggin/Loggin';
import {checkCredentials} from "../src/components/loggin/Register";

describe('empty form', () => {
    it('empty', () => {
        expect(empty("", "butterfly")).toBeTruthy();
        expect(empty("star", "")).toBeTruthy();
        expect(empty("", "")).toBeTruthy();
    });

    it('not empty', () => {
        expect(empty("star", "butterfly")).toBeFalsy();
    });
});

describe('valid credentials', () => {
    it('valid', () => {
        expect(checkCredentials("Ann", "Bumagina", "abc", "123456789")).toEqual("Ok")
    });

    it('empty', () => {
        expect(checkCredentials("", "Bumagina", "abc", "123456789")).not.toEqual("Ok");
        expect(checkCredentials("", "", "abc", "123456789")).not.toEqual("Ok");
        expect(checkCredentials("Ann", "Bumagina", "", "123456789")).not.toEqual("Ok");
        expect(checkCredentials("Ann", "Bumagina", "abc", "")).not.toEqual("Ok");
    });

    it('bad characters', () => {
        expect(checkCredentials("Ann1", "Bumagina", "abc", "123456789")).not.toEqual("Ok");
        expect(checkCredentials("Ann", "Bumagina2", "abc", "123456789")).not.toEqual("Ok");
        expect(checkCredentials("Ann", "Bumagina", "a+bc", "123456789")).not.toEqual("Ok");
    });

    it('short password', () => {
        expect(checkCredentials("Ann", "Bumagina", "abc", "1234")).not.toEqual("Ok");
    });
});