from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "src" / "data" / "masterLabs.json"
LABS_DIR = ROOT / "labs"


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def project_url(track_slug: str, project_slug: str | None = None) -> str:
    if project_slug:
        return f"https://github.com/devopsghazali/resume/tree/main/labs/{track_slug}/{project_slug}"
    return f"https://github.com/devopsghazali/resume/tree/main/labs/{track_slug}"


def render_track_readme(track: dict) -> str:
    lines = [
        f"# {track['title']}",
        "",
        track["focus"],
        "",
        "## Overview",
        "",
        f"This track keeps 3 practical projects and 10 interview questions around {track['title']}.",
        "",
        "## Projects",
        "",
    ]

    for index, project in enumerate(track["projects"], start=1):
        slug = slugify(project["title"])
        lines.extend(
            [
                f"### Project {index}: {project['title']}",
                "",
                project["summary"],
                "",
                f"- Stack: {', '.join(project['stack'])}",
                f"- Repo: {project_url(track['slug'], slug)}",
                "",
            ]
        )

    lines.extend(["## Interview Questions", ""])
    for index, question in enumerate(track["questions"], start=1):
        lines.append(f"{index}. {question}")

    lines.extend(["", "## Track Repo", "", project_url(track["slug"]), ""])
    return "\n".join(lines)


def render_project_readme(track: dict, project: dict, files: list[str]) -> str:
    slug = slugify(project["title"])
    lines = [
        f"# {project['title']}",
        "",
        project["summary"],
        "",
        f"Track: {track['title']}",
        f"Repo: {project_url(track['slug'], slug)}",
        "",
        "## Stack",
        "",
    ]
    for item in project["stack"]:
        lines.append(f"- {item}")
    lines.extend(
        [
            "",
            "## Files",
            "",
        ]
    )
    for file_name in files:
        lines.append(f"- {file_name}")
    lines.extend(["", "## Interview Questions", ""])
    for index, question in enumerate(track["questions"], start=1):
        lines.append(f"{index}. {question}")
    return "\n".join(lines)


