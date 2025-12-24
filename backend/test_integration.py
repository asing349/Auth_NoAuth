import asyncio
from scraper import scrape_url
from ai_detector import detect_auth_with_ai


async def test_full_pipeline():
    """Test the complete pipeline: scrape URL + detect auth component"""

    test_urls = [
        "https://github.com/login",
        "https://www.linkedin.com/login",
        "https://www.reddit.com/login",
    ]

    print("=" * 80)
    print("INTEGRATED TEST: Web Scraper + AI Auth Detection")
    print("=" * 80)

    results = []

    for idx, url in enumerate(test_urls, 1):
        print(f"\n[{idx}/{len(test_urls)}] Testing: {url}")
        print("-" * 80)

        # Step 1: Scrape the URL
        print("Step 1: Scraping website...")
        scrape_result = await scrape_url(url, timeout=30000)

        if not scrape_result["success"]:
            print(f"✗ Scraping FAILED: {scrape_result['error']}")
            results.append({
                "url": url,
                "scrape_success": False,
                "auth_found": False,
                "error": scrape_result['error']
            })
            continue

        html_size = len(scrape_result['html'])
        print(f"✓ Scraping SUCCESS: Retrieved {html_size:,} characters")

        # Step 2: Detect auth component with AI
        print("Step 2: Analyzing with Claude AI...")
        ai_result = await detect_auth_with_ai(scrape_result['html'])

        if not ai_result["success"]:
            print(f"✗ AI Detection FAILED: {ai_result['error']}")
            results.append({
                "url": url,
                "scrape_success": True,
                "auth_found": False,
                "error": ai_result['error']
            })
            continue

        if ai_result["found"]:
            auth_size = len(ai_result['auth_html'])
            print(f"✓ AUTH COMPONENT FOUND!")
            print(f"  - Extracted {auth_size} characters of HTML")
            print(f"  - Preview (first 200 chars):")
            print(f"    {ai_result['auth_html'][:200]}...")
            results.append({
                "url": url,
                "scrape_success": True,
                "auth_found": True,
                "auth_html": ai_result['auth_html'],
                "error": None
            })
        else:
            print(f"✗ No auth component found")
            print(f"  - Explanation: {ai_result['explanation']}")
            results.append({
                "url": url,
                "scrape_success": True,
                "auth_found": False,
                "error": None
            })

    # Summary
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    scrape_success = sum(1 for r in results if r["scrape_success"])
    auth_found = sum(1 for r in results if r["auth_found"])

    print(f"Total URLs tested: {len(results)}")
    print(f"Successful scrapes: {scrape_success}/{len(results)}")
    print(f"Auth components found: {auth_found}/{len(results)}")

    if auth_found > 0:
        print(f"\nSuccess rate: {(auth_found/len(results)*100):.1f}%")
        print("\nURLs with auth components:")
        for r in results:
            if r["auth_found"]:
                print(f"  ✓ {r['url']}")

    return results


if __name__ == "__main__":
    asyncio.run(test_full_pipeline())
