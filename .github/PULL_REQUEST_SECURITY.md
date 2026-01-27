# Pull Request Security Guidelines

## How CI Works for Pull Requests

This repository uses a security-first approach for running CI on pull requests.

- The label-based approval prevents untrusted code from running in CI
- This protects against supply chain attacks and credential theft
- Always review PRs before adding `safe-to-test`

### Automated CI Runs

CI will automatically run for:

- ✅ All pushes to `main` branch (trusted)
- ✅ PRs from repository OWNER, MEMBERS, and COLLABORATORS (trusted)
- ✅ PRs from Renovate bot (trusted dependency updates, verified from same repo)

### Manual Approval Required

CI will **NOT** automatically run for:

- ❌ PRs from first-time contributors
- ❌ PRs from external contributors (CONTRIBUTOR, FIRST_TIME_CONTRIBUTOR, NONE)

### Approving External PRs

To approve a PR from an external contributor:

1. **Review the code carefully** for malicious changes
2. **Add the `safe-to-test` label** to the PR
3. CI will trigger automatically when the label is added

**Only users with write access can add labels**.
