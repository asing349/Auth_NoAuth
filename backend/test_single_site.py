import asyncio
import sys
from scraper import scrape_url
from ai_detector import detect_auth_with_ai


async def test_single_url(url):
    """Test a single URL for auth component detection"""

    print(f"\n{'='*80}")
    print(f"Testing: {url}")
    print(f"{'='*80}")

    # Step 1: Scrape
    print("\nStep 1: Scraping website...")
    scrape_result = await scrape_url(url, timeout=30000)

    if not scrape_result["success"]:
        print(f"✗ Scraping FAILED: {scrape_result['error']}")
        return {
            "success": False,
            "url": url,
            "error": scrape_result["error"]
        }

    html_size = len(scrape_result['html'])
    print(f"✓ Scraping SUCCESS: Retrieved {html_size:,} characters")

    # Step 2: AI Detection
    print("\nStep 2: Analyzing with Claude AI...")
    ai_result = await detect_auth_with_ai(scrape_result['html'])

    if not ai_result["success"]:
        print(f"✗ AI Detection FAILED: {ai_result['error']}")
        return {
            "success": False,
            "url": url,
            "error": ai_result["error"]
        }

    if ai_result["found"]:
        auth_size = len(ai_result['auth_html'])
        print(f"\n✓ AUTH COMPONENT FOUND!")
        print(f"  - Extracted {auth_size:,} characters of HTML")
        print(f"  - Preview (first 200 chars):")
        print(f"    {ai_result['auth_html'][:200]}...")

        return {
            "success": True,
            "url": url,
            "found": True,
            "auth_html": ai_result['auth_html'],
            "auth_size": auth_size,
            "html_size": html_size,
            "explanation": ai_result['explanation']
        }
    else:
        print(f"\n✗ No auth component found")
        print(f"  - Explanation: {ai_result['explanation']}")

        return {
            "success": True,
            "url": url,
            "found": False,
            "html_size": html_size,
            "explanation": ai_result['explanation']
        }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_single_site.py <url>")
        sys.exit(1)

    url = sys.argv[1]
    result = asyncio.run(test_single_url(url))

    print(f"\n{'='*80}")
    print("RESULT:")
    print(f"{'='*80}")
    if result.get("found"):
        print("✓ Auth component found")
    else:
        print("✗ No auth component found")
