import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import ContradictionCard from './ContradictionCard'; 
import ChainOfCustody from './ChainOfCustody';

const Timeline = () => {
  const { caseData, verifyFinding } = useInvestigation();

  // Helper to determine color based on score
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT COLUMN: Contradictions & Timeline */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* --- NEW: INTEGRITY SCORE CARD --- */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center gap-6 shadow-lg relative overflow-hidden">
          {/* Subtle background glow */}
          <div className={`absolute top-0 left-0 w-2 h-full ${caseData.integrityScore < 70 ? 'bg-red-500' : 'bg-green-500'}`}></div>
          
          {/* The Score Circle */}
          <div className="text-center min-w-[100px]">
            <div className={`text-4xl font-black ${getScoreColor(caseData.integrityScore)}`}>
              {caseData.integrityScore}%
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Integrity Score</div>
          </div>

          {/* The Reasoning Text */}
          <div className="border-l border-slate-700 pl-6 flex-1">
            <div className={`text-sm font-bold mb-2 tracking-wide ${caseData.integrityStatus === 'VERIFIED_AUTHENTIC' ? 'text-green-400' : 'text-red-400'}`}>
              STATUS: {caseData.integrityStatus?.replace('_', ' ') || 'ANALYZING...'}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-500 block mb-1">AI FORENSIC REASONING:</span>
              {caseData.integrityReasoning || "Analysis pending..."}
            </p>
          </div>
        </div>

        {/* SECTION 1: AI VERDICTS */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
            AI Verdicts & Anomalies
          </h3>
          <div className="space-y-4">
             {caseData.contradictions.map((item) => (
               <ContradictionCard 
                 key={item.id} 
                 item={item} 
                 onVerify={verifyFinding} 
               />
             ))}
             {caseData.contradictions.length === 0 && (
               <div className="p-6 bg-slate-800/50 rounded-lg text-slate-400 text-center border border-slate-700 border-dashed">
                 No critical contradictions detected.
               </div>
             )}
          </div>
        </div>

        {/* SECTION 2: CHRONOLOGICAL EVENTS */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Event Reconstruction
          </h3>
          <div className="relative border-l-2 border-slate-800 ml-3 space-y-8 pl-8 py-4">
            {caseData.timeline.map((event, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[41px] top-0 w-5 h-5 bg-slate-900 border-2 border-blue-500 rounded-full z-10 group-hover:bg-blue-500 transition-colors"></div>
                <span className="text-blue-400 font-mono text-sm font-bold block mb-1">{event.time}</span>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                  <p className="text-slate-200 text-sm">{event.event}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300 uppercase font-semibold tracking-wide border border-slate-600">
                      {event.source}
                    </span>
                    {event.flag && (
                      <span className="text-[10px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded border border-red-900/50">
                        {event.flag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Evidence Locker */}
      <div className="space-y-6">
        <ChainOfCustody logs={caseData.chainOfCustody} />
        
        {/* Helpful Tip for Judges */}
        <div className="bg-blue-900/10 p-4 rounded-xl border border-blue-500/20 backdrop-blur-sm">
          <h4 className="text-blue-400 font-bold text-sm mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            JUDGE'S NOTE
          </h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            All evidence is hashed upon upload (SHA-256). Findings require human verification before export. This system is designed for <strong>admissibility</strong>, not just analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;