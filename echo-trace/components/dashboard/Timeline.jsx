import { useInvestigation } from '../../context/InvestigationContext';
import ContradictionCard from './ContradictionCard'; // 🆕 IMPORT
import ChainOfCustody from './ChainOfCustody';       // 🆕 IMPORT

const Timeline = () => {
  const { caseData, verifyFinding } = useInvestigation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT COLUMN: Contradictions & Timeline */}
      <div className="lg:col-span-2 space-y-8">
        
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
                 onVerify={verifyFinding} // 👈 Passing the control down
               />
             ))}
             {caseData.contradictions.length === 0 && (
               <div className="p-6 bg-slate-800/50 rounded-lg text-slate-400 text-center">
                 No contradictions detected.
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
              <div key={index} className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 bg-slate-900 border-2 border-blue-500 rounded-full z-10"></div>
                <span className="text-blue-400 font-mono text-sm font-bold block mb-1">{event.time}</span>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <p className="text-slate-200">{event.event}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-400 uppercase">{event.source}</span>
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
        <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20">
          <h4 className="text-blue-400 font-bold text-sm mb-2">JUDGE'S NOTE</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            All evidence is hashed upon upload (SHA-256). Findings require human verification before export. This system is designed for <strong>admissibility</strong>, not just analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;