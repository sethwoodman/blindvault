# Crypsis (desktop)

A native desktop window showing pages written in HTML, CSS and JavaScript, with
Python behind them. No browser, no web server, nothing to deploy.

## Run it

```
pip install -r requirements.txt
python app.py
```

Windows and macOS need nothing else. On Linux, requirements.txt installs the Qt
backend for you.

To check how a page looks without Python, double-click any file in `ui/`.
Everything works except talking to Python, and the page tells you so.

## What's where

| File | What it does |
| --- | --- |
| `app.py` | Opens the window and holds the `Api` class: the Python side of every page |
| `requirements.txt` | What `pip` installs |
| `ui/login.html` | The sign-in page (the only finished page) |
| `ui/register.html`, `forgot-password.html`, `db-config.html`, `vault.html` | Placeholders, one per window in the original app |
| `ui/styles.css` | The THEME block, plus styles every page shares |
| `ui/api.js` | `callPython()`: how a page calls a method in `app.py` |
| `ui/forms.js` | Shared form helpers: error messages, Show/Hide, Caps Lock warning |
| `ui/logo.svg` | The logo |

## How a page talks to Python

In the page:

```js
const result = await callPython('sign_in', username, password);
```

In `app.py`:

```python
def sign_in(self, username, password):
    return {"ok": False, "reason": "wrong"}
```

Whatever the Python method returns (a dict, list, string or number) arrives in the
page as `result`. Python never trusts the page: every method that touches the vault
must check `self.signed_in` first, because the page can be changed by anyone.

## Add a page

1. The placeholder for it already exists in `ui/`. Replace its body with your form,
   copying the field markup from `login.html`.
2. Include `api.js` and `forms.js`, then use the helpers: `setFieldError`,
   `setupPasswordToggle`, `setupCapsLockHint`.
3. Add a method to `Api` in `app.py` and call it with `callPython`.

## Make it your own

- Colours, corner roundness, font: the THEME block at the top of `ui/styles.css`.
- Logo: replace `ui/logo.svg` (any SVG or PNG; keep the file name or update the `<img>` tags).
- Name: "Crypsis" appears in each page's `<title>` and brand row, and in the window
  title in `app.py`. Find and replace.

## Later: one file to hand out

pywebview's freezing guide uses PyInstaller (not yet tested in this project):

```
pip install pyinstaller
pyinstaller --windowed --add-data "ui:ui" app.py      # on Windows use "ui;ui"
```
