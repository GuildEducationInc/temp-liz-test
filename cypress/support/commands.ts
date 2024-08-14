import { loginSSO, forceLogout, ssoWithSession } from './authCommands';

Cypress.Commands.add('loginSSO', loginSSO);
Cypress.Commands.add('ssoWithSession', ssoWithSession);
Cypress.Commands.add('forceLogout', forceLogout);

// This command removes the evil cookie banner from the DOM entirely (it has several errors associated with it #NotOurProblem)
Cypress.Commands.add('removeCookieBanner', () => {
  cy.window().then(window => {
    window.document.querySelector('#onetrust-consent-sdk')?.remove();
  });
});

// This command abstracts common operations prior to running individual tests
Cypress.Commands.add('interceptAndVisit', path => {
  // @todo Data fetching and waiting needs to be re-added once the app fetches data
  // cy.intercept({
  //   method: 'POST',
  //   url: '/graphql',
  // }).as('pageData');

  cy.visit(path);
  // ensure cookie banner is visible prior to removal
  cy.wait(1000);
  // remove cookie banner prior to running any tests
  cy.removeCookieBanner();
  // cy.wait('@pageData').then(interception => {
  //   assert.isNotNull(interception.response?.body, 'Page response successful');

  // don't perform any operations until the content is rendered
  cy.waitUntil(() => cy.get('h1').should('be.visible'));

  // });
});
