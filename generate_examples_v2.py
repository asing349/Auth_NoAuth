import asyncio
import json
from datetime import datetime, timezone
from pathlib import Path
from scraper import scrape_url
from ai_detector import detect_auth_with_ai


# Define the example sites
EXAMPLE_SITES = [
    # 4 sites WITH auth components
    {
        "url": "https://github.com/login",
        "site_name": "GitHub",
        "site_category": "Development Platform",
        "expected_auth": True,
        "filename": "github-login.json"
    },
    {
        "url": "https://www.linkedin.com/login",
        "site_name": "LinkedIn",
        "site_category": "Professional Social Network",
        "expected_auth": True,
        "filename": "linkedin-login.json"
    },
    {
        "url": "https://www.dropbox.com/login",
        "site_name": "Dropbox",
        "site_category": "Cloud Storage",
        "expected_auth": True,
        "filename": "dropbox-login.json"
    },
    {
        "url": "https://www.reddit.com/login",
        "site_name": "Reddit",
        "site_category": "Social Platform",
        "expected_auth": True,
        "filename": "reddit-login.json"
    },
    # 2 sites WITHOUT auth components
    {
        "url": "https://en.wikipedia.org/wiki/Main_Page",
        "site_name": "Wikipedia",
        "site_category": "Encyclopedia",
        "expected_auth": False,
        "filename": "wikipedia-home.json"
    },
    {
        "url": "https://www.bbc.com/news",
        "site_name": "BBC News",
        "site_category": "News",
        "expected_auth": False,
        "filename": "bbc-news.json"
    }
]


async def generate_example(site_config):
    """Generate example data for a single site with new OAuth detection"""

    url = site_config["url"]
    print(f"\n{'='*80}")
    print(f"Processing: {site_config['site_name']}")
    print(f"URL: {url}")
    print(f"Expected auth: {'Yes' if site_config['expected_auth'] else 'No'}")
    print(f"{'='*80}")

    # Step 1: Scrape the URL
    print("Step 1: Scraping website...")
    scrape_result = await scrape_url(url, timeout=30000)

    if not scrape_result["success"]:
        print(f"✗ Scraping FAILED: {scrape_result['error']}")
        return {
            "url": url,
            "site_name": site_config["site_name"],
            "site_category": site_config["site_category"],
            "scraped_at": datetime.now(timezone.utc).isoformat(),
            "found": False,
            "has_traditional_auth": False,
            "has_oauth": False,
            "traditional_auth_html": None,
            "traditional_auth_preview": None,
            "traditional_auth_size": None,
            "oauth_html": None,
            "oauth_preview": None,
            "oauth_size": None,
            "html_size": None,
            "explanation": None,
            "scrape_success": False,
            "error": scrape_result["error"]
        }

    html_size = len(scrape_result['html'])
    print(f"✓ Scraping SUCCESS: Retrieved {html_size:,} characters")

    # Step 2: Detect auth components with AI (both traditional and OAuth)
    print("Step 2: Analyzing with Claude AI...")
    ai_result = await detect_auth_with_ai(scrape_result['html'])

    if not ai_result["success"]:
        print(f"✗ AI Detection FAILED: {ai_result['error']}")
        return {
            "url": url,
            "site_name": site_config["site_name"],
            "site_category": site_config["site_category"],
            "scraped_at": datetime.now(timezone.utc).isoformat(),
            "found": False,
            "has_traditional_auth": False,
            "has_oauth": False,
            "traditional_auth_html": None,
            "traditional_auth_preview": None,
            "traditional_auth_size": None,
            "oauth_html": None,
            "oauth_preview": None,
            "oauth_size": None,
            "html_size": html_size,
            "explanation": ai_result.get("explanation"),
            "scrape_success": True,
            "error": ai_result["error"]
        }

    # Extract results
    has_traditional = ai_result.get("has_traditional_auth", False)
    has_oauth = ai_result.get("has_oauth", False)
    traditional_auth_html = ai_result.get("traditional_auth_html")
    oauth_html = ai_result.get("oauth_html")

    # Generate previews
    traditional_preview = None
    traditional_size = None
    if traditional_auth_html:
        traditional_size = len(traditional_auth_html)
        traditional_preview = traditional_auth_html[:100] + "..." if len(traditional_auth_html) > 100 else traditional_auth_html

    oauth_preview = None
    oauth_size = None
    if oauth_html:
        oauth_size = len(oauth_html)
        oauth_preview = oauth_html[:100] + "..." if len(oauth_html) > 100 else oauth_html

    # Print results
    if has_traditional or has_oauth:
        print(f"\n✓ AUTH COMPONENTS FOUND!")
        if has_traditional:
            print(f"  - Traditional Auth: {traditional_size:,} characters")
        if has_oauth:
            print(f"  - OAuth/Social: {oauth_size:,} characters")
    else:
        print(f"\n✗ No auth components found")
        print(f"  - Explanation: {ai_result['explanation']}")

    return {
        "url": url,
        "site_name": site_config["site_name"],
        "site_category": site_config["site_category"],
        "scraped_at": datetime.now(timezone.utc).isoformat(),
        "found": has_traditional or has_oauth,
        "has_traditional_auth": has_traditional,
        "has_oauth": has_oauth,
        "traditional_auth_html": traditional_auth_html,
        "traditional_auth_preview": traditional_preview,
        "traditional_auth_size": traditional_size,
        "oauth_html": oauth_html,
        "oauth_preview": oauth_preview,
        "oauth_size": oauth_size,
        "html_size": html_size,
        "explanation": ai_result.get("explanation"),
        "scrape_success": True,
        "error": None
    }


