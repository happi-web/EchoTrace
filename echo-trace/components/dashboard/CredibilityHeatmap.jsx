import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const CredibilityHeatmap = () => {
  const { caseData } = useInvestigation();

  return (
    <div className="space-y-6">
       <h3 className="text-xl font-bold text-white mb-4">Credibility Heatmap (Contradiction Analysis)</h3>
       
       <div className="grid grid-cols-1 gap-4">
         {/* Render Confirmed Contradictions */}
         {caseData.contradictions.map((item) => (
           <div key={item.id} className="bg-slate-900 border border-red-900/50 rounded-xl p-6 relative overflow-hidden">
             {/* Background glow for effect */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full"></div>

             <div className="flex justify-between items-start mb-4">
               <div>
                 <div className="flex items-center gap-2 text-red-500 font-bold mb-1">
                   <AlertCircle size={20} />
                   <span>{item.title}</span>
                 </div>
                 <div className="text-xs text-red-400 uppercase tracking-widest font-mono">Severity: {item.severity}</div>
               </div>
               <div className="text-4xl font-black text-slate-800">{item.confidence}%</div>
             </div>

             <div className="grid grid-cols-2 gap-4 mt-4">
               <div className="p-3 bg-slate-950 rounded border border-slate-800">
                 <div className="text-xs text-slate-500 mb-1">STATEMENT (CLAIM)</div>
                 <div className="text-red-300">"{item.claim}"</div>
               </div>
               <div className="p-3 bg-slate-950 rounded border border-blue-900/30">
                 <div className="text-xs text-blue-500 mb-1">REALITY (EVIDENCE)</div>
                 <div className="text-blue-300">"{item.evidence}"</div>
               </div>
             </div>
           </div>
         ))}

         {/* Render High Trust Evidence */}
         <div className="bg-slate-900 border border-green-900/30 rounded-xl p-4 flex items-center gap-4">
            <CheckCircle2 className="text-green-500" size={24} />
            <div>
              <div className="text-green-400 font-bold">Corroborated: Audio Timestamp</div>
              <div className="text-slate-500 text-sm">Audio metadata matches CCTV internal clock (+/- 0.5s)</div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default CredibilityHeatmap;