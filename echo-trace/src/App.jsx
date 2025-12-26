import React, { useState } from 'react';
import { InvestigationProvider, useInvestigation } from '../context/InvestigationContext';
import FileUploader from '../components/common/FileUploader';
import LoadingState from '../components/common/LoadingState';

// Dashboard Widgets
import Timeline from '../components/dashboard/Timeline';
import CredibilityHeatmap from '../components/dashboard/CredibilityHeatmap';
import BlindSpotAlert from '../components/dashboard/BlindSpotAlert';
import InterrogatorChat from '../components/dashboard/InterrogatorChat';
import DeepfakeShield from '../components/dashboard/DeepfakeShield';
import LocationMap from '../components/dashboard/LocationMap'; // 🆕 IMPORTED MAP

// Icons & Utilities
import { Shield, LayoutDashboard, AlertOctagon, MessageSquare, Clock, ShieldCheck, FileDown, Map } from 'lucide-react';
import { generateLegalReport } from './utils/pdfGenerator.js';

const Dashboard = () => {
  const { caseData, isAnalyzing, startAnalysis } = useInvestigation();
  const [activeTab, setActiveTab] = useState('timeline');

  // 1. Loading Screen (The CSI Experience)
  if (isAnalyzing) return <LoadingState />;
  
  // 2. Initial Upload Screen
  if (!caseData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-10">
        <div className="w-full max-w-4xl">
          <FileUploader onAnalyze={startAnalysis} />
        </div>
      </div>
    );
  }

  // 3. Main Dashboard Interface
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-4">
        {/* Logo Area */}
        <div className="flex items-center gap-3 mb-10 px-2 text-blue-500">
          <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-widest leading-none">ECHOTRACE</h1>
            <span className="text-[10px] text-blue-400 font-mono">AI FORENSICS</span>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <nav className="space-y-2 flex-1">
          <NavButton 
            active={activeTab === 'timeline'} 
            onClick={() => setActiveTab('timeline')} 
            icon={<Clock size={20} />} 
            label="Timeline" 
          />
          <NavButton 
            active={activeTab === 'map'} 
            onClick={() => setActiveTab('map')} 
            icon={<Map size={20} />} 
            label="Geospatial" // 🆕 NEW TAB
          />
          <NavButton 
            active={activeTab === 'heatmap'} 
            onClick={() => setActiveTab('heatmap')} 
            icon={<AlertOctagon size={20} />} 
            label="Credibility" 
          />
          <NavButton 
            active={activeTab === 'blindspots'} 
            onClick={() => setActiveTab('blindspots')} 
            icon={<LayoutDashboard size={20} />} 
            label="Blind Spots" 
          />
          <NavButton 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')} 
            icon={<MessageSquare size={20} />} 
            label="Interrogator" 
          />
        </nav>

        {/* Case Status Footer */}
        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <div>
               <div className="text-xs text-slate-500 uppercase font-bold">Current Case</div>
               <div className="text-sm text-white font-mono">{caseData.caseId || 'CASE-ACTIVE'}</div>
             </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white">
              {activeTab === 'timeline' && 'Timeline Reconstruction'}
              {activeTab === 'map' && 'Geospatial Contradiction Map'}
              {activeTab === 'heatmap' && 'Witness Credibility Analysis'}
              {activeTab === 'blindspots' && 'Evidence Blind Spot Detection'}
              {activeTab === 'chat' && 'Case Interrogator (AI Agent)'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* 🆕 EXPORT BUTTON */}
            <button 
              onClick={() => generateLegalReport(caseData)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg border border-blue-400 transform hover:scale-105"
            >
              <FileDown size={16} />
              EXPORT AFFIDAVIT
            </button>

            {/* INTEGRITY BADGE */}
            {caseData.integrityStatus === "VERIFIED_AUTHENTIC" && (
               <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                 <ShieldCheck size={14} />
                 MEDIA AUTHENTIC
               </div>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* DEEPFAKE SHIELD WIDGET (Shows on Timeline & Map) */}
            {(activeTab === 'timeline' || activeTab === 'map') && (
               <div className="animate-in slide-in-from-top-4 duration-700">
                 <DeepfakeShield />
               </div>
            )}

            {/* Feature Container */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 shadow-2xl backdrop-blur-sm min-h-[500px]">
              {activeTab === 'timeline' && <Timeline />}
              {activeTab === 'map' && <LocationMap />} 
              {activeTab === 'heatmap' && <CredibilityHeatmap />}
              {activeTab === 'blindspots' && <BlindSpotAlert />}
              {activeTab === 'chat' && <InterrogatorChat />}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-component for Navigation Buttons
const NavButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${
      active 
        ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <div className="relative z-10 flex items-center gap-3">
      {icon} 
      <span className="font-medium tracking-wide text-sm">{label}</span>
    </div>
    
    {active && (
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-l-lg"></div>
    )}
  </button>
);

// Main Entry Point
const App = () => (
  <InvestigationProvider>
    <Dashboard />
  </InvestigationProvider>
);

export default App;