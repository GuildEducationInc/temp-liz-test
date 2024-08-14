const authDomain = Cypress.env('auth_domain') || 'auth.guildacceptance.com';
const authUsername = Cypress.env('auth_username');
const authPassword = Cypress.env('auth_password');
const appRoot = Cypress.env('REACT_APP_REPO_NAME');

export const ssoWithSession = ({
  username = authUsername,
  password = authPassword,
}: SSOWithSessionParameters = {}) => {
  cy.session(
    [username, password],
    () => {
      cy.loginSSO({ username, password });
    },
    {
      validate() {
        cy.visit('/');
        cy.get(`#${appRoot}-root`).should('exist');
        cy.get('h1').should('exist');
      },
      cacheAcrossSpecs: true,
    }
  );
};

export const loginSSO = ({
  username = authUsername,
  password = authPassword,
  wait = 1500,
}: SSOparameters = {}) => {
  // login redirect
  cy.visit('/');
  cy.wait(wait);
  cy.location().then(args => {
    if (args.hostname === 'auth.guildacceptance.com') {
      cy.log('Logging user in');

      // select 'test-idp' employer (SSO login only)
      cy.get('[data-testid="autocomplete-input-test"]')
        .get('input[type=text]')
        .type('test-idp', { force: true, delay: 600 })
        .type('{enter}');
      cy.get('button[data-testid="select-employer-button"]').click();
      cy.get('button').first().click();
      cy.get('body').then($body => {
        if ($body.find('#username').length) {
          cy.log('Filling in user credentials');

          // log in with SSO (make sure the credentials are test-idp specific)
          cy.get('#username').type(username);
          cy.get('#password').type(password).type('{enter}');
        }

        // user is automatically redirected back to the initial route
        cy.url().should('not.contain', authDomain);
      });

      // give redirect handlers a chance to render the correct route
      cy.wait(wait);
    }
  });
};

export const forceLogout = () => {
  // cy.origin is only available with cypress v9.6.0 and higher
  cy.origin(authDomain, () => {
    cy.visit('https://auth.guildacceptance.com/v2/logout');
  });
};
