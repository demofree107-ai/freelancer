<!-- coderabbit-ai-generated:v1 -->

# Schoolhouse

A single-school management app with a Next.js frontend, Express API and PostgreSQL database. It supports accounts and role-based access, student and staff records, attendance, fees, exams and report cards, class timetables, student documents and audit records.

## Local setup

Requires Node.js 20.9 or later, npm, PostgreSQL and PostgreSQL client tools. Create a PostgreSQL database and user, then:

```sh
npm ci
cp .env.example .env
# Set DATABASE_URL, a random JWT_SECRET, APP_ORIGIN, ADMIN_EMAIL and ADMIN_PASSWORD in .env.
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000 and sign in with the administrator credentials specified in `.env`. The seed script creates the administrator only when the email does not already exist; it does not reset an existing password. Add classes before students, create accounts before linking students, parents or teachers, and assign teachers to classes. Add grade bands, fee structures, exams and timetable entries as needed. API documentation is at `/api/docs`.

## Operations

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:47da899a2e693a88db898efe5c261b493843cd414a540e4a24c4296c25dea2c4 -->

Set `APP_ORIGIN` to the exact public origin of the web application. In production, set `NODE_ENV=production`, serve the web app behind an HTTPS reverse proxy, restrict the API and PostgreSQL to private network access, and use encrypted database and document volumes. Configure the public reverse proxy to discard client-supplied `X-Forwarded-For` values and set a trustworthy client address. Set `TRUST_PROXY_HOPS` to the number of trusted hops between the client and Express (the Next.js rewrite counts as one); the default is one. An incorrect proxy configuration makes login rate limits unreliable. Store secrets outside source control. Document uploads are held in `UPLOAD_DIR` and must be included in backups. Login sessions expire after eight hours. Payments are immutable; correct mistakes with a separately documented accounting process.

<!-- /coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:de0233818fd57601d28d9408ae70fcdefdd8f65817477f6afa65d9cd2738f255 -->

Backups contain sensitive student data. Keep them in a private encrypted location and restrict access. Set `DATABASE_URL`, `BACKUP_DIR` and optionally `UPLOAD_DIR`, then run `bash scripts/backup.sh`. Each successful run creates a separate dated directory and prints its path. For restoration, set `BACKUP_DIR` to the selected backup directory, point `DATABASE_URL` at a new empty database and `UPLOAD_DIR` at a new empty directory, then run `bash scripts/restore.sh`. Take backups during a maintenance window so database and uploaded files remain consistent, and periodically test restoration.

<!-- /coderabbit-ai-generated:v1 -->

## Tests

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:fb0808a8b72ce4d4aa6c3ba405afd10fc736daf6262ddd0bfa06e87de17bac92 -->

Create a **dedicated disposable** PostgreSQL database whose name ends in `_test` and set `TEST_DATABASE_URL` to its connection string before `npm test`; the test suite drops and recreates its public schema. If omitted, the test uses the local `school_management_test` database via the Unix socket as user `ubuntu`. Run `npm run build` for the production build. No online payment gateway or SMS provider is configured.

<!-- /coderabbit-ai-generated:v1 -->
