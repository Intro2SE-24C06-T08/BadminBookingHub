# EC2 deployment setup

The workflow in `.github/workflows/ci-cd.yml` builds the Docker image on pull requests. On pushes to `main` and manual runs, it authenticates to AWS using GitHub OIDC, publishes the image to ECR, then asks Systems Manager (SSM) to replace the running container on one EC2 instance. It exposes HTTP on port 80. This repository defines the workflow, but it does not create AWS resources or configure GitHub variables.

## Required AWS resources

1. An ECR repository, such as `badmin-booking-hub`.
2. An EC2 instance running a supported Linux distribution with Docker and AWS Systems Manager Agent installed and online as a managed node. Attach an instance profile granting `AmazonSSMManagedInstanceCore` and permission to pull from the selected ECR repository (`ecr:GetAuthorizationToken` plus repository-scoped layer/image read actions).
3. A security group allowing inbound TCP 80 from the intended audience. Do not open SSH to the world. The deployment runner connects through SSM, so inbound SSH is not needed.
4. An IAM OIDC provider for `token.actions.githubusercontent.com` and an IAM role trusted by this GitHub repository. Scope the trust policy's `sub` claim to the intended repository and refs (at minimum `refs/heads/main`; include `refs/heads/feature/full-stack-foundation` only if trial deployment from this branch is intended). Grant the role ECR push actions for the target repository and `ssm:SendCommand`/command-status read actions scoped to the deployment document and target instance where AWS permits.

Use the AWS Console or reviewed infrastructure-as-code to create these resources. Verify the IAM trust and permissions before running a deployment. Keep the EC2 instance patched and restrict the application's inbound traffic as appropriate. Add HTTPS and a domain before exposing a real service publicly.

## GitHub repository variables

In **Settings → Secrets and variables → Actions → Variables**, define:

| Variable | Example/meaning |
| --- | --- |
| `AWS_REGION` | Region containing ECR and the EC2 instance, for example `ap-southeast-1` |
| `AWS_ACCOUNT_ID` | 12-digit AWS account ID |
| `AWS_DEPLOY_ROLE_ARN` | IAM role ARN assumed with OIDC |
| `ECR_REPOSITORY` | Existing ECR repository name |
| `EC2_INSTANCE_ID` | SSM-managed EC2 instance ID |

The workflow requires no long-lived AWS access key secret. `id-token: write` allows GitHub to request an OIDC token; AWS must trust the repository and branch through the IAM role's trust policy.

## Run and observe deployment

After the AWS resources and variables exist, merge the project branch to `main` to deploy on push, or use **Actions → CI and EC2 deployment → Run workflow** to start a manual run from an allowed branch. Review the workflow output and SSM command result. Check the instance's container with `docker ps` and open `http://<instance-public-ip>/`; `/api/health` should return JSON.

The first setup does not configure persistent storage, TLS, a domain, backups, monitoring, a database, or rollback automation. The current app is a stateless starter and the workflow replaces the single container; add those capabilities before production use.
