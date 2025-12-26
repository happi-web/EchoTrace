import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, ShieldAlert } from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';
import client from '../../api/client'; // Your Axios instance

const InterrogatorChat = () => {
  const { caseData } = useInvestigation();
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'I have reviewed the CCTV footage, audio logs, and police report. What would you like to know about the inconsistencies?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Add User Message to UI
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // 2. Send Message + Case Data to Backend
      // We send 'caseData' so the AI knows what we are talking about
      const response = await client.post('/analyze/chat', {
        message: userMsg.text,
        caseContext: caseData // 👈 sending the evidence analysis!
      });

      // 3. Add AI Response to UI
      setMessages(prev => [...prev, { role: 'bot', text: response.data.reply }]);

    } catch (error) {
      console.error("Chat failed:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Connection Error: Unable to reach the forensic server." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
      
      {/* Chat Header */}
      <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-mono text-slate-300 text-sm">DETECTIVE_AI_AGENT // ONLINE</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            
            {msg.role === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <Bot size={16} className="text-blue-400" />
              </div>
            )}

            <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-bl-none'
            }`}>
              {msg.text}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                <User size={16} className="text-slate-300" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-2 items-center text-slate-500 text-xs ml-12">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce delay-100">●</span>
            <span className="animate-bounce delay-200">●</span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about specific timestamps or contradictions..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button 
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default InterrogatorChat;