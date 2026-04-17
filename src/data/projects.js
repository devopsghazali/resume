export const projects = [
  {
    id: 1,
    title: "AWS DevSecOps GitOps Release Pipeline",
    description:
      "AWS-hosted delivery flow with Jenkins CI, Docker image build, security scans, and GitOps-based Kubernetes deployment using ArgoCD.",
    image: "/images/devsecops-pipeline.svg",
    stack: [
      "GitHub",
      "Jenkins",
      "Maven",
      "SonarQube",
      "Trivy",
      "Docker",
      "ArgoCD",
      "Kubernetes",
    ],
    codeSummary:
      "Application code is a sample Java microservice. The main engineering focus is secure CI, GitOps CD, and environment governance.",
    details:
      "This project starts from Git commit and ends in automated Kubernetes deployment with full traceability. I configured Jenkins pipeline stages for build, tests, SonarQube quality gate, Trivy scan, and Docker push. Deployment is GitOps based: Kubernetes manifests are managed in a separate repository, and ArgoCD continuously reconciles the cluster from Git. I used namespace separation (dev, stage, prod), resource quotas, RBAC, and controlled promotion rules. Rollback uses immutable image tags and Git revert so recovery is predictable and auditable.",
    highlights: [
      "CI pipeline with quality and security gates before image publish.",
      "Namespace strategy with RBAC and resource controls for each environment.",
      "GitOps synchronization through ArgoCD for deterministic delivery.",
      "Fast rollback plan based on previous tags and manifest history.",
    ],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/devopsghazali/aws-devsecops-gitops-release",
        note: "Jenkins stages, AWS-friendly delivery flow, security gates, and GitOps manifests.",
      },
    ],
    notes: {
      goal:
        "Build a secure, repeatable release platform where every deployment is tracked from commit to running pod.",
      architecture:
        "Developer pushes code -> webhook triggers Jenkins -> CI gates run -> image is built and scanned -> GitOps repo is updated with the approved tag -> ArgoCD syncs Kubernetes cluster.",
      buildAndDeploy: [
        "Designed branch strategy: feature branches merge into dev, then promoted to stage and prod through pull requests.",
        "Created Jenkins stages: checkout, compile, test, SonarQube analysis, Trivy image scan, Docker build and push.",
        "Used immutable image tags (build number + commit hash) to keep deployments traceable.",
        "Separated cluster environments with namespaces and applied quotas, limits, and role-based access controls.",
        "Stored deployment manifests in GitOps repo and configured ArgoCD auto-sync with health checks.",
        "Defined rollback by resetting manifest tag to previous stable version and letting ArgoCD reconcile.",
      ],
      devopsFocus: [
        "Release safety through quality/security gates.",
        "Configuration-as-code and drift control through GitOps.",
        "Operational reliability via namespace isolation and rollback procedure.",
      ],
    },
  },
  {
    id: 2,
    title: "Docker Build, Scan, and Publish Pipeline",
    description:
      "Container delivery pipeline for building a Python app image, scanning it, and publishing only trusted releases.",
    image: "/images/project-docker-build-scan-publish.svg",
    stack: [
      "Python",
      "Docker",
      "GitHub Actions",
      "Trivy",
    ],
    codeSummary:
      "Small Python service with Dockerfile, GitHub Actions workflow, and scan script for a clean build-publish flow.",
    details:
      "This repo is intentionally simple so the container workflow is easy to practice and explain in interviews. The flow starts with a Python demo service, then a Docker image is built, the image is scanned for vulnerabilities, and only the trusted release is published. The supporting files are kept small on purpose: app/server.py for the service, Dockerfile for the image, a GitHub Actions workflow for CI, and scripts/scan.sh for the scan command.",
    highlights: [
      "Python demo service packaged for container delivery.",
      "Dockerfile and GitHub Actions workflow kept easy to follow.",
      "Scan step shows where vulnerability checks fit before publish.",
      "Good interview example for release safety and image trust.",
    ],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/devopsghazali/docker-build-scan-publish",
        note: "Python app, Dockerfile, GitHub Actions workflow, and scan script.",
      },
    ],
    notes: {
      goal:
        "Teach a simple container release flow: build, scan, and publish only a trusted image.",
      architecture:
        "Push code -> GitHub Actions checks out the repo -> Docker image is built -> scan step checks the image -> approved tag is published.",
      buildAndDeploy: [
        "Built a tiny Python service so the container workflow stays easy to understand.",
        "Wrote a production-style Dockerfile to turn the app into a release artifact.",
        "Added a GitHub Actions workflow for build and publish automation.",
        "Placed the scan command in scripts/scan.sh so the vulnerability gate is easy to run.",
        "Kept the release path simple: only approved images should move forward.",
      ],
      devopsFocus: [
        "Build once, scan before publish, and keep release artifacts trusted.",
        "Use automation to make container delivery repeatable.",
        "Keep the demo app small so the pipeline logic stays the focus.",
      ],
    },
  },
  {
    id: 3,
    title: "Three-Tier Web Application",
    description:
      "Frontend, API, and PostgreSQL stack packaged for Docker Compose and Kubernetes.",
    image: "/images/project-three-tier-web-application.svg",
    stack: [
      "HTML",
      "Nginx",
      "Flask",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
    ],
    codeSummary:
      "Frontend, backend, and data tier ko docker compose aur Kubernetes manifests ke through wire kiya.",
    details:
      "This repo shows how a frontend, an API, and PostgreSQL work together. The frontend is served by Nginx, the backend is a Flask API, and PostgreSQL keeps the visit data durable. Docker Compose runs the full stack locally, while the Kubernetes manifests split the same app into three deployable tiers.",
    highlights: [
      "Clear split between frontend, API, and database.",
      "Works with Docker Compose and Kubernetes.",
      "Good interview example for layered application design.",
    ],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/devopsghazali/three-tier-web-application",
        note: "Frontend, Flask API, PostgreSQL, and Kubernetes manifests.",
      },
    ],
    notes: {
      goal:
        "Teach how frontend, application logic, and database layers fit together in a simple web app.",
      architecture:
        "Browser -> frontend -> Flask API -> PostgreSQL, with Docker Compose and Kubernetes running the same layers.",
      buildAndDeploy: [
        "Built a static frontend that proxies API requests to the backend.",
        "Built a Flask backend that records visits in PostgreSQL.",
        "Added Docker Compose so the three tiers can run locally.",
        "Added Kubernetes manifests for each tier.",
        "Kept the app small so the layered architecture stays easy to explain.",
      ],
      devopsFocus: [
        "Clear separation of frontend, backend, and data.",
        "Easy local workflow with Docker Compose.",
        "Same architecture can be moved to Kubernetes.",
      ],
    },
  },
  {
    id: 4,
    title: "Terraform Multi-Environment AWS Baseline",
    description:
      "Terraform-based AWS baseline with reusable modules for dev, staging, and production environments.",
    image: "/images/project-terraform-baseline.svg",
    stack: [
      "Terraform",
      "HCL",
      "AWS",
      "IAM",
      "EC2",
      "S3",
      "DynamoDB",
    ],
    codeSummary:
      "HCL me infra likha, plan/apply workflow chalaya, state manage ki, aur module reuse se multi-env deployment banaya.",
    details:
      "Project me AWS resources manually banane ke bajaye Terraform code se create kiye: S3 bucket, EC2 instance, key pair, security group aur DynamoDB table. `terraform init`, `plan`, `apply`, `destroy` ka full lifecycle use kiya. Baad me same code ko modules me tod kar dev/staging/prod ke liye alag values pass ki, jisse ek hi base template se multiple environments automate ho gaye.",
    highlights: [
      "EC2, S3, DynamoDB complete provisioning via Terraform.",
      "Variables, interpolation, outputs aur state commands use kiye.",
      "Reusable module templates banakar duplication hataya.",
      "Single codebase se dev/staging/prod infra deploy kiya.",
    ],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/devopsghazali/terraform-multi-env-aws-baseline",
        note: "Modules, variables, state workflow, and environment overlays.",
      },
    ],
    notes: {
      goal:
        "Infra ko repeatable banana tha taaki manual console errors kam ho aur setup fast ho.",
      architecture:
        "Common module templates + environment-specific values = dev, staging, prod automatic provisioning.",
      buildAndDeploy: [
        "IAM access keys se AWS provider configure kiya.",
        "Resource blocks likh kar S3, EC2, SG, key pair, DynamoDB create kiye.",
        "Har change se pehle terraform plan dekh kar safe apply kiya.",
        "Outputs aur state commands se actual resource mapping verify ki.",
        "Modules banaye aur per-environment variables inject kiye.",
        "Destroy aur target flags se controlled teardown/change management ki.",
      ],
      devopsFocus: [
        "Infrastructure as Code discipline.",
        "Multi-environment automation without copy-paste.",
        "Safe change workflow with plan-first approach.",
      ],
    },
  },
  {
    id: 5,
    title: "GitOps Kubernetes Hardening and Policy Control",
    description:
      "GitOps-driven Kubernetes hardening project with admission policies, secret management, image controls, and CI compliance checks.",
    image: "/images/project-k8s-hardening.svg",
    stack: [
      "Kubernetes",
      "Kyverno",
      "OPA Gatekeeper",
      "Sealed Secrets",
      "Trivy",
      "ArgoCD",
    ],
    codeSummary:
      "Workload code is simple sample app. Project value is policy-as-code and secure-by-default cluster platform operations.",
    details:
      "I implemented policy-based guardrails to make cluster workloads secure by default. Admission policies block privileged containers, untrusted registries, latest-tag images, and missing resource limits. Secrets are encrypted with Sealed Secrets so plain-text credentials are never stored in Git. CI runs policy and vulnerability checks before manifests are promoted. GitOps deploys only compliant configurations, reducing security drift and runtime risk.",
    highlights: [
      "Policy-as-code for workload hardening.",
      "Image trust and resource policy enforcement.",
      "Encrypted secret workflow for Git-based deployment.",
      "Compliance checks integrated into delivery pipeline.",
    ],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/devopsghazali/gitops-kubernetes-hardening",
        note: "Policy-as-code, sealed secrets, and GitOps deployment manifests.",
      },
    ],
    notes: {
      goal:
        "Establish a secure Kubernetes operating model where unsafe workloads are blocked before deployment.",
      architecture:
        "CI validates image and manifests -> policy engines evaluate compliance -> GitOps sync applies only approved and secure configurations.",
      buildAndDeploy: [
        "Defined deny policies for privileged mode, hostPath usage, and unrestricted capabilities.",
        "Enforced image source and tag rules to prevent untrusted and mutable deployments.",
        "Integrated Sealed Secrets workflow for encrypted secret management in Git.",
        "Connected policy checks into CI to stop non-compliant changes early.",
        "Promoted manifests through GitOps so enforcement is consistent across environments.",
        "Documented exceptions process to avoid insecure ad-hoc bypasses.",
      ],
      devopsFocus: [
        "Secure platform defaults and governance automation.",
        "Shift-left validation for security and compliance.",
        "Reduced operational risk through controlled, policy-driven delivery.",
      ],
    },
  },
  {
    id: 6,
    title: "Kubernetes Canary Rollout with Metrics Promotion",
    description:
      "Canary deployment project with stable/canary splits, health checks, and metrics-based promotion before full rollout.",
    image: "/images/project-canary-rollout.svg",
    stack: [
      "Kubernetes",
      "Argo Rollouts",
      "Prometheus",
      "Grafana",
      "Docker",
      "NGINX Ingress",
    ],
    codeSummary:
      "A small Node.js service is deployed as stable and canary versions so promotion happens only after health and metric checks pass.",
    details:
      "This project demonstrates a controlled canary release flow. The stable deployment keeps serving traffic, while the canary deployment starts with a small replica count. Health checks and simple latency/error observations are used to decide whether the canary should receive more traffic. The core interview point is safe promotion: do not move fast unless the signals are good, and roll back immediately when the canary regresses.",
    highlights: [
      "Stable and canary deployments with separate labels.",
      "Controlled promotion based on health and metrics.",
      "Rollback path is immediate if the canary misbehaves.",
      "Good interview example for progressive delivery.",
    ],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/devopsghazali/kubernetes-canary-rollout",
        note: "Stable/canary manifests, service routing, and rollout notes.",
      },
    ],
    notes: {
      goal:
        "Teach how progressive delivery reduces blast radius and gives you a safer deployment path than all-at-once rollout.",
      architecture:
        "Stable deployment serves live traffic. Canary deployment receives a small share. Metrics decide whether to promote the canary or roll it back.",
      buildAndDeploy: [
        "Built a small Node.js service with a health endpoint.",
        "Created stable and canary Kubernetes deployments with different replica counts.",
        "Used a service and ingress layer to show the routing strategy.",
        "Validated the canary with health and performance checks before promotion.",
        "Kept the rollback path simple so the stable version can keep serving traffic.",
      ],
      devopsFocus: [
        "Progressive delivery with low blast radius.",
        "Promotion driven by health and metrics.",
        "Production-safe release thinking.",
      ],
    },
  },
];
