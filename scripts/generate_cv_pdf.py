from pathlib import Path
from textwrap import wrap


def pdf_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def add_text(lines, font, size, x, y, text, color=(0, 0, 0)):
    r, g, b = color
    lines.append(f"{r:.3f} {g:.3f} {b:.3f} rg")
    lines.append(f"/{font} {size} Tf")
    lines.append(f"1 0 0 1 {x} {y} Tm")
    lines.append(f"({pdf_escape(text)}) Tj")


def add_wrapped(lines, font, size, x, y, text, width_chars, line_height, color=(0.16, 0.18, 0.22)):
    current_y = y
    for paragraph in text.split("\n"):
      wrapped = wrap(paragraph, width_chars) or [""]
      for chunk in wrapped:
        add_text(lines, font, size, x, current_y, chunk, color=color)
        current_y -= line_height
      current_y -= line_height * 0.25
    return current_y


def add_section_title(lines, title, x, y, width, accent=(0.11, 0.82, 0.89)):
    lines.append(f"{accent[0]:.3f} {accent[1]:.3f} {accent[2]:.3f} rg")
    lines.append(f"{x} {y - 3} {width} 2.5 re f")
    add_text(lines, "F2", 12, x, y, title, color=(0.08, 0.11, 0.16))


def make_pdf(output: Path) -> None:
    width = 595
    height = 842
    margin = 40

    left_x = margin
    left_w = 190
    right_x = 250
    right_w = width - right_x - margin

    lines = []

    # Page background
    lines.append("1 1 1 rg")
    lines.append(f"0 0 {width} {height} re f")

    # Header band
    lines.append("0.063 0.082 0.129 rg")
    lines.append(f"0 {height - 118} {width} 118 re f")
    lines.append("0.114 0.827 0.922 rg")
    lines.append(f"0 {height - 122} {width} 4 re f")

    add_text(lines, "F2", 22, margin, 780, "Hasnain Ghazali", color=(1, 1, 1))
    add_text(lines, "F1", 11, margin, 762, "DevOps Engineer | Kubernetes | Terraform | GitOps", color=(0.76, 0.88, 0.95))
    add_text(
        lines,
        "F1",
        9.2,
        margin,
        744,
        "devopsghazali@gmail.com  |  github.com/devopsghazali  |  linkedin.com/in/devops-hasnain",
        color=(0.93, 0.96, 0.99),
    )
    add_text(
        lines,
        "F1",
        8.8,
        margin,
        728,
        "Hands-on learner building real-world DevOps projects with practical delivery, observability, and security workflows.",
        color=(0.82, 0.89, 0.95),
    )

    y = 690

    add_section_title(lines, "Summary", left_x, y, left_w)
    y -= 18
    y = add_wrapped(
        lines,
        "F1",
        9.7,
        left_x,
        y,
        "Hands-on DevOps builder focused on Linux, Kubernetes, Terraform, Docker, and GitOps. Builds practical, interview-ready systems around release safety, observability, infrastructure automation, and secure delivery.",
        width_chars=34,
        line_height=12,
    )

    y -= 8
    add_section_title(lines, "Skills", left_x, y, left_w)
    y -= 18
    skills = [
        "Cloud: AWS",
        "Containers: Docker, Kubernetes, NGINX Ingress",
        "CI/CD: Jenkins, GitHub Actions, Argo CD",
        "IaC: Terraform, Ansible",
        "Monitoring: Prometheus, Grafana, Alertmanager",
        "Security: Kyverno, OPA Gatekeeper, Sealed Secrets, Trivy",
        "Systems: Linux, Networking, Git, Bash",
    ]
    for skill in skills:
        add_wrapped(lines, "F1", 8.9, left_x, y, skill, width_chars=34, line_height=11)
        y -= 11 * (1 + len(wrap(skill, 34)))

    y -= 6
    add_section_title(lines, "Education", left_x, y, left_w)
    y -= 18
    y = add_wrapped(lines, "F1", 9.2, left_x, y, "Bachelor's in Humanities", width_chars=34, line_height=11)
    y = add_wrapped(
        lines,
        "F1",
        8.8,
        left_x,
        y - 2,
        "Shifted into DevOps and systems engineering through hands-on projects and self-driven learning from February 2025 onward.",
        width_chars=34,
        line_height=11,
    )

    y -= 8
    add_section_title(lines, "Build Style", left_x, y, left_w)
    y -= 18
    style_points = [
        "Learn fundamentals once, then apply them through real projects.",
        "Prefer automation, repeatability, and rollback-first thinking.",
        "Keep explanations simple, practical, and interview ready.",
    ]
    for point in style_points:
        add_wrapped(lines, "F1", 8.7, left_x, y, f"- {point}", width_chars=34, line_height=11)
        y -= 11 * (1 + len(wrap(point, 34)))

    ry = 690
    add_section_title(lines, "Projects", right_x, ry, right_w)
    ry -= 18

    project_blocks = [
        (
            "AWS DevSecOps GitOps Release Pipeline",
            "Jenkins CI, Docker build, SonarQube and Trivy checks, then Argo CD GitOps deploy to Kubernetes.",
        ),
        (
            "Docker Build, Scan, and Publish Pipeline",
            "Blue-green container release with image scanning, smoke checks, and traffic-safe promotion.",
        ),
        (
            "Kubernetes Observability Stack",
            "Prometheus, Grafana, and Alertmanager for cluster visibility, dashboards, and alert validation.",
        ),
        (
            "Terraform Multi-Environment AWS Baseline",
            "Reusable modules for dev, staging, and prod with state-managed provisioning and safe apply flow.",
        ),
        (
            "GitOps Kubernetes Hardening and Policy Control",
            "Kyverno, OPA Gatekeeper, Sealed Secrets, and CI policy checks for secure-by-default delivery.",
        ),
        (
            "Kubernetes Canary Rollout with Metrics Promotion",
            "Stable/canary promotion driven by health checks, metrics, and immediate rollback on regression.",
        ),
    ]

    for title, body in project_blocks:
        add_text(lines, "F2", 9.7, right_x, ry, title, color=(0.08, 0.11, 0.16))
        ry -= 12
        ry = add_wrapped(lines, "F1", 8.7, right_x, ry, body, width_chars=45, line_height=10.5)
        ry -= 6

    ry -= 2
    add_section_title(lines, "Highlights", right_x, ry, right_w)
    ry -= 18
    highlight_points = [
        "Impact + tools + real work, not generic story bullets.",
        "Focuses on release safety, observability, and system design.",
        "Every project has a GitHub repo linked from the portfolio.",
    ]
    for point in highlight_points:
        ry = add_wrapped(lines, "F1", 8.8, right_x, ry, f"- {point}", width_chars=45, line_height=10.5)
        ry -= 2

    # Footer
    lines.append("0.11 0.82 0.89 rg")
    lines.append(f"{margin} 34 {width - 2 * margin} 1.5 re f")
    add_text(lines, "F1", 8.2, margin, 20, "Portfolio-driven DevOps resume | One page | Built from practical projects and real repo links", color=(0.30, 0.35, 0.42))

    content = ["BT"]
    for line in lines:
        content.append(line)
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
    objects.append(
        f"6 0 obj << /Length {len(content_stream)} >> stream\n".encode("utf-8")
        + content_stream
        + b"\nendstream endobj\n"
    )

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
