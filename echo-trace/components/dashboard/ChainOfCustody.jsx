import React from 'react';
import { Shield, Check, FileKey } from 'lucide-react';

const ChainOfCustody = ({ logs }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2 bg-slate-950/50">
        <Shield size={18} className="text-purple-500" />
        <h3 className="font-bold text-slate-200">Digital Chain of Custody</h3>
        <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 ml-auto uppercase tracking-wider">
          Immutable Ledger
        </span>
      </div>
      
      <div className="p-4 max-h-[300px] overflow-y-auto space-y-4">
        {logs && logs.map((log, idx) => (
          <div key={idx} className="flex gap-4 relative">
            {/* Connector Line */}
            {idx !== logs.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-[-16px] w-px bg-slate-800"></div>
            )}
            
            <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center z-10 shrink-0">
              <Check size={12} className="text-green-500" />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-300">{log.action}</span>
                <span className="text-[10px] font-mono text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                 <FileKey size={10} /> {log.file}
              </div>
              <div className="text-[9px] font-mono text-slate-600 mt-1 truncate bg-slate-950 p-1 rounded border border-slate-800/50 max-w-[220px]">
                SHA-256: {log.hash}
              </div>
            </div>
          </div>
        ))}
        {!logs && <div className="text-slate-500 text-sm text-center py-4">No ledger data available.</div>}
      </div>
    </div>
  );
};

export default ChainOfCustody;