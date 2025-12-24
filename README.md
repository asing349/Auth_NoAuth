# Auth Component Detector - Backend API

FastAPI backend that uses Claude Sonnet 4 and Playwright to detect authentication components on websites.

## Tech Stack

- Python 3.12
- FastAPI 0.127.0
- Playwright 1.57.0
- Anthropic SDK 0.75.0
- Claude Sonnet 4 (claude-sonnet-4-20250514)

## Setup

```bash
# Create virtual environment
python3.12 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install chromium

# Configure environment
cp .env.example .env
# Add your CLAUDE_API_KEY to .env

# Run server
uvicorn main:app --reload --port 8000
```

## Environment Variables

- `CLAUDE_API_KEY` - Your Anthropic API key (required)
- `FRONTEND_URL` - Comma-separated list of allowed CORS origins (default: http://localhost:3000)

## API Endpoints

### `POST /scrape`
Scrape a URL and detect authentication components.

**Request:**
```json
{
  "url": "https://github.com/login",
  "timeout": 30000
}
```

**Response:**
```json
{
  "url": "https://github.com/login",
  "found": true,
  "has_traditional_auth": true,
  "has_oauth": true,
  "traditional_auth_html": "<form>...</form>",
  "oauth_html": "<div>...</div>",
  "explanation": "Traditional login form found, OAuth/social login found",
  "scrape_success": true,
  "html_size": 70174
}
```

### `GET /health`
Health check endpoint.

## Deployment

Configured for Railway deployment with:
- Automatic Playwright browser installation
- Health check endpoint
- Auto-restart on failure

Environment variables needed in production:
- `CLAUDE_API_KEY`
- `FRONTEND_URL`
