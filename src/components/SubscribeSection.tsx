import React, { useState } from 'react';
import { playCyberBlip, playArmTerminalSound } from '../utils/sound';
import { Check } from 'lucide-react';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playArmTerminalSound();
    setSubscribed(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 4000);
  };

  return (
    <section
      className="border border-[#242424] bg-[#0a0a0a] p-6 lg:p-10 crosshair-grid space-y-6 cyber-card"
      data-purpose="signal-subscription"
    >
      <div className="flex items-center space-x-3 border-b border-[#242424] pb-3 select-none">
        <span className="bg-[#D2FF00] text-black font-bold font-mono px-2 py-0.5 text-xs shadow-[0_0_10px_rgba(210,255,0,0.5)]">
          /06
        </span>
        <h2 className="text-xs uppercase tracking-widest font-mono text-gray-300 font-bold">
          SUBSCRIBE TO SIGNAL ALERTS
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-mono">
        <div className="lg:col-span-7 space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black font-sans uppercase text-white">
            GET THE INSTANT LAUNCH MEMPOOL STREAM
          </h3>
          <p className="text-xs text-gray-400">
            Real-time critical alerts, 99% opening tax decay flags, and serial deployer forensic
            pings direct to your terminal or inbox.
          </p>
        </div>

        <div className="lg:col-span-5">
          {subscribed ? (
            <div className="p-4 bg-[#101010] border border-[#D2FF00] text-[#D2FF00] flex items-center gap-3">
              <Check className="w-5 h-5 shrink-0" />
              <div>
                <div className="font-bold text-xs">[AUTHENTICATED // STREAM ARMED]</div>
                <div className="text-[10px] text-gray-300">
                  Mempool signal route registered for {email}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                className="bg-black border border-[#242424] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D2FF00] focus:ring-2 focus:ring-[#d2ff00] focus:shadow-[0_0_20px_rgba(210,255,0,0.4)] flex-grow transition-all duration-300 font-mono"
                placeholder="ENTER OPERATOR EMAIL..."
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="btn-neon-glow bg-[#D2FF00] hover:bg-[#b8e600] text-black font-black text-xs px-6 py-3 uppercase tracking-wider shrink-0 transition-all flex items-center justify-center hover:shadow-[0_0_25px_rgba(210,255,0,0.65),0_0_50px_rgba(210,255,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                type="submit"
              >
                SUBSCRIBE ↗
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
