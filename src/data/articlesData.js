export const articlesData = [
  {
    id: 1,
    slug: "production-cicd-kubernetes",
    title: "Designing a Production-Grade CI/CD Pipeline for Kubernetes",
    level: "Intermediate",
    readTime: "9 min",
    summary:
      "How to structure CI quality gates, image security checks, and GitOps deployment promotion from dev to production.",
    sections: [
      {
        heading: "Context",
        body:
          "Most pipelines fail in production not because build tools are missing, but because control points are missing. A production pipeline must answer four things for every release: what changed, who approved it, how it was validated, and how to roll back safely. Without those answers, a pipeline is only automation, not release engineering.",
      },
      {
        heading: "Recommended Architecture",
        body:
          "Use a split model: application repository for source code and GitOps repository for environment manifests. CI runs compile, unit tests, integration tests, SAST/SCA checks, and container scanning. Only when all gates pass should the pipeline push an immutable image tag and create a deployment-change PR in the GitOps repository.",
      },
      {
        heading: "Implementation Flow",
        body:
          "Stage 1 validates code quality and test reliability. Stage 2 validates security posture and image policy. Stage 3 publishes signed image artifacts. Stage 4 updates manifests and relies on ArgoCD or Flux for synchronization. Stage 5 runs post-deploy smoke checks and SLO validation before marking release complete.",
      },
      {
        heading: "Common Failure Pattern",
        body:
          "Teams often skip policy enforcement and rely on manual judgment in urgent releases. This creates hidden security and compliance debt. Another pattern is using mutable tags like latest, which breaks rollback certainty because the deployed image identity becomes ambiguous.",
      },
      {
        heading: "Operational Checklist",
        body:
          "Enforce branch protection, sign commits for production branches, block pipeline on critical vulnerabilities, use immutable tags with commit hash, store pipeline metadata, and maintain a tested rollback runbook. Run quarterly game-days where pipeline failure scenarios are simulated end to end.",
      },
    ],
  },
  {
    id: 2,
    slug: "blue-green-no-downtime",
    title: "Blue-Green Deployments Without User Downtime",
    level: "Intermediate",
    readTime: "8 min",
    summary:
      "A practical blueprint for rolling out new versions with ingress switch and automated rollback controls.",
    sections: [
      {
        heading: "Why Blue-Green",
        body:
          "Blue-green is effective when downtime is unacceptable and rollback speed matters. You keep one environment active and another ready for candidate release. Users continue hitting active environment until validation on the inactive environment is complete.",
      },
      {
        heading: "Traffic Strategy",
        body:
          "Do not switch traffic manually through dashboards during production pressure. Keep ingress switch scripted and idempotent. Track active color in a source-controlled release metadata file so the current production target is always auditable.",
      },
      {
        heading: "Validation Before Cutover",
        body:
          "Run readiness and smoke checks on inactive color. Include dependency checks such as database connectivity, cache reachability, and third-party API handshake. Validate one or two core business transactions before ingress cutover to avoid shipping technically healthy but functionally broken builds.",
      },
      {
        heading: "Rollback Contract",
        body:
          "Rollback must be automatic for severe SLO breaches. Define thresholds for error rate and latency windows, and trigger traffic return to previous color when the threshold is sustained. Treat rollback as first-class release action, not as an exception path.",
      },
      {
        heading: "Capacity and Cost",
        body:
          "Blue-green doubles runtime capacity during release windows. Plan node autoscaling and budget for this. If full duplication is too expensive, use weighted canary rollout instead, but keep similar verification and rollback guardrails.",
      },
    ],
  },
  {
    id: 3,
    slug: "gitops-fundamentals",
    title: "GitOps Fundamentals: Why Declarative Delivery Scales Better",
    level: "Beginner",
    readTime: "7 min",
    summary:
      "Why Git should remain the single source of truth for Kubernetes state and release history.",
    sections: [
      { heading: "Core Principle", body: "GitOps means your desired runtime state lives in Git, and controllers reconcile cluster state to match Git. This removes silent runtime drift and gives teams reproducible deployments." },
      { heading: "Auditability", body: "Every deployment becomes a commit with author, reason, and review trail. During incident response, teams can answer exactly what changed and when. This drastically reduces guesswork compared to direct kubectl workflows." },
      { heading: "Team Collaboration", body: "Pull request reviews become the deployment control gate. Platform and application engineers can review infrastructure changes together. This creates shared ownership and better release hygiene." },
      { heading: "Operational Risks", body: "GitOps fails when teams bypass it with ad-hoc cluster edits. If runtime changes are unavoidable during emergency mitigation, they must be codified back into Git immediately after incident stabilization." },
      { heading: "Adoption Path", body: "Start with non-production namespaces, introduce drift alerts, then enable auto-sync and self-heal incrementally. Keep secrets encrypted and policy checks integrated in PR pipeline before reconciliation." },
    ],
  },
  {
    id: 4,
    slug: "kubernetes-namespace-strategy",
    title: "Kubernetes Namespace Strategy for Real Environments",
    level: "Intermediate",
    readTime: "8 min",
    summary:
      "How namespace design affects security, cost control, and blast-radius isolation.",
    sections: [
      { heading: "Boundary Design", body: "Namespaces should represent trust and operational boundaries, not only logical grouping. Typical boundaries are by environment, team, and sensitivity level." },
      { heading: "Governance", body: "Apply resource quotas, default limits, network policies, and role bindings per namespace. This enforces predictable behavior and avoids noisy-neighbor issues." },
      { heading: "Deployment Flow", body: "Promotion across dev, stage, and prod should happen by manifest change, not by manual edits. Namespace parity reduces surprise failures when moving releases." },
      { heading: "Failure Isolation", body: "Namespace isolation limits blast radius during runaway deployments or resource pressure events. Combined with RBAC, it also reduces accidental production impact by non-production users." },
      { heading: "Scaling", body: "As service count grows, avoid one giant shared namespace. Use namespace templates with policy defaults to standardize while keeping operations manageable." },
    ],
  },
  {
    id: 5,
    slug: "observability-metrics-logs-alerts",
    title: "Observability Stack: Metrics, Logs, and Alert Hygiene",
    level: "Intermediate",
    readTime: "10 min",
    summary:
      "Building high-signal dashboards and actionable alerts for Kubernetes workloads.",
    sections: [
      { heading: "Observability Goal", body: "Good observability answers what is failing, where it is failing, and what changed before failure. Raw data without operational context only increases dashboard noise." },
      { heading: "Metrics Strategy", body: "Track golden signals per critical service: latency, traffic, errors, and saturation. Define SLO-linked dashboards so release validation reflects user impact, not just infrastructure health." },
      { heading: "Log Strategy", body: "Collect structured logs with consistent fields: timestamp, correlation id, service, namespace, severity, and request path. This enables fast filtering during incident triage." },
      { heading: "Alert Hygiene", body: "Every page-worthy alert should be actionable and owned. Use inhibition and grouping to suppress duplicates. Add runbook URL directly in alert payload for quicker mitigation." },
      { heading: "Continuous Improvement", body: "Run monthly alert review to remove noisy rules and close blind spots. Observe false positives and missed incidents as first-class reliability metrics." },
    ],
  },
  {
    id: 6,
    slug: "incident-response-lifecycle",
    title: "Incident Response Lifecycle for DevOps Teams",
    level: "Advanced",
    readTime: "9 min",
    summary:
      "A practical incident workflow from detection to postmortem and prevention action items.",
    sections: [
      { heading: "Declare Early", body: "The fastest way to lose time in a major outage is delayed incident declaration. As soon as user impact is confirmed, open incident channel, assign commander, and start timeline logging." },
      { heading: "Role Clarity", body: "Incident commander coordinates and communicates. Subject experts investigate and mitigate. Scribe records decisions and timestamps. Clear roles reduce chaos and duplicated efforts." },
      { heading: "Mitigation First", body: "Restore service quickly through rollback, traffic shaping, or feature flags. Root-cause deep analysis can continue after stabilization unless security risk demands immediate deeper response." },
      { heading: "Communication", body: "Maintain predictable status updates to stakeholders. Share impact scope, expected recovery path, and current risk. Transparent communication prevents escalation confusion." },
      { heading: "Postmortem Quality", body: "A strong postmortem includes timeline, impact, technical root cause, contributing factors, and tracked prevention actions with owners and due dates." },
    ],
  },
  {
    id: 7,
    slug: "terraform-module-design",
    title: "Terraform Module Design for Team-Scale Infrastructure",
    level: "Advanced",
    readTime: "11 min",
    summary:
      "How to structure reusable modules, environment stacks, and controlled apply workflows.",
    sections: [
      { heading: "Repository Model", body: "Split module repository from live environment repository. Modules define reusable primitives. Live repo composes modules per environment with explicit versions." },
      { heading: "Validation Pipeline", body: "CI must run fmt, validate, lint, and security checks before plan. Plans should be attached to pull requests and reviewed before apply is allowed." },
      { heading: "State Management", body: "Use remote state backend with locking. Without lock discipline, concurrent applies can corrupt state and create risky drift." },
      { heading: "Promotion Policy", body: "Promote module versions through dev, stage, and prod with controlled approval gates. Avoid direct production applies from local machines." },
      { heading: "Drift Control", body: "Schedule drift detection jobs and treat unexpected drift as incident-level reliability concern. Reconcile drift through code, not manual cloud console edits." },
    ],
  },
  {
    id: 8,
    slug: "devsecops-shift-left",
    title: "DevSecOps Shift-Left: Practical Security Gates",
    level: "Intermediate",
    readTime: "8 min",
    summary:
      "Implementing security checks early in the pipeline to reduce late-stage release failures.",
    sections: [
      { heading: "Shift-Left Scope", body: "Shift-left is not only adding one scanner. It means integrating dependency checks, static analysis, image scanning, and policy checks before deployment approval." },
      { heading: "Gate Policy", body: "Define severity thresholds by environment. For production branches, critical findings should block merges and releases unless approved exception exists." },
      { heading: "Developer Experience", body: "Security feedback must be readable and mapped to actionable remediation steps. Long noisy reports with no prioritization reduce adoption." },
      { heading: "Exception Workflow", body: "Allow exceptions only with owner, reason, expiration date, and compensating controls. Permanent blanket exceptions destroy security governance." },
      { heading: "Outcome Tracking", body: "Track vulnerability age, gate pass rate, and remediation time. These metrics show whether security posture is truly improving or only checkboxes are passing." },
    ],
  },
  {
    id: 9,
    slug: "container-image-hardening",
    title: "Container Image Hardening Essentials",
    level: "Beginner",
    readTime: "7 min",
    summary:
      "Simple, high-impact practices for safer Docker images in production.",
    sections: [
      { heading: "Base Image Policy", body: "Select minimal, trusted base images and pin versions. Keep image footprint small to reduce CVE surface and startup overhead." },
      { heading: "Runtime Security", body: "Run as non-root user, disable unnecessary Linux capabilities, and mount filesystem read-only where possible." },
      { heading: "Build Strategy", body: "Use multi-stage builds so compile tools do not end up in runtime image. This improves both security and image size." },
      { heading: "Supply Chain", body: "Scan images in CI and sign trusted artifacts before deployment. Enforce signature verification in admission policies." },
      { heading: "Patch Discipline", body: "Refresh base images regularly because CVE risk changes over time. Rebuild and redeploy even if app code is unchanged." },
    ],
  },
  {
    id: 10,
    slug: "nginx-ingress-debugging",
    title: "Nginx Ingress Debugging in Kubernetes",
    level: "Intermediate",
    readTime: "8 min",
    summary:
      "A systematic path to diagnose 404/502/503 issues through ingress, service, and pod layers.",
    sections: [
      { heading: "Top-Down Debugging", body: "Start from ingress resource status and controller logs. Then validate service endpoints and pod readiness. This sequence avoids random trial-and-error." },
      { heading: "Rule Validation", body: "Verify host/path rules and annotations. Small path rewrite mismatch can route traffic to wrong backend or no backend at all." },
      { heading: "Backend Check", body: "Confirm service selectors match pod labels and targetPort matches container port. Many 502 issues are simple port mismatch problems." },
      { heading: "Controller Health", body: "Ingress controller reload failures can keep old config active. Inspect controller logs for config parse errors and upstream connection errors." },
      { heading: "Safe Changes", body: "Use canary ingress or staged rollout for risky routing changes. Validate with synthetic probes before full traffic exposure." },
    ],
  },
  {
    id: 11,
    slug: "slo-based-alerting",
    title: "SLO-Based Alerting Instead of Threshold Spam",
    level: "Advanced",
    readTime: "10 min",
    summary:
      "How to replace noisy static threshold alerts with burn-rate and SLO-aware policies.",
    sections: [
      { heading: "Problem with Static Thresholds", body: "Static CPU or memory thresholds often page teams without user impact. This increases fatigue and slows response quality during real incidents." },
      { heading: "Burn Rate Model", body: "SLO burn-rate alerts evaluate error budget consumption over multiple windows. This catches both sudden severe incidents and slow chronic degradation." },
      { heading: "Alert Design", body: "Pair short-window high-severity alerts with long-window lower-severity alerts. Include service owner, dashboard link, and runbook in alert metadata." },
      { heading: "Operational Benefits", body: "Teams page less frequently for low-impact events and respond faster for high-impact degradation. This improves both reliability outcomes and on-call sustainability." },
      { heading: "Adoption Plan", body: "Start with one critical service, compare old vs new alert volume, and iterate thresholds with real incident data before expanding to all services." },
    ],
  },
  {
    id: 12,
    slug: "secrets-management-gitops",
    title: "Secrets Management in GitOps Workflows",
    level: "Intermediate",
    readTime: "9 min",
    summary:
      "Safe secret handling patterns for teams using Git as deployment source of truth.",
    sections: [
      { heading: "GitOps Secret Risk", body: "GitOps requires configuration in Git, but plaintext credentials in Git are unacceptable. Secret workflows must keep Git auditable while keeping values encrypted." },
      { heading: "Tooling Patterns", body: "Use Sealed Secrets, SOPS, or external secret operators. Encryption keys and decryption permissions should be environment-scoped and access controlled." },
      { heading: "Rotation and Revocation", body: "Secret rotation should be scheduled and tested. During incident response, compromised credentials must be revoked quickly with clear dependency mapping." },
      { heading: "Policy Controls", body: "CI should block raw Secret objects and enforce encrypted secret resources. Admission controls can reject non-compliant manifests at deploy time." },
      { heading: "Auditability", body: "Track who changed secret references, when keys rotated, and where secrets are consumed. This enables security reviews and faster incident containment." },
    ],
  },
];

export const getArticleBySlug = (slug) =>
  articlesData.find((article) => article.slug === slug);
