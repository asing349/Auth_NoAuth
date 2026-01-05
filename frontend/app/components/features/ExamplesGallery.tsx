'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import CodeViewer from '../ui/CodeViewer';
import { examples } from '@/app/data/examples';

export default function ExamplesGallery() {
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'oauth' | 'traditional' | 'none'>('all');

  const filteredExamples = examples.filter((example) => {
    if (filter === 'all') return true;
    if (filter === 'oauth') return example.has_oauth;
    if (filter === 'traditional') return example.has_traditional_auth && !example.has_oauth;
    if (filter === 'none') return !example.found;
    return true;
  });

  return (
    <section id="examples" style={{ padding: '48px 0', backgroundColor: 'var(--color-bg-elevated)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>See it in Action</h2>
          <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>
            Pre-analyzed authentication examples from popular websites
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '48px' }}>
          {[
            { key: 'all', label: 'All Examples' },
            { key: 'oauth', label: 'OAuth' },
            { key: 'traditional', label: 'Traditional Auth' },
            { key: 'none', label: 'No Auth' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              style={{
                padding: '8px 24px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s',
                cursor: 'pointer',
                ...(filter === key
                  ? {
                      backgroundColor: 'var(--color-primary-500)',
                      color: 'white',
                      boxShadow: 'var(--shadow-teal)',
                      border: 'none',
                    }
                  : {
                      backgroundColor: 'var(--color-primary-50)',
                      color: 'var(--color-primary-700)',
                      border: '1px solid var(--color-primary-100)',
                    }),
              }}
              onMouseEnter={(e) => {
                if (filter !== key) {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-100)';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== key) {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Examples List with Inline Expansion */}
        <div style={{ marginBottom: '48px' }}>
          {filteredExamples.map((example, idx) => (
            <div key={idx} style={{ marginBottom: '24px' }}>
              {/* Card */}
              <Card
                onClick={() => setSelectedExample(selectedExample === idx ? null : idx)}
                style={{
                  transition: 'all 0.2s',
                  border: selectedExample === idx ? '2px solid var(--color-primary-500)' : '1px solid var(--color-border-default)',
                }}
              >
                {/* Card Content */}
                <div
                  onMouseEnter={(e) => {
                    const card = e.currentTarget.parentElement;
                    if (card && selectedExample !== idx) {
                      card.style.boxShadow = 'var(--shadow-lg)';
                      card.style.transform = 'scale(1.01)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget.parentElement;
                    if (card) {
                      card.style.boxShadow = 'var(--shadow-md)';
                      card.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {/* Site Name */}
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{example.site_name}</h3>

                  {/* URL */}
                  <a
                    href={example.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '14px',
                      display: 'block',
                      marginBottom: '16px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: 'var(--color-primary-500)',
                      textDecoration: 'none',
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    {example.url}
                  </a>

                  {/* Divider */}
                  <div style={{ borderTop: '1px solid var(--color-border-default)', margin: '16px 0' }}></div>

                  {/* Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {example.found ? (
                      <>
                        {example.has_traditional_auth && (
                          <Badge variant="traditional">Traditional</Badge>
                        )}
                        {example.has_oauth && <Badge variant="oauth">OAuth</Badge>}
                      </>
                    ) : (
                      <Badge variant="none">No Auth Found</Badge>
                    )}
                  </div>

                  {/* Description - truncated */}
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-secondary)',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.5',
                    }}
                  >
                    {example.explanation}
                  </p>

                  {/* Error if present */}
                  {example.error && (
                    <div
                      style={{
                        marginTop: '12px',
                        padding: '8px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--color-warning-light)',
                        fontSize: '12px',
                      }}
                    >
                      ⚠️ {example.error}
                    </div>
                  )}

                  {/* View Details Link */}
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border-default)' }}>
                    <button
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-primary-500)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-500)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-primary-500)')}
                    >
                      {selectedExample === idx ? 'Hide Details ↑' : 'View Analysis →'}
                    </button>
                  </div>
                </div>
              </Card>

              {/* Inline Expanded View */}
              {selectedExample === idx && (
                <div style={{ marginTop: '16px' }}>
                  <Card style={{ padding: '32px', backgroundColor: 'var(--color-bg-subtle)' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                      <div>
                        <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
                          Detailed Analysis: {example.site_name}
                        </h3>
                        <a
                          href={example.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '14px',
                            color: 'var(--color-primary-500)',
                            textDecoration: 'none',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                        >
                          {example.url}
                        </a>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExample(null);
                        }}
                        style={{
                          fontSize: '32px',
                          color: 'var(--color-text-tertiary)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'color 0.2s',
                          lineHeight: 1,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-tertiary)')}
                      >
                        ×
                      </button>
                    </div>

                    {/* Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {example.found ? (
                        <>
                          {example.has_traditional_auth && (
                            <Badge variant="traditional">Traditional Auth</Badge>
                          )}
                          {example.has_oauth && (
                            <Badge variant="oauth">OAuth</Badge>
                          )}
                        </>
                      ) : (
                        <Badge variant="none">No Auth Found</Badge>
                      )}
                    </div>

                    {/* Explanation */}
                    {example.explanation && (
                      <div
                        style={{
                          marginBottom: '24px',
                          padding: '16px',
                          borderRadius: '8px',
                          backgroundColor: 'white',
                        }}
                      >
                        <p style={{ fontSize: '14px' }}>
                          <strong>Analysis:</strong> {example.explanation}
                        </p>
                      </div>
                    )}

                    {/* Error */}
                    {example.error && (
                      <div
                        style={{
                          marginBottom: '24px',
                          padding: '16px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--color-warning-light)',
                          border: '1px solid var(--color-warning-main)',
                        }}
                      >
                        <p style={{ fontSize: '14px', fontWeight: 600 }}>
                          ⚠️ {example.error}
                        </p>
                      </div>
                    )}

                    {/* Code Viewers */}
                    {example.has_traditional_auth && example.traditional_auth_html && (
                      <CodeViewer
                        html={example.traditional_auth_html}
                        title="Traditional Login Form (Username/Password)"
                        type="traditional"
                      />
                    )}

                    {example.has_oauth && example.oauth_html && (
                      <CodeViewer
                        html={example.oauth_html}
                        title="OAuth/Social Login Buttons"
                        type="oauth"
                      />
                    )}

                    {/* No auth found message */}
                    {!example.found && (
                      <div
                        style={{
                          textAlign: 'center',
                          padding: '48px 0',
                          backgroundColor: 'white',
                          borderRadius: '12px',
                        }}
                      >
                        <p style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
                          No Authentication Components
                        </p>
                        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                          No authentication detected on this page
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
