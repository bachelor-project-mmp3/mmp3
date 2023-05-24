describe('Events Feed and Event Detail navigation', () => {
    it('should click the first event in events feed and open event detail when user is logged in', () => {
        cy.visit('http://localhost:3000/');
        cy.contains("Let's get started").should('be.visible').click();

        cy.origin('https://auth.projects.multimediatechnology.at', () => {
            cy.get('input[name="username"]').type(Cypress.env('username'));
            cy.get('input[name="password"]').type(Cypress.env('password'));
            cy.contains('Log In').click();
        });
        cy.contains('Show all events').click();

        // Find all elements with class starting with "ExtendedEventPreview"
        cy.get('[class^="ExtendedEventPreview"]').first().click();

        cy.contains('Menu').should('be.visible');

        cy.get('body')
            .invoke('text') // Retrieve the text content of the entire page
            .then((text) => {
                const wildcardRegex = /Costs:*/; // wildcard pattern
                expect(text).to.match(wildcardRegex); // Assert that the text matches the wildcard pattern
            });

        cy.get('body')
            .invoke('text')
            .then((text) => {
                const wildcardRegex = /:*left to apply/;
                expect(text).to.match(wildcardRegex);
            });
    });
    it('should redirect to home if user is not logged in', () => {
        cy.visit('http://localhost:3000/');

        cy.visit('http://localhost:3000/events');

        // Get the current path
        cy.location('pathname').should('eq', '/'); // Replace '/' with the expected root path

        cy.visit('http://localhost:3000/events/anyID');
        cy.location('pathname').should('eq', '/'); // Replace '/' with the expected root path
    });
});
