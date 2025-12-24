import asyncio
from scraper import scrape_url


async def test_multiple_sites():
    """Test scraper with multiple different websites"""

    test_urls = [
        "https://github.com/login",
        "https://www.amazon.com/ap/signin",
        "https://medium.com/m/signin",
        "https://twitter.com/i/flow/login",
        "https://www.linkedin.com/login"
    ]

    print("=" * 80)
    print("Testing Web Scraper with Multiple Sites")
    print("=" * 80)

    results = []

    for url in test_urls:
        print(f"\n[{len(results) + 1}/{len(test_urls)}] Testing: {url}")
        print("-" * 80)

        result = await scrape_url(url, timeout=30000)

        if result["success"]:
            html_size = len(result['html'])
            print(f"✓ SUCCESS")
            print(f"  - Retrieved {html_size:,} characters of HTML")
            print(f"  - Preview: {result['html'][:150]}...")

            # Check if common auth-related keywords exist
            auth_keywords = ['password', 'login', 'signin', 'email', 'username']
            found_keywords = [kw for kw in auth_keywords if kw.lower() in result['html'].lower()]
            print(f"  - Auth keywords found: {', '.join(found_keywords)}")
        else:
            print(f"✗ FAILED")
            print(f"  - Error: {result['error']}")

        results.append(result)

    # Summary
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    successful = sum(1 for r in results if r["success"])
    print(f"Total tests: {len(results)}")
    print(f"Successful: {successful}")
    print(f"Failed: {len(results) - successful}")
    print(f"Success rate: {(successful/len(results)*100):.1f}%")

    return results


if __name__ == "__main__":
    asyncio.run(test_multiple_sites())
