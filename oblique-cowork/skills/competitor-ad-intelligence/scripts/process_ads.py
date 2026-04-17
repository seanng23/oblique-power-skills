#!/usr/bin/env python3
"""
process_ads.py — Competitor Ad Intelligence
Sorts Apify Meta Ad Library output by longevity, downloads images, outputs clean JSON.

Usage:
  python3 process_ads.py \
    --input /tmp/raw_ads_Nike.json \
    --output /tmp/processed_ads_Nike.json \
    --images-dir /tmp/ad_images/Nike \
    --limit 15
"""

import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone

try:
    import requests
except ImportError:
    os.system("pip install requests --break-system-packages -q")
    import requests

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False


def parse_date(value):
    """Parse date from various formats the Apify actor might return."""
    if not value:
        return None
    s = str(value).strip()
    # Try common formats
    for fmt in [
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%dT%H:%M:%SZ",
        "%Y-%m-%dT%H:%M:%S+0000",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d",
        "%d/%m/%Y",
    ]:
        try:
            # Strip trailing timezone info if present beyond what fmt handles
            clean = s[:len(fmt)] if len(s) >= len(fmt) else s
            return datetime.strptime(clean, fmt).replace(tzinfo=timezone.utc)
        except (ValueError, TypeError):
            pass
    # Unix timestamp
    try:
        ts = int(float(s))
        return datetime.fromtimestamp(ts, tz=timezone.utc)
    except (ValueError, TypeError):
        pass
    return None


def get_start_date(ad):
    """Extract ad delivery start date, trying multiple field names."""
    for field in [
        "ad_delivery_start_time",
        "adDeliveryStartTime",
        "startDate",
        "start_date",
        "deliveryStartTime",
        "created_time",
        "createdTime",
    ]:
        val = ad.get(field)
        if val:
            dt = parse_date(val)
            if dt:
                return dt
    # Check nested snapshot
    snap = ad.get("snapshot", {}) or {}
    for field in ["ad_delivery_start_time", "start_time"]:
        val = snap.get(field)
        if val:
            dt = parse_date(val)
            if dt:
                return dt
    return None


def get_image_url(ad):
    """Extract the best available image URL from the ad."""
    # Direct image URL fields
    for field in ["imageUrl", "image_url", "thumbnailUrl", "thumbnail_url", "picture"]:
        val = ad.get(field)
        if val and isinstance(val, str) and val.startswith("http"):
            return val

    # snapshot.images array (common Apify format)
    snap = ad.get("snapshot", {}) or {}
    images = snap.get("images", []) or []
    for img in images:
        if isinstance(img, dict):
            for field in ["original_image_url", "resized_image_url", "url"]:
                val = img.get(field)
                if val and isinstance(val, str) and val.startswith("http"):
                    return val
        elif isinstance(img, str) and img.startswith("http"):
            return img

    # Video ads — grab thumbnail
    for field in ["videoPreviewImageUrl", "video_preview_image_url"]:
        val = ad.get(field)
        if val and isinstance(val, str) and val.startswith("http"):
            return val

    videos = snap.get("videos", []) or []
    for vid in videos:
        if isinstance(vid, dict):
            for field in ["video_preview_image_url", "thumbnailUrl", "thumbnail"]:
                val = vid.get(field)
                if val and isinstance(val, str) and val.startswith("http"):
                    return val

    # Carousel cards — first card image
    cards = snap.get("cards", []) or ad.get("cards", []) or []
    for card in cards:
        if isinstance(card, dict):
            for field in ["originalImageUrl", "image_url", "imageUrl", "picture"]:
                val = card.get(field)
                if val and isinstance(val, str) and val.startswith("http"):
                    return val

    # Top-level array fields
    for field in ["images", "mediaUrls"]:
        val = ad.get(field)
        if isinstance(val, list) and val:
            first = val[0]
            if isinstance(first, str) and first.startswith("http"):
                return first
            if isinstance(first, dict):
                for k in ["url", "src", "imageUrl"]:
                    if first.get(k):
                        return first[k]

    return None


def is_video_ad(ad):
    """Determine if this is a video ad."""
    snap = ad.get("snapshot", {}) or {}
    if snap.get("videos") or ad.get("videoUrl") or ad.get("video_url"):
        return True
    media_type = ad.get("mediaType") or ad.get("media_type") or ""
    if "video" in str(media_type).lower():
        return True
    return False


