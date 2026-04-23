# Remote State and Networking Guardrails

Protect state and keep networking rules repeatable and controlled.

Track: Terraform
Repo: https://github.com/devopsghazali/resume/tree/main/labs/terraform/remote-state-and-networking-guardrails

## Stack

- Terraform
- S3
- DynamoDB
- VPC

## Files

- main.tf
- variables.tf
- outputs.tf

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