'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import CodeViewer from '../ui/CodeViewer';
import { ScrapeResult } from '@/app/types';

export default function AnalysisForm() {
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
      const apiUrl = 'https://authnoauth-production.up.railway.app';
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
    <section id="analyze" style={{ padding: '48px 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
        {/* Hero Section */}
        <Card
          style={{
            border: '2px solid var(--color-primary-500)',
            boxShadow: 'var(--shadow-lg)',
            padding: '48px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>
              Analyze Website Authentication
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>
              Detect OAuth, Traditional Auth, or Neither
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/login"
                  disabled={loading}
                  fullWidth
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                size="large"
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </form>

          {/* Quick Examples */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--color-text-tertiary)', marginBottom: '12px' }}>
              Quick examples:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
              {['GitHub', 'LinkedIn', 'Dropbox', 'Spotify'].map((site) => (
                <button
                  key={site}
                  onClick={() => setUrl(`https://${site.toLowerCase()}.com/login`)}
                  disabled={loading}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    backgroundColor: 'var(--color-primary-50)',
                    color: 'var(--color-primary-700)',
                    border: '1px solid var(--color-primary-100)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary-100)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                  }}
                >
                  {site}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card style={{ marginTop: '32px', textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '48px',
                  height: '48px',
                  border: '4px solid var(--color-primary-500)',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
            </div>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{loadingMessage}</p>
            <p style={{ fontSize: '14px', color: 'var(--color-text-tertiary)' }}>
              This may take 20-30 seconds...
            </p>
            <style jsx>{`
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </Card>
        )}

        {/* Error Message */}
        {error && !loading && (
          <Card
            style={{
              marginTop: '32px',
              backgroundColor: 'var(--color-error-light)',
              border: '2px solid var(--color-error-main)',
            }}
          >
            <p style={{ color: 'var(--color-error-dark)', fontWeight: 600 }}>
              ❌ Error: {error}
            </p>
          </Card>
        )}

        {/* Instructions */}
        {!result && !loading && !error && (
          <div style={{ marginTop: '32px', textAlign: 'center', padding: '48px 0' }}>
            <p style={{ color: 'var(--color-text-tertiary)' }}>
              Enter a website URL above to start analyzing for authentication components
            </p>
          </div>
        )}
      </div>

      {/* Results - Wider container for better readability */}
      {result && !loading && (
        <div style={{ maxWidth: '1200px', margin: '32px auto 0 auto', padding: '0 16px' }}>
          <Card>
            {/* Result Header */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Analysis Results</h3>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '14px', wordBreak: 'break-all' }}
              >
                {result.url}
              </a>
            </div>

            {/* Status Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              <Badge variant={result.scrape_success ? 'success' : 'error'}>
                Scrape: {result.scrape_success ? 'Success' : 'Failed'}
              </Badge>
              {result.found ? (
                <>
                  {result.has_traditional_auth && (
                    <Badge variant="traditional">Traditional Auth</Badge>
                  )}
                  {result.has_oauth && <Badge variant="oauth">OAuth</Badge>}
                </>
              ) : (
                <Badge variant="none">No Auth Found</Badge>
              )}
            </div>

            {/* Explanation */}
            {result.explanation && (
              <div style={{ marginBottom: '24px', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--color-bg-elevated)' }}>
                <p style={{ fontSize: '14px' }}>
                  <strong>Analysis:</strong> {result.explanation}
                </p>
              </div>
            )}

            {/* Errors/Warnings */}
            {result.error && (
              <div style={{ marginBottom: '24px', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--color-warning-light)', border: '1px solid var(--color-warning-main)' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  ⚠️ {result.error}
                </p>
                {(result.error.includes('Rate limit') || result.error.includes('timeout') || result.error.includes('bot')) && (
                  <p style={{ fontSize: '12px', marginTop: '8px', color: 'var(--color-text-secondary)' }}>
                    This could be due to bot detection, rate limiting, or dynamic page loading.
                  </p>
                )}
              </div>
            )}

            {/* HTML Size */}
            {result.html_size && (
              <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '24px' }}>
                HTML Size: {result.html_size.toLocaleString()} bytes
              </p>
            )}

            {/* Code Displays */}
            {result.has_traditional_auth && result.traditional_auth_html && (
              <CodeViewer
                html={result.traditional_auth_html}
                title="Traditional Login Form (Username/Password)"
                type="traditional"
              />
            )}

            {result.has_oauth && result.oauth_html && (
              <CodeViewer
                html={result.oauth_html}
                title="OAuth/Social Login Buttons"
                type="oauth"
              />
            )}

            {/* No auth found */}
            {result.scrape_success && !result.found && !result.error && (
              <div style={{ textAlign: 'center', padding: '48px 0', backgroundColor: 'var(--color-bg-elevated)', borderRadius: '12px' }}>
                <p style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
                  ✓ No Authentication Available
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  No authentication components detected on this page
                </p>
              </div>
            )}

            {/* Scrape failed */}
            {!result.scrape_success && (
              <div style={{ textAlign: 'center', padding: '48px 0', backgroundColor: 'var(--color-error-light)', borderRadius: '12px' }}>
                <p style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-error-dark)', marginBottom: '8px' }}>
                  ❌ Scrape Failed
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-error-dark)' }}>
                  Unable to scrape the page. It may be timing out or blocking the scraper.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </section>
  );
}