def get_carousel_count(ad):
    """Return number of carousel cards, or 0 if not a carousel."""
    snap = ad.get("snapshot", {}) or {}
    cards = snap.get("cards", []) or ad.get("cards", []) or []
    return len(cards)


def get_body_text(ad):
    """Extract ad body copy."""
    # Try common field names
    for field in [
        "adCreativeBodyText",
        "ad_creative_body_text",
        "body",
        "message",
        "text",
        "description",
    ]:
        val = ad.get(field)
        if val and isinstance(val, str) and val.strip():
            return val.strip()

    snap = ad.get("snapshot", {}) or {}
    body = snap.get("body", {}) or {}
    if isinstance(body, dict):
        text = body.get("text") or body.get("markup", {}).get("__html", "")
        if text:
            # Strip HTML tags roughly
            import re
            text = re.sub(r"<[^>]+>", "", str(text)).strip()
            if text:
                return text
    elif isinstance(body, str) and body.strip():
        return body.strip()

    return ""


def get_headline(ad):
    """Extract ad headline."""
    snap = ad.get("snapshot", {}) or {}
    for field in ["title", "headline", "name"]:
        val = snap.get(field) or ad.get(field)
        if val and isinstance(val, str) and val.strip():
            return val.strip()

    # Carousel — use first card title
    cards = snap.get("cards", []) or ad.get("cards", []) or []
    if cards and isinstance(cards[0], dict):
        val = cards[0].get("title") or cards[0].get("headline", "")
        if val:
            return val.strip()

    return ""


def get_cta(ad):
    """Extract CTA button text."""
    snap = ad.get("snapshot", {}) or {}
    for field in ["cta_text", "ctaText", "call_to_action", "cta_type"]:
        val = snap.get(field) or ad.get(field)
        if val and isinstance(val, str) and val.strip():
            return val.strip().replace("_", " ").title()
    return ""


def get_link(ad):
    """Extract destination URL."""
    snap = ad.get("snapshot", {}) or {}
    for field in ["link_url", "linkUrl", "link", "url", "destination_url"]:
        val = snap.get(field) or ad.get(field)
        if val and isinstance(val, str) and val.startswith("http"):
            return val
    return ""


def get_platforms(ad):
    """Extract publisher platforms."""
    for field in ["publisher_platforms", "publisherPlatforms", "platforms"]:
        val = ad.get(field)
        if val:
            if isinstance(val, list):
                return [str(p).title() for p in val if p]
            if isinstance(val, str):
                return [val.title()]
    return []


def get_impressions(ad):
    """Extract impression range."""
    imps = ad.get("impressions", {}) or {}
    if isinstance(imps, dict):
        lo = imps.get("lower_bound") or imps.get("lowerBound")
        hi = imps.get("upper_bound") or imps.get("upperBound")
        if lo or hi:
            return {"lower": lo, "upper": hi}
    return {}


def get_page_name(ad):
    """Extract advertiser page name."""
    for field in ["page_name", "pageName", "advertiser", "advertiserName"]:
        val = ad.get(field)
        if val and isinstance(val, str) and val.strip():
            return val.strip()
    snap = ad.get("snapshot", {}) or {}
    return snap.get("page_name", "")


