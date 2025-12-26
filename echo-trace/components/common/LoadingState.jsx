import React, { useState, useEffect } from 'react';
import { Scan, ShieldCheck, Binary, Eye } from 'lucide-react';

const LoadingState = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { text: "Ingesting CCTV Footage...", icon: <Eye className="text-blue-400"/> },
    { text: "Transcribing Witness Audio...", icon: <Binary className="text-purple-400"/> },
    { text: "Analyzing Micro-Expressions...", icon: <Scan className="text-green-400"/> },
    { text: "Cross-Referencing Police Database...", icon: <ShieldCheck className="text-orange-400"/> },
    { text: "Compiling Legal Timeline...", icon: <Binary className="text-white"/> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500); // Change text every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-blue-900/30 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           {steps[step].icon}
        </div>
      </div>
      
      <h2 className="text-2xl font-bold tracking-widest mb-2 animate-pulse">
        ANALYZING EVIDENCE
      </h2>
      
      <div className="h-8 overflow-hidden">
        <p key={step} className="text-blue-400 font-mono text-sm animate-in slide-in-from-bottom duration-500">
          {`> ${steps[step].text}`}
        </p>
      </div>

      <div className="mt-8 w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-progress" style={{ width: `${((step + 1) / steps.length) * 100}%`, transition: 'width 0.5s ease' }}></div>
      </div>
    </div>
  );
};

export default LoadingState;