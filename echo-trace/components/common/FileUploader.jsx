import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Video, Mic, Image as ImageIcon, CheckCircle } from 'lucide-react';

const FileUploader = ({ onAnalyze }) => {
  // State to store the actual File objects
  const [files, setFiles] = useState({ video: null, audio: null, pdf: null, image: null });

  // Refs to trigger hidden file inputs
  const videoInput = useRef(null);
  const audioInput = useRef(null);
  const pdfInput = useRef(null);
  const imageInput = useRef(null);

  const handleFileChange = (type, e) => {
    const file = e.target.files[0];
    if (file) setFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleStart = () => {
    if (!files.video && !files.pdf) {
      alert("Please upload at least a Video and a Document to start.");
      return;
    }
    onAnalyze(files);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[650px] border-2 border-dashed border-slate-700 rounded-xl bg-slate-900/50 p-10">
      
      <div className="bg-slate-800 p-6 rounded-full mb-6 group relative">
        <UploadCloud className="w-12 h-12 text-blue-500 transition-transform group-hover:scale-110" />
        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">Upload Case Evidence</h3>
      <p className="text-slate-400 mb-8 text-center max-w-lg">
        Upload evidence files below. Green checks indicate readiness.
      </p>

      {/* Hidden Inputs */}
      <input type="file" accept="video/*" ref={videoInput} hidden onChange={(e) => handleFileChange('video', e)} />
      <input type="file" accept="audio/*" ref={audioInput} hidden onChange={(e) => handleFileChange('audio', e)} />
      <input type="file" accept="application/pdf" ref={pdfInput} hidden onChange={(e) => handleFileChange('pdf', e)} />
      <input type="file" accept="image/*" ref={imageInput} hidden onChange={(e) => handleFileChange('image', e)} />

      {/* Interactive Buttons Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10 w-full max-w-md">
        <UploadButton 
          icon={<Video size={18}/>} 
          label="CCTV Video" 
          file={files.video} 
          onClick={() => videoInput.current.click()} 
        />
        <UploadButton 
          icon={<Mic size={18}/>} 
          label="Witness Audio" 
          file={files.audio} 
          onClick={() => audioInput.current.click()} 
        />
        <UploadButton 
          icon={<FileText size={18}/>} 
          label="Police Report" 
          file={files.pdf} 
          onClick={() => pdfInput.current.click()} 
        />
        <UploadButton 
          icon={<ImageIcon size={18}/>} 
          label="Suspect ID" 
          file={files.image} 
          onClick={() => imageInput.current.click()} 
        />
      </div>

      <button 
        onClick={handleStart}
        className={`px-10 py-4 rounded-lg font-bold tracking-wide shadow-lg transition-all transform flex items-center gap-2 ${
          files.video ? 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        <span>INITIATE INVESTIGATION</span>
      </button>
    </div>
  );
};

// Sub-component for buttons
const UploadButton = ({ icon, label, file, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
      file 
        ? 'bg-green-900/20 border-green-500/50 text-green-400' 
        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-blue-500 hover:text-blue-400'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    {file && <CheckCircle size={16} />}
  </button>
);

export default FileUploader;