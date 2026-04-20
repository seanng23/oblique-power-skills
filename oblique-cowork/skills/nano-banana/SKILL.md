---
name: nano-banana
description: |
  Generate high-quality 2K images using Kie.ai's Nano Banana 2 model (Google Gemini 3 Flash Image).
  Use this skill whenever Sean wants to generate, create, or produce an image from a text prompt.
  Trigger on: "generate an image", "create an image of", "make me an image", "image of", "visualise",
  "design an image", "produce a visual", "nano banana", or any request to create visual content from text.
  Defaults to 2K resolution, 1:1 aspect ratio. Supports custom aspect ratios on request.
---

# Nano Banana Image Generator

Generate 2K images from text prompts using Kie.ai's Nano Banana 2 model (powered by Google Gemini 3 Flash Image). Fast, high-quality, physics-aware visuals with strong prompt adherence.

## How to invoke

This skill triggers when Sean asks to generate an image from a text description.

**Basic:** "generate an image of a matcha latte on a marble countertop, morning light"
**With aspect ratio:** "create a 9:16 image of a minimalist brand poster for Oblique"
**With save:** "generate an image of X and save it"

## Step-by-step process

### 1. Prepare the prompt

Use the user's description as-is unless it's very short (under 10 words) — in that case, expand it slightly with sensible visual defaults (lighting, composition, style) to get a better result. Don't ask for permission to expand; just do it and mention what you added.

### 2. Determine aspect ratio

Default to `1:1` unless the user specifies otherwise. Supported values:
`1:1` `2:3` `3:2` `3:4` `4:3` `4:5` `5:4` `9:16` `16:9` `21:9` `1:4` `1:8` `4:1` `8:1` `auto`

### 3. Submit the generation task

```bash
TASK_RESPONSE=$(curl -s -X POST 'https://api.kie.ai/api/v1/jobs/createTask' \
  -H "Authorization: Bearer $KIE_API_KEY" \
  -H 'Content-Type: application/json' \
  -d "{
    \"model\": \"nano-banana-2\",
    \"input\": {
      \"prompt\": \"<PROMPT>\",
      \"resolution\": \"2K\",
      \"aspect_ratio\": \"<ASPECT_RATIO>\",
      \"output_format\": \"jpg\"
    }
  }")

TASK_ID=$(echo "$TASK_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['taskId'])")
```

If the response code is not 200, report the error clearly and stop.

### 4. Poll for the result and download

Poll every 5 seconds, up to **60 attempts** (5 minutes total). The queue can get congested — images often take 2–4 minutes during peak times.

**CRITICAL: Use a single Python script for polling AND downloading.** The `resultUrls` are temporary Cloudflare-protected URLs that:
- **Expire quickly** (minutes, not hours)
- **Block Python's `urllib`** with 403 Forbidden (Cloudflare rejects the default User-Agent)
- **Work fine with `curl`** — so always use `subprocess.run(["curl", ...])` to download

Run the entire poll-and-download flow in one Python script to avoid URL expiry between steps:

```bash
python3 << 'PYEOF'
import json, os, urllib.request, subprocess, time

api_key = os.environ["KIE_API_KEY"]
task_id = "<TASK_ID>"
output_path = "<OUTPUT_PATH>"  # full path including filename.jpg

for i in range(60):
    time.sleep(5)
    req = urllib.request.Request(
        f"https://api.kie.ai/api/v1/jobs/recordInfo?taskId={task_id}",
        headers={"Authorization": f"Bearer {api_key}"}
    )
    data = json.loads(urllib.request.urlopen(req).read())
    state = data["data"]["state"]

    if state == "success":
        urls = json.loads(data["data"]["resultJson"]).get("resultUrls", [])
        if urls:
            # MUST use curl — Python urllib gets 403 from Cloudflare on these temp URLs
            subprocess.run(["curl", "-s", "-o", output_path, urls[0]])
            size = os.path.getsize(output_path) if os.path.exists(output_path) else 0
            print(f"SAVED ({size // 1024}KB): {output_path}")
        break
    elif state == "fail":
        print(f"FAILED: {data['data'].get('failMsg', 'unknown')}")
        break

    if (i + 1) % 10 == 0:
        print(f"Still processing... (attempt {i+1}/60)")
PYEOF
```

### 5. Present the result

Show the saved file path so Sean can open it. Use the Read tool to display the image inline.

Default save location: `~/Documents/Sean's Oblique Vault/Claude Outputs/Generated Images/`

```bash
mkdir -p ~/Documents/Sean\'s\ Oblique\ Vault/Claude\ Outputs/Generated\ Images/
```

### 6. Batch generation (multiple images)

When generating multiple images, use a single Python script that submits each task, polls, and downloads with `curl` **immediately on success** — never collect URLs to download later (they expire).

```bash
python3 << 'PYEOF'
import json, os, urllib.request, subprocess, time

api_key = os.environ["KIE_API_KEY"]
save_dir = "<SAVE_DIR>"
os.makedirs(save_dir, exist_ok=True)

ads = [
    ("filename1", "prompt 1"),
    ("filename2", "prompt 2"),
    # ...
]

for name, prompt in ads:
    filepath = os.path.join(save_dir, f"{name}.jpg")
    if os.path.exists(filepath) and os.path.getsize(filepath) > 10000:
        print(f"SKIP {name} (already exists)")
        continue

    # Submit
    body = json.dumps({
        "model": "nano-banana-2",
        "input": {"prompt": prompt, "resolution": "2K", "aspect_ratio": "4:5", "output_format": "jpg"}
    }).encode()
    req = urllib.request.Request(
        "https://api.kie.ai/api/v1/jobs/createTask",
        data=body,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    )
    resp = json.loads(urllib.request.urlopen(req).read())
    task_id = resp["data"]["taskId"]
    print(f"Submitted {name}: {task_id}")

    # Poll and download immediately on success
    for i in range(60):
        time.sleep(5)
        req = urllib.request.Request(
            f"https://api.kie.ai/api/v1/jobs/recordInfo?taskId={task_id}",
            headers={"Authorization": f"Bearer {api_key}"}
        )
        data = json.loads(urllib.request.urlopen(req).read())
        state = data["data"]["state"]
        if state == "success":
            urls = json.loads(data["data"]["resultJson"]).get("resultUrls", [])
            if urls:
                subprocess.run(["curl", "-s", "-o", filepath, urls[0]])
                size = os.path.getsize(filepath) if os.path.exists(filepath) else 0
                print(f"  SAVED {name} ({size // 1024}KB)")
            break
        elif state == "fail":
            print(f"  FAILED {name}: {data['data'].get('failMsg')}")
            break
        if (i + 1) % 10 == 0:
            print(f"  ...polling {name} attempt {i+1}")
PYEOF
```

**Important batch notes:**
- Run this as a **single background Bash command** (`run_in_background: true`) so all images generate sequentially without blocking the conversation
- Tasks are submitted one at a time to avoid queue congestion
- Each image is downloaded immediately on completion before submitting the next
- The script skips already-downloaded files for resumability

## Error handling

- **401**: API key issue — check `$KIE_API_KEY` is set
- **402**: Insufficient credits — let Sean know his Kie.ai account needs top-up
- **429**: Rate limited — wait 10 seconds and retry once
- **403 on download**: You used Python urllib instead of curl — the temp URLs are Cloudflare-protected and reject Python's default User-Agent. Always download with `curl`
- **Timeout after 5 min**: Generation queue is heavily congested — report the taskId so Sean can check https://kie.ai/logs manually
