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
      "Docker-first release pipeline with image build, vulnerability scan, registry push, and deployment-safe release checks.",
    image: "/images/project-blue-green-release.svg",
    stack: [
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "Nginx Ingress",
      "Prometheus",
      "Grafana",
    ],
    codeSummary:
      "Application is a containerized API service. Core work is traffic-safe deployment orchestration and observability-based release checks.",
    details:
      "I implemented blue-green delivery so users experience no downtime during releases. CI builds and tags the image, then CD deploys to inactive color (blue or green). Automated smoke tests validate endpoints and dependencies before traffic switch. Ingress route is switched only after checks pass. Post-cutover monitoring validates latency and error budget. If SLO breach happens, automation routes traffic back to the previous environment immediately.",
    highlights: [
      "Zero-downtime deployments with active/inactive environment model.",
      "Smoke test gates before traffic switch.",
      "Monitoring-driven rollback decisions.",
      "Release visibility with dashboard and alert rules.",
    ],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/devopsghazali/docker-build-scan-publish",
        note: "Docker build flow, scan gates, and release automation scripts.",
      },
    ],
    notes: {
      goal:
        "Release new versions with no user downtime and minimal operational risk.",
      architecture:
        "CI builds image -> deploy to inactive color namespace -> run smoke tests -> switch ingress -> monitor SLO -> rollback automatically if needed.",
      buildAndDeploy: [
        "Prepared two parallel runtime environments (blue and green) inside Kubernetes.",
        "Configured pipeline to deploy latest approved image to inactive color first.",
        "Ran smoke tests against internal service URL before exposing traffic.",
        "Patched Nginx ingress to switch live traffic after test pass.",
        "Validated release using Prometheus metrics and Grafana dashboard thresholds.",
        "Implemented rollback by restoring ingress target to previous color.",
      ],
      devopsFocus: [
        "Deployment reliability and user-impact minimization.",
        "Objective release validation with health and performance metrics.",
        "Fast recovery path integrated into deployment workflow.",
      ],
    },
  },
  {
    id: 3,
    title: "Kubernetes Observability Stack",
    description:
      "End-to-end observability setup with Prometheus, Grafana, Alertmanager, and cluster-level alerting for Kubernetes workloads.",
    image: "/images/project-observability-stack.svg",
    stack: [
      "Helm",
      "Prometheus",
      "Grafana",
      "Alertmanager",
      "Node Exporter",
      "Kubernetes",
      "Kind",
    ],
    codeSummary:
      "Kind cluster par Helm se monitoring stack install ki, dashboards banaye, PromQL run ki aur alerts validate kiye.",
    details:
      "Is project me pehle cluster aur sample voting app chalaya, phir kube-prometheus-stack ko Helm ke through deploy kiya. Prometheus targets check kiye, Grafana login karke dashboards import kiye, aur CPU/memory/network metrics ko real time me dekha. Port clash avoid karne ke liye NodePort mapping tune ki. Traffic generate karke dikhaya ki metrics kaise spike karte hain aur alerts kaise trigger hote hain.",
    highlights: [
      "Helm se one-shot me Prometheus, Grafana, Alertmanager setup.",
      "Prometheus targets status se scrape health verify ki.",
      "Grafana me ready dashboards import karke cluster visibility banayi.",
      "Load generate karke alerts aur metric spikes practically validate kiye.",
    ],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/devopsghazali/kubernetes-observability-stack",
        note: "Helm values, alert rules, dashboards, and monitoring manifests.",
      },
    ],
    notes: {
      goal:
        "Simple language me bolun to goal tha: cluster me kya chal raha hai, kab issue aa raha hai, aur kitni jaldi pakad sakte hain.",
      architecture:
        "Kubernetes nodes/pods -> Prometheus scrape -> Grafana visualization; rule hit hote hi -> Alertmanager notification.",
      buildAndDeploy: [
        "Kind cluster banaya aur app workloads deploy kiye taaki real metrics aayein.",
        "Monitoring namespace create karke Helm chart se stack install kiya.",
        "Prometheus aur Grafana access ke liye NodePort/port-forward setup kiya.",
        "PromQL queries chalakar CPU, memory, network patterns observe kiye.",
        "Grafana dashboards import karke datasource connect aur validate kiya.",
        "High resource usage ke alert rules lagaye aur traffic se test kiya.",
      ],
      devopsFocus: [
        "Monitoring-first mindset.",
        "Issue detect karo, guesswork kam karo.",
        "Dashboards + alerts se fast troubleshooting.",
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
];