async def generate_all_examples():
    """Generate example data for all sites"""

    print("\n" + "="*80)
    print("GENERATING EXAMPLE DATA WITH OAUTH DETECTION")
    print("="*80)

    # Create examples directory
    examples_dir = Path(__file__).parent.parent / "examples"
    examples_dir.mkdir(exist_ok=True)

    results = []

    # Process each site
    for site_config in EXAMPLE_SITES:
        try:
            result = await generate_example(site_config)
            results.append(result)

            # Save individual JSON file
            output_file = examples_dir / site_config["filename"]
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(result, f, indent=2, ensure_ascii=False)

            print(f"✓ Saved to: {site_config['filename']}")

            # Small delay to avoid rate limiting
            await asyncio.sleep(2)

        except Exception as e:
            print(f"✗ Error processing {site_config['site_name']}: {str(e)}")
            continue

    # Create manifest/index file
    manifest = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "total_sites": len(results),
        "sites_with_auth": sum(1 for r in results if r["found"]),
        "sites_with_traditional": sum(1 for r in results if r.get("has_traditional_auth")),
        "sites_with_oauth": sum(1 for r in results if r.get("has_oauth")),
        "sites_without_auth": sum(1 for r in results if not r["found"]),
        "examples": [
            {
                "filename": site["filename"],
                "site_name": site["site_name"],
                "url": site["url"],
                "has_auth": next((r["found"] for r in results if r["url"] == site["url"]), False),
                "has_traditional": next((r.get("has_traditional_auth", False) for r in results if r["url"] == site["url"]), False),
                "has_oauth": next((r.get("has_oauth", False) for r in results if r["url"] == site["url"]), False)
            }
            for site in EXAMPLE_SITES
        ]
    }

    manifest_file = examples_dir / "manifest.json"
    with open(manifest_file, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)
    print(f"Total sites processed: {len(results)}")
    print(f"Sites with auth (any): {sum(1 for r in results if r['found'])}")
    print(f"  - With traditional auth: {sum(1 for r in results if r.get('has_traditional_auth'))}")
    print(f"  - With OAuth: {sum(1 for r in results if r.get('has_oauth'))}")
    print(f"Sites without auth: {sum(1 for r in results if not r['found'])}")
    print(f"\nFiles saved to: {examples_dir}")
    print(f"Manifest file: manifest.json")

    return results


if __name__ == "__main__":
    asyncio.run(generate_all_examples())
