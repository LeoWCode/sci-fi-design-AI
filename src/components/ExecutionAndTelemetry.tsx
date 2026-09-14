import { useState } from 'react';
import { Copy, Check, Terminal as TerminalIcon } from 'lucide-react';
import { playCyberBlip, playArmTerminalSound } from '../utils/sound';

interface ExecutionAndTelemetryProps {
  onOpenTerminal: () => void;
  onOpenBuyModal: () => void;
}

export default function ExecutionAndTelemetry({
  onOpenTerminal,
  onOpenBuyModal,
}: ExecutionAndTelemetryProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copySnippet = (text: string, label: string) => {
    playCyberBlip(1100, 0.05);
    navigator.clipboard?.writeText(text);
    setCopiedIndex(label);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const fullCode = `# Quickstart Setup in 30 Seconds
git clone https://github.com/dive-org/dive && cd dive
npm install
cp .env.example .env

# First 60 seconds audit & probe
dive doctor --probe
dive hunt
dive scan 0x1602a8...
dive snipe --live --budget 0.05`;

  return (
    <section
      className="border border-[#242424] bg-[#0a0a0a] p-6 lg:p-10 crosshair-grid space-y-8"
      data-purpose="local-cli-telemetry"
      id="cli-setup"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: RUN IT ON YOUR MACHINE (Section /04) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center space-x-3 border-b border-[#242424] pb-3 select-none">
            <span className="bg-[#D2FF00] text-black font-bold font-mono px-2 py-0.5 text-xs shadow-[0_0_10px_rgba(210,255,0,0.5)]">
              /04
            </span>
            <h2 className="text-xs uppercase tracking-widest font-mono text-gray-300 font-bold">
              LOCAL EXECUTION ENGINE
            </h2>
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl font-black font-sans uppercase text-white tracking-tight">
              RUN IT ON YOUR MACHINE
            </h3>
            <p className="text-sm font-mono text-gray-300 leading-relaxed">
              Node 20 or newer. Starts in dry run and stays there until you type the word{' '}
              <code className="bg-white/10 px-1 text-[#D2FF00] font-bold border border-[#D2FF00]/40 shadow-[0_0_6px_rgba(210,255,0,0.3)]">
                arm
              </code>{' '}
              after it shows you the balance, max tax threshold, and the spending ceiling.
            </p>
            <p className="text-xs text-[#888888] font-mono">
              The key lives in local <code className="text-white">.env</code>, is never passed as an
              argument, and is never uploaded over websockets. There is no middleman cloud between
              you and the block.
            </p>
          </div>

          {/* Code Snippet Box with Hover Aura (IMAGE_2 CLI instructions) */}
          <div className="bg-black border border-[#242424] p-4 font-mono text-xs space-y-2 relative cyber-card group">
            <div className="text-gray-500 text-[11px] mb-2 flex justify-between items-center border-b border-[#242424] pb-2">
              <span># Quickstart Setup in 30 Seconds</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#D2FF00]">TERMINAL: BASH / ZSH</span>
                <button
                  onClick={() => copySnippet(fullCode, 'all')}
                  className="flex items-center gap-1 text-[10px] bg-[#101010] border border-[#242424] px-2 py-0.5 text-gray-300 hover:text-[#D2FF00] hover:border-[#D2FF00] cursor-pointer transition-colors"
                >
                  {copiedIndex === 'all' ? (
                    <>
                      <Check className="w-3 h-3 text-[#D2FF00]" /> COPIED SCRIPT
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> COPY ALL
                    </>
                  )}
                </button>
              </div>
            </div>

            <div
              onClick={() =>
                copySnippet(
                  'git clone https://github.com/dive-org/dive && cd dive',
                  'git'
                )
              }
              className="text-[#D2FF00] hover:text-white transition-colors cursor-pointer flex justify-between"
            >
              <span>$ git clone https://github.com/dive-org/dive &amp;&amp; cd dive</span>
              {copiedIndex === 'git' && (
                <span className="text-[10px] text-[#D2FF00] font-bold">COPIED</span>
              )}
            </div>

            <div
              onClick={() => copySnippet('npm install', 'npm')}
              className="text-white hover:text-[#D2FF00] transition-colors cursor-pointer flex justify-between"
            >
              <span>$ npm install</span>
              {copiedIndex === 'npm' && (
                <span className="text-[10px] text-[#D2FF00] font-bold">COPIED</span>
              )}
            </div>

            <div
              onClick={() => copySnippet('cp .env.example .env', 'env')}
              className="text-white hover:text-[#D2FF00] transition-colors cursor-pointer flex justify-between"
            >
              <span>$ cp .env.example .env</span>
              {copiedIndex === 'env' && (
                <span className="text-[10px] text-[#D2FF00] font-bold">COPIED</span>
              )}
            </div>

            <div className="text-gray-500 pt-2 border-t border-[#242424]">
              # First 60 seconds audit &amp; probe
            </div>

            <div
              onClick={() => copySnippet('dive doctor --probe', 'doc')}
              className="text-[#D2FF00] hover:text-white transition-colors cursor-pointer flex justify-between"
            >
              <span>
                $ dive doctor --probe{' '}
                <span className="text-gray-400"># chain, pons numbers, rpc quoter</span>
              </span>
              {copiedIndex === 'doc' && (
                <span className="text-[10px] text-[#D2FF00] font-bold">COPIED</span>
              )}
            </div>

            <div
              onClick={() => copySnippet('dive hunt', 'hunt')}
              className="text-[#D2FF00] hover:text-white transition-colors cursor-pointer flex justify-between"
            >
              <span>
                $ dive hunt{' '}
                <span className="text-gray-400"># launches with live scores &amp; reasons</span>
              </span>
              {copiedIndex === 'hunt' && (
                <span className="text-[10px] text-[#D2FF00] font-bold">COPIED</span>
              )}
            </div>

            <div
              onClick={() => copySnippet('dive scan 0x1602a8...4a70', 'scan')}
              className="text-[#D2FF00] hover:text-white transition-colors cursor-pointer flex justify-between"
            >
              <span>
                $ dive scan 0x... <span className="text-gray-400"># single coin deep analysis</span>
              </span>
              {copiedIndex === 'scan' && (
                <span className="text-[10px] text-[#D2FF00] font-bold">COPIED</span>
              )}
            </div>

            <div
              onClick={() => copySnippet('dive snipe --live --budget 0.05', 'snipe')}
              className="text-[#D2FF00] hover:text-white transition-colors cursor-pointer flex justify-between"
            >
              <span>
                $ dive snipe --live --budget 0.05{' '}
                <span className="text-gray-400"># armed execution</span>
              </span>
              {copiedIndex === 'snipe' && (
                <span className="text-[10px] text-[#D2FF00] font-bold">COPIED</span>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                playArmTerminalSound();
                onOpenTerminal();
              }}
              className="btn-neon-glow bg-black border border-[#D2FF00] text-[#D2FF00] hover:bg-[#D2FF00] hover:text-black font-mono text-xs font-bold px-5 py-2.5 uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
            >
              <TerminalIcon className="w-4 h-4" /> TEST IN WEB CLI SANDBOX ↗
            </button>
          </div>
        </div>

        {/* Right: SYSTEM TELEMETRY & PROGRESS (Section /05) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center space-x-3 border-b border-[#242424] pb-3 select-none">
            <span className="bg-[#D2FF00] text-black font-bold font-mono px-2 py-0.5 text-xs shadow-[0_0_10px_rgba(210,255,0,0.5)]">
              /05
            </span>
            <h2 className="text-xs uppercase tracking-widest font-mono text-gray-300 font-bold">
              SYSTEM TELEMETRY // HARDWARE LOAD
            </h2>
          </div>

          <div className="border border-[#242424] bg-[#101010] p-6 space-y-5 font-mono cyber-card">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#888888] uppercase">CPU_USAGE</span>
              <span className="text-[#D2FF00] font-black drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
                73% LOAD
              </span>
            </div>

            {/* Progress Bar with glow */}
            <div className="w-full bg-black border border-[#242424] h-4 flex overflow-hidden p-0.5">
              <div className="bg-[#D2FF00] h-full w-[73%] shadow-[0_0_12px_rgba(210,255,0,0.7)]"></div>
            </div>

            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-[#888888] uppercase">MEMORY ALLOCATION</span>
              <span className="text-white font-bold">8.6 GB / 16 GB</span>
            </div>
            <div className="w-full bg-black border border-[#242424] h-4 flex overflow-hidden p-0.5">
              <div className="bg-[#D2FF00] h-full w-[54%] shadow-[0_0_12px_rgba(210,255,0,0.7)]"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#242424] text-xs">
              <div>
                <span className="text-gray-500 uppercase text-[10px] block">NODE UPTIME</span>
                <span className="text-white font-bold">7D 14H 22M 04S</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[10px] block">
                  NETWORK ENCRYPTION
                </span>
                <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
                  SECURE // TLS 1.3
                </span>
              </div>
            </div>

            <div className="p-3 bg-black border border-[#242424] flex items-center justify-between text-xs hover:border-[#D2FF00]/60 transition-colors">
              <span className="flex items-center">
                <span className="w-2.5 h-2.5 bg-[#D2FF00] radar-pulse mr-2"></span>
                ALL PROTOCOL SYSTEMS OPERATIONAL
              </span>
              <span className="text-[10px] text-[#D2FF00] font-bold">PING: 14MS</span>
            </div>
          </div>

          {/* Tokenomics Card ($DIVE specs from IMAGE_2) with Card Hover Effect */}
          <div
            className="border border-[#242424] bg-[#101010] p-6 space-y-3 font-mono cyber-card"
            id="token"
          >
            <div className="flex justify-between items-center">
              <span className="text-[#D2FF00] font-black text-xl drop-shadow-[0_0_8px_rgba(210,255,0,0.5)]">
                $DIVE TOKENOMICS
              </span>
              <span className="text-[10px] bg-[#D2FF00]/10 border border-[#D2FF00]/30 text-[#D2FF00] px-2 py-0.5 font-bold shadow-[0_0_8px_rgba(210,255,0,0.2)]">
                UTILITY MEMECOIN WEAPON
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              The coin behind the tool. It promises nothing: no revenue share, no vote, no fee cut.
              Creator fees pay for the endpoints, the alert server and the time to keep reading.
              Holding 1,000,000 $DIVE opens the hosted half: more watches, deeper history, alerts in
              Telegram.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs border-t border-[#242424]">
              <span className="text-gray-400">
                DEV BUY: <strong className="text-white">TOKEN-SIZED</strong>
              </span>
              <button
                onClick={() => {
                  playCyberBlip(1000, 0.05);
                  onOpenBuyModal();
                }}
                className="text-[#D2FF00] font-bold drop-shadow-[0_0_5px_rgba(210,255,0,0.5)] hover:underline cursor-pointer"
              >
                CA: ANNOUNCED AT LAUNCH [BUY $DIVE ↗]
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
