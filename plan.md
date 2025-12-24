Detailed Phase Breakdown
Phase 1: Environment Setup (use .venv)
Goal: Get everything installed and ready
Actions:

Create new Python project directory
Install dependencies: FastAPI, Playwright, httpx (for API calls to LLM), uvicorn
Install Playwright browsers (playwright install)
Get API key (Claude or OpenAI - whichever you have access to)
Create basic FastAPI app skeleton
Test that server runs

Output: Server starts, dependencies work

Phase 2: Build Scraper Module
Goal: Function that takes URL and returns HTML
Actions:

Write function: scrape_url(url) → html_string
Use Playwright to:

Launch headless browser
Navigate to URL
Wait for page load (wait for network idle or specific timeout)
Extract full HTML with page.content()
Close browser


Handle errors (timeout, invalid URL, connection issues)
Test manually with 2-3 URLs (GitHub login, Twitter, any SaaS)

Output: Function that reliably fetches HTML from any URL

Phase 3: Build AI Detection Module
Goal: Function that takes HTML and returns auth component
Actions:

Write function: detect_auth_with_ai(html_string) → auth_snippet or None
Craft prompt for LLM:

"You are analyzing HTML from a webpage. Find and extract the authentication/login form."
"Look for username/email fields and password fields."
"Return ONLY the HTML snippet containing the login form. If no auth component exists, respond with 'NONE'"


Integrate API call to Claude/OpenAI
Handle token limits (if HTML is huge, maybe send first 50KB or intelligently chunk)
Parse LLM response
Handle edge cases (LLM returns explanation instead of HTML, no auth found)

Output: Function that takes HTML, asks AI, returns auth snippet

Phase 4: Test with 5 Different Sites
Goal: Verify the approach works across site types
Actions:

Pick 5 diverse sites:

GitHub (login page)
Medium (has auth)
Amazon (login)
Random WordPress blog with login
Stripe/SaaS platform


Run scraper + AI detection on each
Manually verify results are correct
Document what works/doesn't work
Adjust prompt if needed

Output: 5 validated results proving the system works

Phase 5: Build FastAPI Endpoint
Goal: Expose scraping + detection as API
Actions:

Create POST endpoint: /scrape
Request body: {"url": "https://example.com"}
Response body: {"url": "...", "found": true/false, "auth_html": "...", "error": null}
Connect scraper module + AI detection module
Add error handling (invalid URL, scraping failed, AI API failed)
Add request validation
Test endpoint with Postman/curl

Output: Working API endpoint that accepts URL and returns auth component

Phase 6: Build Simple Frontend
Goal: UI for testing the tool
Two options (pick one based on speed):
Option A: Static HTML + JavaScript (Faster)

Single HTML file
Form with URL input + submit button
JavaScript fetch() to call API
Display result (show auth HTML or "not found")
Basic CSS for readability
Serve from FastAPI (app.mount() for static files)

Option B: Quick React App (If you're fast with React)

Create React app (or Vite)
One component: URL input, submit, display results
Axios/fetch to backend
Deploy separately

Actions:

Build the form UI
Connect to backend API
Test end-to-end flow
Add loading state while scraping

Output: Working UI where you can input URL and see results

Phase 7: Create Examples Section
Goal: Pre-load results so evaluators see it works immediately
Actions:

Store the 5 validated results from Phase 4
Create endpoint: GET /examples that returns these
On frontend load, fetch and display the 5 examples
Shows: URL, auth snippet found, visual preview

Output: Landing page shows working examples without user input

Phase 8: Deployment
Goal: Make it accessible via public URL
Backend Deployment (Pick one):

Railway: Connect GitHub repo, auto-deploy
Render: Free tier, supports Python
Fly.io: Free tier

Frontend Deployment:

If static HTML: Deploy with backend
If React: Vercel (connect GitHub, auto-deploy)

Actions:

Add environment variables (API keys)
Test deployed version
Fix CORS issues if frontend is separate
Verify all 5 examples work on deployed version

Output: Public URL that evaluators can test

Phase 9: Documentation
Goal: Clean README so evaluators can understand and run locally
Actions:

Write README with:

What the tool does
How to run locally (setup instructions)
API documentation
Live demo URL
Tech stack used
Example requests/responses


Add .env.example file
Clean up code comments

Output: Professional README