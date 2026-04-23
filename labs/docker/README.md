# Docker

Container build, scan, and delivery flow.

## Overview

This track keeps 3 practical projects and 10 interview questions around Docker.

## Projects

### Project 1: Multi-stage Build Optimizer

Shrink container images with a clean multi-stage build and minimal runtime layers.

- Stack: Docker, multi-stage, alpine, Nginx
- Resume link: https://github.com/devopsghazali/resume/blob/main/labs/docker/README.md#multi-stage-build-optimizer

### Project 2: Scan Before Publish Gate

Build an image, scan it, and stop the release if the scan fails.

- Stack: Docker, Trivy, GitHub Actions, registry
- Resume link: https://github.com/devopsghazali/resume/blob/main/labs/docker/README.md#scan-before-publish-gate

### Project 3: Compose Delivery Stack

Run frontend, backend, and database locally with Docker Compose.

- Stack: Docker, Compose, PostgreSQL, Nginx
- Resume link: https://github.com/devopsghazali/resume/blob/main/labs/docker/README.md#compose-delivery-stack

## Interview Questions

1. Why is a multi-stage Dockerfile useful?
2. How do you reduce image size without breaking the app?
3. What should go in CMD and what should go in ENTRYPOINT?
4. How do you cache layers effectively?
5. How do you pass secrets into a container safely?
6. Why should you avoid running as root in containers?
7. How do you troubleshoot a container that exits immediately?
8. What is the difference between bind mounts and volumes?
9. How do you tag images for traceability?
10. How do you scan an image before push?

## Repo Link

https://github.com/devopsghazali/resume/tree/main/labs/docker
