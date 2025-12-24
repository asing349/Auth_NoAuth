import os
from typing import Optional, Dict
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()


class AIDetectorError(Exception):
    """Custom exception for AI detector errors"""
    pass


def initialize_claude(api_key: Optional[str] = None) -> Anthropic:
    """
    Initialize Claude client with API key.

    Args:
        api_key: Claude API key. If None, reads from CLAUDE_API_KEY env variable.

    Returns:
        Configured Anthropic client
    """
    if api_key is None:
        api_key = os.getenv("CLAUDE_API_KEY")

    if not api_key:
        raise AIDetectorError("CLAUDE_API_KEY not found in environment variables")

    client = Anthropic(api_key=api_key)
    return client


def prepare_html_for_analysis(html: str, max_chars: int = 100000) -> str:
    """
    Prepare HTML for analysis by limiting size if needed.

    Args:
        html: The HTML content
        max_chars: Maximum characters to send (default: 100k chars ~25k tokens)

    Returns:
        Truncated or original HTML
    """
    if len(html) <= max_chars:
        return html

    # Try to find the body tag and prioritize that content
    body_start = html.lower().find('<body')
    if body_start != -1:
        # Get from body tag onwards, up to max_chars
        return html[body_start:body_start + max_chars]

    # Otherwise just return first max_chars
    return html[:max_chars]


async def detect_auth_with_ai(html: str, api_key: Optional[str] = None) -> Dict[str, any]:
    """
    Uses Claude AI to detect and extract authentication/login components from HTML.
    Detects BOTH traditional login forms AND OAuth/social login buttons separately.

    Args:
        html: The HTML content to analyze
        api_key: Optional Claude API key. If None, reads from environment.

    Returns:
        Dictionary containing:
            - success: bool
            - has_traditional_auth: bool (username/password form found)
            - has_oauth: bool (OAuth/social login buttons found)
            - traditional_auth_html: str (traditional form HTML, or None)
            - oauth_html: str (OAuth buttons HTML, or None)
            - error: str (error message if failed, or None)
            - explanation: str (brief explanation from AI)
    """

    if not html or not isinstance(html, str):
        return {
            "success": False,
            "has_traditional_auth": False,
            "has_oauth": False,
            "traditional_auth_html": None,
            "oauth_html": None,
            "error": "Invalid HTML provided",
            "explanation": None
        }

    try:
        # Initialize Claude client
        client = initialize_claude(api_key)

        # Prepare HTML (limit size to avoid token limits)
        prepared_html = prepare_html_for_analysis(html)

        # Craft the prompt
        prompt = f"""You are an expert web developer analyzing HTML to find authentication/login components.

Your task is to find TWO SEPARATE types of authentication components:

1. **TRADITIONAL AUTH**: Login forms with username/email and password fields
2. **OAUTH/SOCIAL LOGIN**: "Sign in with..." buttons (Google, GitHub, Facebook, etc.)

IMPORTANT: Return your response as JSON with this exact structure:
{{
  "traditional_auth": "<html snippet or null>",
  "oauth": "<html snippet or null>"
}}

Instructions:
1. Look for TRADITIONAL AUTH (username/password forms):
   - Username, email, or phone input fields
   - Password input fields
   - Login/Sign in buttons
   - Form tags containing authentication inputs
   - Login containers or divs

2. Look for OAUTH/SOCIAL LOGIN:
   - "Sign in with Google" buttons
   - "Continue with GitHub" buttons
   - "Sign in with Facebook/Twitter/Microsoft" buttons
   - OAuth provider buttons
   - Social login sections

3. Extract ONLY the relevant HTML for each type
4. Return raw HTML without markdown formatting
5. If a type is not found, use null

Example response:
{{
  "traditional_auth": "<form action='/login'>...</form>",
  "oauth": "<div class='social-login'><button>Sign in with Google</button></div>"
}}

If NEITHER type is found, respond:
{{
  "traditional_auth": null,
  "oauth": null
}}

HTML to analyze:
{prepared_html}
"""

        # Call Claude API
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=8192,
            temperature=0.1,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        # Extract response text
        response_text = response.content[0].text.strip()

        # Parse JSON response
        import json

        # Clean up response (remove markdown code blocks if present)
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        elif response_text.startswith("```"):
            response_text = response_text[3:]

        if response_text.endswith("```"):
            response_text = response_text[:-3]

        response_text = response_text.strip()

        try:
            parsed = json.loads(response_text)
            traditional_auth = parsed.get("traditional_auth")
            oauth = parsed.get("oauth")
        except json.JSONDecodeError:
            # Fallback: try to extract manually if JSON parsing fails
            return {
                "success": True,
                "has_traditional_auth": False,
                "has_oauth": False,
                "traditional_auth_html": None,
                "oauth_html": None,
                "error": None,
                "explanation": "Could not parse AI response as JSON"
            }

        # Clean up HTML snippets
        traditional_auth_html = None
        if traditional_auth and traditional_auth != "null" and len(str(traditional_auth)) > 10:
            traditional_auth_html = str(traditional_auth).strip()

        oauth_html = None
        if oauth and oauth != "null" and len(str(oauth)) > 10:
            oauth_html = str(oauth).strip()

        has_traditional = traditional_auth_html is not None
        has_oauth = oauth_html is not None

        explanation_parts = []
        if has_traditional:
            explanation_parts.append("Traditional login form found")
        if has_oauth:
            explanation_parts.append("OAuth/social login found")
        if not has_traditional and not has_oauth:
            explanation_parts.append("No authentication components found")

        return {
            "success": True,
            "has_traditional_auth": has_traditional,
            "has_oauth": has_oauth,
            "traditional_auth_html": traditional_auth_html,
            "oauth_html": oauth_html,
            "error": None,
            "explanation": ", ".join(explanation_parts)
        }

    except Exception as e:
        error_message = str(e)

        # Provide more specific error messages
        if "API_KEY" in error_message.upper() or "authentication" in error_message.lower():
            error_message = "Invalid or missing Claude API key"
        elif "quota" in error_message.lower() or "overloaded" in error_message.lower():
            error_message = "API quota exceeded or service overloaded"
        elif "rate" in error_message.lower():
            error_message = "Rate limit exceeded"

        return {
            "success": False,
            "has_traditional_auth": False,
            "has_oauth": False,
            "traditional_auth_html": None,
            "oauth_html": None,
            "error": error_message,
            "explanation": None
        }


