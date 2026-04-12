
const projectDiagrams = {
  1: {
    systemArchitecture: "/images/docs/devsecops-system-architecture.svg",
    metricsPipeline: "/images/docs/devsecops-metrics-pipeline.svg",
    logsPipeline: "/images/docs/devsecops-logs-pipeline.svg",
    alertPipeline: "/images/docs/devsecops-alert-lifecycle.svg",
    incidentResponse: "/images/docs/devsecops-incident-response.svg",
  },
  2: {
    systemArchitecture: "/images/docs/bluegreen-system-architecture.svg",
    metricsPipeline: "/images/docs/bluegreen-metrics-pipeline.svg",
    logsPipeline: "/images/docs/bluegreen-logs-pipeline.svg",
    alertPipeline: "/images/docs/bluegreen-alert-lifecycle.svg",
    incidentResponse: "/images/docs/bluegreen-incident-response.svg",
  },
  3: {
    systemArchitecture: "/images/docs/observability-system-architecture.svg",
    metricsPipeline: "/images/docs/observability-metrics-pipeline.svg",
    logsPipeline: "/images/docs/observability-logs-pipeline.svg",
    alertPipeline: "/images/docs/observability-alert-lifecycle.svg",
    incidentResponse: "/images/docs/observability-incident-response.svg",
  },
  4: {
    systemArchitecture: "/images/docs/terraform-system-architecture.svg",
    metricsPipeline: "/images/docs/terraform-metrics-pipeline.svg",
    logsPipeline: "/images/docs/terraform-logs-pipeline.svg",
    alertPipeline: "/images/docs/terraform-alert-lifecycle.svg",
    incidentResponse: "/images/docs/terraform-incident-response.svg",
  },
  5: {
    systemArchitecture: "/images/docs/hardening-system-architecture.svg",
    metricsPipeline: "/images/docs/hardening-metrics-pipeline.svg",
    logsPipeline: "/images/docs/hardening-logs-pipeline.svg",
    alertPipeline: "/images/docs/hardening-alert-lifecycle.svg",
    incidentResponse: "/images/docs/hardening-incident-response.svg",
  },
};

const sharedAlertMatrix = [
  { severity: "P1", trigger: "User-facing outage or critical data risk", target: "Acknowledge in 5 min, mitigate in 30 min" },
  { severity: "P2", trigger: "Partial service degradation", target: "Acknowledge in 15 min, mitigate in 2 hrs" },
  { severity: "P3", trigger: "Non-critical issue with workaround", target: "Acknowledge in 4 hrs, fix in sprint" },
];

