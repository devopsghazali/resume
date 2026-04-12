from pathlib import Path


def pdf_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def make_pdf(output: Path) -> None:
    width = 595
    height = 842

    lines = [
        ("F2", 20, 40, 792, "DevOps Ghazali"),
        ("F1", 11, 40, 772, "DevOps / Cloud / Platform Engineering"),
        ("F1", 10, 40, 754, "Email: devopsghazali@gmail.com    GitHub: github.com/devopsghazali    LinkedIn: linkedin.com/in/devops-hasnain"),
        ("F2", 12, 40, 724, "Summary"),
        ("F1", 10, 40, 708, "Hands-on DevOps learner and builder focused on Kubernetes, CI/CD, Terraform, Docker, and GitOps."),
        ("F1", 10, 40, 694, "Builds practical projects that explain release safety, observability, infrastructure automation, and security."),
        ("F2", 12, 40, 666, "Skills"),
        ("F1", 10, 40, 650, "Cloud: AWS"),
        ("F1", 10, 40, 636, "Containers: Docker, Kubernetes"),
        ("F1", 10, 40, 622, "CI/CD: Jenkins, GitHub Actions, Argo CD"),
        ("F1", 10, 40, 608, "Infrastructure: Terraform, Ansible"),
        ("F1", 10, 40, 594, "Monitoring: Prometheus, Grafana"),
        ("F1", 10, 40, 580, "Scripting: Bash, Python"),
        ("F2", 12, 40, 552, "Projects"),
        ("F1", 10, 40, 536, "AWS DevSecOps GitOps Release Pipeline - Jenkins CI, Docker build, security scans, Argo CD GitOps deploy."),
        ("F1", 10, 40, 522, "Kubernetes Canary Rollout - stable and canary deployments with metrics-based promotion and rollback."),
        ("F1", 10, 40, 508, "Terraform Multi-Environment AWS Baseline - reusable modules for dev, staging, and prod."),
        ("F1", 10, 40, 494, "Kubernetes Observability Stack - Prometheus, Grafana, and alerting for cluster visibility."),
        ("F1", 10, 40, 480, "Docker Build, Scan, and Publish Pipeline - container build, scan, and trusted publish flow."),
        ("F2", 12, 40, 466, "Education"),
        ("F1", 10, 40, 450, "Bachelor's in Humanities"),
        ("F1", 10, 40, 436, "Focus shifted to real-world DevOps and systems work through hands-on projects."),
        ("F2", 12, 40, 408, "Highlights"),
        ("F1", 10, 40, 392, "Practices plan-first infrastructure changes, immutable image tagging, GitOps promotion, and fast rollback thinking."),
        ("F1", 10, 40, 378, "Keeps learning in public and explains systems in a practical, interview-ready way."),
    ]

    content = ["BT"]
    for font, size, x, y, text in lines:
        content.append(f"/{font} {size} Tf")
        content.append(f"1 0 0 1 {x} {y} Tm")
        content.append(f"({pdf_escape(text)}) Tj")
    content.append("ET")
    content_stream = "\n".join(content).encode("utf-8")

    objects = []
    objects.append(b"1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n")
    objects.append(b"2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n")
    objects.append(
        f"3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 {width} {height}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >> endobj\n".encode(
            "utf-8"
        )
    )
    objects.append(b"4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n")
    objects.append(b"5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj\n")
    objects.append(f"6 0 obj << /Length {len(content_stream)} >> stream\n".encode("utf-8") + content_stream + b"\nendstream endobj\n")

    pdf = bytearray()
    pdf.extend(b"%PDF-1.4\n")
    offsets = [0]
    for obj in objects:
        offsets.append(len(pdf))
        pdf.extend(obj)
    xref_start = len(pdf)
    pdf.extend(f"xref\n0 {len(offsets)}\n".encode("utf-8"))
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode("utf-8"))
    pdf.extend(b"trailer << /Size 7 /Root 1 0 R >>\n")
    pdf.extend(f"startxref\n{xref_start}\n%%EOF".encode("utf-8"))

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(pdf)


if __name__ == "__main__":
    make_pdf(Path(__file__).resolve().parents[1] / "public" / "cv" / "devops-ghazali-cv.pdf")
