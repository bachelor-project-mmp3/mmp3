describe('Edit profile and cancel', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.contains("Let's get started").should('be.visible').click();

        cy.origin('https://auth.projects.multimediatechnology.at', () => {
            cy.get('input[name="username"]').type(Cypress.env('username'));
            cy.get('input[name="password"]').type(Cypress.env('password'));
            cy.contains('Log In').click();
        });
        cy.visit(`http://localhost:3000/profile/${Cypress.env('id')}`);
    });
    it('should try to edit the profile, but cancels', () => {
        cy.contains(`${Cypress.env('firstname')}'s hosted events`).should(
            'be.visible'
        );
        cy.contains('Edit profile').click();
        cy.get('input[name="firstName"]').type('Max');
        cy.get('input[name="lastName"]').type('Mustermann');
        cy.contains('Cancel').click();

        cy.contains(`${Cypress.env('firstname')}`).should('be.visible');
    });
});
