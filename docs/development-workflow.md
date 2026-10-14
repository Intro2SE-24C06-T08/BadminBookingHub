# Development workflow

Use these commands for the shared `main` branch and focused branches. Replace `<short-description>` with lowercase words separated by hyphens. Do not run commands that discard work unless you have reviewed and backed it up.

## Clone and update `main`

```sh
git clone https://github.com/Sumonnnnn1144/BadminBookingHub.git
cd BadminBookingHub
git switch main
git pull --ff-only origin main
```

`--ff-only` avoids creating an unplanned merge commit while updating local `main`. If it fails, inspect your local changes and ask for help rather than forcing the update.

## Create a branch

Choose the prefix that matches the work, then branch from the updated `main`:

```sh
git switch -c feature/<short-description>
# or fix/, docs/, refactor/, test/, chore/
```

Keep the branch focused on one task. Check status and review changes as you work:

```sh
git status --short
git diff --stat
git diff
```

Before committing, inspect staged changes too:

```sh
git add <specific-files>
git diff --cached
```

Stage specific files where practical so unrelated work is not included. Do not stage secrets.

## Commit and push

Run the relevant project tests and configured lint/format checks first. Their commands are TBD until the stack is selected. Commit using Conventional Commits, for example:

```sh
git commit -m "docs: document local development setup"
git push -u origin docs/development-workflow
```

For the first push of another branch, replace the example branch name with the actual branch name. Then open GitHub in a browser, create a pull request targeting `main`, complete `.github/pull_request_template.md`, and request a teammate's review.

## Synchronize with updated `main`

When `main` changes, first commit or safely stash your own work. Then fetch and merge the latest `main` into your branch:

```sh
git fetch origin
git switch <your-branch>
git merge origin/main
```

Review the result and rerun relevant checks. If your team chooses to rebase instead, coordinate before rewriting a branch that others use; do not force-push without agreement.

## Resolve merge conflicts

1. Run `git status` and identify each conflicted file.
2. Open each file and reconcile both sides according to the intended behavior; remove conflict markers.
3. Ask the relevant author or reviewer if either side's intent is unclear.
4. Review the complete diff and run relevant checks.
5. Stage resolved files and finish the merge:

```sh
git add <resolved-files>
git diff --cached
git commit
```

Do not use destructive reset/checkout commands to discard conflict resolution or another contributor's work.

## After merge

Once the pull request is merged, update `main` and remove your local branch:

```sh
git switch main
git pull --ff-only origin main
git branch -d <merged-branch>
```

If Git reports the branch is not fully merged, stop and verify the pull request was merged before taking any further action. Delete the remote branch through GitHub if it was not automatically deleted and the team agrees it is no longer needed.
