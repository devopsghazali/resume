# Kubernetes

Workload deployment, rollout safety, and platform patterns.

## Overview

This track keeps 3 practical projects and 10 interview questions around Kubernetes.

## Projects

### Project 1: Three-Tier Application Platform

Deploy frontend, API, and PostgreSQL as separate Kubernetes workloads.

- Stack: Kubernetes, Flask, Nginx, PostgreSQL
- Repo: https://github.com/devopsghazali/resume/tree/main/labs/kubernetes/three-tier-application-platform

### Project 2: Canary Rollout Controller

Shift traffic gradually and rollback fast if metrics regress.

- Stack: Kubernetes, Canary, Ingress, Prometheus
- Repo: https://github.com/devopsghazali/resume/tree/main/labs/kubernetes/canary-rollout-controller

### Project 3: Config and Secret Delivery Lab

Manage ConfigMaps, Secrets, probes, and resource limits in one app.

- Stack: Kubernetes, ConfigMap, Secret, Probes
- Repo: https://github.com/devopsghazali/resume/tree/main/labs/kubernetes/config-and-secret-delivery-lab

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

## Track Repo

https://github.com/devopsghazali/resume/tree/main/labs/kubernetes
