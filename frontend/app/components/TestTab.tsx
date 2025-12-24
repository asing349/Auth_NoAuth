'use client';

import { useState } from 'react';
import CodeDisplay from './CodeDisplay';

interface ScrapeResult {
  url: string;
  found: boolean;
  has_traditional_auth: boolean;
  has_oauth: boolean;
  traditional_auth_html?: string;
  oauth_html?: string;
  error?: string;
  explanation?: string;
  scrape_success: boolean;
  html_size?: number;
}

export default function TestTab() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setLoadingMessage('Scraping website...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setLoadingMessage('Analyzing with Claude AI...');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze URL');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-sm" style={{ color: '#E9E9E9' }}>
          Test any website URL to detect authentication components
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/login"
            className="flex-1 px-4 py-3 rounded-lg text-sm"
            style={{
              backgroundColor: '#E9E9E9',
              color: '#1C2127',
              border: '2px solid #1C4B8F',
            }}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg font-semibold transition-all"
            style={{
              backgroundColor: loading ? '#1C4B8F' : '#3148F6',
              color: '#FFFFFF',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {/* Loading Message */}
      {loading && (
        <div
          className="p-6 rounded-lg mb-6 text-center"
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #3148F6',
          }}
        >
          <div className="mb-3">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-t-2" style={{ borderColor: '#3148F6' }}></div>
          </div>
          <p className="text-base font-semibold" style={{ color: '#1C2127' }}>
            {loadingMessage}
          </p>
          <p className="text-xs mt-2" style={{ color: '#1C2127', opacity: 0.6 }}>
            This may take 20-30 seconds...
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <div
          className="p-4 rounded-lg mb-6"
          style={{
            backgroundColor: '#FFEBEE',
            border: '2px solid #F44336',
            color: '#C62828',
          }}
        >
          <p className="text-sm font-semibold">❌ Error: {error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div
          className="rounded-lg p-6"
          style={{
            backgroundColor: '#FFFFFF',
            border: `2px solid ${result.found ? '#3148F6' : '#E9E9E9'}`,
          }}
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1C2127' }}>
              Analysis Results
            </h3>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline break-all"
              style={{ color: '#3148F6' }}
            >
              {result.url}
            </a>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="text-xs px-3 py-1 rounded font-semibold"
              style={{
                backgroundColor: result.scrape_success ? '#4CAF50' : '#F44336',
                color: '#FFFFFF',
              }}
            >
              Scrape: {result.scrape_success ? 'Success' : 'Failed'}
            </span>
            {result.found ? (
              <>
                {result.has_traditional_auth && (
                  <span
                    className="text-xs px-3 py-1 rounded font-semibold"
                    style={{ backgroundColor: '#3148F6', color: '#FFFFFF' }}
                  >
                    Traditional Auth
                  </span>
                )}
                {result.has_oauth && (
                  <span
                    className="text-xs px-3 py-1 rounded font-semibold"
                    style={{ backgroundColor: '#1C4B8F', color: '#FFFFFF' }}
                  >
                    OAuth
                  </span>
                )}
              </>
            ) : (
              <span
                className="text-xs px-3 py-1 rounded font-semibold"
                style={{ backgroundColor: '#E9E9E9', color: '#1C2127' }}
              >
                No Auth Found
              </span>
            )}
          </div>

          {/* Explanation */}
          {result.explanation && (
            <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#E9E9E9' }}>
              <p className="text-sm" style={{ color: '#1C2127' }}>
                <strong>Analysis:</strong> {result.explanation}
              </p>
            </div>
          )}

          {/* Error/Warning from API */}
          {result.error && (
            <div
              className="mb-4 p-3 rounded"
              style={{
                backgroundColor: '#FFECB3',
                border: '1px solid #FFA000'
              }}
            >
              <p className="text-sm font-semibold" style={{ color: '#1C2127' }}>
                ⚠️ {result.error}
              </p>
              {(result.error.includes('Rate limit') || result.error.includes('timeout') || result.error.includes('bot')) && (
                <p className="text-xs mt-2" style={{ color: '#1C2127', opacity: 0.7 }}>
                  This could be due to bot detection, rate limiting, or dynamic page loading.
                </p>
              )}
            </div>
          )}

          {/* HTML Size */}
          {result.html_size && (
            <p className="text-xs mb-4" style={{ color: '#1C2127', opacity: 0.6 }}>
              HTML Size: {result.html_size.toLocaleString()} bytes
            </p>
          )}

          {/* Code Displays */}
          {result.has_traditional_auth && result.traditional_auth_html && (
            <CodeDisplay
              html={result.traditional_auth_html}
              title="Traditional Login Form (Username/Password)"
              type="traditional"
            />
          )}

          {result.has_oauth && result.oauth_html && (
            <CodeDisplay
              html={result.oauth_html}
              title="OAuth/Social Login Buttons"
              type="oauth"
            />
          )}

          {/* No auth found message */}
          {result.scrape_success && !result.found && !result.error && (
            <div className="text-center py-8" style={{ backgroundColor: '#E9E9E9', borderRadius: '8px' }}>
              <p className="text-lg font-semibold mb-2" style={{ color: '#1C2127' }}>
                ✓ No Authentication Available
              </p>
              <p className="text-sm" style={{ color: '#1C2127', opacity: 0.7 }}>
                No authentication components detected on this page
              </p>
            </div>
          )}

          {/* Scrape failed message */}
          {!result.scrape_success && (
            <div className="text-center py-8" style={{ backgroundColor: '#FFEBEE', borderRadius: '8px' }}>
              <p className="text-lg font-semibold mb-2" style={{ color: '#C62828' }}>
                ❌ Scrape Failed
              </p>
              <p className="text-sm" style={{ color: '#C62828' }}>
                Unable to scrape the page. It may be timing out or blocking the scraper.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {!result && !loading && !error && (
        <div className="text-center py-12">
          <p className="text-sm" style={{ color: '#E9E9E9', opacity: 0.6 }}>
            Enter a website URL above to start analyzing for authentication components
          </p>
        </div>
      )}
    </div>
  );
}
