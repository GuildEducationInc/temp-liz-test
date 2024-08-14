interface SSOparameters {
  username?: string;
  password?: string;
  wait?: number;
}

interface SSOWithSessionParameters {
  username?: string;
  password?: string;
}

declare namespace Cypress {
  interface Chainable {
    loginSSO(parameters?: SSOparameters): void;
    ssoWithSession(parameters?: SSOWithSessionParameters): void;
    forceLogout(): void;
    interceptAndVisit(path: string): void;
    waitUntil(fn: () => void): void;
    removeCookieBanner(): void;
  }
}
