# Firebase Production Deployment Runbook

**Date:** 2026-08-06
**Status:** Verified reproduction record — this exact sequence was executed end to end against the live `elustondoai` Firebase project and confirmed working.
**Audience:** A developer setting up a new machine, or re-provisioning the Firebase/GCP project, to build and deploy this repository's frontend and Article Curator backend.

This is an empirical runbook, not a policy document. Read [Firebase Conversational POC Operations](../11-operational-reality/firebase-conversational-poc-operations.md) first for the governance gates (billing, secrets, rollback) that apply before any of the steps below are authorized. Every step under "One-time GCP/Firebase project provisioning" mutates shared, billable infrastructure and requires Pablo's explicit prior approval per `AGENTS.md` — do not run it as routine setup.

## 1. What this runbook produces

- A local toolchain that can build, test, and deploy the repository.
- A Firebase project (`elustondoai` in this reproduction) with:
  - Blaze (pay-as-you-go) billing linked — required by Cloud Functions 2nd Gen and Vertex AI, even if usage stays inside the free tier.
  - The GCP APIs the curator and its build pipeline need, enabled.
  - A default Cloud Storage bucket provisioned (Cloud Storage for Firebase), which the curator uses to persist state.
  - The `articles` HTTP function and `curateMediumArticles` scheduled function deployed.
  - Hosting serving the built frontend and rewriting `/api/articles` to the `articles` function.
  - Public (`allUsers`) invoker access on the underlying Cloud Run service for `articles`.

## 2. Prerequisites

- Git access to this repository.
- A Google account with Owner/Editor rights on the target Firebase project (or authorization to create a new one).
- macOS with Homebrew, or an equivalent package manager on another OS.
- Explicit authorization from Pablo for every step in section 4 (this is a governance requirement, not a technical one).

## 3. One-time local toolchain installation

These versions were used in the verified reproduction. Newer patch versions should work; do not downgrade below the repository's declared minimums (Node `^20.19.0`/`^22.13.0`/`>=24.0.0`, pnpm `11.9.0`).

```bash
# Node.js + npm
brew install node
node --version   # verified: v26.7.0
npm --version    # verified: 11.19.0

# pnpm — match the repository's pinned version
npm install -g pnpm@11.9.0
pnpm --version   # verified: 11.9.0

# Firebase CLI
npm install -g firebase-tools
firebase --version   # verified: 15.26.0

# Google Cloud CLI
brew install --cask google-cloud-sdk
gcloud --version     # verified: 579.0.0
```

