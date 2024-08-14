describe('End to end testing', () => {
  beforeEach(() => {
    cy.ssoWithSession();
  });

  it('successfully loads the home page', () => {
    cy.interceptAndVisit('/');
    cy.get('h1').should('have.text', 'Welcome');
    cy.get('p').should('have.text', 'Welcome to the EP Portal remote starter template.');
  });

  it('successfully loads the example page', () => {
    cy.interceptAndVisit('/');
    cy.get('a').contains('View example nested route.').click();
    cy.wait(1000);
    cy.get('h1').should('have.text', 'Example Page');
    cy.get('p').should('have.text', 'This is an example nested route.');
  });
});
