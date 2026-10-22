# patrickkozlow.com

Source for [patrickkozlow.com](https://patrickkozlow.com), a one page CV site. It's a plain static site served from S3 behind CloudFront.

## Updating the CV

All the content lives in [`content.toml`](content.toml): hero, about, certifications, the at a glance numbers and skills, jobs, projects, publications and contact copy. Edit that file, then build and preview:

```bash
python build.py
python -m http.server 5000 --directory dist
```

Open http://localhost:5000 to check it. `build.py` needs Python 3.11 or newer and has no dependencies.

## Under construction mode

`mode` at the top of `content.toml` controls what gets published:

- `mode = "construction"` publishes only `templates/construction.html`, a single "under construction" page marked `noindex`.
- `mode = "live"` publishes the full site.

All the site's content and code stay in the repo either way. To restore the site, set `mode = "live"` and push to `main`. The last live version is also tagged `archive/site-2026-10`.

## How it fits together

| Path | What it is |
| --- | --- |
| `content.toml` | Everything the page says |
| `templates/index.html` | Page layout, with `{{placeholders}}` filled from the content file |
| `build.py` | Renders the template and copies static files into `dist/` |
| `assets/css/modern.css` | All styling (navy and mint theme tokens are at the top) |
| `assets/js/modern.js` | Hero typing intro, active nav link, experience tabs |
| `images/` | Photo, certification badges, project screenshots |
| `dist/` | Build output, gitignored; this is exactly what gets deployed |

## Deploying

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It builds the site, syncs `dist/` to the `patrickkozlow.com` S3 bucket in us-west-2, and invalidates the CloudFront cache. It can also be run by hand from the Actions tab.

The workflow uses the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` repository secrets. `deploy.sh` and `deploy.ps1` do the same build and sync from your own machine if you ever need to skip GitHub.
