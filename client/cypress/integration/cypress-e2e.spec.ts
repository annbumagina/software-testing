const URL = "http://localhost:3000";

describe("registering", () => {
    it("register bad", () => {
        cy.visit(URL + '/register');
        cy.get("#first").type('Chelovechek');
        cy.get("#last").type('bebebebe');
        cy.get('#login').type('jake');
        cy.get('#pass').type('dog');
        cy.get('.submitButton').click();
        cy.contains('Password too short');
    });

    it('register good', () => {
        const login = Math.random().toString(20).substr(2, 10);
        const pass = Math.random().toString(20).substr(2, 10);

        cy.visit(URL + '/register');
        cy.get("#first").type('Ann');
        cy.get("#last").type('Bumagina');
        cy.get('#login').type(login);
        cy.get('#pass').type(pass);
        cy.get('.submitButton').click();
        cy.wait(200);
        cy.contains('Successfully registered, you can log in now');
    });
});

describe('logging', () => {
    const login = Math.random().toString(20).substr(2, 10);
    const pass = Math.random().toString(20).substr(2, 10);

    before(() => {
        cy.visit(URL + '/register');
        cy.get("#first").type('Ann');
        cy.get("#last").type('Bumagina');
        cy.get('#login').type(login);
        cy.get('#pass').type(pass);
        cy.get('.submitButton').click();
        cy.wait(200);
    });

    it('log in bad', () => {
        cy.visit(URL);
        cy.get('#login').type('ice');
        cy.get('#pass').type('king');
        cy.get('.submitButton').click();
        cy.wait(200);
        cy.contains('User with this login does not exist');
    });

    it('log in good', () => {
        cy.visit(URL);
        cy.get('#login').type(login);
        cy.get('#pass').type(pass);
        cy.get('.submitButton').click();
        cy.wait(200);
        cy.get('.text').should('be.visible');
    });
});

describe('text', () => {
    const login = Math.random().toString(20).substr(2, 10);
    const pass = Math.random().toString(20).substr(2, 10);

    before(() => {
        cy.visit(URL + '/register');
        cy.get("#first").type('Ann');
        cy.get("#last").type('Bumagina');
        cy.get('#login').type(login);
        cy.get('#pass').type(pass);
        cy.get('.submitButton').click();
        cy.wait(200);
    });

    beforeEach(() => {
        cy.visit(URL + "/text");
        cy.get('#login').type(login);
        cy.get('#pass').type(pass);
        cy.get('.submitButton').click();
        cy.wait(200);
    });

    it('text generation', () => {
        cy.get('#word').type('finn');
        cy.get('#submitWord').click();
        cy.wait(200);
        cy.get('#genText').click();
        cy.wait(200);
        cy.contains('finn finn')
    });
});
