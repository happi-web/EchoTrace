import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { EyeOff } from 'lucide-react';

const BlindSpotAlert = () => {
  const { caseData } = useInvestigation();

  // 🛡️ SAFETY CHECK: 
  // If caseData.blindSpots is missing, default to an empty array []
  const spots = caseData?.blindSpots || [];

  // Optional: If no spots, hide the section entirely
  if (spots.length === 0) {
    return (
      <div className="p-4 border border-slate-800 rounded-lg text-slate-500 text-sm italic">
        No blind spots or camera coverage gaps detected.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <EyeOff className="text-amber-500" size={20} />
        Blind Spot Monitor
      </h3>
      <p className="text-slate-400 text-sm">Gemini analyzed spatial coverage and found gaps in the evidence.</p>

      {spots.map((spot, index) => (
        <div key={index} className="bg-amber-950/20 border border-amber-900/50 p-4 rounded-lg flex items-start gap-4">
          <div className="bg-amber-900/20 p-2 rounded text-amber-500 mt-1">
            <EyeOff size={20} />
          </div>
          <div>
            {/* We also add checks here in case start/end are missing */}
            <div className="text-amber-400 font-bold text-lg mb-1">
                {spot.start || 'N/A'} - {spot.end || 'N/A'}
            </div>
            <div className="text-amber-200 font-medium">{spot.location || 'Unknown Location'}</div>
            <p className="text-amber-500/70 text-sm mt-1">{spot.reason}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlindSpotAlert;