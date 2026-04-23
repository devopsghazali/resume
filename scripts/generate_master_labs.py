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


def render_track(track: dict) -> str:
    slug = track["slug"]
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
        anchor = slugify(project["title"])
        lines.extend(
            [
                f"### Project {index}: {project['title']}",
                "",
                project["summary"],
                "",
                f"- Stack: {', '.join(project['stack'])}",
                f"- Resume link: https://github.com/devopsghazali/resume/blob/main/labs/{slug}/README.md#{anchor}",
                "",
            ]
        )

    lines.extend(["## Interview Questions", ""])
    for index, question in enumerate(track["questions"], start=1):
        lines.append(f"{index}. {question}")

    lines.extend(
        [
            "",
            "## Repo Link",
            "",
            f"https://github.com/devopsghazali/resume/tree/main/labs/{slug}",
            "",
        ]
    )
    return "\n".join(lines)


def render_index(tracks: list[dict]) -> str:
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
            f"| {track['title']} | {track['focus']} | https://github.com/devopsghazali/resume/tree/main/labs/{track['slug']} |"
        )
    lines.extend(["", "Each track contains 3 projects and 10 interview questions.", ""])
    return "\n".join(lines)


def main() -> None:
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    tracks = data["tracks"]

    LABS_DIR.mkdir(parents=True, exist_ok=True)
    (LABS_DIR / "README.md").write_text(render_index(tracks), encoding="utf-8")

    for track in tracks:
        track_dir = LABS_DIR / track["slug"]
        track_dir.mkdir(parents=True, exist_ok=True)
        (track_dir / "README.md").write_text(render_track(track), encoding="utf-8")


if __name__ == "__main__":
    main()
