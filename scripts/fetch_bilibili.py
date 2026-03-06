#!/usr/bin/env python3
"""
Bilibili Video Fetcher
Fetches video list for a given Bilibili user UID and updates videos.json

Usage:
    python3 scripts/fetch_bilibili.py

Requirements:
    pip install requests

Note: Bilibili API may require cookies for some requests.
      If you encounter rate limiting, add your browser cookies below.
"""

import json
import time
import requests
import hashlib
from functools import reduce
from pathlib import Path

# ─── Configuration ────────────────────────────────────────────────
BILIBILI_UID = "365866880"  # 我是小小升
OUTPUT_FILE = Path(__file__).parent.parent / "client/src/data/videos.json"
MAX_VIDEOS = 30  # Maximum videos to fetch

# Optional: Add your Bilibili cookies for authenticated requests
# Get from browser DevTools → Application → Cookies → bilibili.com
# 1. Login to bilibili.com
# 2. Open Developer Tools (F12)
# 3. Go to Application tab -> Cookies -> https://www.bilibili.com
# 4. Copy 'SESSDATA', 'bili_jct', 'buvid3' values
COOKIES = {
    "SESSDATA": "fb498b20%2C1788256018%2C55346%2A32CjB6FndxmqqnhLRHRqSLUAKmMxp_6DQ3iiKMPisdjjYbxRT0ijCSHYUh2t4Th-FbaecSVk91RlhtX2dhdTVGSXZ6MG5BVWJEbnlYOUJjOVdQX2FkNWdvcXBkYmFYd05yNGRmYnVPWGlIazBRMm9TcGIzZno4Yl9rRHFTTVdCUDAxMHhDa214Ul9nIIEC",
    "bili_jct": "d700c058e41969d9f9a91618b48347d8",
    "buvid3": "D1239A9F-3121-6C5B-F6A1-918A3975C40824355infoc",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": f"https://space.bilibili.com/{BILIBILI_UID}/video",
    "Origin": "https://space.bilibili.com",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
}

# ─── WBI Signature Logic ──────────────────────────────────────────
# Bilibili uses WBI signatures for some search APIs to prevent scraping.

def get_wbi_keys() -> tuple[str, str]:
    """Get img_key and sub_key for WBI signature."""
    resp = requests.get("https://api.bilibili.com/x/web-interface/nav", headers=HEADERS, cookies=COOKIES)
    json_content = resp.json()
    img_url = json_content["data"]["wbi_img"]["img_url"]
    sub_url = json_content["data"]["wbi_img"]["sub_url"]
    img_key = img_url.split("/")[-1].split(".")[0]
    sub_key = sub_url.split("/")[-1].split(".")[0]
    return img_key, sub_key

def enc_wbi(params: dict, img_key: str, sub_key: str) -> dict:
    """Encode parameters with WBI signature."""
    mixin_key_enc_tab = [
        46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
        33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
        61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
        36, 20, 34, 44, 52
    ]
    raw_wbi_key = img_key + sub_key
    mixin_key = reduce(lambda s, i: s + raw_wbi_key[i], mixin_key_enc_tab, "")[:32]
    
    curr_time = int(time.time())
    params["wts"] = curr_time
    params = dict(sorted(params.items()))
    # Filter out special characters
    params = {k: "".join(filter(lambda c: c not in "!'()*", str(v))) for k, v in params.items()}
    query = "&".join(f"{k}={v}" for k, v in params.items())
    w_rid = hashlib.md5((query + mixin_key).encode()).hexdigest()
    params["w_rid"] = w_rid
    return params

# ─── Fetch Functions ──────────────────────────────────────────────

def fetch_user_videos(uid: str, page: int = 1, page_size: int = 30) -> dict:
    """Fetch videos from Bilibili space API with WBI signature."""
    url = "https://api.bilibili.com/x/space/wbi/arc/search"  # Notice the /wbi/ pivot
    params = {
        "mid": uid,
        "ps": page_size,
        "pn": page,
        "order": "pubdate",
        "tid": 0,
        "keyword": "",
        "jsonp": "jsonp",
    }
    
    try:
        img_key, sub_key = get_wbi_keys()
        signed_params = enc_wbi(params, img_key, sub_key)
        resp = requests.get(url, params=signed_params, headers=HEADERS, cookies=COOKIES, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        print(f"Error fetching videos: {e}")
        return {}


def parse_video(vlist_item: dict) -> dict:
    """Parse a video item from the API response."""
    bvid = vlist_item.get("bvid", "")
    
    # Format duration from seconds to MM:SS
    duration_secs = vlist_item.get("length", "00:00")
    
    # Format view count
    stat = vlist_item.get("stat", {})
    view = stat.get("view", 0)
    
    # Format date from Unix timestamp
    pubdate_ts = vlist_item.get("created", 0)
    from datetime import datetime
    pubdate = datetime.fromtimestamp(pubdate_ts).strftime("%Y-%m-%d") if pubdate_ts else ""
    
    return {
        "bvid": bvid,
        "title": vlist_item.get("title", ""),
        "description": vlist_item.get("description", ""),
        "cover": vlist_item.get("pic", ""),
        "pubdate": pubdate,
        "duration": duration_secs,
        "view": view,
        "tags": [],  # Tags require separate API call
    }


def main():
    print(f"Fetching videos for Bilibili UID: {BILIBILI_UID}")
    
    all_videos = []
    page = 1
    
    while len(all_videos) < MAX_VIDEOS:
        print(f"Fetching page {page}...")
        data = fetch_user_videos(BILIBILI_UID, page=page)
        
        if not data or data.get("code") != 0:
            print(f"API error: {data.get('message', 'Unknown error')}")
            print("Note: Bilibili API may require authentication cookies.")
            print("Please add your SESSDATA cookie to the COOKIES dict in this script.")
            break
        
        vlist = data.get("data", {}).get("list", {}).get("vlist", [])
        if not vlist:
            print("No more videos found.")
            break
        
        for item in vlist:
            all_videos.append(parse_video(item))
            if len(all_videos) >= MAX_VIDEOS:
                break
        
        page += 1
        time.sleep(0.5)  # Be polite to the API
    
    if all_videos:
        OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(all_videos, f, ensure_ascii=False, indent=2)
        print(f"✅ Saved {len(all_videos)} videos to {OUTPUT_FILE}")
    else:
        print("⚠️  No videos fetched. The videos.json file was not updated.")
        print("\nManual alternative:")
        print("1. Visit https://space.bilibili.com/365866880/video")
        print("2. Copy video BVIDs and fill in videos.json manually")


if __name__ == "__main__":
    main()
