import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Check } from 'lucide-react';
import { toggleAudio, isAudioEnabled, playCyberBlip } from '../utils/sound';

export default function TopTicker() {
  const [latency, setLatency] = useState(216);
  const [copied, setCopied] = useState(false);
  const [audioOn, setAudioOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle realistic jitter between 212ms and 224ms
      setLatency(212 + Math.floor(Math.random() * 12));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleCopyNode = () => {
    playCyberBlip(1040, 0.06);
    navigator.clipboard?.writeText('0x47b8e199201948ad873130bf718274ac4c62a');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSound = () => {
    const newState = toggleAudio();
    setAudioOn(newState);
    if (newState) {
      playCyberBlip(880, 0.08);
    }
  };

  return (
    <div
      className="w-full bg-[#D2FF00] text-black font-mono text-xs font-bold py-1 px-4 border-b border-black flex justify-between items-center tracking-wider overflow-hidden whitespace-nowrap shadow-[0_0_15px_rgba(210,255,0,0.3)] select-none z-50 relative"
      data-purpose="system-ticker"
    >
      <div className="flex items-center space-x-6 animate-pulse">
        <span>[ALERT] MEMPOOL PROBE ACTIVE: ROBINHOOD CHAIN (PONZI V2 PROTOCOL)</span>
        <span className="hidden md:inline">///</span>
        <span className="hidden md:inline">TAX RATE INITIAL: 99% DECAY ENGINE READY</span>
        <span className="hidden md:inline">///</span>
        <span className="hidden md:inline">ZERO TOLERANCE HONEYPOT SCORER LOADED</span>
      </div>
      <div className="flex items-center space-x-4 shrink-0 font-extrabold">
        <span className="bg-black text-[#D2FF00] px-2 py-0.5 text-[10px] hover:shadow-[0_0_10px_rgba(210,255,0,0.8)] transition-shadow">
          SPEED: {latency}MS
        </span>

        <button
          onClick={handleCopyNode}
          className="text-black hover:underline cursor-pointer flex items-center gap-1 font-mono"
          title="Click to copy node RPC signature"
        >
          {copied ? (
            <span className="flex items-center text-black font-black">
              <Check className="w-3 h-3 mr-0.5" /> COPIED RPC
            </span>
          ) : (
            <span>LIVE NODE // 0x47b8...c62a</span>
          )}
        </button>

        <button
          onClick={handleToggleSound}
          className="p-0.5 text-black hover:bg-black hover:text-[#D2FF00] transition-colors"
          title={audioOn ? 'Tactile Sound: Enabled' : 'Tactile Sound: Muted'}
          aria-label="Toggle terminal tactile audio"
        >
          {audioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
