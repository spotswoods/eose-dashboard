#!/usr/bin/env python3
"""Rewrite the `analystCoverage` block in EOSE/js/data.js with new values.

Reads JSON from stdin with shape:
{
  "asOf": "Updated May 2026",
  "consensus": {
    "avgPriceTarget": 8.86, "highTarget": 18.00, "lowTarget": 5.00,
    "coveringAnalysts": 7,  "priorAvgTarget": 9.71,
    "ratingMix": "..."
  },
  "recentActions": [{"date":"...","firm":"...","analyst":"...","action":"...","note":"..."}],
  // optional, only if explicitly provided:
  "sentiment": {...}, "sources": [...]
}

Preserves byte-identical formatting elsewhere in the file. Prints a unified
diff to stdout. Writes the file in place (atomically via a temp file).
"""
from __future__ import annotations
import json, sys, re, os, tempfile, datetime, difflib

# On Windows the default stdio encoding is cp1252: UTF-8 payloads on stdin
# (en dashes, arrows, middle dots) get mis-decoded into mojibake that then
# lands in data.js, and printing the diff crashes outright. Force UTF-8.
for _stream in (sys.stdin, sys.stdout, sys.stderr):
    if hasattr(_stream, "reconfigure"):
        _stream.reconfigure(encoding="utf-8", errors="replace")

DATA_JS = r"C:\EOSE\js\data.js"
if not os.path.exists(DATA_JS):
    for alt in ("/sessions/quirky-wizardly-sagan/mnt/EOSE/js/data.js",
                os.path.expanduser("~/EOSE/js/data.js")):
        if os.path.exists(alt):
            DATA_JS = alt
            break

INDENT = "  "  # two spaces, matching the file
KEY = "analystCoverage:"


def js_str(s: str) -> str:
    """Render a JS single-quoted string literal escaping only ' and \\."""
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


def fmt_num(n) -> str:
    """Render a JS value: numbers the way the file does (8.86, 18.00, 5.00, 7),
    strings as quoted literals (e.g. coveringAnalysts: '10–15 (varies by source)')."""
    if isinstance(n, bool):
        return "true" if n else "false"
    if isinstance(n, int):
        return str(n)
    if isinstance(n, float):
        if n.is_integer():
            return f"{n:.2f}"
        return f"{n:.2f}" if abs(n) >= 1 else f"{n:.4f}".rstrip("0").rstrip(".")
    return js_str(str(n))


def find_block(text: str) -> tuple[int, int]:
    """Return (start, end) byte offsets for the `analystCoverage: { ... },` block.

    `start` points at the 'a' of 'analystCoverage'.
    `end` points one past the trailing comma after the closing brace.
    Uses a brace counter that respects single/double-quoted strings and line
    comments — enough for this hand-written JS data file.
    """
    start = text.find(KEY)
    if start == -1:
        sys.exit("Couldn't locate `analystCoverage:` key — has the file structure changed?")
    # Walk forward to the opening '{'
    i = text.find("{", start)
    if i == -1:
        sys.exit("Found key but no opening brace.")
    depth = 0
    n = len(text)
    in_str = None  # current string quote char, or None
    j = i
    while j < n:
        c = text[j]
        if in_str:
            if c == "\\":
                j += 2
                continue
            if c == in_str:
                in_str = None
            j += 1
            continue
        if c in ("'", '"'):
            in_str = c
            j += 1
            continue
        # Line comment
        if c == "/" and j + 1 < n and text[j+1] == "/":
            nl = text.find("\n", j)
            j = n if nl == -1 else nl
            continue
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                # consume optional comma after the brace
                k = j + 1
                while k < n and text[k] in " \t":
                    k += 1
                if k < n and text[k] == ",":
                    return start, k + 1
                return start, j + 1
        j += 1
    sys.exit("Unbalanced braces while scanning analystCoverage.")


def parse_current(block_text: str) -> dict:
    """Best-effort extraction of fields we may want to preserve."""
    out = {}
    avg = re.search(r"avgPriceTarget:\s*([0-9.]+)", block_text)
    if avg:
        out["avgPriceTarget"] = float(avg.group(1))
    # Pull sentiment + sources sub-blocks verbatim (with leading indent stripped)
    out["sentiment_raw"] = _extract_subblock(block_text, "sentiment:", "{}")
    out["sources_raw"]   = _extract_subblock(block_text, "sources:",   "[]")
    return out


def _extract_subblock(block_text: str, key: str, brackets: str) -> str | None:
    """Return the raw `key: {...},` (or `[...]`) substring, or None."""
    idx = block_text.find(key)
    if idx == -1:
        return None
    open_c, close_c = brackets[0], brackets[1]
    i = block_text.find(open_c, idx)
    if i == -1:
        return None
    depth = 0
    in_str = None
    j = i
    n = len(block_text)
    while j < n:
        c = block_text[j]
        if in_str:
            if c == "\\":
                j += 2; continue
            if c == in_str:
                in_str = None
            j += 1; continue
        if c in ("'", '"'):
            in_str = c; j += 1; continue
        if c == "/" and j+1 < n and block_text[j+1] == "/":
            nl = block_text.find("\n", j)
            j = n if nl == -1 else nl
            continue
        if c == open_c: depth += 1
        elif c == close_c:
            depth -= 1
            if depth == 0:
                k = j + 1
                while k < n and block_text[k] in " \t":
                    k += 1
                # include trailing comma if present
                if k < n and block_text[k] == ",":
                    return block_text[idx:k+1]
                return block_text[idx:j+1]
        j += 1
    return None


