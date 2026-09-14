import { useState, useEffect } from 'react';
import { playCyberBlip, playArmTerminalSound } from '../utils/sound';

interface HeaderProps {
  onStartTerminal?: () => void;
  onOpenTerminal?: () => void;
  onBuyToken?: () => void;
}

export default function Header({
  onStartTerminal,
  onOpenTerminal,
  onBuyToken,
}: HeaderProps) {
  const [utcTime, setUtcTime] = useState({ h: '04', m: '46', s: '49' });
  const [blockNumber, setBlockNumber] = useState(47891400);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime({
        h: String(now.getUTCHours()).padStart(2, '0'),
        m: String(now.getUTCMinutes()).padStart(2, '0'),
        s: String(now.getUTCSeconds()).padStart(2, '0'),
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Block increment simulation every ~6-10s
    const blockInterval = setInterval(() => {
      setBlockNumber((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(blockInterval);
  }, []);

  const handleNavClick = (targetId: string) => {
    playCyberBlip(750, 0.04);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartTerminal = () => {
    playArmTerminalSound();
    if (onStartTerminal) onStartTerminal();
    else if (onOpenTerminal) onOpenTerminal();
  };

  return (
    <header
      className="border-b border-[#242424] bg-[#0a0a0a]/95 sticky top-0 z-40 backdrop-blur-md"
      data-purpose="site-navigation"
    >
      <div className="max-w-[1720px] mx-auto flex flex-wrap items-stretch justify-between">
        {/* Brand Logo Badge */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            playCyberBlip(900, 0.05);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center border-r border-[#242424] pr-8 pl-4 py-3 bg-[#D2FF00] text-black font-black tracking-tighter text-xl space-x-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(210,255,0,0.7)] group select-none"
        >
          <span className="inline-block w-4 h-4 bg-black group-hover:rotate-90 transition-transform duration-300"></span>
          <span className="font-mono tracking-widest text-lg font-black">DIVE_</span>
          <span className="text-xs bg-black text-[#D2FF00] px-1.5 py-0.5 font-mono ml-1 font-bold group-hover:bg-white group-hover:text-black transition-colors">
            TERMINAL
          </span>
        </a>

        {/* Navigation Links */}
        <nav
          className="hidden lg:flex items-center space-x-1 font-mono text-xs font-medium text-gray-300"
          data-purpose="primary-nav"
        >
          <button
            onClick={() => handleNavClick('terminal')}
            className="px-5 py-5 hover:text-[#D2FF00] hover:bg-[rgba(210,255,0,0.15)] hover:shadow-[inset_0_-2px_0_#D2FF00] border-r border-[#242424] flex items-center transition-all duration-200 group cursor-pointer"
          >
            TERMINAL{' '}
            <span className="text-[#D2FF00] ml-2 font-bold group-hover:rotate-45 transition-transform">
              +
            </span>
          </button>
          <button
            onClick={() => handleNavClick('decay-mechanics')}
            className="px-5 py-5 hover:text-[#D2FF00] hover:bg-[rgba(210,255,0,0.15)] hover:shadow-[inset_0_-2px_0_#D2FF00] border-r border-[#242424] flex items-center transition-all duration-200 group cursor-pointer"
          >
            TAX_DECAY{' '}
            <span className="text-[#D2FF00] ml-2 font-bold group-hover:rotate-45 transition-transform">
              +
            </span>
          </button>
          <button
            onClick={() => handleNavClick('multicall')}
            className="px-5 py-5 hover:text-[#D2FF00] hover:bg-[rgba(210,255,0,0.15)] hover:shadow-[inset_0_-2px_0_#D2FF00] border-r border-[#242424] flex items-center transition-all duration-200 group cursor-pointer"
          >
            LEDGER{' '}
            <span className="text-[#D2FF00] ml-2 font-bold group-hover:rotate-45 transition-transform">
              +
            </span>
          </button>
          <button
            onClick={() => handleNavClick('cli-setup')}
            className="px-5 py-5 hover:text-[#D2FF00] hover:bg-[rgba(210,255,0,0.15)] hover:shadow-[inset_0_-2px_0_#D2FF00] border-r border-[#242424] flex items-center transition-all duration-200 group cursor-pointer"
          >
            LOCAL_CLI{' '}
            <span className="text-[#D2FF00] ml-2 font-bold group-hover:rotate-45 transition-transform">
              +
            </span>
          </button>
          <button
            onClick={() => handleNavClick('token')}
            className="px-5 py-5 hover:text-[#D2FF00] hover:bg-[rgba(210,255,0,0.15)] hover:shadow-[inset_0_-2px_0_#D2FF00] border-r border-[#242424] flex items-center transition-all duration-200 group cursor-pointer"
          >
            $DIVE{' '}
            <span className="text-[#D2FF00] ml-2 font-bold group-hover:rotate-45 transition-transform">
              +
            </span>
          </button>
        </nav>

        {/* Technical Telemetry & Action */}
        <div className="flex items-center">
          {/* Live System Clock */}
          <div className="hidden xl:flex flex-col border-r border-[#242424] px-6 py-2 text-right font-mono transition-colors hover:bg-white/5">
            <span className="text-[10px] text-[#888888] uppercase tracking-widest">SYS_TIME</span>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-none bg-[#D2FF00] radar-pulse"></span>
              <span
                className="text-xs font-bold text-[#D2FF00] tracking-wider drop-shadow-[0_0_8px_rgba(210,255,0,0.5)]"
                id="system-clock"
              >
                {utcTime.h}
                <span className="blink-colon">:</span>
                {utcTime.m}
                <span className="blink-colon">:</span>
                {utcTime.s}
              </span>
              <span className="text-[10px] text-gray-400">UTC+0</span>
            </div>
          </div>

          {/* Gas / RPC Block Status */}
          <div className="hidden md:flex flex-col border-r border-[#242424] px-6 py-2 font-mono transition-colors hover:bg-white/5">
            <span className="text-[10px] text-[#888888] uppercase tracking-widest">RPC_STATUS</span>
            <span className="text-xs font-bold text-gray-200 flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-400 inline-block mr-1.5 animate-ping"></span>
              BLOCK: #{blockNumber.toLocaleString()}
            </span>
          </div>

          {/* Brutalist Connect Wallet / Terminal Launch CTA Button */}
          <div className="p-2 flex items-center">
            <button
              onClick={handleStartTerminal}
              className="btn-neon-glow bg-[#D2FF00] text-black font-mono font-black text-xs px-6 py-3 border border-black hover:bg-white hover:border-[#D2FF00] transition-all uppercase flex items-center tracking-wider shadow-[3px_3px_0px_#262626] hover:shadow-[0_0_25px_rgba(210,255,0,0.65),0_0_50px_rgba(210,255,0,0.3)] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] cursor-pointer group"
              data-purpose="connect-cta"
            >
              START TERMINAL{' '}
              <span className="ml-2 font-bold text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
