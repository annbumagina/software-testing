const URL = "http://localhost:3000";

describe("registering", () => {
    it("register twice", () => {
        const login = Math.random().toString(20).substr(2, 10);
        const pass = Math.random().toString(20).substr(2, 10);

        cy.visit(URL + '/register');
        cy.get("#first").type('Ann');
        cy.get("#last").type('Bumagina');
        cy.get('#login').type(login);
        cy.get('#pass').type(pass);
        cy.get('.submitButton').click();
        cy.wait(300);
        cy.contains('Successfully registered, you can log in now');

        cy.visit(URL + '/register');
        cy.get("#first").type('Nna');
        cy.get("#last").type('Anigabum');
        cy.get('#login').type(login);
        cy.get('#pass').type(pass);
        cy.get('.submitButton').click();
        cy.wait(300);
        cy.screenshot()
    });
});
