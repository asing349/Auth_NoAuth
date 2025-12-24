# Auth or Not

An AI-powered web scraper that automatically detects and extracts authentication components from websites. Uses Claude Sonnet 4 to identify traditional login forms (username/password) and OAuth/social login buttons.

## Features

- **AI-Powered Detection**: Uses Claude Sonnet 4 to intelligently identify authentication components
- **Dual Authentication Recognition**: Separates traditional auth forms from OAuth/social login buttons
- **Headless Browser Scraping**: Uses Playwright for accurate JavaScript-rendered page capture
- **Real-time Analysis**: Test any website URL through an intuitive web interface
- **Example Gallery**: Pre-loaded examples from popular websites (GitHub, LinkedIn, Dropbox, Spotify)
- **Visual Code Display**: Shows extracted HTML with syntax highlighting and expandable previews

## Tech Stack

### Backend
- **FastAPI** 0.127.0 - Modern Python web framework
- **Playwright** 1.57.0 - Headless browser automation
- **Anthropic SDK** 0.75.0 - Claude AI integration
- **Python** 3.12
- **Uvicorn** 0.40.0 - ASGI server

### Frontend
- **Next.js** 15 - React framework
- **React** 19 - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** v4 - Utility-first styling

### AI Model
- **Claude Sonnet 4** (claude-sonnet-4-20250514) - Advanced language model for HTML analysis

## Testing Results

### ✅ Websites That Worked (Auth Detected)

| Website | Traditional Auth | OAuth Providers | Notes |
|---------|-----------------|----------------|-------|
| [GitHub](https://github.com/login) | ✓ | Google, Apple | Full form with CSRF, webauthn support |
| [LinkedIn](https://www.linkedin.com/login) | ✓ | Google, Apple | Floating label inputs, password visibility |
| [Dropbox](https://www.dropbox.com/login) | ✓ | Google, Apple | Complex design system (dwg-*) |
| [Spotify](https://accounts.spotify.com/en/login) | ✓ | Google, Facebook, Apple | Encore design system (e-91132-*) |

### 📭 Websites With No Auth Found

| Website | Reason |
|---------|--------|
| [Google Homepage](https://www.google.com) | No login page at root URL |
| [Wikipedia Homepage](https://www.wikipedia.org) | No authentication on main page |
| [Amazon Homepage](https://www.amazon.com) | Auth buried in navigation, not on homepage |

### ❌ Websites That Failed to Scrape

| Website | Error | Reason |
|---------|-------|--------|
| [Reddit](https://www.reddit.com/login) | Bot Detection | Aggressive bot blocking mechanisms |
| [Wikipedia Login](https://en.wikipedia.org/w/index.php?title=Special:UserLogin) | Rate Limit | IP-based rate limiting |
| [BBC News](https://www.bbc.com/news) | Timeout | Complex JavaScript, slow loading |

## Setup Instructions

### Prerequisites

- Python 3.12+
- Node.js 18+
- Claude API key from [Anthropic Console](https://console.anthropic.com/)

### Backend Setup

```bash
cd backend

# Create virtual environment
python3.12 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install chromium

# Configure environment variables
cp .env.example .env
# Edit .env and add your CLAUDE_API_KEY

# Run the server
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables (optional for local development)
cp .env.example .env
# Edit .env if needed (defaults to http://localhost:8000)

# Run the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Documentation

### Base URL
- Development: `http://localhost:8000`
- Production: Your Railway deployment URL

### Endpoints

#### `POST /scrape`

Scrape a URL and detect authentication components.

**Request Body:**
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
  "error": null,
  "explanation": "Traditional login form found, OAuth/social login found",
  "scrape_success": true,
  "html_size": 70174
}
```

#### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "claude_api_configured": true
}
```

## Deployment

### Backend (Railway)

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Set environment variables:
   - `CLAUDE_API_KEY`: Your Anthropic API key
   - `FRONTEND_URL`: Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
4. Railway will automatically detect and use the `Procfile` and `railway.json`
5. The deployment will install Playwright browsers automatically

### Frontend (Vercel)

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Set the root directory to `frontend`
4. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Railway backend URL (e.g., `https://your-app.railway.app`)
5. Deploy

### Post-Deployment

After both services are deployed, update the environment variables:
- Backend `FRONTEND_URL` → Your Vercel URL
- Frontend `NEXT_PUBLIC_API_URL` → Your Railway URL

Redeploy both services for changes to take effect.

## Limitations

- **Bot Detection**: Many websites block headless browsers (Playwright/Selenium), preventing successful scraping
- **Rate Limiting**: Frequent scraping triggers IP-based rate limits and temporary blocks
- **CAPTCHA Barriers**: Cannot solve CAPTCHAs or other anti-bot challenges
- **Dynamic Content**: JavaScript that loads authentication forms after initial page render may be missed
- **Single Page Analysis**: Only analyzes the initial URL, misses multi-step login flows or auth hidden in navigation
- **API Costs**: Each analysis requires a Claude API call (~20-30 cents per 1M tokens)
- **Processing Time**: 20-30 seconds per URL due to headless browser + AI analysis
- **Geo-Restrictions**: Some sites show different content based on geographic location
- **HTML Structure Dependency**: Relies on HTML patterns that can break when sites update their frontend

## Alternatives for Improved Accuracy

### Vision-Based Language Models

Instead of scraping HTML and analyzing it as text, vision-based LLMs (like Claude with vision or GPT-4 Vision) can analyze screenshots of login pages. This approach:
- Captures visual layout and design patterns that HTML alone might miss
- Handles dynamically-loaded content without complex JavaScript execution
- Identifies auth components even when HTML structure is obfuscated
- Better handles modern single-page applications (SPAs)

**Trade-offs**: Higher API costs, slower processing, requires screenshot infrastructure.

### Selenium Grid with Residential Proxies

For websites with aggressive bot detection, using Selenium Grid with residential proxy rotation can bypass blocks:
- Residential IPs appear as real users, reducing detection
- Grid architecture allows parallel scraping across multiple IP addresses
- Can solve CAPTCHAs with third-party services
- Handles complex JavaScript interactions

**Trade-offs**: Significantly higher infrastructure costs, complex setup, potential ethical/legal concerns, slower than headless browsers.

## Project Structure

```
Auth_NoAuth/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── scraper.py           # Playwright web scraping
│   ├── ai_detector.py       # Claude AI detection logic
│   ├── requirements.txt     # Python dependencies
│   ├── Procfile            # Railway start command
│   ├── railway.json        # Railway configuration
│   └── .env.example        # Environment template
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ExamplesTab.tsx    # Pre-loaded examples
│   │   │   ├── TestTab.tsx        # URL testing interface
│   │   │   └── CodeDisplay.tsx    # HTML preview component
│   │   ├── page.tsx        # Main page
│   │   └── globals.css     # Global styles
│   ├── package.json        # Node dependencies
│   └── .env.example        # Environment template
└── examples/               # Scraped example data
    ├── github-login.json
    ├── linkedin-login.json
    ├── dropbox-login.json
    └── spotify-login.json
```

## Color Scheme

- Primary Blue: `#3148F6`
- Light Gray: `#E9E9E9`
- Dark Gray: `#1C2127`
- White: `#FFFFFF`
- Dark Blue: `#1C4B8F`

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on GitHub.
