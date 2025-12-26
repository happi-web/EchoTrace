import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, Activity, UserCheck } from 'lucide-react';

const ContradictionCard = ({ item, onVerify }) => {
  const [expanded, setExpanded] = useState(false);

  // Dynamic styling based on status
  const getStatusStyles = () => {
    if (item.status === 'VERIFIED') return 'border-green-500 bg-green-900/10';
    if (item.status === 'REJECTED') return 'border-red-500 bg-slate-800 opacity-60 grayscale';
    return 'border-orange-500 bg-orange-900/10'; // Default
  };

  return (
    <div className={`border-l-4 rounded-r-lg mb-4 transition-all duration-300 ${getStatusStyles()}`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <div className={`mt-1 ${item.status === 'VERIFIED' ? 'text-green-500' : 'text-orange-500'}`}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                 <h4 className="font-bold text-slate-200">{item.title}</h4>
                 {item.status === 'VERIFIED' && <span className="text-[10px] bg-green-500/20 text-green-400 px-1 rounded border border-green-500/30">CONFIRMED</span>}
              </div>
              <p className="text-sm text-slate-400 mt-1">
                <span className="font-mono text-red-400 text-xs">CLAIM:</span> "{item.claim}"
              </p>
              <p className="text-sm text-slate-400">
                <span className="font-mono text-green-400 text-xs">EVIDENCE:</span> {item.evidence}
              </p>
            </div>
          </div>
          
          <button onClick={() => setExpanded(!expanded)} className="text-slate-500 hover:text-white transition-colors">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* 🥇 FEATURE 1: EXPLAINABLE AI SECTION */}
        {expanded && (
          <div className="mt-4 pl-8 border-l-2 border-slate-700 animate-in slide-in-from-top-2">
            
            <div className="mb-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                <Activity size={12} /> AI Reasoning Chain
              </h5>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "{item.reasoning || "Cross-reference of audio transcript timestamps against CCTV visual object detection confirms discrepancy."}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">Confidence Score</div>
                <div className="text-lg font-bold text-white">{item.confidence}%</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">Data Source</div>
                <div className="text-xs font-mono text-white truncate">{item.sourceSnippet || "Combined Modalities"}</div>
              </div>
            </div>

            {/* 🥉 FEATURE 3: HUMAN-IN-THE-LOOP CONTROLS */}
            {item.status !== 'VERIFIED' && item.status !== 'REJECTED' && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-slate-800">
                <button 
                  onClick={() => onVerify(item.id, 'VERIFIED')}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded flex items-center justify-center gap-2 text-xs font-bold transition-all hover:scale-[1.02]"
                >
                  <CheckCircle size={14} /> APPROVE VERDICT
                </button>
                <button 
                  onClick={() => onVerify(item.id, 'REJECTED')}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded flex items-center justify-center gap-2 text-xs font-bold transition-colors"
                >
                  <XCircle size={14} /> REJECT AS FALSE POSITIVE
                </button>
              </div>
            )}
            
            {item.status === 'VERIFIED' && (
              <div className="flex items-center gap-2 text-xs text-green-500 font-mono mt-2 bg-green-900/20 p-2 rounded border border-green-900">
                <UserCheck size={14} /> VERIFIED BY INVESTIGATOR
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContradictionCard;