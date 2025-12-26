import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const LocationMap = () => {
  return (
    <div className="h-full w-full bg-slate-900 rounded-xl overflow-hidden relative border border-slate-800 flex items-center justify-center">
      {/* Mock Map Background (You can replace with a real image of a map for better visuals) */}
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-74.006,40.7128,12,0/800x600?access_token=YOUR_TOKEN')] bg-cover opacity-30 grayscale"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* The Visual Story */}
      <div className="relative z-10 w-3/4 h-3/4 border border-slate-700 bg-slate-950/80 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Navigation className="text-blue-500" /> GEOSPATIAL CONTRADICTION
        </h3>

        <div className="flex justify-between items-center relative">
          
          {/* Claimed Location */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center border-2 border-green-500 mb-2 mx-auto shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <MapPin className="text-green-400 w-8 h-8" />
            </div>
            <div className="text-xs text-green-500 font-bold uppercase tracking-wider">Claimed Location</div>
            <div className="text-lg text-white font-mono">Starbucks Café</div>
            <div className="text-xs text-slate-500">5th Avenue</div>
          </div>

          {/* Connection Line */}
          <div className="flex-1 h-px bg-red-500/50 mx-4 relative">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 px-2 text-red-500 text-xs font-bold border border-red-900 rounded">
               DISTANCE: 4.2 MILES
             </div>
          </div>

          {/* Actual Location */}
          <div className="text-center">
            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center border-2 border-red-500 mb-2 mx-auto shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse">
              <MapPin className="text-red-400 w-8 h-8" />
            </div>
            <div className="text-xs text-red-500 font-bold uppercase tracking-wider">Video GPS Match</div>
            <div className="text-lg text-white font-mono">Cellular World</div>
            <div className="text-xs text-slate-500">Main Street</div>
          </div>

        </div>

        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-200 text-sm text-center">
            <strong>IMPOSSIBLE TRAVEL DETECTED:</strong> Suspect could not be at Starbucks (Claim) while simultaneously appearing on CCTV at Cellular World (Fact).
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;