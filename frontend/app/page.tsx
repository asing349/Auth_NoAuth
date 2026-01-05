import Header from './components/layout/Header';
import AnalysisForm from './components/features/AnalysisForm';
import ExamplesGallery from './components/features/ExamplesGallery';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section - Analysis Tool (PRIMARY) */}
        <AnalysisForm />

        {/* Divider */}
        <div className="border-t border-[var(--color-border-default)]"></div>

        {/* Examples Gallery Section (SECONDARY) */}
        <ExamplesGallery />
      </main>
    </div>
  );
}