def download_image(url, filepath, retries=2):
    """Download image from URL with retry logic."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    }
    for attempt in range(retries + 1):
        try:
            resp = requests.get(url, headers=headers, timeout=20, stream=True)
            if resp.status_code == 200:
                content_type = resp.headers.get("content-type", "")
                if "image" in content_type or "jpeg" in content_type or "png" in content_type:
                    with open(filepath, "wb") as f:
                        for chunk in resp.iter_content(chunk_size=8192):
                            f.write(chunk)
                    # Validate file is readable image
                    if HAS_PIL:
                        try:
                            img = Image.open(filepath)
                            img.verify()
                        except Exception:
                            os.remove(filepath)
                            return False
                    return True
            elif resp.status_code in (403, 401, 410):
                # URL has expired or is restricted — don't retry
                break
        except requests.RequestException:
            if attempt < retries:
                time.sleep(1)
    return False


def guess_extension(url):
    """Guess file extension from URL."""
    url_lower = url.lower().split("?")[0]
    if ".png" in url_lower:
        return ".png"
    if ".gif" in url_lower:
        return ".gif"
    if ".webp" in url_lower:
        return ".jpg"  # Convert to jpg path (will download as-is)
    return ".jpg"


def duration_label(start_dt):
    """Human-readable duration from start_dt to now."""
    if not start_dt:
        return "Unknown"
    now = datetime.now(tz=timezone.utc)
    delta = now - start_dt
    days = delta.days
    if days < 7:
        return f"{days} day{'s' if days != 1 else ''}"
    if days < 30:
        weeks = days // 7
        return f"{weeks} week{'s' if weeks != 1 else ''}"
    if days < 365:
        months = days // 30
        return f"{months} month{'s' if months != 1 else ''}"
    years = days // 365
    rem_months = (days % 365) // 30
    if rem_months:
        return f"{years}y {rem_months}m"
    return f"{years} year{'s' if years != 1 else ''}"


def main():
    parser = argparse.ArgumentParser(description="Process Meta Ad Library Apify output")
    parser.add_argument("--input", required=True, help="Path to raw Apify JSON output")
    parser.add_argument("--output", required=True, help="Path for processed output JSON")
    parser.add_argument("--images-dir", required=True, help="Directory to download images into")
    parser.add_argument("--limit", type=int, default=15, help="Max ads to keep (default: 15)")
    args = parser.parse_args()

    # Load raw data
    with open(args.input, "r", encoding="utf-8") as f:
        raw = json.load(f)

    # Apify output is usually a list directly, or wrapped in {"items": [...]}
    if isinstance(raw, dict):
        ads = raw.get("items", raw.get("ads", raw.get("results", [])))
    elif isinstance(raw, list):
        ads = raw
    else:
        print(f"Unexpected data format: {type(raw)}", file=sys.stderr)
        ads = []

    print(f"  Loaded {len(ads)} raw ads", file=sys.stderr)

    os.makedirs(args.images_dir, exist_ok=True)

    # Extract and enrich each ad
    enriched = []
    for ad in ads:
        start_dt = get_start_date(ad)
        image_url = get_image_url(ad)
        enriched.append({
            "_ad": ad,
            "start_dt": start_dt,
            "image_url": image_url,
        })

    # Sort: ads with dates first (oldest → newest), then undated
    with_dates = [e for e in enriched if e["start_dt"]]
    without_dates = [e for e in enriched if not e["start_dt"]]
    with_dates.sort(key=lambda e: e["start_dt"])
    sorted_enriched = with_dates + without_dates

    # Take top N
    top = sorted_enriched[: args.limit]
    print(f"  Keeping top {len(top)} ads by longevity", file=sys.stderr)

    processed = []
    for i, entry in enumerate(top):
        ad = entry["_ad"]
        start_dt = entry["start_dt"]
        image_url = entry["image_url"]

        # Download image
        local_image = None
        if image_url:
            ext = guess_extension(image_url)
            filepath = os.path.join(args.images_dir, f"ad_{i:02d}{ext}")
            print(f"  Downloading image {i+1}/{len(top)}...", file=sys.stderr)
            if download_image(image_url, filepath):
                local_image = filepath
            else:
                print(f"    ⚠ Image download failed for ad {i+1}", file=sys.stderr)

        is_video = is_video_ad(ad)
        carousel_count = get_carousel_count(ad)

        format_label = "Image"
        if is_video:
            format_label = "Video"
        elif carousel_count > 1:
            format_label = f"Carousel ({carousel_count} cards)"

        processed.append({
            "index": i + 1,
            "start_date": start_dt.strftime("%d %b %Y") if start_dt else None,
            "start_date_iso": start_dt.isoformat() if start_dt else None,
            "duration": duration_label(start_dt),
            "page_name": get_page_name(ad),
            "body": get_body_text(ad),
            "headline": get_headline(ad),
            "cta": get_cta(ad),
            "link": get_link(ad),
            "platforms": get_platforms(ad),
            "format": format_label,
            "is_video": is_video,
            "impressions": get_impressions(ad),
            "image_url": image_url,
            "local_image": local_image,
        })

    # Write output
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(processed, f, indent=2, ensure_ascii=False)

    print(f"  ✓ Wrote {len(processed)} processed ads to {args.output}", file=sys.stderr)

    # Summary stats
    with_images = sum(1 for p in processed if p["local_image"])
    print(f"  Images downloaded: {with_images}/{len(processed)}", file=sys.stderr)
    if with_dates:
        oldest = with_dates[0]["start_dt"]
        print(f"  Oldest active ad: running since {oldest.strftime('%d %b %Y')}", file=sys.stderr)


if __name__ == "__main__":
    main()
