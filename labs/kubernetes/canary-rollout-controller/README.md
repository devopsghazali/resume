# Canary Rollout Controller

Shift traffic gradually and rollback fast if metrics regress.

Track: Kubernetes
Repo: https://github.com/devopsghazali/resume/tree/main/labs/kubernetes/canary-rollout-controller

## Stack

- Kubernetes
- Canary
- Ingress
- Prometheus

## Files

- app.py
- k8s/deployment.yaml
- k8s/service.yaml

## Interview Questions

1. When do you use a Deployment instead of a StatefulSet?
2. Why are readiness and liveness probes different?
3. How do Services select the right pods?
4. What is the safest way to roll back a bad release?
5. How do you separate config from code in Kubernetes?
6. Why are resource requests and limits important?
7. How do you debug CrashLoopBackOff quickly?
8. What is the role of ingress in a service architecture?
9. How do you keep namespaces isolated?
10. How do you decide if a canary is healthy?