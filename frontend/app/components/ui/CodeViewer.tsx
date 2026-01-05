'use client';

import { useState } from 'react';
import Button from './Button';
import Badge from './Badge';

interface CodeViewerProps {
  html: string;
  title: string;
  type: 'traditional' | 'oauth';
  maxHeight?: string;
}

export default function CodeViewer({ html, title, type, maxHeight = '600px' }: CodeViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Format HTML with proper indentation
  const formatHtml = (htmlStr: string): string => {
    let formatted = '';
    let indent = 0;

    const parts = htmlStr.split(/(<[^>]+>)/g).filter(p => p.trim());

    for (let part of parts) {
      const trimmed = part.trim();
      if (!trimmed || !trimmed.startsWith('<')) {
        if (trimmed) formatted += trimmed + ' ';
        continue;
      }

      if (trimmed.startsWith('</')) {
        indent = Math.max(0, indent - 1);
        formatted += '\n' + '  '.repeat(indent) + trimmed;
      } else if (trimmed.endsWith('/>') || trimmed.match(/^<(input|img|br|hr|meta|link|area|base|col|embed|param|source|track|wbr)/i)) {
        formatted += '\n' + '  '.repeat(indent) + trimmed;
      } else {
        formatted += '\n' + '  '.repeat(indent) + trimmed;
        indent++;
      }
    }

    return formatted.trim();
  };

  // Highlight important authentication lines
  const highlightImportantLines = (code: string): string => {
    const lines = code.split('\n');

    return lines.map(line => {
      const lowerLine = line.toLowerCase();

      // Check if line contains important auth-related elements
      const isPasswordField =
        line.includes('type=&quot;password&quot;') ||
        line.includes('type="password"');

      const isEmailOrUsernameField =
        line.includes('type=&quot;email&quot;') ||
        line.includes('type="email"') ||
        line.includes('name=&quot;login&quot;') ||
        line.includes('name="login"') ||
        line.includes('name=&quot;username&quot;') ||
        line.includes('name="username"') ||
        line.includes('name=&quot;email&quot;') ||
        line.includes('name="email"') ||
        line.includes('autocomplete=&quot;username&quot;') ||
        line.includes('autocomplete="username"') ||
        line.includes('autocomplete=&quot;email&quot;') ||
        line.includes('autocomplete="email"');

      const isSubmitButton =
        line.includes('type=&quot;submit&quot;') ||
        line.includes('type="submit"') ||
        lowerLine.includes('sign in') ||
        lowerLine.includes('log in') ||
        lowerLine.includes('login') ||
        lowerLine.includes('sign up') ||
        lowerLine.includes('signup') ||
        lowerLine.includes('register') ||
        lowerLine.includes('create account');

      const isOAuthButton =
        lowerLine.includes('google') ||
        lowerLine.includes('facebook') ||
        lowerLine.includes('github') ||
        lowerLine.includes('apple') ||
        lowerLine.includes('twitter') ||
        lowerLine.includes('linkedin') ||
        lowerLine.includes('microsoft') ||
        lowerLine.includes('oauth') ||
        lowerLine.includes('continue with') ||
        lowerLine.includes('sign in with');

      const isFormTag =
        lowerLine.includes('&lt;form') ||
        lowerLine.includes('&lt;/form&gt;');

      if (isPasswordField) {
        // Yellow highlight for password fields
        return `<span style="background-color:#fef3c7;display:inline-block;width:100%;min-width:max-content;padding:2px 4px;margin:-2px -4px;box-sizing:border-box;">${line}</span>`;
      } else if (isEmailOrUsernameField) {
        // Light blue highlight for email/username fields
        return `<span style="background-color:#dbeafe;display:inline-block;width:100%;min-width:max-content;padding:2px 4px;margin:-2px -4px;box-sizing:border-box;">${line}</span>`;
      } else if (isSubmitButton) {
        // Light green highlight for submit buttons
        return `<span style="background-color:#d1fae5;display:inline-block;width:100%;min-width:max-content;padding:2px 4px;margin:-2px -4px;box-sizing:border-box;">${line}</span>`;
      } else if (isOAuthButton) {
        // Light purple highlight for OAuth buttons
        return `<span style="background-color:#e9d5ff;display:inline-block;width:100%;min-width:max-content;padding:2px 4px;margin:-2px -4px;box-sizing:border-box;">${line}</span>`;
      } else if (isFormTag) {
        // Light gray highlight for form tags
        return `<span style="background-color:#f3f4f6;display:inline-block;width:100%;min-width:max-content;padding:2px 4px;margin:-2px -4px;font-weight:600;box-sizing:border-box;">${line}</span>`;
      }

      return line;
    }).join('\n');
  };

  const formattedHtml = formatHtml(html);
  const escapedHtml = formattedHtml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const highlightedHtml = highlightImportantLines(escapedHtml);
  const preview = highlightedHtml.substring(0, 800) + (highlightedHtml.length > 800 ? '...' : '');
  const displayHtml = isExpanded ? highlightedHtml : preview;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--color-border-default)',
        marginBottom: '24px',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 24px',
          backgroundColor: 'var(--color-bg-elevated)',
          borderBottom: '1px solid var(--color-border-default)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <h4 style={{ fontWeight: 600, fontSize: '16px', color: 'var(--color-text-primary)' }}>
          {title}
        </h4>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="small" variant="ghost" onClick={handleCopy}>
            {copied ? '✓ Copied!' : 'Copy Code'}
          </Button>
          <Badge variant={type === 'traditional' ? 'traditional' : 'oauth'}>
            {type === 'traditional' ? 'Username/Password' : 'OAuth/Social Login'}
          </Badge>
        </div>
      </div>

      {/* Code Display */}
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--color-bg-subtle)',
          overflowX: 'auto',
          maxHeight: isExpanded ? 'none' : maxHeight,
        }}
      >
        <pre
          style={{
            fontSize: '14px',
            fontFamily: 'var(--font-mono)',
            lineHeight: '1.6',
            margin: 0,
          }}
        >
          <code dangerouslySetInnerHTML={{ __html: displayHtml }} />
        </pre>
      </div>

      {/* Expand/Collapse Button */}
      {formattedHtml.length > 400 && (
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: 'var(--color-bg-elevated)',
            borderTop: '1px solid var(--color-border-default)',
          }}
        >
          <Button size="small" variant="ghost" onClick={() => setIsExpanded(!isExpanded)} fullWidth>
            {isExpanded ? 'Show Less' : `Show More (${formattedHtml.length - 400} chars hidden)`}
          </Button>
        </div>
      )}
    </div>
  );
}