def project_files(track: dict, project: dict) -> dict[str, str]:
    track_slug = track["slug"]
    project_slug = slugify(project["title"])
    title = project["title"]

    if track_slug == "python":
        return {
            "main.py": f'''""" {title} """
from dataclasses import dataclass


@dataclass
class Record:
    name: str
    value: float


def summarize(records: list[Record]) -> dict[str, float]:
    total = sum(item.value for item in records)
    return {{"count": len(records), "total": total, "average": round(total / max(len(records), 1), 2)}}


if __name__ == "__main__":
    sample = [Record("alpha", 12.5), Record("beta", 18.0), Record("gamma", 9.5)]
    print(summarize(sample))
''',
            "README.md": render_project_readme(track, project, ["main.py"]),
        }

    if track_slug == "shell-scripting":
        return {
            "main.sh": f'''#!/usr/bin/env bash
set -euo pipefail

echo "Running {title}"
targets=("app" "api" "db")
for target in "${{targets[@]}}"; do
  echo "Checking $target"
done
echo "Done"
''',
            "README.md": render_project_readme(track, project, ["main.sh"]),
        }

    if track_slug == "docker":
        return {
            "app.py": f'''from http.server import BaseHTTPRequestHandler, HTTPServer


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/healthz":
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"ok")
            return
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"{title}")


if __name__ == "__main__":
    HTTPServer(("0.0.0.0", 8080), Handler).serve_forever()
''',
            "Dockerfile": """FROM python:3.12-slim\nWORKDIR /app\nCOPY app.py .\nEXPOSE 8080\nCMD [\"python\", \"app.py\"]\n""",
            "scan.sh": """#!/usr/bin/env bash\nset -euo pipefail\nimage=${1:-devopsghazali/example:latest}\ntrivy image \"$image\"\n""",
            "README.md": render_project_readme(track, project, ["app.py", "Dockerfile", "scan.sh"]),
        }

    if track_slug == "kubernetes":
        return {
            "app.py": f'''from http.server import BaseHTTPRequestHandler, HTTPServer


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/healthz":
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"healthy")
            return
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"{title}")


if __name__ == "__main__":
    HTTPServer(("0.0.0.0", 8080), Handler).serve_forever()
''',
            "k8s/deployment.yaml": f"""apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: {project_slug}\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: {project_slug}\n  template:\n    metadata:\n      labels:\n        app: {project_slug}\n    spec:\n      containers:\n        - name: app\n          image: devopsghazali/{project_slug}:latest\n          ports:\n            - containerPort: 8080\n""",
            "k8s/service.yaml": f"""apiVersion: v1\nkind: Service\nmetadata:\n  name: {project_slug}\nspec:\n  selector:\n    app: {project_slug}\n  ports:\n    - port: 80\n      targetPort: 8080\n""",
            "README.md": render_project_readme(track, project, ["app.py", "k8s/deployment.yaml", "k8s/service.yaml"]),
        }

    if track_slug == "terraform":
        return {
            "main.tf": f"""terraform {{
  required_version = ">= 1.5.0"
  required_providers {{
    aws = {{
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }}
  }}
}}

provider "aws" {{
  region = var.aws_region
}}

resource "aws_s3_bucket" "state" {{
  bucket = "${{var.name_prefix}}-state"
}}
""",
            "variables.tf": """variable "aws_region" { type = string }\nvariable "name_prefix" { type = string }\n""",
            "outputs.tf": """output "state_bucket" {\n  value = aws_s3_bucket.state.id\n}\n""",
            "README.md": render_project_readme(track, project, ["main.tf", "variables.tf", "outputs.tf"]),
        }

    if track_slug == "jenkins":
        return {
            "Jenkinsfile": f"""pipeline {{
  agent any
  stages {{
    stage('Build') {{
      steps {{
        echo 'Building {title}'
      }}
    }}
    stage('Test') {{
      steps {{
        echo 'Testing release flow'
      }}
    }}
  }}
}}
""",
            "README.md": render_project_readme(track, project, ["Jenkinsfile"]),
        }

    if track_slug == "git-github":
        return {
            ".github/workflows/release.yml": f"""name: release\non:\n  push:\n    tags:\n      - 'v*'\njobs:\n  release:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo 'Releasing {title}'\n""",
            "release.sh": """#!/usr/bin/env bash\nset -euo pipefail\necho \"Creating changelog and tag\"\n""",
            "README.md": render_project_readme(track, project, [".github/workflows/release.yml", "release.sh"]),
        }

    if track_slug == "argo-cd":
        return {
            "application.yaml": f"""apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: {project_slug}\nspec:\n  source:\n    repoURL: https://github.com/devopsghazali/resume\n    path: labs/{track_slug}/{project_slug}\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: default\n""",
            "kustomization.yaml": """resources:\n  - application.yaml\n""",
            "README.md": render_project_readme(track, project, ["application.yaml", "kustomization.yaml"]),
        }

    if track_slug == "linux":
        return {
            "check.sh": """#!/usr/bin/env bash\nset -euo pipefail\nsystemctl status ssh || true\njournalctl -n 20 --no-pager || true\n""",
            "README.md": render_project_readme(track, project, ["check.sh"]),
        }

    if track_slug == "networking-ssl-domain":
        return {
            "nginx.conf": "server { listen 80; server_name example.com; location / { proxy_pass http://127.0.0.1:8080; } }\n",
            "renew.sh": """#!/usr/bin/env bash\nset -euo pipefail\necho \"Renewing certificate\"\n""",
            "README.md": render_project_readme(track, project, ["nginx.conf", "renew.sh"]),
        }

    if track_slug == "observability-aiops":
        return {
            "prometheus.yml": """global:\n  scrape_interval: 15s\nscrape_configs:\n  - job_name: demo\n    static_configs:\n      - targets: ['localhost:8080']\n""",
            "alerts.yml": """groups:\n  - name: demo\n    rules:\n      - alert: HighErrorRate\n        expr: demo_errors_total > 10\n        for: 5m\n""",
            "incident_summary.py": """def summarize(incident):\n    return f\"Incident: {incident['title']} | Impact: {incident['impact']}\"\n""",
            "README.md": render_project_readme(track, project, ["prometheus.yml", "alerts.yml", "incident_summary.py"]),
        }

    return {"README.md": render_project_readme(track, project, [])}


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def main() -> None:
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    tracks = data["tracks"]

    LABS_DIR.mkdir(parents=True, exist_ok=True)
    write_file(LABS_DIR / "README.md", render_track_index(tracks))

    for track in tracks:
        track_dir = LABS_DIR / track["slug"]
        write_file(track_dir / "README.md", render_track_readme(track))

        for project in track["projects"]:
            project_slug = slugify(project["title"])
            files = project_files(track, project)
            project_dir = track_dir / project_slug
            for file_name, content in files.items():
                write_file(project_dir / file_name, content)


def render_track_index(tracks: list[dict]) -> str:
    lines = [
        "# DevOps Master Labs",
        "",
        "33 practical DevOps projects across 11 tool tracks.",
        "",
        "| Track | Focus | Repo |",
        "| --- | --- | --- |",
    ]
    for track in tracks:
        lines.append(
            f"| {track['title']} | {track['focus']} | {project_url(track['slug'])} |"
        )
    lines.extend(["", "Each track contains 3 projects and 10 interview questions.", ""])
    return "\n".join(lines)


if __name__ == "__main__":
    main()