# Test function
async def test_ai_detector():
    """Test the AI detector with sample HTML"""

    # Sample HTML with both traditional and OAuth
    sample_html = """
    <!DOCTYPE html>
    <html>
    <head><title>Test Login Page</title></head>
    <body>
        <h1>Welcome to our site</h1>

        <div class="social-login">
            <button class="google-btn">Sign in with Google</button>
            <button class="github-btn">Sign in with GitHub</button>
        </div>

        <div class="divider">OR</div>

        <div class="login-container">
            <form action="/login" method="POST">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>

                <button type="submit">Sign In</button>
            </form>
        </div>
        <footer>Copyright 2025</footer>
    </body>
    </html>
    """

    print("Testing AI Detector with sample login HTML...")
    print("=" * 80)

    result = await detect_auth_with_ai(sample_html)

    if result["success"]:
        print(f"✓ Analysis successful!")
        print(f"\nTraditional Auth: {'✓ Found' if result['has_traditional_auth'] else '✗ Not found'}")
        if result['traditional_auth_html']:
            print(f"  Length: {len(result['traditional_auth_html'])} chars")
            print(f"  Preview: {result['traditional_auth_html'][:100]}...")

        print(f"\nOAuth/Social Login: {'✓ Found' if result['has_oauth'] else '✗ Not found'}")
        if result['oauth_html']:
            print(f"  Length: {len(result['oauth_html'])} chars")
            print(f"  Preview: {result['oauth_html'][:100]}...")

        print(f"\nExplanation: {result['explanation']}")
    else:
        print(f"✗ Error: {result['error']}")

    return result


if __name__ == "__main__":
    import asyncio
    asyncio.run(test_ai_detector())
