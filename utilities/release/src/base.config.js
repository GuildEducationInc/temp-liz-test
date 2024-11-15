/** Shared Semantic Release configuration that is used by external-use packages. */
module.exports.baseConfig = packageName => {
  return {
    extends: 'semantic-release-monorepo',
    branches: [
      { name: 'main' },
      { name: 'PLAT-133-composite-actions-monorepo', prerelease: 'beta' }
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
            { type: 'feat', release: 'minor' },
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
      [
        '@semantic-release/github',
        {
          // long-term we might want the GH URL to be more dynamic for other projects
          successComment: `:tada: This \${issue.pull_request ? 'pull request' : 'issue'} is included in version \${nextRelease.version} of ${packageName} :tada:\n\nThe release is available in [GitHub releases](https://github.com/GuildEducationInc/github-actions/releases/tag/${packageName.replace(
            '@',
            '%40',
          )}-v\${nextRelease.version})\n\nYour **[semantic-release](https://github.com/semantic-release/semantic-release)** bot :package::rocket:`,
        },
      ],
    ],
  };
};
