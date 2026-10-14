# BadminBookingHub

A university Software Engineering project for a badminton court booking and management system. The repository now includes an initial full-stack starter. The booking experience shown in the UI is illustrative; reservation, payment, account, and court-management workflows are not implemented yet.

## Current starter stack

- **Frontend:** React 19, TypeScript, Vite 7
- **Styling:** Tailwind CSS 4 through the Vite plugin
- **Backend:** Node.js 22, Express 5, TypeScript
- **Package manager:** npm workspaces with the root `package-lock.json`
- **Containers:** Docker multi-stage image and Docker Compose
- **CI/CD:** GitHub Actions; pull requests build the image, while pushes to `main` and manual runs publish to Amazon ECR and deploy to an SSM-managed EC2 instance
- **Data store:** TBD; no database is connected

The Vite and Tailwind integration follows the official [Vite guide](https://vite.dev/guide/) and [Tailwind Vite installation](https://tailwindcss.com/docs/installation/using-vite). Express 5 requires Node.js 18 or later; this project uses Node.js 22. See [EC2 deployment setup](docs/deployment-ec2.md) before enabling deployment.

## Project goals and users

The project aims to help players find court availability and arrange bookings, while helping court operators manage courts and reservations. Intended users are players/customers and court operators/administrators. Candidate capabilities include browsing courts, viewing available times, managing reservations, and maintaining court information. The actual requirements and business rules remain to be agreed by the team.

## Architecture

The application workspaces live under `src/frontend` and `src/backend`. The frontend is a Vite React single-page app. During development, Vite proxies `/api` to the Express server. In the production Docker image, Express serves the compiled frontend and provides `/api/health`, so a single container serves both UI and API. Docker Compose exposes the container locally at port 8080 by default. The GitHub Actions workflow builds one image, pushes it to ECR, and uses SSM to run it on EC2.

## Prerequisites

- Git
- Node.js 22 and npm for local development
- Docker Engine with Docker Compose for container workflows

## Local development

```sh
git clone https://github.com/Sumonnnnn1144/BadminBookingHub.git
cd BadminBookingHub
npm ci
npm run dev
```

Vite prints the frontend URL (normally `http://localhost:5173`); Express listens on port 3000. The frontend proxies `/api` to the backend. To build both workspaces, run `npm run build`.

## Environment configuration

Copy `.env.example` to `.env` only if you want to change the local Docker Compose host port. No secrets or application-specific environment variables are needed yet. The root `.gitignore` excludes local `.env` files and allows `.env.example`.

```sh
cp .env.example .env
docker compose up --build
```

Open `http://localhost:8080`. To stop the local container, run `docker compose down`.

## Testing and CI

No application test suite has been added yet. The current GitHub Actions job builds the production Docker image for pull requests. Add unit and integration tests when booking domain logic is introduced; make CI run them before merge.

## Git workflow and team

Use focused branches and Conventional Commits, and submit pull requests to `main` for teammate review. See [CONTRIBUTING.md](CONTRIBUTING.md), [development workflow](docs/development-workflow.md), and the [pull request template](.github/pull_request_template.md). The existence of a workflow does not mean GitHub branch protection or required checks are enabled; configure those repository settings separately.

Team members and responsibilities: **TBD**.

## Status and next steps

This is a starter foundation, not a complete booking product. Next decisions include requirements and roles, database selection and migrations, authentication/authorization, booking conflict rules, payment scope, test strategy, HTTPS/domain, and backup/monitoring needs. Deployment requires the AWS and GitHub setup described in [docs/deployment-ec2.md](docs/deployment-ec2.md); no EC2 instance or AWS resources have been created by this repository change.

## Source layout

```text
src/
├── backend/   # Express API and server
└── frontend/  # React/Vite user interface
```