export const projectDocs = {
  1: {
    summary: {
      what: "A production-style DevSecOps and GitOps delivery platform for secure and auditable Kubernetes releases.",
      why: "The goal is to eliminate manual release risk and make every deployment traceable from commit to running workload.",
      how: "Jenkins handles CI quality/security gates, image creation is immutable, and ArgoCD reconciles environment manifests from Git.",
      internalWorking: "A webhook triggers Jenkins. Successful pipeline stages publish a signed image and update GitOps manifests. ArgoCD watches the GitOps repository and applies desired state into environment-specific namespaces.",
      bestPractices: [
        "Keep application repo and deployment manifest repo separate to preserve GitOps clarity.",
        "Use immutable image tags (build id + commit hash).",
        "Protect promotion branches with pull request approval and policy checks."
      ],
      commonMistakes: [
        "Using mutable tags like latest in production.",
        "Skipping rollback rehearsal before production rollout.",
        "Mixing environment secrets directly inside application repository."
      ]
    },
    architectureOverview: "The architecture is split into CI, artifact, GitOps control plane, and Kubernetes runtime plane. CI validates quality and security, artifact registry stores trusted images, GitOps ensures declarative delivery, and runtime namespaces enforce isolation.",
    components: [
      { name: "Jenkins CI", role: "Runs build, test, SAST, and container scan stages.", internalWorking: "Pipeline uses stage gating. A failure in quality or security gate blocks image publication and manifest update." },
      { name: "Artifact Registry", role: "Stores versioned container images used by deployments.", internalWorking: "Images are pushed only after passing CI checks. Tag policy maps image to commit and build metadata." },
      { name: "ArgoCD", role: "Continuously syncs desired state from Git to cluster.", internalWorking: "ArgoCD compares live state with Git manifests and performs reconciliation with health status tracking." },
      { name: "Kubernetes Namespaces", role: "Environment isolation for dev, stage, and prod.", internalWorking: "Namespaces enforce separate quotas, RBAC, network policy, and operational blast-radius boundaries." }
    ],
    deploymentSteps: [
      { step: "Commit and Trigger", what: "Developer merges code into integration branch.", why: "Creates a controlled source of truth for CI.", how: "Git webhook triggers Jenkins pipeline with commit metadata.", internalWorking: "Pipeline context resolves branch policy, environment target, and previous successful build for diff-aware validations.", bestPractices: "Enforce signed commits and branch protection rules.", commonMistakes: "Allowing direct pushes to protected branches." },
      { step: "Build, Test, and Security Gates", what: "Run compile, unit tests, static analysis, and image scan.", why: "Prevent insecure or low-quality artifacts from entering registry.", how: "Jenkins stages execute Maven, SonarQube, and Trivy checks.", internalWorking: "Quality gate result is checked synchronously; failure stops downstream stages.", bestPractices: "Set explicit thresholds for coverage, vulnerabilities, and code smells.", commonMistakes: "Treating scan results as informational instead of blocking." },
      { step: "Image Publish and GitOps Update", what: "Publish immutable image and update deployment manifests.", why: "Connect tested artifact to declarative deployment state.", how: "Pipeline pushes image then commits new image tag into GitOps repo.", internalWorking: "GitOps commit includes release metadata for traceability and rollback index.", bestPractices: "Use bot account with least-privilege write access.", commonMistakes: "Manual manifest edits on cluster bypassing GitOps." },
      { step: "ArgoCD Sync and Verification", what: "ArgoCD applies manifests and reports health.", why: "Guarantees deployed state equals approved Git state.", how: "Auto-sync with prune/self-heal enabled for managed resources.", internalWorking: "Controller compares desired/live state and applies patch operations until healthy.", bestPractices: "Require post-sync health check and smoke test.", commonMistakes: "Ignoring OutOfSync warnings in non-prod until they leak to prod." }
    ],
    observability: {
      metrics: "Prometheus scrapes API latency, error rate, pod restarts, and resource saturation. Grafana dashboards define SLO-aligned views for release validation.",
      logs: "Promtail ships structured logs to Loki with labels for namespace, app, and pod. Queries are mapped to runbook diagnosis steps.",
      alerts: "Alertmanager routes alerts by severity and service ownership. Noise reduction uses inhibition and grouping rules.",
      alertLifecycle: "Signal detected -> rule evaluates threshold -> alert fires -> routed to on-call -> acknowledged -> mitigated -> resolved -> post-incident review.",
      incidentLifecycle: "Detect -> Triage -> Stabilize -> Mitigate -> Recover -> Validate -> Postmortem with action items and owner tracking."
    },
    failureScenarios: [
      { scenario: "ArgoCD sync failure", symptoms: "Application stuck OutOfSync or Degraded.", response: "Check sync events, inspect manifest diff, validate RBAC/CRD dependencies, re-sync after fix.", prevention: "Pre-deploy manifest validation and environment parity checks." },
      { scenario: "Container image vulnerability gate failed", symptoms: "Pipeline blocked before publish stage.", response: "Patch vulnerable base image, rebuild, and re-run scan.", prevention: "Scheduled base image refresh and CVE triage SLA." }
    ],
    scaling: ["Scale CI agents horizontally with ephemeral runners.", "Use namespace-level quotas and cluster autoscaler for predictable growth.", "Partition dashboards and alerts by service tier to avoid cardinality explosion."],
    security: ["Use short-lived credentials for pipeline and registry operations.", "Enforce signed images and admission policy for trusted registries.", "Store secrets in encrypted secret manager; never in plain-text Git."],
    designDecisions: [
      { decision: "GitOps for CD", rationale: "Auditable, declarative, and rollback-friendly deployments.", tradeoff: "Requires strict discipline to avoid direct cluster changes." },
      { decision: "Environment namespace isolation", rationale: "Limits blast radius and supports policy separation.", tradeoff: "More objects to manage and monitor." }
    ],
    runbooks: [
      { title: "Rollback Failed Release", objective: "Restore previous stable version in Kubernetes quickly and safely.", commands: ["kubectl get pods -n prod", "kubectl rollout history deployment/app -n prod", "kubectl rollout undo deployment/app --to-revision=<REVISION> -n prod", "kubectl rollout status deployment/app -n prod"], verification: ["Check pod health and readiness status.", "Confirm error-rate and latency normalize on Grafana dashboard.", "Validate business-critical endpoint with smoke test script."] },
      { title: "Pipeline Gate Failure Investigation", objective: "Identify and clear CI quality/security gate blockers.", commands: ["kubectl logs -n ci deploy/jenkins | tail -n 100", "docker pull <failing-image-tag>", "trivy image <failing-image-tag>", "curl -s <sonarqube-gate-api-endpoint>"], verification: ["Gate status returns pass state.", "No critical vulnerabilities remain open.", "Pipeline re-run reaches artifact publish stage."] }
    ],
    troubleshooting: [
      { issue: "Pods in CrashLoopBackOff after deployment", checks: ["kubectl describe pod <pod> -n <ns>", "kubectl logs <pod> -n <ns> --previous", "kubectl get events -n <ns> --sort-by=.metadata.creationTimestamp"], fix: "Correct env vars/config references, redeploy via GitOps manifest update, and confirm readiness probes." },
      { issue: "ArgoCD app remains OutOfSync", checks: ["argocd app get <app-name>", "argocd app diff <app-name>", "kubectl auth can-i --list -n <ns>"], fix: "Resolve drift source, align manifests, then run controlled sync." }
    ],
    alertMatrix: sharedAlertMatrix,
    diagrams: projectDiagrams[1]
  },
  2: {
    summary: {
      what: "Blue-green release pipeline for zero-downtime Kubernetes deployments.",
      why: "To reduce release risk by validating new version before traffic cutover.",
      how: "Deploy to inactive color, run tests, switch ingress, monitor SLO, auto-rollback on breach.",
      internalWorking: "Traffic is routed through ingress alias. Inactive environment receives new release and validation probes. Only after healthy status and smoke checks pass does cutover occur.",
      bestPractices: ["Keep both color environments operationally symmetrical.", "Automate pre- and post-cutover checks.", "Define objective rollback triggers from SLO thresholds."],
      commonMistakes: ["Using manual cutover without health verification.", "Not validating background workers along with API.", "Ignoring database backward compatibility during rollout."]
    },
    architectureOverview: "Release controller coordinates CI/CD, ingress switching, and observability checks. Blue and green environments are independently healthy and switchable.",
    components: [
      { name: "GitHub Actions", role: "Build and deploy orchestrator.", internalWorking: "Workflow stages include build, push, deploy-inactive, test, switch, verify." },
      { name: "Ingress Controller", role: "Traffic switch between blue and green.", internalWorking: "Ingress backend target points to active service and is patched on cutover." },
      { name: "SLO Monitor", role: "Post-release guardrail.", internalWorking: "Error/latency windows are evaluated for rollback decision." }
    ],
    deploymentSteps: [
      { step: "Prepare Inactive Environment", what: "Deploy new build to inactive color namespace.", why: "Prevents exposing unverified release to users.", how: "CI/CD selects non-live target and applies manifests.", internalWorking: "Release metadata records active/inactive color and target revision.", bestPractices: "Keep env variables and dependencies identical across colors.", commonMistakes: "Configuration drift between blue and green." },
      { step: "Validation and Cutover", what: "Run smoke tests then switch ingress.", why: "Ensures functional correctness before traffic transition.", how: "Automated checks gate ingress patch operation.", internalWorking: "Canary synthetic requests confirm key flows before full cutover.", bestPractices: "Use idempotent switch scripts and transaction-safe DB changes.", commonMistakes: "Switching traffic before readiness and dependency checks." },
      { step: "Post-cutover Monitoring", what: "Observe error and latency burn rates.", why: "Detect hidden regressions quickly.", how: "Dashboard and alert policies evaluate SLO windows.", internalWorking: "If breach sustained for threshold window, rollback job triggers.", bestPractices: "Monitor business KPIs alongside technical metrics.", commonMistakes: "Only checking infrastructure health, ignoring user journey failures." }
    ],
    observability: {
      metrics: "Compare blue vs green request latency, success ratio, and resource trends.",
      logs: "Capture ingress access logs and application logs with color labels for correlation.",
      alerts: "Cutover alerts include deployment id, color, and owning service.",
      alertLifecycle: "Threshold breach triggers alert, on-call validates regression scope, rollback decision is executed, then post-recovery verification.",
      incidentLifecycle: "Incident commander opens timeline, runbook executed, rollback/corrective deploy applied, retrospective documents release risk learnings."
    },
    failureScenarios: [
      { scenario: "Cutover causes elevated 5xx", symptoms: "Error rate spikes after switch", response: "Rollback to previous color, capture diff, inspect downstream dependencies", prevention: "Contract tests and dependency health checks pre-cutover" },
      { scenario: "Inactive color fails smoke test", symptoms: "Validation endpoints fail", response: "Abort release and keep current color active", prevention: "Pre-merge integration tests and environment parity checks" }
    ],
    scaling: ["Pre-scale inactive color before cutover to absorb full traffic.", "Use HPA policies tuned by historical traffic profiles.", "Separate background workers with independent scaling rules."],
    security: ["Restrict ingress patch permissions to deployment automation identity.", "Use signed images and vulnerability policy at deploy gate.", "Protect production switch workflow with approval and audit logs."],
    designDecisions: [
      { decision: "Blue-green over in-place", rationale: "Lowest user-impact during upgrade", tradeoff: "Requires double runtime capacity" },
      { decision: "Automated rollback", rationale: "Faster mitigation under stress", tradeoff: "Needs high-confidence alert thresholds" }
    ],
    runbooks: [
      { title: "Blue-Green Cutover", objective: "Safely route production traffic to validated release.", commands: ["kubectl get deploy -n prod-blue", "kubectl get deploy -n prod-green", "kubectl patch ingress app-ing -n prod -p '<PATCH_JSON>'", "kubectl describe ingress app-ing -n prod"], verification: ["Ingress points to target service.", "Synthetic transactions pass.", "5xx and latency are within SLO bounds."] }
    ],
    troubleshooting: [
      { issue: "Traffic still hits old color after patch", checks: ["kubectl get ingress app-ing -n prod -o yaml", "Check ingress controller logs for reload errors", "Validate DNS and caching layers"], fix: "Reapply ingress patch, flush stale cache, and verify service selectors." }
    ],
    alertMatrix: sharedAlertMatrix,
    diagrams: projectDiagrams[2]
  },
  3: {
    summary: {
      what: "Ye ek practical Kubernetes observability project hai jisme Prometheus, Grafana, Alertmanager aur exporters ko end-to-end setup kiya gaya.",
      why: "Simple reason: app chal rahi hai ya fail ho rahi hai, CPU/memory kaha spike ho raha hai, ye sab instantly dikhna chahiye.",
      how: "Cluster banaya, Helm se kube-prometheus-stack install kiya, dashboards import kiye, PromQL run ki, fir traffic dekar alerts validate kiye.",
      internalWorking: "Prometheus cluster se metrics scrape karta hai, rules evaluate karta hai, Grafana un metrics ko charts me dikhata hai aur Alertmanager issue aate hi notify karta hai.",
      bestPractices: ["Monitoring ke liye alag namespace rakho.", "Warning aur critical alerts alag rakho.", "Load dekar dashboards aur alert dono test karo."],
      commonMistakes: ["App aur Grafana me same NodePort rakh dena.", "Targets check kiye bina dashboards pe trust kar lena.", "Bahut noisy alerts laga dena jisse signal lose ho jaye."]
    },
    architectureOverview: "Flow seedha hai: Kubernetes app + nodes se metrics aate hain, Prometheus unhe scrape karta hai, Grafana me visual dashboards bante hain, aur threshold cross hote hi Alertmanager action trigger karta hai.",
    components: [
      { name: "Prometheus", role: "Metrics collect + alert evaluate", internalWorking: "Kubernetes endpoints scrape karke time-series store karta hai aur rules evaluate karta hai." },
      { name: "Grafana", role: "Visualization layer", internalWorking: "Prometheus datasource se query run karke dashboards me live trends show karta hai." },
      { name: "Alertmanager", role: "Alert handling", internalWorking: "Prometheus se fire huye alerts receive karke group/routing ke saath response flow chalata hai." },
      { name: "Node Exporter", role: "Node telemetry source", internalWorking: "Node level CPU, memory, disk, network stats expose karta hai jise Prometheus scrape karta hai." }
    ],
    deploymentSteps: [
      { step: "Cluster Ready Karo", what: "Kind ya Kubernetes cluster banake sample app deploy karo.", why: "Jab tak workloads run nahi karenge tab tak useful metrics nahi milenge.", how: "Control-plane + workers setup karo aur app pods/services verify karo.", internalWorking: "Service discovery ke through monitoring stack targets auto-detect karta hai.", bestPractices: "App aur monitoring namespaces alag rakho.", commonMistakes: "Pods ready hone se pehle hi dashboards judge kar lena." },
      { step: "Helm Se Monitoring Install Karo", what: "kube-prometheus-stack install karo.", why: "Ek command flow me Prometheus, Grafana, Alertmanager setup ho jata hai.", how: "Monitoring namespace create karke Helm repo add + install command chalao.", internalWorking: "Helm manifests generate karta hai aur Prometheus targets scrape start kar deta hai.", bestPractices: "Values file ko version control me rakho.", commonMistakes: "Default ports blindly use karke port clash kara dena." },
      { step: "Dashboard + Alert Real Test", what: "PromQL run karo, dashboard import karo, traffic spike test karo.", why: "Production type confidence tabhi aata hai jab monitoring ko real load par validate karo.", how: "Voting app par requests bhejo aur Grafana/Prometheus me spike observe karo.", internalWorking: "Rule condition meet hote hi alert firing state me jata hai aur Alertmanager route karta hai.", bestPractices: "Har important metric ka ek actionable alert banao.", commonMistakes: "Noisy alert set karke fatigue create kar dena." }
    ],
    observability: {
      metrics: "Node CPU, pod memory, restarts, service health aur network traffic ke trend continuously track hote hain.",
      logs: "Metrics ke saath logs correlate karke root cause jaldi pakda jata hai.",
      alerts: "Prometheus rules warning/critical alert fire karte hain aur Alertmanager unko route karta hai.",
      alertLifecycle: "Threshold cross -> rule fire -> alert route -> acknowledge -> fix -> close.",
      incidentLifecycle: "Detect -> confirm -> triage -> mitigate -> recover -> verify."
    },
    failureScenarios: [
      { scenario: "Prometheus target down", symptoms: "Grafana me panel blank aur target Down dikhe", response: "Service endpoint, labels aur target status page check karo", prevention: "Exporter uptime aur scrape health ke alerts bhi rakho" },
      { scenario: "Alert spam", symptoms: "Har thodi der me same alert aana", response: "Threshold aur evaluation window tune karo", prevention: "Warning/critical separation aur practical load testing karo" }
    ],
    scaling: ["Heavy queries ke liye recording rules use karo.", "Cluster-wise/service-wise dashboards split karo.", "Load badhe to Prometheus resources aur retention tune karo."],
    security: ["Grafana admin access minimum users ko do.", "RBAC se monitoring namespace restrict rakho.", "Monitoring ports public expose karne se pehle controls lagao."],
    designDecisions: [
      { decision: "Helm-based install", rationale: "Fast setup aur repeatable deployment", tradeoff: "Production use case ke liye values tuning karni padti hai" },
      { decision: "Prometheus + Grafana combo", rationale: "Battle-tested monitoring stack", tradeoff: "Initial stage me alert noise tuning effort lagta hai" }
    ],
    runbooks: [
      { title: "High CPU Usage Alert", objective: "CPU spike ka source pakadna aur workload stable state me lana.", commands: ["kubectl get pods -A", "kubectl top pods -A", "kubectl top nodes", "kubectl port-forward svc/kube-prometheus-stack-prometheus 9090:9090 -n monitoring"], verification: ["Grafana panel me CPU trend normal range me aaye.", "Critical CPU alert clear ho.", "App response time stable ho." ] }
    ],
    troubleshooting: [
      { issue: "Grafana me data nahi aa raha", checks: ["Grafana datasource me Prometheus URL check karo", "Prometheus targets page verify karo", "Prometheus UI me direct PromQL run karo"], fix: "Datasource ya scrape connectivity sahi karo aur dashboard refresh karo." }
    ],
    alertMatrix: sharedAlertMatrix,
    diagrams: projectDiagrams[3]
  },
  4: {
    summary: {
      what: "Ye Terraform project AWS infra ko code ke through automate karta hai aur same template se multiple environments khade karta hai.",
      why: "Manual console setup me mistakes aur inconsistency hoti hai, Terraform se repeatable aur predictable infra milta hai.",
      how: "HCL me resources define kiye, IAM based provider setup kiya, plan/apply flow chalaya aur modules se dev-staging-prod environments banaye.",
      internalWorking: "Terraform config + current state compare karke execution plan banata hai, phir sirf required create/update/destroy actions AWS par apply karta hai.",
      bestPractices: ["Har run se pehle plan dekhna mandatory rakho.", "Variables aur outputs properly structure karo.", "Duplicate code hataane ke liye module-first approach rakho."],
      commonMistakes: ["Hardcoded names/values rakh dena.", "State file ko ignore karna.", "Plan dekhe bina direct apply kar dena."]
    },
    architectureOverview: "Base Terraform modules common infra define karte hain, aur har environment (dev, staging, prod) alag inputs dekar apna customized stack deploy karta hai.",
    components: [
      { name: "Terraform Core", role: "Plan and apply engine", internalWorking: "Desired configuration aur current state compare karke execution graph banata hai." },
      { name: "AWS Provider", role: "Cloud bridge", internalWorking: "IAM credentials use karke EC2, S3, SG, DynamoDB jaise resources create/update karta hai." },
      { name: "Terraform Modules", role: "Reusable infra templates", internalWorking: "Same resource logic ko parameterize karke multiple environments me reuse karta hai." }
    ],
    deploymentSteps: [
      { step: "Basic Infra as Code Setup", what: "Provider, credentials aur initial resources define karo.", why: "AWS resources code me declare honge tabhi automation reliable banega.", how: "Provider block + IAM creds + EC2/S3/DynamoDB/SG blocks likho.", internalWorking: "Apply ke baad Terraform state me real resource mapping save hoti hai.", bestPractices: "Resource naming me environment prefix rakho.", commonMistakes: "Different files me random naming follow karna." },
      { step: "Init -> Plan -> Apply Discipline", what: "Terraform lifecycle commands consistently run karo.", why: "Plan output se unintended changes pehle hi pakad aate hain.", how: "terraform init, terraform plan, review, then terraform apply.", internalWorking: "State file drift detect karne aur next plans ko accurate rakhne me help karta hai.", bestPractices: "Critical resources ke outputs expose karo.", commonMistakes: "Plan differences ko ignore kar dena." },
      { step: "Module Se Multi-Env Automation", what: "Dev/staging/prod ek hi template se deploy karo.", why: "Maintainability aur speed dono improve hote hain.", how: "Module bana kar har environment ke liye alag variable values pass karo.", internalWorking: "Same module different input ke saath different sized infra stack banata hai.", bestPractices: "Instance type, count aur naming ko variable-driven rakho.", commonMistakes: "Copy-paste infra bana kar future drift create karna." }
    ],
    observability: {
      metrics: "Apply duration, success/failure rate aur drift frequency track karo.",
      logs: "Har plan/apply run ka log archive karo taaki rollback/debug easy ho.",
      alerts: "Failed apply, lock issue, unexpected drift par instant alert bhejo.",
      alertLifecycle: "Apply fail -> notify -> state/log inspect -> fix -> rerun -> verify.",
      incidentLifecycle: "Issue detect -> impact assess -> corrective plan -> apply -> validate restore."
    },
    failureScenarios: [
      { scenario: "State mismatch / drift", symptoms: "Plan me unexpected create ya destroy dikhna", response: "State inspect karo, out-of-band changes reconcile karo", prevention: "Manual console edits avoid karo" },
      { scenario: "Dependency fail during apply", symptoms: "Mid-run me resource create fail", response: "Reference/config fix karke plan dobara run karo", prevention: "Variables aur dependencies upfront validate karo" }
    ],
    scaling: ["Module reuse se infra rollout speed badhao.", "Environment-wise state handling rakho.", "Common resources ko template based maintain karo."],
    security: ["Least-privilege IAM creds use karo.", "Secrets repo me commit mat karo.", "State aur sensitive outputs secure location me rakho."],
    designDecisions: [
      { decision: "Module-first structure", rationale: "Same template se fast multi-env provisioning", tradeoff: "Shuru me module design me extra time lagta hai" },
      { decision: "Plan-first workflow", rationale: "Safe aur predictable infra changes", tradeoff: "Har change me review step add hota hai" }
    ],
    runbooks: [
      { title: "Recover from Failed Terraform Apply", objective: "Partial fail ke baad infra ko safe state me wapas lana.", commands: ["terraform state list", "terraform plan -refresh-only", "terraform plan", "terraform apply"], verification: ["Plan expected dikhe.", "Failed resources recover ho jayein.", "Environment services reachable ho." ] }
    ],
    troubleshooting: [
      { issue: "Terraform plan unexpected aa raha hai", checks: ["Recent variable changes check karo", "State entries verify karo", "Manual AWS console changes confirm karo"], fix: "Config aur state align karke fresh plan/apply run karo." }
    ],
    alertMatrix: sharedAlertMatrix,
    diagrams: projectDiagrams[4]
  },
  5: {
    summary: {
      what: "Kubernetes hardening and policy enforcement platform with secure GitOps delivery.",
      why: "To block insecure workloads before runtime and enforce consistent compliance.",
      how: "Admission policies, secret encryption workflow, CI policy checks, and controlled GitOps promotion.",
      internalWorking: "Policy engines evaluate manifests at admission time. CI validates policy and vulnerability posture before merge. ArgoCD deploys only compliant configurations.",
      bestPractices: ["Fail fast in CI for policy violations.", "Use exception workflow with time-bound approvals.", "Version-control all policy definitions and tests."],
      commonMistakes: ["Applying policies directly in production without staging validation.", "Allowing broad wildcard policy exceptions.", "Not monitoring policy engine performance impact."]
    },
    architectureOverview: "Security is enforced in two layers: pre-deploy CI validation and in-cluster admission policy checks. GitOps ensures only reviewed manifests are promoted.",
    components: [
      { name: "Policy Engine (Kyverno/Gatekeeper)", role: "Admission control and compliance", internalWorking: "Evaluates incoming resources against policy rules and denies non-compliant specs." },
      { name: "Sealed Secrets", role: "Encrypted secret management", internalWorking: "Public-key encryption allows secure secret storage in Git while decryption occurs inside cluster." },
      { name: "GitOps Controller", role: "Controlled manifest promotion", internalWorking: "Syncs approved manifests; failed policy checks prevent successful rollout." }
    ],
    deploymentSteps: [
      { step: "Policy Baseline", what: "Define mandatory workload security policies.", why: "Create secure-by-default guardrails.", how: "Write policy rules for privileged mode, image tags, registry allowlist, and resource limits.", internalWorking: "Policy admission webhook intercepts API server requests and evaluates compliance.", bestPractices: "Start in audit mode then move to enforce mode after validation.", commonMistakes: "Hard fail all namespaces without phased rollout." },
      { step: "Secure Secret Workflow", what: "Encrypt and version-control secrets safely.", why: "Prevent credential exposure in source control.", how: "Generate SealedSecret resources from plaintext in trusted environment.", internalWorking: "Controller decrypts sealed payload only inside authorized cluster context.", bestPractices: "Rotate sealing keys and application credentials regularly.", commonMistakes: "Committing raw Secret manifests by mistake." },
      { step: "Policy-Aware Delivery", what: "Integrate compliance checks into CI and CD.", why: "Shift-left security and avoid runtime surprises.", how: "CI validates manifests and image scans before merge; GitOps deploys approved manifests.", internalWorking: "Rejected resources surface policy violation events for rapid correction.", bestPractices: "Map each policy failure to remediation docs.", commonMistakes: "Treating policy exceptions as permanent fixes." }
    ],
    observability: {
      metrics: "Track policy denial count, admission latency, and compliance trend by namespace.",
      logs: "Collect admission controller logs and CI compliance logs for audit trails.",
      alerts: "Notify security/platform teams for repeated policy violations or secret workflow failures.",
      alertLifecycle: "Violation detected -> policy alert -> ownership routing -> remediation -> verify compliant redeploy.",
      incidentLifecycle: "Security event declared -> contain exposure -> rotate secrets -> patch policy/control gaps -> post-incident hardening."
    },
    failureScenarios: [
      { scenario: "Critical workload blocked by policy", symptoms: "Deployment denied by admission webhook", response: "Use temporary reviewed exception and implement compliant fix", prevention: "Pre-validate manifests in CI with same policy bundle" },
      { scenario: "Sealed secret decryption failure", symptoms: "Pods fail due to missing secrets", response: "Re-seal using current public key and reapply", prevention: "Key rotation runbook and secret generation automation" }
    ],
    scaling: ["Partition policy sets by environment and workload tier.", "Load-test admission webhook latency under burst deployments.", "Introduce policy test harness for large rule sets."],
    security: ["Enforce least privilege for CI/CD and GitOps identities.", "Audit policy exceptions with expiration and approver metadata.", "Continuously scan images and base layers for new CVEs."],
    designDecisions: [
      { decision: "Policy-as-code enforcement", rationale: "Repeatable and auditable security controls", tradeoff: "Requires mature exception governance" },
      { decision: "Encrypted Git secret model", rationale: "Secure collaboration with GitOps workflow", tradeoff: "Operational overhead for key lifecycle" }
    ],
    runbooks: [
      { title: "Resolve Policy Denial in Production Deployment", objective: "Restore deployment while maintaining compliance controls.", commands: ["kubectl describe -n <ns> deploy/<name>", "kubectl get events -n <ns> --sort-by=.metadata.creationTimestamp", "kubectl get policyreport -A", "kubectl apply -f <corrected-manifest>.yaml"], verification: ["Policy violations cleared for workload.", "Pods become Ready and pass probes.", "No new critical security alerts are fired."] }
    ],
    troubleshooting: [
      { issue: "Unexpected policy denials after rule update", checks: ["Compare old vs new policy definitions", "Run policy tests against known-good manifests", "Check exclusion scopes and namespace selectors"], fix: "Adjust rule specificity, retest in stage namespace, then promote controlled rollout." }
    ],
    alertMatrix: sharedAlertMatrix,
    diagrams: projectDiagrams[5]
  }
};


