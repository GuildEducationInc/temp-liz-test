/** Shared Semantic Release configuration that is used by external-use packages. */
module.exports.baseConfig = packageName => {
  return {
    extends: 'semantic-release-monorepo',
    branches: [
      { name: 'PLAT-133-composite-actions-monorepo', prerelease: 'beta' },
      { name: 'main' },
      { name: 'beta', channel: 'next', prerelease: true },

      // Any branch starting with `alpha-` will be auto-released
      // as a pre-release (e.g. `1.3.0-alpha-add-cool-new-feature.1`)
      { name: 'alpha-*', prerelease: true },
    ],
    ci: false,
    debug: true,
    tagFormat: `${packageName}-v\${version}`,
    plugins: [
      [
        '@semantic-release/commit-analyzer',
        {
          releaseRules: [
            { breaking: true, release: 'major' },
            { revert: true, release: 'patch' },
            { type: 'breaking', release: 'major' },
            { type: 'major', release: 'major' },
            { type: 'release', release: 'major' },
            { type: 'feat', release: 'minor' },
            { type: 'minor', release: 'minor' },
            { type: 'fix', release: 'patch' },
            { type: 'patch', release: 'patch' },
            { type: 'perf', release: 'patch' },
            { type: 'dep', release: 'patch' },
          ],
        },
      ],
      // semantic-release-jira-notes may be an interesting option instead of release-notes-generator
      // It uses release-notes-generator under the hood, but also adds a link to the Jira ticket
      // found in the pull request description.
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      [
        '@semantic-release/github',
        {
          // long-term we might want the GH URL to be more dynamic for other projects
          successComment: `:tada: This \${issue.pull_request ? 'pull request' : 'issue'} is included in version \${nextRelease.version} of ${packageName} :tada:\n\nThe release is available on:\n- [npm package (\${nextRelease.channel || '@latest'} dist-tag)](https://www.npmjs.com/package/${packageName}/v/\${nextRelease.version})\n- [GitHub release](https://github.com/GuildEducationInc/recess-design-system/releases/tag/${packageName.replace(
            '@',
            '%40',
          )}-v\${nextRelease.version})\n\nYour **[semantic-release](https://github.com/semantic-release/semantic-release)** bot :package::rocket:`,
        },
      ],
    ],
  };
};
