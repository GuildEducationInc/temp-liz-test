describe('A11y testing', () => {
  beforeEach(() => {
    cy.ssoWithSession();
  });

  it('will visit the main page and test for a11y issues', () => {
    cy.interceptAndVisit('/');
    cy.injectAxe();
    cy.a11yAudit('a11y-main-page');
  });

  it('will visit the example page and test for a11y issues', () => {
    cy.interceptAndVisit('/example');
    cy.injectAxe();
    cy.a11yAudit('a11y-example-page');
  });

  it('will visit the 404 page and test for a11y issues', () => {
    cy.interceptAndVisit('/nope');
    cy.injectAxe();
    cy.a11yAudit('a11y-404-page');
  });
});
