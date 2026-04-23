# Multi-stage Build Optimizer

Shrink container images with a clean multi-stage build and minimal runtime layers.

Track: Docker
Repo: https://github.com/devopsghazali/resume/tree/main/labs/docker/multi-stage-build-optimizer

## Stack

- Docker
- multi-stage
- alpine
- Nginx

## Files

- app.py
- Dockerfile
- scan.sh

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