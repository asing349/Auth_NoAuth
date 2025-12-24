'use client';

import { useState } from 'react';

interface CodeDisplayProps {
  html: string;
  title: string;
  type: 'traditional' | 'oauth';
}

export default function CodeDisplay({ html, title, type }: CodeDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Format HTML with proper indentation
  const formatHtml = (htmlStr: string): string => {
    let formatted = '';
    let indent = 0;
    const lines = htmlStr
      .replace(/></g, '>\n<')
      .replace(/\s+/g, ' ')
      .split('\n');

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Decrease indent for closing tags
      if (trimmed.startsWith('</')) {
        indent = Math.max(0, indent - 1);
      }

      // Add indented line
      formatted += '  '.repeat(indent) + trimmed + '\n';

      // Increase indent for opening tags (but not self-closing)
      if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.match(/<(input|img|br|hr|meta|link)/)) {
        indent++;
      }
    }

    return formatted.trim();
  };

  const formattedHtml = formatHtml(html);
  const preview = formattedHtml.substring(0, 300) + (formattedHtml.length > 300 ? '...' : '');
  const displayHtml = isExpanded ? formattedHtml : preview;

  const typeBg = type === 'traditional' ? '#3148F6' : '#1C4B8F';

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
    <div className="mb-4 rounded-lg overflow-hidden" style={{ border: '1px solid #1C4B8F' }}>
      <div className="px-4 py-3 flex justify-between items-center" style={{ backgroundColor: '#1C4B8F' }}>
        <h4 className="font-medium text-sm" style={{ color: '#FFFFFF' }}>
          {title}
        </h4>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1 rounded font-semibold transition-all"
            style={{
              backgroundColor: copied ? '#4CAF50' : '#3148F6',
              color: '#FFFFFF',
              border: '1px solid #3148F6',
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <span
            className="text-xs px-3 py-1 rounded font-semibold"
            style={{ backgroundColor: typeBg, color: '#FFFFFF', border: '1px solid #3148F6' }}
          >
            {type === 'traditional' ? 'Username/Password' : 'OAuth/Social Login'}
          </span>
        </div>
      </div>
      <div className="p-4" style={{ backgroundColor: '#1C2127' }}>
        <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-words" style={{ color: '#E9E9E9' }}>
          <code>{displayHtml}</code>
        </pre>
        {formattedHtml.length > 300 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-xs px-4 py-2 rounded transition-all font-semibold"
            style={{
              backgroundColor: '#3148F6',
              color: '#FFFFFF',
            }}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
}
