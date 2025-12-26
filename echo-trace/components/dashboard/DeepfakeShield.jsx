import React from 'react';
import { ShieldCheck, ScanFace, Fingerprint } from 'lucide-react';

const DeepfakeShield = () => {
  return (
    <div className="bg-slate-900 border border-green-900/30 p-6 rounded-xl flex items-center justify-between shadow-lg relative overflow-hidden">
      
      {/* Background Animation Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50 animate-pulse"></div>

      <div className="flex items-center gap-4 z-10">
        <div className="bg-green-900/20 p-3 rounded-full border border-green-500/30">
          <ScanFace className="text-green-400 w-8 h-8" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            Media Authenticity Verified
            <ShieldCheck className="text-green-500 w-5 h-5" />
          </h3>
          <p className="text-slate-400 text-sm max-w-sm">
            Gemini analyzed pixel patterns and shadow consistency. 
            <span className="text-green-400 font-mono ml-1">NO GENERATIVE ARTIFACTS FOUND.</span>
          </p>
        </div>
      </div>

      <div className="text-right z-10">
        <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Identity Match</div>
        <div className="text-3xl font-mono font-black text-white tracking-tighter">
          99.8%
        </div>
        <div className="text-xs text-green-500 font-bold flex items-center justify-end gap-1">
          <Fingerprint size={12} /> MATCHES ID CARD
        </div>
      </div>

    </div>
  );
};

export default DeepfakeShield;