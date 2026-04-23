# Terraform

Infrastructure as Code for repeatable cloud setup.

## Overview

This track keeps 3 practical projects and 10 interview questions around Terraform.

## Projects

### Project 1: AWS Baseline Foundation

Provision the first safe AWS baseline with core networking and compute blocks.

- Stack: Terraform, AWS, IAM, EC2
- Resume link: https://github.com/devopsghazali/resume/blob/main/labs/terraform/README.md#aws-baseline-foundation

### Project 2: Multi-Environment Module Stack

Reuse the same module for dev, staging, and prod with different inputs.

- Stack: Terraform, modules, variables, state
- Resume link: https://github.com/devopsghazali/resume/blob/main/labs/terraform/README.md#multi-environment-module-stack

### Project 3: Remote State and Networking Guardrails

Protect state and keep networking rules repeatable and controlled.

- Stack: Terraform, S3, DynamoDB, VPC
- Resume link: https://github.com/devopsghazali/resume/blob/main/labs/terraform/README.md#remote-state-and-networking-guardrails

## Interview Questions

1. Why is remote state important?
2. How do you structure reusable Terraform modules?
3. What is the difference between plan and apply?
4. How do you prevent manual drift in AWS?
5. Why do you lock state with DynamoDB?
6. How do variables and outputs improve module reuse?
7. When would you use count versus for_each?
8. How do you safely destroy test infrastructure?
9. How do you manage secrets in Terraform workflows?
10. How do you review a risky plan before apply?

## Repo Link

https://github.com/devopsghazali/resume/tree/main/labs/terraform
