# Committing and deploying changes

This guide explains how to commit work so the repository's existing GitHub Actions workflows can process it. The workflows listen for pushes to `dev` and `dev/*`, then open a pull request to `main` when the commit message has the matching prefix.

## 1. Create or switch to a development branch

Work on `dev` or a branch whose name starts with `dev/` (for example, `dev/update-homepage`). The workflows do not run for pushes to other branch names.

```bash
git switch dev
# Or create a feature branch from dev:
git switch -c dev/update-homepage
```

## 2. Make and review your changes

Edit the relevant files, then review what will be committed:

```bash
git status
git diff
```

Stage only the files you intend to include and commit them:

```bash
git add path/to/file
 git commit -m "deploy: describe the change"
```

Remove the leading space before `git commit` if copying that command directly. The important part is that the commit message starts with `deploy` followed by whitespace or punctuation. Matching is case-insensitive, so `Deploy: ...` also works. The deploy workflow checks all commits in the push.

## 3. Push and let the workflow open a pull request

```bash
git push -u origin dev/update-homepage
```

A push to `dev` or `dev/*` containing a commit whose message starts with `deploy` starts **Deploy from dev to main (PR only)**. It creates a pull request from your branch to `main`; it does not deploy by directly pushing your changes to `main`. Review the pull request and merge it when it is ready.

If no commit in the push starts with `deploy`, this workflow exits without creating the deploy pull request. Add a new `deploy: ...` commit and push again to trigger it.

## Publishing a new writing

The archive workflow is a separate, content-specific process. To trigger its archive update, add a new top-level Markdown file directly under `assets/raw/writings/unpublished/` (not in a subdirectory), and include a commit starting with `publish` in the push to `dev` or `dev/*`:

```bash
git add assets/raw/writings/unpublished/my-new-writing.md
git commit -m "publish: add my new writing"
git push -u origin dev/my-new-writing
```

The `publish` prefix is case-insensitive. The workflow runs `js/update_archive.js` for qualifying new writing files and commits any generated changes using the GitHub Actions bot. It also attempts to create a pull request from the branch to `main`. Use `publish` for this writing/archive flow; use `deploy` for the regular development-to-main pull request flow.

## Before you push

- Confirm the branch is `dev` or starts with `dev/`.
- Use the appropriate commit prefix: `deploy` for a regular change, or `publish` for a new unpublished writing.
- Check `git status` and `git diff` to ensure you are committing the intended files.
- After pushing, check the repository's **Actions** tab for workflow status and **Pull requests** for the generated PR.

The repository currently has no root-level npm test or build scripts defined in `package.json`, so this guide does not prescribe a project test command. Run any relevant checks for the files you changed before committing.
