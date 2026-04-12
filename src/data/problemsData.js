export const problemsData = [
  {
    id: 1,
    slug: "nginx-403-forbidden",
    title: "403 Forbidden on Nginx",
    readTime: "8 min",
    symptoms: "Browser returns 403 and Nginx access log shows denied request.",
    rootCause: "Incorrect file permissions, wrong root path, or missing index file in configured location.",
    impact: "Users cannot access the application even though server process is running.",
    diagnosis: [
      { command: "nginx -t", reason: "Validate syntax and active server block mapping." },
      { command: "ls -la /var/www/<site>", reason: "Check ownership and read permissions for nginx user." },
      { command: "tail -n 100 /var/log/nginx/error.log", reason: "Confirm permission-denied or path mismatch errors." }
    ],
    resolution: [
      "Align server block root path with deployed artifact location.",
      "Set ownership to deployment user and read permission for nginx runtime user.",
      "Reload Nginx after config validation and recheck endpoint.",
    ],
    prevention: [
      "Add deployment pipeline check for file permissions.",
      "Use infrastructure scripts to standardize Nginx vhost setup.",
      "Monitor error-log pattern for rapid 403 spike detection.",
    ],
    verify: "curl -I returns 200 and error log no longer shows access denied entries.",
  },
  {
    id: 2,
    slug: "ssh-publickey-denied",
    title: "SSH Permission Denied (publickey)",
    readTime: "7 min",
    symptoms: "SSH login fails even though key exists locally.",
    rootCause: "Incorrect key permissions, wrong authorized_keys content, or sshd config mismatch.",
    impact: "Engineers cannot access servers for deployment or recovery operations.",
    diagnosis: [
      { command: "ssh -v user@host", reason: "Observe key negotiation and rejection reason." },
      { command: "ls -ld ~/.ssh && ls -l ~/.ssh/authorized_keys", reason: "Validate strict permission model for SSH." },
      { command: "sudo cat /etc/ssh/sshd_config", reason: "Check PubkeyAuthentication and AuthorizedKeysFile settings." }
    ],
    resolution: [
      "Fix permissions: ~/.ssh 700 and authorized_keys 600.",
      "Ensure correct public key exists and has no formatting corruption.",
      "Restart sshd after configuration correction.",
    ],
    prevention: [
      "Manage access through centralized key distribution automation.",
      "Rotate and audit keys periodically.",
      "Keep a controlled emergency access account with strict monitoring.",
    ],
    verify: "Verbose SSH output confirms successful public key authentication.",
  },
  {
    id: 3,
    slug: "k8s-crashloopbackoff",
    title: "Kubernetes Pod CrashLoopBackOff",
    readTime: "9 min",
    symptoms: "Pod restarts repeatedly and never reaches Ready state.",
    rootCause: "Startup command failure, missing env values, or failing readiness/startup checks.",
    impact: "Service becomes partially or fully unavailable and release confidence drops.",
    diagnosis: [
      { command: "kubectl logs <pod> --previous -n <ns>", reason: "Get failure logs from previous crashed container instance." },
      { command: "kubectl describe pod <pod> -n <ns>", reason: "Inspect events, probes, and restart reason." },
      { command: "kubectl get deploy <name> -o yaml -n <ns>", reason: "Validate env, command, image, probes, and resource config." }
    ],
    resolution: [
      "Fix startup command or missing config/secret keys.",
      "Tune startup and readiness probes according to application boot time.",
      "Redeploy via GitOps commit and monitor rollout status.",
    ],
    prevention: [
      "Add startup health tests in CI for production-like runtime config.",
      "Use pre-deploy validation for required environment variables.",
      "Track restart-rate SLO as release quality signal.",
    ],
    verify: "Pods stay Running, restart count stabilizes, and readiness remains healthy.",
  },
  {
    id: 4,
    slug: "loadbalancer-unreachable",
    title: "Service Not Reachable via LoadBalancer",
    readTime: "8 min",
    symptoms: "LoadBalancer IP exists but requests time out.",
    rootCause: "Security group/firewall blocks traffic or service selector has no endpoints.",
    impact: "Public traffic cannot reach the application despite successful deployment.",
    diagnosis: [
      { command: "kubectl get svc <service> -n <ns>", reason: "Confirm external IP, port mapping, and service type." },
      { command: "kubectl get endpoints <service> -n <ns>", reason: "Verify backend pod endpoints are registered." },
      { command: "kubectl get pods -l app=<label> -n <ns>", reason: "Validate selector to pod label alignment." }
    ],
    resolution: [
      "Correct service selector and targetPort configuration.",
      "Open firewall/security-group rules for inbound ports.",
      "Confirm cloud load balancer health check path and protocol.",
    ],
    prevention: [
      "Use deployment tests that validate end-to-end external reachability.",
      "Define standard service templates with validated selectors.",
      "Monitor endpoint count and LB health checks continuously.",
    ],
    verify: "External curl returns successful response and endpoint objects stay populated.",
  },
  {
    id: 5,
    slug: "cicd-dependency-install-failure",
    title: "CI Pipeline Fails at Dependency Install",
    readTime: "7 min",
    symptoms: "Build fails intermittently at package download stage.",
    rootCause: "Transient network issues, corrupted cache, or registry auth expiration.",
    impact: "Release velocity drops and confidence in pipeline stability decreases.",
    diagnosis: [
      { command: "cat pipeline.log | Select-String -Pattern 'timeout|401|checksum'", reason: "Identify exact failure class quickly." },
      { command: "rm -rf <cache-dir>", reason: "Rule out stale or corrupted dependency cache." },
      { command: "curl -I <registry-url>", reason: "Validate registry availability and authentication behavior." }
    ],
    resolution: [
      "Refresh auth token and secure token injection in CI runtime.",
      "Enable deterministic lock-file dependency resolution.",
      "Use retry with exponential backoff for transient network failures.",
    ],
    prevention: [
      "Mirror critical dependencies in internal artifact cache.",
      "Track dependency install failure rate as reliability KPI.",
      "Set pipeline timeout according to real network conditions.",
    ],
    verify: "Multiple consecutive pipeline runs complete dependency stage successfully.",
  },
  {
    id: 6,
    slug: "argocd-outofsync",
    title: "ArgoCD Application OutOfSync",
    readTime: "8 min",
    symptoms: "App stays OutOfSync after deploy commit.",
    rootCause: "Manual cluster drift, failed sync hook, or missing permissions.",
    impact: "Git desired state and runtime state diverge, increasing operational risk.",
    diagnosis: [
      { command: "argocd app get <app>", reason: "Check health, sync state, and latest operation status." },
      { command: "argocd app diff <app>", reason: "Inspect exact drift between Git and cluster." },
      { command: "kubectl auth can-i --list -n <ns>", reason: "Verify ArgoCD service account permissions." }
    ],
    resolution: [
      "Fix manifest drift source in Git and remove manual runtime changes.",
      "Repair failing sync hooks or dependencies.",
      "Run controlled sync and validate health post-sync.",
    ],
    prevention: [
      "Disable direct manual edits on managed namespaces.",
      "Add pre-sync policy checks in CI.",
      "Use drift alerts to catch divergence early.",
    ],
    verify: "Application transitions to Synced and Healthy with no pending drift.",
  },
  {
    id: 7,
    slug: "docker-container-exits",
    title: "Docker Container Exits Immediately",
    readTime: "7 min",
    symptoms: "Container starts and exits with code 1.",
    rootCause: "Entrypoint command error or missing runtime configuration.",
    impact: "Service never becomes available and deployment rollback may trigger.",
    diagnosis: [
      { command: "docker logs <container>", reason: "Capture immediate crash reason." },
      { command: "docker inspect <container>", reason: "Validate entrypoint, command, and env variables." },
      { command: "docker run -it --entrypoint sh <image>", reason: "Test startup path interactively." }
    ],
    resolution: [
      "Correct entrypoint/cmd semantics and startup scripts.",
      "Provide required environment variables and secrets.",
      "Rebuild image and validate with local smoke test before redeploy.",
    ],
    prevention: [
      "Include container startup test in CI.",
      "Use clear error logs for missing config dependencies.",
      "Keep runtime image minimal but with required runtime files.",
    ],
    verify: "Container remains healthy and service endpoint responds successfully.",
  },
  {
    id: 8,
    slug: "ingress-502-503",
    title: "Ingress 502/503 Errors",
    readTime: "8 min",
    symptoms: "Ingress returns bad gateway/service unavailable.",
    rootCause: "Backend service mismatch, no endpoints, or failing upstream health.",
    impact: "Traffic reaches ingress but fails before backend handling.",
    diagnosis: [
      { command: "kubectl get ingress <name> -n <ns> -o yaml", reason: "Validate host/path/backend configuration." },
      { command: "kubectl get endpoints <svc> -n <ns>", reason: "Confirm ready endpoints available." },
      { command: "kubectl logs deploy/<ingress-controller> -n ingress-nginx", reason: "Inspect upstream connection errors." }
    ],
    resolution: [
      "Align ingress backend port with service target port.",
      "Fix selector mismatch so endpoints are registered.",
      "Address upstream pod readiness issues before exposing traffic.",
    ],
    prevention: [
      "Run ingress validation tests in stage environment.",
      "Monitor upstream failure rates per route.",
      "Use canary traffic for risky route changes.",
    ],
    verify: "Ingress routes requests successfully with stable 2xx response profile.",
  },
  {
    id: 9,
    slug: "cpu-throttling",
    title: "High CPU Throttling in Pods",
    readTime: "8 min",
    symptoms: "Latency spikes and CPU throttling alerts fire.",
    rootCause: "CPU limits are too restrictive for burst behavior.",
    impact: "User-facing response time degrades under moderate load.",
    diagnosis: [
      { command: "kubectl top pods -n <ns>", reason: "Inspect live CPU usage against expected profile." },
      { command: "PromQL: rate(container_cpu_cfs_throttled_seconds_total[5m])", reason: "Measure actual throttling frequency." },
      { command: "kubectl describe pod <pod> -n <ns>", reason: "Review resource requests/limits configuration." }
    ],
    resolution: [
      "Adjust CPU requests and limits according to observed traffic pattern.",
      "Enable HPA based on realistic utilization target.",
      "Optimize hot code paths causing sustained CPU spikes.",
    ],
    prevention: [
      "Perform load tests before production scaling decisions.",
      "Track throttling metrics in SLO dashboard.",
      "Review resource policies during each major release.",
    ],
    verify: "Throttling drops, latency normalizes, and alert frequency reduces.",
  },
  {
    id: 10,
    slug: "terraform-state-lock",
    title: "Terraform State Lock Contention",
    readTime: "7 min",
    symptoms: "terraform apply fails due to lock conflict.",
    rootCause: "Concurrent apply or stale lock in remote backend.",
    impact: "Infrastructure change blocked and release window delayed.",
    diagnosis: [
      { command: "terraform force-unlock <LOCK_ID>", reason: "Clear stale lock only after confirming no active run." },
      { command: "Check CI runs for active apply job", reason: "Avoid unlocking an active legitimate operation." },
      { command: "terraform plan -refresh-only", reason: "Validate state consistency before retry apply." }
    ],
    resolution: [
      "Stop parallel applies on same environment.",
      "Introduce pipeline-level apply mutex/serialization.",
      "Re-run plan and apply after lock integrity check.",
    ],
    prevention: [
      "One environment, one apply pipeline rule.",
      "Use remote backend with strict locking and audit trail.",
      "Alert on repeated lock timeouts.",
    ],
    verify: "Apply succeeds and lock is cleanly acquired/released.",
  },
  {
    id: 11,
    slug: "helm-upgrade-break",
    title: "Helm Upgrade Breaks Existing Release",
    readTime: "8 min",
    symptoms: "helm upgrade runs but application becomes unstable.",
    rootCause: "Incompatible chart value change or template behavior drift.",
    impact: "Release appears successful in tooling but service quality degrades.",
    diagnosis: [
      { command: "helm history <release> -n <ns>", reason: "Inspect revision timeline for regression point." },
      { command: "helm diff upgrade <release> <chart> -n <ns>", reason: "Review risky changes before applying." },
      { command: "kubectl get events -n <ns>", reason: "Detect rollout failures caused by chart output." }
    ],
    resolution: [
      "Rollback to previous healthy revision quickly.",
      "Correct values/template mismatch and retest in stage.",
      "Add compatibility checks for chart major/minor updates.",
    ],
    prevention: [
      "Always run helm diff in CI for production changes.",
      "Keep values schema validation in chart tests.",
      "Use progressive rollout for high-risk changes.",
    ],
    verify: "Release status is healthy and service SLO returns to baseline.",
  },
  {
    id: 12,
    slug: "prometheus-target-down",
    title: "Prometheus Target Down",
    readTime: "7 min",
    symptoms: "Service metrics disappear and target state is DOWN.",
    rootCause: "Scrape endpoint unreachable or ServiceMonitor selection mismatch.",
    impact: "Loss of visibility and delayed detection for service incidents.",
    diagnosis: [
      { command: "Prometheus /targets UI", reason: "Check exact scrape error message." },
      { command: "kubectl get servicemonitor -A", reason: "Validate selectors and namespace scope." },
      { command: "kubectl exec -it <prom-pod> -- wget -qO- <target>", reason: "Test scrape endpoint reachability from Prometheus network context." }
    ],
    resolution: [
      "Fix selector mismatch and endpoint path/port.",
      "Correct authentication/TLS settings if required.",
      "Reload config and confirm target recovery.",
    ],
    prevention: [
      "Add monitoring for scrape target availability itself.",
      "Keep telemetry config changes under PR review.",
      "Standardize metrics endpoint conventions.",
    ],
    verify: "Target state flips to UP and dashboards populate metrics again.",
  },
  {
    id: 13,
    slug: "loki-missing-logs",
    title: "Loki Logs Missing for New Namespace",
    readTime: "7 min",
    symptoms: "No logs appear for newly deployed namespace.",
    rootCause: "Promtail scrape/relabel config excludes namespace.",
    impact: "Incident triage becomes slow due to observability blind spot.",
    diagnosis: [
      { command: "kubectl get ds promtail -n logging", reason: "Ensure log collector is healthy across nodes." },
      { command: "kubectl logs ds/promtail -n logging", reason: "Find scrape target and label errors." },
      { command: "Inspect promtail configmap relabel rules", reason: "Validate namespace inclusion filters." }
    ],
    resolution: [
      "Update scrape configuration to include target namespace labels.",
      "Redeploy promtail and verify ingestion pipeline.",
      "Confirm log queries with namespace and pod labels.",
    ],
    prevention: [
      "Use config tests for observability pipeline changes.",
      "Monitor log ingestion rate by namespace.",
      "Create onboarding checklist for new namespaces.",
    ],
    verify: "Loki query returns fresh logs from target namespace services.",
  },
  {
    id: 14,
    slug: "imagepullbackoff",
    title: "ImagePullBackOff in Kubernetes",
    readTime: "8 min",
    symptoms: "Pods stay pending due to image pull failure.",
    rootCause: "Wrong image tag, auth secret issue, or registry connectivity problem.",
    impact: "New release never starts, causing rollout failure or outage.",
    diagnosis: [
      { command: "kubectl describe pod <pod> -n <ns>", reason: "Read exact pull error and auth hints." },
      { command: "kubectl get secret <pull-secret> -n <ns>", reason: "Validate imagePullSecret existence and namespace placement." },
      { command: "Check registry for tag existence", reason: "Ensure deployed manifest references valid image." }
    ],
    resolution: [
      "Publish correct image tag and update deployment manifest.",
      "Fix imagePullSecret and serviceAccount linkage.",
      "Verify node egress access to registry endpoint.",
    ],
    prevention: [
      "Block deploy if image tag missing in registry.",
      "Use immutable tags and release metadata.",
      "Continuously test private registry auth in non-prod.",
    ],
    verify: "Pods pull image and rollout completes to Ready state.",
  },
  {
    id: 15,
    slug: "node-disk-pressure",
    title: "Node Disk Pressure Alerts",
    readTime: "8 min",
    symptoms: "Pods evicted and node condition shows DiskPressure.",
    rootCause: "Excess image/cache/log growth consumes node storage.",
    impact: "Workloads evict unexpectedly and availability drops.",
    diagnosis: [
      { command: "kubectl describe node <node>", reason: "Confirm disk pressure events and eviction details." },
      { command: "ssh <node> 'df -h && du -sh /var/lib/containerd/*'", reason: "Identify dominant storage consumers." },
      { command: "kubectl get events -A | Select-String Evicted", reason: "Map impacted workloads." }
    ],
    resolution: [
      "Clean stale images/layers and enforce log rotation.",
      "Increase node disk where necessary.",
      "Set ephemeral storage requests/limits for heavy workloads.",
    ],
    prevention: [
      "Monitor node disk usage and trend growth.",
      "Automate image garbage collection policies.",
      "Review log retention settings quarterly.",
    ],
    verify: "Node returns to healthy state and eviction events stop.",
  },
  {
    id: 16,
    slug: "ingress-certificate-expired",
    title: "Certificate Expired on Ingress",
    readTime: "8 min",
    symptoms: "TLS handshake fails and browser shows certificate warnings.",
    rootCause: "Automated renewal failed or updated secret not applied.",
    impact: "Secure traffic disrupted; trust and availability both affected.",
    diagnosis: [
      { command: "kubectl get certificate -A", reason: "Check certificate status and renewal condition." },
      { command: "kubectl describe challenge -A", reason: "Investigate ACME/issuer challenge failures." },
      { command: "kubectl get secret <tls-secret> -n <ns> -o yaml", reason: "Verify secret update timestamp and data." }
    ],
    resolution: [
      "Fix issuer/challenge issue and trigger renewal.",
      "Ensure ingress references updated TLS secret.",
      "Reload ingress controller if certificate cache persists.",
    ],
    prevention: [
      "Alert before certificate expiry window closes.",
      "Run periodic renewal dry-runs in stage.",
      "Maintain fallback certificate process for emergencies.",
    ],
    verify: "TLS certificate validity is updated and HTTPS works end-to-end.",
  },
  {
    id: 17,
    slug: "kafka-consumer-lag",
    title: "Kafka Consumer Lag Growing Rapidly",
    readTime: "9 min",
    symptoms: "Consumer lag rises continuously and processing SLA breaches.",
    rootCause: "Consumer throughput lower than incoming message rate or frequent rebalances.",
    impact: "Downstream systems receive stale data and business workflows delay.",
    diagnosis: [
      { command: "kafka-consumer-groups --describe", reason: "Inspect lag by partition and consumer group." },
      { command: "Check consumer pod CPU/memory and logs", reason: "Identify processing bottleneck or errors." },
      { command: "Inspect rebalance frequency", reason: "Detect instability in consumer group membership." }
    ],
    resolution: [
      "Scale consumer instances and tune batch poll parameters.",
      "Stabilize consumer group to reduce rebalance overhead.",
      "Optimize slow downstream calls in processing path.",
    ],
    prevention: [
      "Capacity-test consumers against peak producer rates.",
      "Set lag-based autoscaling policies.",
      "Alert on sustained lag growth instead of single spikes.",
    ],
    verify: "Lag trend turns downward and processing SLA returns to normal.",
  },
  {
    id: 18,
    slug: "github-runner-starvation",
    title: "GitHub Actions Runner Starvation",
    readTime: "7 min",
    symptoms: "Critical workflows stay queued for long durations.",
    rootCause: "Insufficient runner concurrency during peak commit bursts.",
    impact: "Delivery lead time increases and incident hotfixes slow down.",
    diagnosis: [
      { command: "Check Actions queue and runner utilization", reason: "Measure bottleneck objectively." },
      { command: "Review workflow runtime distribution", reason: "Identify heavy jobs causing queue pressure." },
      { command: "Inspect cache hit ratio", reason: "Low cache efficiency increases runner occupancy." }
    ],
    resolution: [
      "Increase runner capacity or autoscaling self-hosted runners.",
      "Split heavyweight workflows and optimize dependencies.",
      "Prioritize release/hotfix pipelines with concurrency rules.",
    ],
    prevention: [
      "Forecast runner capacity based on commit trend.",
      "Optimize cache keys and artifact reuse.",
      "Track queue wait-time as platform SLO.",
    ],
    verify: "Queue time and pipeline lead-time drop to operational target.",
  },
  {
    id: 19,
    slug: "db-connection-pool-exhaustion",
    title: "Database Connection Pool Exhaustion",
    readTime: "9 min",
    symptoms: "Timeout acquiring DB connection and error spikes in API.",
    rootCause: "Pool sizing mismatch, slow queries, or leaked connections.",
    impact: "High request failure and severe latency degradation.",
    diagnosis: [
      { command: "Check DB active connections and wait events", reason: "Identify contention and saturation patterns." },
      { command: "Inspect application pool metrics", reason: "Correlate app-side exhaustion with DB pressure." },
      { command: "Analyze slow query log", reason: "Find long-running queries holding connections." }
    ],
    resolution: [
      "Tune pool limits and timeout values by workload profile.",
      "Fix connection leak paths and ensure proper closing.",
      "Optimize heavy queries and add indexes where required.",
    ],
    prevention: [
      "Load-test connection behavior before major releases.",
      "Alert on high pool usage and wait time.",
      "Review query regressions in release checklist.",
    ],
    verify: "Connection timeout errors stop and latency stabilizes.",
  },
  {
    id: 20,
    slug: "api-rate-limit-false-positive",
    title: "API Rate Limiting Triggered Unexpectedly",
    readTime: "8 min",
    symptoms: "Valid clients receive 429 despite expected request volume.",
    rootCause: "Incorrect identity key extraction or per-pod limiter design.",
    impact: "Legitimate traffic blocked, causing customer-facing failures.",
    diagnosis: [
      { command: "Inspect rate-limit config and key function", reason: "Validate client identity grouping logic." },
      { command: "Review request distribution across replicas", reason: "Detect per-instance limiter inconsistencies." },
      { command: "Analyze 429 logs by tenant/client", reason: "Identify false-positive impacted segments." }
    ],
    resolution: [
      "Use global/shared state limiter for distributed workloads.",
      "Correct client identity extraction logic.",
      "Adjust burst and refill settings using traffic baseline.",
    ],
    prevention: [
      "Simulate real traffic patterns before limiter rollout.",
      "Roll out limiter changes in canary mode.",
      "Track legitimate-429 ratio as a quality metric.",
    ],
    verify: "Valid traffic succeeds while abuse patterns remain controlled.",
  },
];

export const getProblemBySlug = (slug) =>
  problemsData.find((problem) => problem.slug === slug);
