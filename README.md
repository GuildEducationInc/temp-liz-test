# Employer Portal Micro Frontend (MFE) Remote Starter

> Starter project to get you going with an Employer Portal specific MFE remote application, which will be pulled into the [Employer Portal Host](https://github.com/GuildEducationInc/employer-portal-host).

[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

:warning: Prior to opening any PRs against our projects, we ask that you review our [Contribution and Collaboration Guildelines](https://guild-education.atlassian.net/wiki/spaces/EPSS/pages/2386067472/EP+Portal+Frontends+--+Collaboration+and+Contribution+Guide) in order to help the process move along more smoothly.

## Using This Template

It is recommended that you generate a new project from this template as a jumping off point for Employer Portal remote development.

In order to generate a new remote repository from this template, click the green "Use this template" button in the GitHub UI and follow the prompts. By default, this will only carry over the `main` branch. If you wish to bring over any feature branches as well, be sure to select the "Include all branches" checkbox prior to creating your new repository.

## Github Repository Settings

When the remote-template is forked for your new remote repository, there will be some settings in github that will need to be changed.

The following headings are the left hand menu options found in your new repositories’ settings (top menu). The following is based on how we currently have the employer portal remote setup.

### Collaborators and teams - Access for team members & snyk

To manage the access of your team and the rest of the company, add the following groups to your repo’s access with the following roles.

Click on add teams button and search for the following:

- developers
  - Role: write
- developers-elevated
  - Role: admin

Click on add people and search for the following:

- **GuildEnterpriseSnyk**
  - Role: **admin**

If you have trouble finding your team in Github, or need edits to the members of your team, reach out to Devops to assist. This will be important in the branch protection portion of setting up the repository. Make sure for now you keep yourself as an administrator so you can continue to adjust the permissions of your repository.

### Github Environments

Create two new Github environments if they don’t already exist.

#### production

- Select required reviewers and make sure your team is on the list.
- Add `main` branch to the allowed branches list.

#### staging

- Add `main` to the allowed branches list.
- Add `staging` to the allowed branches list as well, if applicable to your workflow.
  - This will enable your team to use either a trunk based deployment strategy (what is already built into the repo), or a dev → staging → main style of deployment strategy.

### Github Secrets

Found at: settings → security → secrets → actions

:information_source: **Note:** Make sure to add these as repository-wide secrets and not to a specific environment

#### Cypress Testing Secrets

Use the following names for the environment variables. To find the values head over to 1Pass and look up: "EP Portal Remote Template -- .env.local" in the "Engineering Tools - Dev" vault.
For more info on how Cypress is setup feel free to look at the [Cypress setup documentation](https://guild-education.atlassian.net/wiki/spaces/PROD/pages/1673101586/Cypress+test+user+creation+and+authentication).

`CYPRESS_AUTH_PASSWORD`

`CYPRESS_AUTH_USERNAME`

`CYPRESS_AUTH_CLIENT_ID`

`CYPRESS_AUTH_CLIENT_SECRET`

To disable retries for local dev, you can add `CYPRESS_RETRIES=0` in your `.env.local` file

#### Shortcut Token

This token will enable the automatic linking of pull requests to relevant shortcut cards. To get the value, jump into 1pass and look up "EP Portal -- Shortcut Token" in the "Engineering Tools - Dev" vault.

`SHORTCUT_TOKEN`

### Snyk Integration

[Follow Devops’s guide for setting up Snyk protection](https://guild-education.atlassian.net/wiki/spaces/DEVOPS/pages/1373339714/Snyk+-+Onboarding)

The simple steps, for more info check link above:

- Head over to Okta -> Snyk -> add project
- Select Github
- Locate repository & select it
- Add selected Repo (top right corner) and don't give custom file location (it'll look for package.json or yarn.lock etc.)
- Open your first PR and watch it run three checks!
  - license/snyk => is our instance still paid for and active?
  - code/snyk => is our first party code insecure?
  - security/snyk => are our NPM dependencies insecure?
- In the repository, open branch protection rules and select all 3 Snyk checks as prerequisites for merge.

## Requirements for Setup

This [onboarding guide](https://guild-education.atlassian.net/wiki/spaces/PROD/pages/1168213826/New+Engineer+Onboarding#Technology-Setup) is a great resource to ensure your machine is equipped to work in this project. Ensure that you have the following items installed/set-up before attempting to run this application locally:

- Yarn
- Node Version Manager (`nvm`)
- NPM
  - `export NPM_TOKEN=<your token>` in your shell profile (`.zshrc` or `.bash_profile`)

Once the prerequisites listed above are configured and functional, run `yarn setup` to:

- Install project dependencies.
- Generate TypeScript bindings and methods for Segment analytics. More information on Segment and `typewriter` can be found below.
- Set remote template as the upstream remote git repository.

## Environment Variables

Our environment variables are located in the `env` directory. There are 2 files in here: `.env.staging` and `.env.prod`.

- All of your staging vars should go in the `.env.staging` file
- All of your production env vars should go in the `.env.prod` file

If you need to create an environment variable, simply prefix it with `REACT_APP_` and it will automatically be injected into your build, e.g. `REACT_APP_FOO`, which will then be accessible via `process.env.REACT_APP_FOO` in the code.

:warning: **Note:** All env vars for frontend apps can be seen by end users so be careful what you expose in source control. Truly private variables for local development should be constrained to a git ignored `.env.local` file.

### Local Environment Setup

To get started in local dev, reference the `EP Portal Remote Template -- .env.local` secure note in 1Pass. This starter file lives in the `Engineering Tools - Dev` 1Pass vault, so you will require access to this vault if it is not provided by default.

- Create a new environment file in the `env/` directory named `.env.local`
- Copy the contents of the secure note from 1Pass into your new `env/.env.local` file
- This file should be git ignored and may also be used to store private values, such as Cypress test usernames + passwords, etc.

## Initial Setup Task List

Update the following items to reflect your team's area of ownership upon generating a new remote from this template.

1. Change the `name` field in your `package.json`.

```js
{
  "name": "@guildeducationinc/<your-remote-name>",
  ...otherProperties,
}
```

2. Change the `CODEOWNERS` file to point to your team in GitHub.

```md
* @GuildEducationInc/<your-github-team-name>
```

3. Change the `name` and `exposes` fields in the Webpack `ModuleFederationPlugin`, in `webpack.common.js`.

```js
new ModuleFederationPlugin({
  name: 'yourRemoteName',
  filename: 'remoteEntry.js',
  exposes: {
    './YourRemoteName': './src/bootstrap',
    './YourRemoteNameComponent': '.src/bootstrapAppComponent',
  },
  shared: { ...shared },
});
```

Depending on how you want to run your remote, you can either use the `bootstrap` to load a rendered component with a custom router and the `bootstrapAppComponent` to load the react app component sharing the router from the host. See [importRemote](https://www.npmjs.com/package/@module-federation/utilities) function for more details.

You can add more `exposes` mappings to the list if you'd like to export other shared components. Be sure to include a default function with the component returned inside as that is what will be rendered by the host.

4. Change frontend infrastructure values in GitHub workflows.

In `.github/workflows/deploy-app-to-aws.yml`:

```yml
env:
  OWNER: your-squad-name
  CONTACT: squad-your-squad-name
  REPO: ${{ github.repository }}
  SERVICE: ${{ github.event.repository.name }}
```

Of note, the DORA metrics job at the bottom of the `deploy-app-to-aws.yml` file also references hard-coded values for `OWNER` and `CONTACT`. These values will need to be updated along with the `env` outlined above.

5. Update environment variables as needed in your `env/.env.*` files. The two fields below are the ones that will definitely need to be updated to match your repository, however others may need to be changed to suit your project.

- REACT_APP_APP_NAME
- REACT_APP_REPO_NAME
  - **Note:** This variable is for local development only and only needs to be in the env.local

6. Add remote to host application. (see below)

## Add Remote to Host Application

Follow the instructions defined in the [Employer Portal Host](https://github.com/GuildEducationInc/employer-portal-host) to add this remote application.

Some things to consider:

- The Host application contains the foundational application elements including navigation header, footer, login, logout etc.
- When developing your remote locally, it is recommended that you are running it within the host application (also running locally) so that you have access to said foundational elements and functionalities

## Running Locally

:warning: As a prerequisite, first make sure to follow instrucions for setting up your remote with the host application above.

Then, follow the steps below. Of note, the default port of the host application is assumed to be `3000`.

1. Run `nvm use` to use the correct node version [node version manager](https://github.com/nvm-sh/nvm#installation-and-update).
2. Run `yarn start` to start the app. It will default to port `8080`, however it will automatically adjust the port number if there is another application running on that port already.
3. Verify that your local instance is ALIVE in a browser by accessing [http://localhost:8080](http://localhost:8080), or whichever port the server started with.
4. In a separate terminal window, run the host application locally by running `yarn start`.
5. Open the host application in your web browser by visiting [http://localhost:3000](http://localhost:3000).

:information_source: **Note:** Make sure to start the host after all local remotes have been started, or it will not find them. The host will default to staging versions of remotes if it is started before local remotes.

:information_source: **Note:** If you want to run the remote locally in an End-2-End fashion:

1. Run `yarn build:cypress` to build the app in an E2E fashion
2. Run `yarn start:ws` to run the app using local web server
3. Navigate to `localhost:8080` for authentication

## Branching

All feature work should be branched off of `main`. The preferred branch nomenclature format is `sc-<storyId>/<something-descriptive-here>`. Note that feature branches _must_ be tied to the appropriate ticket in Shortcut.

We have a GitHub Action that parses this branch name upon opening a Pull Request and will generate a comment in the corresponding Shortcut ticket with a link to the PR app URL. While this action will fail silently if the current branch name does not match this format, this will not block the pipeline.

### Contributing

It is preferred that your commits are tagged with the appropriate `sc-*` story ID number, as this will be helpful for InfoSec/auditing purposes. It is also requested that you first review the [Code Review Etiquette](https://docs.google.com/document/d/1oSgQ52TJgX8KImOyApYeByq4yER7nbW-53Vt2NzvE6I/edit#heading=h.t9gt0uiiuii4) documentation prior to contributing to the project.

A well-formed, succinct, and imperative commit message will look something like this:

```sh
[sc-12345] Add error logging to routes config
```

## Pull Requests

Once your work is ready for review, open a PR into `main`.

- A live PR review app will be deployed automatically and the link will be automatically added to the comments in the linked Shortcut ticket, per the GitHub Action referenced above.
- PR app URL format: `https://pr-<pr number>-<your repo name>.guildacceptance.com`

**Note:** By default, the remote will _not_ run in isolation at this URL directly. It will need to be viewed through the host deployment.

When your PR is merged, `main` will be deployed to the Staging (aka Acceptance) environment first. Once deployed there, the workflow will pause its progress, to allow for testing and [human approval](https://docs.github.com/en/actions/managing-workflow-runs/reviewing-deployments) of the changes. Once the changes are approved, the workflow will then continue on, deploying the code to the production environment at which point the expectation is that you check your work there before moving your ticket to `completed`.

Deployment environments:

- [Staging/Acceptance URL](https://employerportal.guildacceptance.com)
- [Production URL](https://employerportal.guildeducation.com)

## Code Formatting

This application adheres to the code formatting specified by a combination of `prettier` and other `eslint` rules for ts/js, and `stylelint` for css/scss.

- The base config for `eslint` can be found [here](https://github.com/GuildEducationInc/eslint-config-guild-typescript)
- The base config for `styleling` can be found [here](https://github.com/GuildEducationInc/stylelint-config-guild)

Both `eslint` and `stylelint` will run via `husky` pre-commit hooks on every commit. It is also recommended that you configure your local `vscode` settings to auto-format on save.

### Linting

- To lint the codebase, run `yarn lint`
- To format the codebase, run `yarn lint:fix`
  - Note that this will run all `prettier` + `eslint` formatting where applicable
  - To check for `prettier` errors only, run `yarn format:check`
  - To format the codebase via `prettier` only, run `yarn format`
- To lint ts/js only, run `yarn lint:script`
- To lint styles only, run `yarn lint:style`

## Build

- To build run yarn build
- To build with visual bundle analyzer report run yarn build:report
- `index.module.scss.d.ts` files will be generated for `FILE_NAME.module.scss` files when they are imported into a `.tsx` file

## Upstream Changes

When upstream changes happen a warning will appear after the successful compile message when starting a local development version of the remote. To pull in changes from the upstream branch simply create a new branch (following your team's git workflow) and pull in changes from the upstream remote

example steps:

- run `git checkout -b <your new branch's name>`
- run `git pull upstream main`
- resolve all merge conflicts
- push changes and make a PR request to add the changes in.

If any questions arise from the changes or this isn't clear, reach out to your team members or feel free to reach out to the employer portal squad on slack.

## Testing

### Unit Testing

- Run `yarn test` to run all tests.
- Run `yarn test:coverage` to run all tests with coverage.
- Run `yarn test:watch` to run all tests and watch for changes.
- Run `yarn test <ComponentName>` to run tests specific to a component or group of components.
- We use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and [Jest](https://jestjs.io/).
- Also available is [jest-dom/extend-expect](https://www.npmjs.com/package/@testing-library/jest-dom), which allows us to extend our Jest assertions.

### Cypress Testing

- If the server is already running, you can use `yarn cy:run`
- If the server is not running, you can use `yarn test:e2e`
- To open the cypress test runner, you can use `yarn cy:open` (you should run `yarn start` before this)

## Segment / Analytics

If Segment tracking is required for your project, then you will need to set the `REACT_APP_SEGMENT_KEY` environment variable for acceptance and production. This key is configured in your `.env.*` files by default.

:information_source: **Note:** If you do not set the `REACT_APP_SEGMENT_KEY` env var, the Segment script will not be injected into the page.

### Segment Type Checking with Typewriter

Our [Segment](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/) analytics track events utilize [typewriter](https://github.com/segmentio/typewriter). This library promotes type safe protocols and json schema checking for analytics events.

Notes on implementation:

- The `typewriter:dev` command will generate your local analytics code, which includes runtime validation of Segment events used during local development.
- When deploying to staging and production, the `typewriter:prod` command will be performed in the workflow, which disables runtime validation per Segment's recommendation and reduces overall bundle size.
- After installation, you should see an `index.ts` and `segment.ts` file appear under `src/analytics`. From there, you may import generated functions and types into components or utilities at your leisure.

:information_source: **Note:** In some cases, the data science team will implement new tracking events in Segment specifically tied to your project. If this applies to your team, be sure to re-run the `typewriter:dev` command so as to generate the updated Segment types and methods for development.

Further information on this implementation can be found [here](https://guild-education.atlassian.net/wiki/spaces/PROD/pages/976879780/Segment+Implementation).

## A/B Testing with Optimizely

We are using Optimizely "Full Stack" to enable A/B testing, feature flagging, etc. throughout our frontend applications. Of note, the Full Stack variant offers us more granular flexibility in React code than Optimizely "Web".

In order to enable Optimizely experiments and features in code, the `@optimizely/react-sdk` offers various hooks for us to utilize. You can view more about these features in the [official documentation](https://docs.developers.optimizely.com/full-stack/docs).

We also have some internal articles describing best practices and providing examples for implementation:

- Business context and process: [A/B Testing in Optimizely](https://guild-education.atlassian.net/wiki/spaces/PROD/pages/2024997472/A+B+Testing+in+Optimizely)
- Implementation and code examples: [Running an A/B Test](https://guild-education.atlassian.net/wiki/spaces/PROD/pages/1766785549/Running+an+AB+Test)

## Alerting & Logging with Datadog

Alerts and logging are handled by Datadog RUM (Real User Monitoring). This will catch errors for both the host and all the remotes. Each remote's errors can be viewed by looking up the view (route) for that particular remote.

**Note**: There are some errors that are not automatically caught by the error boundary setup with datadog RUM and should be tracked by using custom datadog RUM error logging. Situations a custom error log is required:

- Event handlers ([learn more](https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers)).
- Asynchronous code (e.g. `setTimeout` or `requestAnimationFrame` callbacks).

### Where it lives

1. Go to datadog using okta.
2. hover over UX Monitoring (bottom of the left menu’s main list)
3. Select RUM Applications
4. Search for `employer-portal-host` and click on the title when it shows up

### Environments

There is a dropdown to check by environments on the top left of the page. The staging environment currently includes both staging and pr apps.

### To view an individual session

1. Go to `UX Monitoring` in left menu and click Analytics.
2. Select applicaton Id of `employer-portal-host`.
3. If you find an event worth looking at, click on it (or it’s tag that shows up when hovering the event).
4. Select a view (i.e. “view load”).
5. Now you should be able to see a list of what was downloaded, errors, console logs, attributes (os, browser, location), etc.

### Custom Error Logs

To add a custom error log, simply use `datadogRum.addError(<Error here>, {message: <custom message>})` anywhere in the application that a custom error is desired. These should be added inside the catch of any `try catch` that are added to event handlers.

[Read more](https://docs.datadoghq.com/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually) in datadog's documentation.

### Custom Logs

Additional custom logs can be added by using `datadogRum.addAction('action name', {key: value, key value})`
[Read more](https://docs.datadoghq.com/real_user_monitoring/guide/send-rum-custom-actions/?tab=npm) in datadog's documentation.

### Setup victor ops notification group in victor ops (if it isn't already done)

- Go to victor ops in Okta.
- Navigate to teams.
- Make sure your team has an on-call schedule, a rotation and escalation policy.
- Now navigate to settings (top menu).
- Add a routing key, note the key's value will need to match the. `@victorops-<your squad name here>=squad-critical` but without the "@victorops-" substring.

### Datadog alerts setup steps

- Navigate to datadog using Okta.
- Click monitors in left menu > New Monitor > Real User Monitoring.
- Modify the string below to suit your remote and copy and paste it into the Define the search query field.
  `@application.id:83fef1c7-069d-4aad-901d-2717213f7be6 @view.name:(/<Your remote's base route>/* OR or OR "/<Your remote's base route>")`
- Set alert conditions you desire.
- Notifications Step:
  **Note: you'll need to work with your manager to set this up.**
  - In notification message, add the message you wish to send.
  - Below the message in the same message field, add in the places to send the message to like so:
    `@slack-alerts-<your repo name here>`
    `@victorops-<your squad name here>-squad-critical`
    Example:
    `@slack-alerts-employer-portal-squad`
    `@victorops-<your squad name here>-squad-critical`
