'use client';

import { useState } from 'react';

interface CodeDisplayProps {
  html: string;
  title: string;
  type: 'traditional' | 'oauth';
}

export default function CodeDisplay({ html, title, type }: CodeDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const preview = html.substring(0, 150) + (html.length > 150 ? '...' : '');
  const displayHtml = isExpanded ? html : preview;

  const typeBg = type === 'traditional' ? '#3148F6' : '#1C4B8F';

  return (
    <div className="mb-4 rounded-lg overflow-hidden" style={{ border: '1px solid #1C4B8F' }}>
      <div className="px-4 py-3 flex justify-between items-center" style={{ backgroundColor: '#1C4B8F' }}>
        <h4 className="font-medium text-sm" style={{ color: '#FFFFFF' }}>
          {title}
        </h4>
        <span
          className="text-xs px-3 py-1 rounded font-semibold"
          style={{ backgroundColor: typeBg, color: '#FFFFFF', border: '1px solid #3148F6' }}
        >
          {type === 'traditional' ? 'Username/Password' : 'OAuth/Social Login'}
        </span>
      </div>
      <div className="p-4" style={{ backgroundColor: '#1C2127' }}>
        <pre className="text-xs overflow-x-auto" style={{ color: '#E9E9E9' }}>
          <code>{displayHtml}</code>
        </pre>
        {html.length > 150 && (
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
