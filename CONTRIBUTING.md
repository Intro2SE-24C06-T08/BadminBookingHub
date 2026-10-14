# Contributing and engineering conventions

These conventions apply to all contributors. Stack-specific details remain TBD until the team selects tools and records them in this repository.

## Engineering principles

- Prefer readable, maintainable code and clear names over cleverness.
- Keep responsibilities modular; avoid unnecessary complexity and duplicated logic.
- Test important business rules and edge cases.
- Update documentation when behavior, setup, or configuration changes.
- Never commit passwords, tokens, API keys, private keys, or other secrets.
- Follow established project conventions and treat review feedback respectfully.

## Coding conventions

- Use descriptive names appropriate to each language. Follow the selected language's established casing conventions for variables, functions, classes, files, and directories; exact conventions are TBD with the stack.
- Run the repository's chosen formatter and linter before opening a pull request. Their tools and commands are TBD; do not introduce competing formatters without team agreement.
- Handle expected failures explicitly and return useful, safe error messages. Do not expose secrets or sensitive data in errors or logs. Use the project's logging approach once selected; avoid logging credentials or personal data.
- Validate untrusted input at system boundaries and enforce business rules in the appropriate application layer.
- Keep configuration outside source code. Document required variables and safe defaults; provide placeholder-only examples. Never put credentials in examples.
- If a database is adopted, make schema changes through reviewed, versioned migrations. Do not rely on undocumented manual production changes. Migration tool and procedure are TBD.
- Add focused unit tests for business rules and integration tests for important interactions between components. Test framework and exact commands are TBD. Tests must be repeatable and must not depend on production data or credentials.
- Use the selected package manager and its lockfile consistently. Review dependency purpose and maintenance before adding or upgrading packages; do not commit generated dependency directories.

## Branches

- `main` is the stable, reviewed, deployable integration branch. No `develop` branch is planned.
- Use `feature/<short-description>` for features, `fix/<short-description>` for bug fixes, `docs/<short-description>` for documentation, `refactor/<short-description>` for restructuring, `test/<short-description>` for tests, and `chore/<short-description>` for maintenance/tooling.
- Start branches from the latest `main`, keep each branch focused on one coherent task, and synchronize with `main` when needed. Delete a branch after it is merged.
- See [docs/development-workflow.md](docs/development-workflow.md) for commands.

## Commits

Use Conventional Commits:

```text
<type>(optional-scope): <short imperative description>
```

Supported types:

- `feat`: new functionality
- `fix`: bug fixes
- `docs`: documentation
- `refactor`: restructuring without intended behavior changes
- `test`: adding or changing tests
- `chore`: maintenance and tooling
- `ci`: CI/CD configuration
- `build`: build system or dependency changes

Examples:

```text
feat(auth): add login endpoint
fix(booking): prevent overlapping reservations
docs: document local development setup
ci: add pull request test workflow
```

Keep commits small and meaningful. Avoid vague messages such as `update`, `fix stuff`, or `final version`. Commit signing is not required unless the team explicitly adopts that policy.

## Pull request workflow

1. Update local `main` from `origin`.
2. Create a focused feature or fix branch.
3. Implement the change and add or update relevant tests and docs.
4. Run relevant tests, formatting, and lint checks available in the project.
5. Commit with the convention above and push the branch to GitHub.
6. Open a pull request targeting `main` using the repository template.
7. Explain what changed, why, and how it was tested; request review from another team member.
8. Address review comments and ensure applicable required CI checks pass.
9. Merge only after applicable review approval and required checks pass. If branch protection is enabled, do not push directly to `main`; follow its rules. Branch protection has not been verified as configured.
10. Delete the merged branch.

Squash merging is a **proposed team policy**, not a currently verified GitHub setting. Agree on it as a team and configure it in GitHub if desired. The repository's GitHub merge settings have not been checked.

## Pull request requirements

Every pull request must have a descriptive title and address one coherent task. Include a clear summary, motivation, related issue when one exists, testing performed, and configuration/database/deployment implications where applicable. Include screenshots for user-visible UI changes when useful. Use `.github/pull_request_template.md`.

For this student team, request at least one review from another team member before merging. The author should not approve their own change. If the team cannot obtain an independent review, discuss the exception with the team and record the decision in the PR. GitHub approval rules and branch protection are not assumed to exist.

## Code review

Review correctness and business rules, readability, error handling and edge cases, security and privacy, test coverage, relevant performance, and documentation/configuration changes. State whether feedback is blocking (must be addressed before merge) or a non-blocking suggestion. Feedback must be respectful, specific, and technically justified. Authors should respond to review threads and explain any proposed alternative clearly.

## Testing and CI

Run relevant tests and any configured lint/format checks before opening a PR. The intended CI checks are build/validation, tests, and configured lint/format checks, but no CI workflow currently exists in the repository. A failing required check blocks merge; do not bypass checks just to merge. If a check is unavailable or flaky, document it in the PR and agree on a resolution with reviewers rather than silently ignoring it.

## Security and repository hygiene

- Never commit secrets or real credentials. Use local ignored environment files and keep `.env.example` limited to variable names and safe placeholders. The current `.gitignore` ignores `.env` and `.env.*` while allowing `.env.example`.
- Do not put database credentials or production configuration in source, docs, logs, screenshots, or test fixtures. Use approved secret storage when deployment is established.
- Review dependency changes for necessity and use the chosen package manager's lockfile. Keep dependencies reasonably current through reviewed changes.
- Do not commit build artifacts, caches, local databases, or generated output unless the project explicitly requires a generated artifact to be versioned.
- If a secret is committed, removing it from the latest commit does not remove it from Git history. Revoke or rotate the exposed credential immediately, notify the team, and coordinate history cleanup if needed. Treat the credential as compromised even if the commit is reverted.

## Conflicts and accountability

Resolve conflicts carefully: understand both changes, preserve intended behavior, and rerun relevant checks. Ask the authors or a reviewer for help when intent is unclear; do not discard another contributor's work to make a conflict disappear. Communicate breaking changes and migration/configuration needs in the PR before merge. Contributors are responsible for the quality of their changes and for responding to review feedback. Raise disagreements with evidence and discuss them respectfully; ask the team to decide when no technical consensus emerges.
