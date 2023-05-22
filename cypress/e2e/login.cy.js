describe('Login', () => {
    it('should successfully log in a user and user can access all events page', () => {
        cy.visit('http://localhost:3000/');
        cy.contains("Let's get started").should('be.visible').click();

        cy.origin('https://auth.projects.multimediatechnology.at', () => {
            cy.get('input[name="username"]').type(Cypress.env('username'));
            cy.get('input[name="password"]').type(Cypress.env('password'));
            cy.contains('Log In').click();
        });

        cy.contains('Show all events').click();
        cy.contains('Find an event to join').should('be.visible');
    });
});
