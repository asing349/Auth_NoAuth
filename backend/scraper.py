import asyncio
from typing import Optional, Dict
from playwright.async_api import async_playwright, Browser, Page, TimeoutError as PlaywrightTimeoutError


class ScraperError(Exception):
    """Custom exception for scraper errors"""
    pass


async def scrape_url(url: str, timeout: int = 30000) -> Dict[str, any]:
    """
    Scrapes a URL and returns the HTML content.

    Args:
        url: The URL to scrape
        timeout: Maximum time to wait for page load in milliseconds (default: 30s)

    Returns:
        Dictionary containing:
            - success: bool
            - html: str (if successful)
            - error: str (if failed)
            - url: str (the URL that was scraped)
    """

    # Validate URL
    if not url or not isinstance(url, str):
        return {
            "success": False,
            "error": "Invalid URL provided",
            "url": url,
            "html": None
        }

    # Add https:// if no protocol specified
    if not url.startswith(('http://', 'https://')):
        url = f'https://{url}'

    browser: Optional[Browser] = None

    try:
        async with async_playwright() as p:
            # Launch headless browser
            browser = await p.chromium.launch(headless=True)

            # Create new page
            page: Page = await browser.new_page()

            # Set user agent to avoid bot detection
            await page.set_extra_http_headers({
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            })

            # Navigate to URL and wait for network to be idle
            await page.goto(url, wait_until='networkidle', timeout=timeout)

            # Wait a bit for any dynamic content to load
            await page.wait_for_timeout(2000)

            # Extract HTML content
            html_content = await page.content()

            # Close browser
            await browser.close()

            return {
                "success": True,
                "html": html_content,
                "error": None,
                "url": url
            }

    except PlaywrightTimeoutError:
        if browser:
            await browser.close()
        return {
            "success": False,
            "error": f"Timeout: Page took longer than {timeout}ms to load",
            "url": url,
            "html": None
        }

    except Exception as e:
        if browser:
            await browser.close()

        error_message = str(e)

        # Provide more specific error messages
        if "net::ERR_NAME_NOT_RESOLVED" in error_message:
            error_message = "Invalid URL or domain does not exist"
        elif "net::ERR_CONNECTION_REFUSED" in error_message:
            error_message = "Connection refused by server"
        elif "net::ERR_CERT" in error_message:
            error_message = "SSL certificate error"

        return {
            "success": False,
            "error": error_message,
            "url": url,
            "html": None
        }


# Test function for manual testing
async def test_scraper():
    """Test the scraper with a sample URL"""
    test_url = "https://github.com/login"
    print(f"Testing scraper with: {test_url}")

    result = await scrape_url(test_url)

    if result["success"]:
        print(f"✓ Success! Retrieved {len(result['html'])} characters of HTML")
        print(f"First 200 chars: {result['html'][:200]}...")
    else:
        print(f"✗ Failed: {result['error']}")

    return result


if __name__ == "__main__":
    # Run test if script is executed directly
    asyncio.run(test_scraper())
