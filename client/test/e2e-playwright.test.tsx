import React from 'react';
import {Browser, Page} from "playwright";

const playwright = require('playwright');
const URL = "http://localhost:3000";

describe('registering', () => {
    let browser: Browser;
    let page: Page;

    beforeEach(async () => {
        browser = await playwright["chromium"].launch();
        page = await browser.newPage();
    });

    afterEach(async () => {
        await browser.close();
    });

    it('register bad', async () => {
        await page.goto(URL + '/register');
        expect(page).not.toBeNull();
        await page.fill('#first', 'Kukareku');
        await page.fill('#last',  'pppppppp');
        await page.fill('#login', 'butterfly');
        await page.fill('#pass',  'star');
        await page.click('.submitButton');
        expect(await page.innerText('.error')).toEqual('Password too short')
    });

    it('register good', async () => {
        const login = Math.random().toString(20).substr(2, 10);
        const pass = Math.random().toString(20).substr(2, 10);

        await page.goto(URL + '/register');
        expect(page).not.toBeNull();
        await page.fill('#first', 'Ann');
        await page.fill('#last',  'Bumagina');
        await page.fill('#login', login);
        await page.fill('#pass',  pass);
        await page.click('.submitButton');
        await page.waitForTimeout(200);
        expect(await page.innerText('.error')).toEqual('Successfully registered, you can log in now');
    });
});

describe('logging', () => {
    let browser: Browser;
    let page: Page;
    const login = Math.random().toString(20).substr(2, 10);
    const pass = Math.random().toString(20).substr(2, 10);

    beforeAll(async () => {
        browser = await playwright["chromium"].launch();
        page = await browser.newPage();
        await page.goto(URL + '/register');
        expect(page).not.toBeNull();
        await page.fill('#first', 'Ann');
        await page.fill('#last',  'Bumagina');
        await page.fill('#login', login);
        await page.fill('#pass',  pass);
        await page.click('.submitButton');
        await page.waitForTimeout(200);
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    it('log in bad', async () => {
        await page.goto(URL);
        await page.fill('#login', 'marco');
        await page.fill('#pass',  'diaz');
        await page.click('.submitButton');
        await page.waitForTimeout(200);
        expect(await page.innerText('.error')).toEqual('User with this login does not exist');
    });

    it('log in good', async () => {
        await page.goto(URL);
        await page.fill('#login', login);
        await page.fill('#pass',  pass);
        await page.click('.submitButton');
        await page.waitForTimeout(200);
        expect((await page.$$('.text')).length).toEqual(1)
    });
});

describe('text', () => {
    let browser: Browser;
    let page: Page;
    const login = Math.random().toString(20).substr(2, 10);
    const pass = Math.random().toString(20).substr(2, 10);

    beforeAll(async () => {
        browser = await playwright["chromium"].launch();
        page = await browser.newPage();
        await page.goto(URL + '/register');
        expect(page).not.toBeNull();
        await page.fill('#first', 'Ann');
        await page.fill('#last',  'Bumagina');
        await page.fill('#login', login);
        await page.fill('#pass',  pass);
        await page.click('.submitButton');
        await page.waitForTimeout(200);
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(URL + '/text');
        await page.fill('#login', login);
        await page.fill('#pass',  pass);
        await page.click('.submitButton');
        await page.waitForTimeout(200);
    });

    afterAll(async () => {
        await browser.close();
    });

    it('text generation', async () => {
        expect((await page.$$('.text')).length).toEqual(1);
        await page.fill('#word', 'hekapoo');
        await page.click('#submitWord');
        await page.waitForTimeout(200);
        await page.click('#genText');
        await page.waitForTimeout(200);
        expect(await page.innerText('.text')).toContain('hekapoo hekapoo')
    });
});