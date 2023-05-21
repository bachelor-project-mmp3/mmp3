describe('LandingPage', () => {
    it('visit homepage and it renders "Let\'s get started" button', () => {
        cy.visit('http://localhost:3000/');
        cy.contains("Let's get started").should('be.visible');
    });
});
