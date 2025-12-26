import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { EyeOff } from 'lucide-react';

const BlindSpotAlert = () => {
  const { caseData } = useInvestigation();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Blind Spot Monitor</h3>
      <p className="text-slate-400 text-sm">Gemini analyzed spatial coverage and found gaps in the evidence.</p>

      {caseData.blindSpots.map((spot, index) => (
        <div key={index} className="bg-amber-950/20 border border-amber-900/50 p-4 rounded-lg flex items-start gap-4">
          <div className="bg-amber-900/20 p-2 rounded text-amber-500">
            <EyeOff size={24} />
          </div>
          <div>
            <div className="text-amber-400 font-bold text-lg mb-1">{spot.start} - {spot.end}</div>
            <div className="text-amber-200 font-medium">{spot.location}</div>
            <p className="text-amber-500/70 text-sm mt-1">{spot.reason}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlindSpotAlert;