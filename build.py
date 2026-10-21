#!/usr/bin/env python3
"""Build the site from content.toml into dist/.

Usage: python build.py

Needs Python 3.11+ and nothing else. Static files (assets/, images/,
favicon.svg, robots.txt) are copied into dist/ next to the generated
index.html, so dist/ is exactly what gets deployed.
"""
import datetime
import hashlib
import html
import re
import shutil
import tomllib
from pathlib import Path

ROOT = Path(__file__).parent
DIST = ROOT / "dist"
STATIC = ["assets", "images", "favicon.svg", "robots.txt"]


def esc(text):
    return html.escape(text, quote=True)


def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def indent(lines, spaces):
    pad = " " * spaces
    return "\n".join(pad + line for line in lines)


def about_paragraphs(about):
    # Paragraphs allow inline HTML, so they are not escaped.
    return indent([f"<p>{p}</p>" for p in about["paragraphs"]], 20)


def certifications(certs):
    items = [
        f'<li class="cert-item"><img src="{esc(c["image"])}" alt="{esc(c["name"])}" loading="lazy" /></li>'
        for c in certs
    ]
    # The carousel scrolls by half its width, so a hidden second copy makes the loop seamless.
    copies = [
        f'<li class="cert-item" aria-hidden="true"><img src="{esc(c["image"])}" alt="" loading="lazy" /></li>'
        for c in certs
    ]
    return indent(items + copies, 24)


def glance_results(results):
    lines = []
    for r in results:
        lines += [
            '<div class="glance-result">',
            f'    <dt>{esc(r["value"])}</dt>',
            f'    <dd>{esc(r["label"])} <span class="glance-source">{esc(r["source"])}</span></dd>',
            "</div>",
        ]
    return indent(lines, 16)


def glance_skills(groups):
    lines = []
    for g in groups:
        tags = "".join(f"<li>{esc(item)}</li>" for item in g["items"])
        lines += [
            '<div class="glance-skill">',
            f'    <dt>{esc(g["group"])}</dt>',
            f'    <dd><ul class="tag-list">{tags}</ul></dd>',
            "</div>",
        ]
    return indent(lines, 16)


def job_tabs(jobs):
    lines = []
    for i, job in enumerate(jobs):
        key = slug(job["tab"])
        selected = "true" if i == 0 else "false"
        active = " active" if i == 0 else ""
        tabindex = "0" if i == 0 else "-1"
        lines.append(
            f'<button class="tab-button{active}" role="tab" id="tab-{key}" '
            f'aria-controls="panel-{key}" aria-selected="{selected}" tabindex="{tabindex}">{esc(job["tab"])}</button>'
        )
    return indent(lines, 20)


def job_panels(jobs):
    lines = []
    for i, job in enumerate(jobs):
        key = slug(job["tab"])
        hidden = "" if i == 0 else " hidden"
        active = " active" if i == 0 else ""
        lines += [
            f'<div class="job-panel{active}" role="tabpanel" id="panel-{key}" aria-labelledby="tab-{key}" tabindex="0"{hidden}>',
            f'    <h3>{esc(job["title"])} <span class="company-link">@ '
            f'<a href="{esc(job["url"])}" target="_blank" rel="noopener noreferrer">{esc(job["company"])}</a></span></h3>',
            f'    <p class="job-date">{esc(job["dates"])}</p>',
            '    <ul class="job-duties">',
        ]
        lines += [f"        <li>{esc(b)}</li>" for b in job["bullets"]]
        lines += ["    </ul>", "</div>"]
    return indent(lines, 20)


def projects(items):
    lines = []
    for p in items:
        url, title = esc(p["url"]), esc(p["title"])
        tech = "".join(f"<li>{esc(t)}</li>" for t in p["tech"])
        lines += [
            '<article class="project-card featured">',
            '    <div class="project-content">',
            f'        <h3 class="project-title"><a href="{url}" target="_blank" rel="noopener noreferrer">{title}</a></h3>',
            f'        <div class="project-description"><p>{esc(p["description"])}</p></div>',
            f'        <ul class="project-tech-list">{tech}</ul>',
            '        <div class="project-links">',
            f'            <a href="{url}" target="_blank" rel="noopener noreferrer" aria-label="{title} on GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>',
            "        </div>",
            "    </div>",
            '    <div class="project-image">',
            f'        <a href="{url}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">'
            f'<img src="{esc(p["image"])}" alt="" loading="lazy" /></a>',
            "    </div>",
            "</article>",
        ]
    return indent(lines, 16)


def publications(items):
    return indent(
        [
            f'<li><a href="{esc(p["url"])}" target="_blank" rel="noopener noreferrer">{esc(p["title"])}</a></li>'
            for p in items
        ],
        20,
    )


def file_version(relative):
    # Short content hash so browsers and CloudFront fetch the new file after a change.
    return hashlib.sha256((ROOT / relative).read_bytes()).hexdigest()[:10]


def render(content):
    site, hero, contact = content["site"], content["hero"], content["contact"]
    values = {
        "title": esc(site["title"]),
        "description": esc(site["description"]),
        "url": esc(site["url"]),
        "photo": esc(site["photo"]),
        "github": esc(site["github"]),
        "linkedin": esc(site["linkedin"]),
        "formspree": esc(site["formspree"]),
        "hero_name": esc(hero["name"]),
        "hero_headline": esc(hero["headline"]),
        "hero_intro": hero["intro"],
        "about_paragraphs": about_paragraphs(content["about"]),
        "certifications": certifications(content["certifications"]),
        "glance_results": glance_results(content["glance"]["results"]),
        "glance_skills": glance_skills(content["glance"]["skills"]),
        "job_tabs": job_tabs(content["jobs"]),
        "job_panels": job_panels(content["jobs"]),
        "projects": projects(content["projects"]),
        "publications": publications(content["publications"]),
        "contact_heading": esc(contact["heading"]),
        "contact_text": esc(contact["text"]),
        "year": str(datetime.date.today().year),
        "css_version": file_version("assets/css/modern.css"),
        "js_version": file_version("assets/js/modern.js"),
    }
    template = (ROOT / "templates" / "index.html").read_text(encoding="utf-8")

    def fill(match):
        key = match.group(1)
        if key not in values:
            raise KeyError(f"templates/index.html uses {{{{{key}}}}} but build.py has no value for it")
        return values[key]

    return re.sub(r"\{\{(\w+)\}\}", fill, template)


def main():
    with open(ROOT / "content.toml", "rb") as f:
        content = tomllib.load(f)

    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    for name in STATIC:
        src = ROOT / name
        if src.is_dir():
            shutil.copytree(src, DIST / name)
        else:
            shutil.copy2(src, DIST / name)

    (DIST / "index.html").write_text(render(content), encoding="utf-8")
    print(f"Built {DIST / 'index.html'}")


if __name__ == "__main__":
    main()
