from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl, Field
from typing import Optional
import os
from dotenv import load_dotenv

from scraper import scrape_url
from ai_detector import detect_auth_with_ai

load_dotenv()

app = FastAPI(
    title="Auth Component Detector",
    description="AI-powered web scraper that detects authentication components",
    version="1.0.0"
)

# Allow all origins for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,  # Must be False when allow_origins is ["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class ScrapeRequest(BaseModel):
    url: str = Field(..., description="The URL to scrape and analyze", min_length=1)
    timeout: Optional[int] = Field(30000, description="Timeout in milliseconds", ge=5000, le=60000)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "url": "https://github.com/login",
                    "timeout": 30000
                }
            ]
        }
    }


class ScrapeResponse(BaseModel):
    url: str
    found: bool
    has_traditional_auth: bool = False
    has_oauth: bool = False
    traditional_auth_html: Optional[str] = None
    oauth_html: Optional[str] = None
    error: Optional[str] = None
    explanation: Optional[str] = None
    scrape_success: bool
    html_size: Optional[int] = None


@app.get("/")
async def root():
    return {
        "message": "Auth Component Detector API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "/scrape": "POST - Scrape a URL and detect auth components",
            "/health": "GET - Health check"
        }
    }


@app.get("/health")
async def health_check():
    api_key_set = bool(os.getenv("CLAUDE_API_KEY"))
    return {
        "status": "healthy",
        "claude_api_configured": api_key_set
    }


@app.post("/scrape", response_model=ScrapeResponse)
async def scrape_and_detect(request: ScrapeRequest):
    """
    Scrape a website and detect authentication components using AI.

    This endpoint:
    1. Scrapes the provided URL using a headless browser
    2. Analyzes the HTML with Claude AI to find login/auth forms
    3. Returns the extracted authentication component HTML

    Returns:
        ScrapeResponse with auth component if found, or error details
    """

    # Validate URL format
    url = request.url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="URL cannot be empty")

    # Step 1: Scrape the URL
    scrape_result = await scrape_url(url, timeout=request.timeout)

    if not scrape_result["success"]:
        return ScrapeResponse(
            url=scrape_result["url"],
            found=False,
            has_traditional_auth=False,
            has_oauth=False,
            traditional_auth_html=None,
            oauth_html=None,
            error=f"Scraping failed: {scrape_result['error']}",
            explanation=None,
            scrape_success=False,
            html_size=None
        )

    html_size = len(scrape_result["html"])

    # Step 2: Detect auth component with AI
    ai_result = await detect_auth_with_ai(scrape_result["html"])

    if not ai_result["success"]:
        return ScrapeResponse(
            url=scrape_result["url"],
            found=False,
            has_traditional_auth=False,
            has_oauth=False,
            traditional_auth_html=None,
            oauth_html=None,
            error=f"AI detection failed: {ai_result['error']}",
            explanation=None,
            scrape_success=True,
            html_size=html_size
        )

    # Success response
    found = ai_result["has_traditional_auth"] or ai_result["has_oauth"]

    return ScrapeResponse(
        url=scrape_result["url"],
        found=found,
        has_traditional_auth=ai_result["has_traditional_auth"],
        has_oauth=ai_result["has_oauth"],
        traditional_auth_html=ai_result["traditional_auth_html"],
        oauth_html=ai_result["oauth_html"],
        error=None,
        explanation=ai_result["explanation"],
        scrape_success=True,
        html_size=html_size
    )
