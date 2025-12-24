'use client';

import { useState } from 'react';
import ExamplesTab from './components/ExamplesTab';
import TestTab from './components/TestTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'examples' | 'test'>('examples');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1C2127' }}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-10 pb-6" style={{ borderBottom: '3px solid #3148F6' }}>
          <h1 className="text-5xl font-bold text-center mb-3" style={{ color: '#FFFFFF' }}>
            Auth or Not
          </h1>
          <p className="text-center text-base" style={{ color: '#E9E9E9' }}>
            AI-powered authentication component detector
          </p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-10 gap-4">
          <button
            onClick={() => setActiveTab('examples')}
            className="px-8 py-3 rounded-lg font-semibold transition-all text-base"
            style={{
              backgroundColor: activeTab === 'examples' ? '#3148F6' : 'transparent',
              color: activeTab === 'examples' ? '#FFFFFF' : '#E9E9E9',
              border: `2px solid ${activeTab === 'examples' ? '#3148F6' : '#1C4B8F'}`,
            }}
          >
            Examples
          </button>
          <button
            onClick={() => setActiveTab('test')}
            className="px-8 py-3 rounded-lg font-semibold transition-all text-base"
            style={{
              backgroundColor: activeTab === 'test' ? '#3148F6' : 'transparent',
              color: activeTab === 'test' ? '#FFFFFF' : '#E9E9E9',
              border: `2px solid ${activeTab === 'test' ? '#3148F6' : '#1C4B8F'}`,
            }}
          >
            Test
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'examples' && <ExamplesTab />}
          {activeTab === 'test' && <TestTab />}
        </div>
      </div>
    </div>
  );
}