If your terminal is sandboxed (e.g. an AI coding agent's sandbox), installs and any command touching `~/.config`, `~/Library/pnpm`, `~/.cache`, or Homebrew need unsandboxed/network-allowed execution.

## 4. Clone and install workspace dependencies

```bash
git clone <repository-url> elustondoaiweb
cd elustondoaiweb
pnpm install --frozen-lockfile
```

**Known pnpm store-directory gotcha:** if a `node_modules` tree already exists on the machine linked to a specific pnpm store (e.g. `~/Library/pnpm/store/v11`), a plain `pnpm add <pkg>` from a different shell/session can fail with `ERR_PNPM_UNEXPECTED_STORE` or `ERR_SQLITE_ERROR`. Fix by pinning the store directory explicitly:

```bash
pnpm add <pkg> --config.store-dir=~/Library/pnpm/store/v11
```

Confirm the actual store path first with `pnpm store path`.

Run the full local verification before touching any cloud resource:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm curator:local:twice
```

All of these must pass using only fixtures and local state — none of them call Medium, Gemini, or Firebase.

## 5. Authenticate the CLIs

Each of these opens a browser OAuth flow. In an automated/agent context, start each login asynchronously and have the human complete the browser step; never handle the resulting tokens directly.

```bash
firebase login
gcloud auth login
gcloud auth application-default login
```

`gcloud auth application-default login` writes Application Default Credentials to `~/.config/gcloud/application_default_credentials.json` with a quota project matching the target Firebase project. This is required locally only for tasks that need Google Cloud identity outside of Firebase's own managed identity (for example, running the production `ChatGoogle({ platformType: 'gcp' })` client from a local script). It is not a routine setup step — see the Developer Guide's configuration section.

## 6. Point the repository at the target Firebase project

Create `.firebaserc` at the repository root if it does not already exist:

```json
{
  "projects": {
    "default": "elustondoai"
  }
}
```

Verify with:

```bash
firebase projects:list
firebase use
```

## 7. One-time GCP/Firebase project provisioning (requires explicit approval)

Every step in this section is a shared-infrastructure, billable, or hard-to-reverse action. Confirm explicit authorization before each one, per `AGENTS.md`.

### 7.1 Upgrade to the Blaze plan

Cloud Functions 2nd Gen (Cloud Run–backed) and Vertex AI/Gemini access both require the Blaze pay-as-you-go plan, regardless of whether usage stays within the free tier. This must be done by the project owner in the console (no CLI path exists for this):

1. Open `https://console.firebase.google.com/project/<project-id>/usage/details`.
2. Upgrade to Blaze.
3. Set a budget alert (a $25/month alert was used in this reproduction).

Verify from the CLI:

```bash
gcloud beta billing projects describe <project-id>
# billingEnabled: True
```

### 7.2 Enable required GCP APIs

```bash
gcloud services enable \
  aiplatform.googleapis.com \
  cloudfunctions.googleapis.com \
  cloudscheduler.googleapis.com \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  eventarc.googleapis.com \
  --project <project-id>
```

`artifactregistry.googleapis.com`, `firebaseextensions.googleapis.com`, `pubsub.googleapis.com`, and `storage.googleapis.com` are auto-enabled during the first `firebase deploy` if not already active; enabling them up front avoids a mid-deploy pause.

### 7.3 Provision Cloud Storage for Firebase (default bucket)

**This is the step most likely to be missed on a fresh project, and it produces a confusing production error if skipped.** The Article Curator's `FirebaseStorageCuratorStore` calls `getStorage().bucket()` (the default bucket) to persist state. On a project where Cloud Storage for Firebase has never been opened, no default bucket exists, and:

- `firebase init storage` fails with: `Error: Firebase Storage has not been set up on project '<project-id>'. Go to https://console.firebase.google.com/project/<project-id>/storage and click 'Get Started' to set up Firebase Storage.`
- The deployed `curateMediumArticles` function fails at runtime with `Error: The specified bucket does not exist.`, safely preserving last-known-good state (no data loss, but the catalog never updates).

There is no CLI or `gcloud` command that provisions this — it requires one human click in the console:

1. Open `https://console.firebase.google.com/project/<project-id>/storage`.
2. Click **Get Started**.
3. Accept the default production security rules (the backend accesses the bucket via the Admin SDK service account, which bypasses Storage security rules, so the default rules are sufficient).
4. Choose the same region as the deployed functions if prompted (`northamerica-northeast1` in this reproduction).

Verify the bucket now exists:

```bash
gcloud storage buckets list --project <project-id> --format="value(name)"
# expect: <project-id>.firebasestorage.app
```

### 7.4 Set the Artifact Registry cleanup policy

Cloud Build pushes a container image per Functions deploy. Without a cleanup policy, images accumulate storage cost indefinitely. Set a short retention policy once:

```bash
firebase functions:artifacts:setpolicy \
  --project <project-id> \
  --location <region> \
  --force
```

This reproduction used a 1-day image retention policy. **If this step is skipped, `firebase deploy` can print a successful Functions update and then exit with an unrelated cleanup-policy error that silently prevents the Hosting release from finalizing** (see section 8.2).

## 8. Deploy

### 8.1 Add the explicit Functions Framework dependency

Cloud Build's pnpm buildpack does not reliably auto-detect the Functions Framework from `firebase-functions` alone under pnpm. Add it explicitly in `backend/article-curator/package.json`:

```json
"dependencies": {
  "@google-cloud/functions-framework": "^5.0.5"
}
```

Then refresh the lockfile (adding a dependency invalidates `--frozen-lockfile`):

```bash
pnpm install --no-frozen-lockfile
```

Without this dependency, the first deploy attempt fails during the Cloud Build step with: `you have not included the Functions Framework in your dependencies`.

### 8.2 Run the deploy

```bash
firebase deploy --project <project-id>
```

This deploys both Functions (`article-curator` codebase: `articles`, `curateMediumArticles`) and Hosting in one pass.

**Known gotcha:** if section 7.4's cleanup policy was not set beforehand, the CLI can report successful Functions/Hosting file-upload steps and then fail on an unrelated Artifact Registry cleanup-policy prompt/error. When this happens, the Hosting release is never finalized even though the deploy looked successful — the live site returns `404 Site Not Found`. Fix the cleanup policy (section 7.4) and re-run Hosting alone to finalize:

```bash
firebase deploy --only hosting --project <project-id>
```

Always verify reachability after every deploy rather than trusting CLI output alone (section 9).

### 8.3 Fix Cloud Run public invoker access if `/api/articles` returns 403

Firebase is expected to automatically grant `allUsers`/`roles/run.invoker` on the Cloud Run service backing an `onRequest` function that Hosting rewrites to. In this reproduction, an earlier interrupted deploy (the cleanup-policy failure above) left the underlying `articles` Cloud Run service with a **completely empty** IAM policy, so the public site got `403` from the API even though Hosting itself served `200`.

Diagnose:

```bash
gcloud run services get-iam-policy articles \
  --region <region> --project <project-id>
```

If the policy is empty or missing the `allUsers` binding, grant it manually:

```bash
gcloud run services add-iam-policy-binding articles \
  --region <region> --project <project-id> \
  --member="allUsers" \
  --role="roles/run.invoker"
```

Re-check this after any deploy that errors out partway — do not assume it is permanent once granted; verify it explicitly whenever a deploy did not complete cleanly.

## 9. Verify the deployment

### 9.1 Basic reachability

```bash
curl -i "https://<project-id>.web.app/"
curl -i "https://<project-id>.web.app/api/articles"
```

Both should return `200`.

### 9.2 Bypass CDN caching to see the true current state

The `articles` function sets `Cache-Control: public, max-age=300, stale-while-revalidate=600`. Firebase Hosting's CDN caches GET responses per full URL **including the query string**, so repeated requests within 5 minutes of each other can return a stale cached response (`x-cache: HIT`) even after new production data has been written. When verifying data freshness immediately after a deploy or a manual curator run, bypass the cache with a unique query parameter:

```bash
curl -s -D - "https://<project-id>.web.app/api/articles?cachebust=$(date +%s)"
```

Look for `x-cache: MISS` in the response headers to confirm you are seeing a fresh response, and check that `refreshedAt` in the JSON body matches the expected run time.

### 9.3 Manually trigger the scheduled curator run

The scheduled function runs automatically every 15 minutes, but a manual trigger is useful for immediate verification after a fresh deploy or after fixing a blocker (e.g. provisioning Storage):

```bash
gcloud scheduler jobs list --location <region> --project <project-id>
# job name: firebase-schedule-curateMediumArticles-<region>

gcloud scheduler jobs run firebase-schedule-curateMediumArticles-<region> \
  --location <region> --project <project-id>
```

Then check logs:

```bash
gcloud functions logs read curateMediumArticles \
  --region <region> --project <project-id> --gen2 --limit 20
```

Look for `Article curator completed.` A run can also legitimately fail with `Error: Medium profile RSS returned HTTP 503.` (a transient upstream error) — the curator correctly preserves last-known-good state on any failure and logs `Article curator failed; last-known-good state was preserved.` This is expected safe behavior, not a defect; simply retry the trigger.

## 10. Ongoing operational notes

- The scheduled job runs every 15 minutes (`America/Toronto`). Two consecutive observations where a previously-known article is absent from the live Medium feed (or lacks the required tag) are required before it is removed from the public catalog — a single missing observation is expected to show as pending removal, not an immediate drop.
- Both `articles` (HTTP) and `curateMediumArticles` (scheduled) are Cloud Functions 2nd Gen, which are Cloud Run–backed and therefore require the Blaze plan regardless of actual usage.
- Never re-run any step in section 7 casually; each one is a shared-infrastructure or billing action gated by `AGENTS.md`.

## 11. Troubleshooting index

| Symptom | Cause | Fix |
|---|---|---|
| `ERR_PNPM_UNEXPECTED_STORE` / `ERR_SQLITE_ERROR` on `pnpm add` | pnpm store directory mismatch with existing `node_modules` | Pass `--config.store-dir=<existing store path>` (find it with `pnpm store path`) |
| `ERR_PNPM_OUTDATED_LOCKFILE` | Lockfile out of date after adding a dependency | `pnpm install --no-frozen-lockfile` |
| Deploy fails: `you have not included the Functions Framework in your dependencies` | Cloud Build's pnpm buildpack didn't auto-detect it | Add `@google-cloud/functions-framework` as an explicit dependency (section 8.1) |
| Deploy "succeeds" for Functions/Hosting upload but site returns `404 Site Not Found` | Artifact Registry cleanup policy error silently blocked Hosting release finalization | Set the cleanup policy (section 7.4), then `firebase deploy --only hosting` |
| `/api/articles` returns `403` even though `/` returns `200` | Cloud Run service has no IAM invoker binding (interrupted earlier deploy) | `gcloud run services add-iam-policy-binding articles --member=allUsers --role=roles/run.invoker` (section 8.3) |
| `firebase init storage` fails: `Firebase Storage has not been set up on project` | Cloud Storage for Firebase was never provisioned | One-time manual console click at `.../project/<project-id>/storage` → **Get Started** (section 7.3) |
| Function logs: `Error: The specified bucket does not exist.` | Same root cause as above — no default Storage bucket | Same fix as above |
| `/api/articles` shows stale/bootstrap data right after a successful curator run | Firebase Hosting CDN served a cached response (`x-cache: HIT`) | Re-fetch with a cache-busting query parameter (section 9.2) |
| Curator run fails: `Error: Medium profile RSS returned HTTP 503.` | Transient upstream Medium error | Expected; state is preserved safely, just retry |

## 12. References

- [Firebase Conversational POC Operations](../11-operational-reality/firebase-conversational-poc-operations.md) — governance gates that apply before any step in section 7.
- [Developer Guide](../../02_DeveloperGuide/README_ai.md) — day-to-day local commands and the "Deployment is a gated interface" section.
- [`firebase.json`](../../../../firebase.json) — Hosting rewrites, Functions codebase mapping, and emulator ports.
- [`AGENTS.md`](../../../../AGENTS.md) — approval boundaries for billing, deployment, DNS, and secrets.