def render_consensus(c: dict) -> str:
    return (
        f"{INDENT*2}consensus: {{\n"
        f"{INDENT*3}avgPriceTarget: {fmt_num(c['avgPriceTarget'])},\n"
        f"{INDENT*3}highTarget:     {fmt_num(c['highTarget'])},\n"
        f"{INDENT*3}lowTarget:       {fmt_num(c['lowTarget'])},\n"
        f"{INDENT*3}coveringAnalysts: {fmt_num(c['coveringAnalysts'])},\n"
        f"{INDENT*3}priorAvgTarget:  {fmt_num(c['priorAvgTarget'])},   // our prior tracked figure\n"
        f"{INDENT*3}ratingMix:       {js_str(c['ratingMix'])}\n"
        f"{INDENT*2}}},"
    )


def render_action(a: dict) -> str:
    return (
        f"{INDENT*3}{{ date: {js_str(a['date'])}, "
        f"firm: {js_str(a['firm'])}, "
        f"analyst: {js_str(a['analyst'])}, "
        f"action: {js_str(a['action'])}, "
        f"note: {js_str(a.get('note', ''))} }}"
    )


def render_actions(actions: list[dict]) -> str:
    rows = ",\n".join(render_action(a) for a in actions)
    return f"{INDENT*2}recentActions: [\n{rows}\n{INDENT*2}],"


def render_sentiment(s: dict) -> str:
    return (
        f"{INDENT*2}sentiment: {{\n"
        f"{INDENT*3}retail: {js_str(s['retail'])},\n"
        f"{INDENT*3}institutional: {js_str(s['institutional'])},\n"
        f"{INDENT*3}shortInterest: {js_str(s['shortInterest'])}\n"
        f"{INDENT*2}}},"
    )


def render_sources(srcs: list[dict]) -> str:
    rows = ",\n".join(
        f"{INDENT*3}{{ label: {js_str(s['label'])}, url: {js_str(s['url'])} }}"
        for s in srcs
    )
    return f"{INDENT*2}sources: [\n{rows}\n{INDENT*2}]"


def build_block(payload: dict, current: dict) -> str:
    cons = payload["consensus"]
    if "priorAvgTarget" not in cons and "avgPriceTarget" in current:
        cons["priorAvgTarget"] = current["avgPriceTarget"]
    elif "priorAvgTarget" not in cons:
        cons["priorAvgTarget"] = cons["avgPriceTarget"]

    parts = [
        "analystCoverage: {",
        f"{INDENT*2}asOf: {js_str(payload['asOf'])},",
        render_consensus(cons),
        render_actions(payload["recentActions"]),
    ]

    if "sentiment" in payload:
        parts.append(render_sentiment(payload["sentiment"]))
    elif current.get("sentiment_raw"):
        parts.append(f"{INDENT*2}{current['sentiment_raw']}")

    if "sources" in payload:
        parts.append(render_sources(payload["sources"]))
    elif current.get("sources_raw"):
        parts.append(f"{INDENT*2}{current['sources_raw']}")

    return "\n".join(parts) + f"\n{INDENT}}},"


def update(text: str, payload: dict) -> tuple[str, str]:
    start, end = find_block(text)
    block = text[start:end]
    current = parse_current(block)
    new_block = build_block(payload, current)
    new_text = text[:start] + new_block + text[end:]

    today = datetime.date.today().isoformat()
    new_text = re.sub(
        r"^// Last refresh:\s*\d{4}-\d{2}-\d{2}\s*$",
        f"// Last refresh: {today}",
        new_text,
        count=1,
        flags=re.MULTILINE,
    )
    return new_text, today


def main() -> int:
    raw = sys.stdin.read()
    if not raw.strip():
        sys.exit("No JSON on stdin. See SKILL.md for the expected payload shape.")
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError as e:
        sys.exit(f"Bad JSON: {e}")

    required = {"asOf", "consensus", "recentActions"}
    missing = required - payload.keys()
    if missing:
        sys.exit(f"Missing required keys: {sorted(missing)}")

    required_cons = {"avgPriceTarget", "highTarget", "lowTarget",
                     "coveringAnalysts", "ratingMix"}
    missing_c = required_cons - payload["consensus"].keys()
    if missing_c:
        sys.exit(f"Missing required consensus keys: {sorted(missing_c)}")

    with open(DATA_JS, "rb") as f:
        raw_bytes = f.read()
    # Detect dominant line ending so we can preserve it on write
    eol = b"\r\n" if raw_bytes.count(b"\r\n") > raw_bytes.count(b"\n") // 2 else b"\n"
    before = raw_bytes.decode("utf-8")
    # Normalize to \n for processing; we'll convert back when writing
    before_n = before.replace("\r\n", "\n") if eol == b"\r\n" else before
    after_n, today = update(before_n, payload)
    after = after_n.replace("\n", "\r\n") if eol == b"\r\n" else after_n

    fd, tmp = tempfile.mkstemp(prefix="data.js.", dir=os.path.dirname(DATA_JS))
    try:
        with os.fdopen(fd, "wb") as f:
            f.write(after.encode("utf-8"))
        os.replace(tmp, DATA_JS)
    except Exception:
        try: os.unlink(tmp)
        except FileNotFoundError: pass
        raise

    diff = difflib.unified_diff(
        before_n.splitlines(keepends=True),
        after_n.splitlines(keepends=True),
        fromfile="js/data.js (before)",
        tofile=f"js/data.js (after {today})",
        n=3,
    )
    sys.stdout.writelines(diff)
    sys.stdout.write("\n")

    cons = payload["consensus"]
    print(
        f"OK  avg=${cons['avgPriceTarget']:.2f}  "
        f"range=${cons['lowTarget']:.2f}-${cons['highTarget']:.2f}  "
        f"analysts={cons['coveringAnalysts']}  "
        f"actions={len(payload['recentActions'])}  "
        f"refresh={today}",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
