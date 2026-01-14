export const projects = [
  {
    id: 1,
    title: "DevSecOps + GitOps CI/CD Pipeline",
    description:
      "End-to-end pipeline with Jenkins CI, security scans, Docker image build, GitOps-based Kubernetes deployment using ArgoCD.",
    image: "/images/devsecops-pipeline.svg", // diagram / image
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
     links: {
      ci: "https://github.com/devopsghazali/ci_cd_automation.git",
      gitops: "https://github.com/devopsghazali/k8s-argocd.git",
    },
  },
];
