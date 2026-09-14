import { playCyberBlip } from '../utils/sound';

export default function CorePrinciples() {
  const handleCardClick = (title: string) => {
    playCyberBlip(950, 0.04);
  };

  return (
    <section
      className="border border-[#242424] bg-[#0a0a0a] p-6 lg:p-10 crosshair-grid space-y-8"
      data-purpose="core-principles"
      id="decay-mechanics"
    >
      {/* Section Tag Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#242424] pb-4 select-none">
        <div className="flex items-center space-x-3">
          <span className="bg-[#D2FF00] text-black font-bold font-mono px-2 py-0.5 text-xs shadow-[0_0_10px_rgba(210,255,0,0.5)]">
            /02
          </span>
          <h2 className="text-xs uppercase tracking-widest font-mono text-gray-300 font-bold">
            CORE PROTOCOL MECHANICS
          </h2>
        </div>
        <div className="text-xs text-[#888888] font-mono">// ROBINHOOD LAUNCH ARCHITECTURE</div>
      </div>

      {/* 5-Column Grid with Smooth Interactive Lifting and Ambient Aura */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Principle 1: 3-Second Tax Decay */}
        <div
          onClick={() => handleCardClick('TAX')}
          className="border border-[#242424] p-5 bg-[#101010] space-y-4 cyber-card group cursor-pointer"
        >
          <div className="flex justify-between items-start text-xs font-mono text-[#888888]">
            <span className="text-[#D2FF00] font-bold group-hover:drop-shadow-[0_0_8px_rgba(210,255,0,0.8)]">
              01 // TAX
            </span>
            <span className="text-gray-500 group-hover:text-[#D2FF00] group-hover:rotate-45 transition-all duration-300 font-bold">
              +
            </span>
          </div>

          {/* Wireframe Icon: Decay Step */}
          <div className="w-14 h-14 border border-dashed border-[#D2FF00]/40 flex items-center justify-center font-mono text-[#D2FF00] group-hover:border-[#D2FF00] group-hover:shadow-[0_0_20px_rgba(210,255,0,0.5)] group-hover:bg-[#D2FF00]/10 transition-all duration-300 relative p-1 bg-black/60">
            <svg
              className="w-full h-full"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 8px rgba(210,255,0,0.5))' }}
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="28"
                cy="28"
                r="23"
                stroke="#D2FF00"
                strokeDasharray="3 3"
                strokeOpacity="0.3"
                strokeWidth="1"
              ></circle>
              <circle
                cx="28"
                cy="28"
                r="18"
                stroke="#D2FF00"
                strokeDasharray="85 100"
                strokeLinecap="square"
                strokeWidth="1.5"
              ></circle>
              <circle
                cx="28"
                cy="28"
                r="11"
                stroke="#ff334b"
                strokeDasharray="2 2"
                strokeWidth="1.2"
              ></circle>
              <path
                d="M28 6V12M28 44V50M6 28H12M44 28H50"
                stroke="#D2FF00"
                strokeLinecap="square"
                strokeWidth="1.5"
              ></path>
              <path
                d="M20 28L36 28M28 20L28 36"
                stroke="#D2FF00"
                strokeOpacity="0.5"
                strokeWidth="0.8"
              ></path>
              <polygon fill="#D2FF00" points="28,15 32,23 24,23"></polygon>
              <rect fill="none" height="6" stroke="#D2FF00" strokeWidth="1" width="6" x="2" y="2"></rect>
              <rect
                fill="none"
                height="6"
                stroke="#D2FF00"
                strokeWidth="1"
                width="6"
                x="48"
                y="2"
              ></rect>
              <rect
                fill="none"
                height="6"
                stroke="#D2FF00"
                strokeWidth="1"
                width="6"
                x="2"
                y="48"
              ></rect>
              <rect
                fill="none"
                height="6"
                stroke="#D2FF00"
                strokeWidth="1"
                width="6"
                x="48"
                y="48"
              ></rect>
              <text fill="#D2FF00" fontFamily="monospace" fontSize="8" fontWeight="bold" x="32" y="38">
                99%
              </text>
            </svg>
          </div>

          <h3 className="font-bold text-white text-base tracking-tight font-sans group-hover:text-[#D2FF00] transition-colors">
            FIRST 3 SECONDS COST 99%
          </h3>
          <p className="text-xs text-gray-400 font-mono leading-relaxed group-hover:text-gray-300 transition-colors">
            Every pons v2 launch opens with a 99% tax decaying to zero over 3000ms. Blind bots pay full
            tribute to creator escrow. DIVE polls tax curves every 150ms.
          </p>
        </div>

        {/* Principle 2: Multicall Inspection */}
        <div
          onClick={() => handleCardClick('MULTICALL')}
          className="border border-[#242424] p-5 bg-[#101010] space-y-4 cyber-card group cursor-pointer"
        >
          <div className="flex justify-between items-start text-xs font-mono text-[#888888]">
            <span className="text-[#D2FF00] font-bold group-hover:drop-shadow-[0_0_8px_rgba(210,255,0,0.8)]">
              02 // MULTICALL
            </span>
            <span className="text-gray-500 group-hover:text-[#D2FF00] group-hover:rotate-45 transition-all duration-300 font-bold">
              +
            </span>
          </div>

          {/* Wireframe Icon: Grid Network */}
          <div className="w-14 h-14 border border-dashed border-[#D2FF00]/40 flex items-center justify-center font-mono text-[#D2FF00] group-hover:border-[#D2FF00] group-hover:shadow-[0_0_20px_rgba(210,255,0,0.5)] group-hover:bg-[#D2FF00]/10 transition-all duration-300 relative p-1 bg-black/60">
            <svg
              className="w-full h-full"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 8px rgba(210,255,0,0.5))' }}
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="#101010" height="12" stroke="#D2FF00" strokeWidth="1.5" width="12" x="6" y="22"></rect>
              <rect fill="#D2FF00" fillOpacity="0.3" height="8" width="8" x="8" y="24"></rect>
              <rect fill="#101010" height="10" stroke="#D2FF00" strokeWidth="1.2" width="12" x="38" y="8"></rect>
              <rect fill="#101010" height="10" stroke="#D2FF00" strokeWidth="1.2" width="12" x="38" y="23"></rect>
              <rect fill="#101010" height="10" stroke="#D2FF00" strokeWidth="1.2" width="12" x="38" y="38"></rect>
              <path
                d="M18 28H28M28 28V13H38M28 28H38M28 28V43H38"
                stroke="#D2FF00"
                strokeDasharray="2 2"
                strokeWidth="1.5"
              ></path>
              <polygon fill="#D2FF00" points="36,13 32,10 32,16"></polygon>
              <polygon fill="#D2FF00" points="36,28 32,25 32,31"></polygon>
              <polygon fill="#D2FF00" points="36,43 32,40 32,46"></polygon>
              <circle cx="28" cy="28" fill="#D2FF00" r="3"></circle>
              <circle cx="44" cy="13" fill="#D2FF00" r="1.5"></circle>
              <circle cx="44" cy="28" fill="#D2FF00" r="1.5"></circle>
              <circle cx="44" cy="43" fill="#D2FF00" r="1.5"></circle>
              <path
                d="M2 2H10M2 2V10M54 2H46M54 2V10M2 54H10M2 54V46M54 54H46M54 54V46"
                stroke="#D2FF00"
                strokeOpacity="0.6"
                strokeWidth="1"
              ></path>
            </svg>
          </div>

          <h3 className="font-bold text-white text-base tracking-tight font-sans group-hover:text-[#D2FF00] transition-colors">
            ONE ADDRESS IN, ALL READ
          </h3>
          <p className="text-xs text-gray-400 font-mono leading-relaxed group-hover:text-gray-300 transition-colors">
            Paste a contract. One multicall reads factory record, reserves, swap limits, creator
            wallet deals, and dev holdings in a single RPC round-trip.
          </p>
        </div>

        {/* Principle 3: Tape Memory */}
        <div
          onClick={() => handleCardClick('TAPE')}
          className="border border-[#242424] p-5 bg-[#101010] space-y-4 cyber-card group cursor-pointer"
        >
          <div className="flex justify-between items-start text-xs font-mono text-[#888888]">
            <span className="text-[#D2FF00] font-bold group-hover:drop-shadow-[0_0_8px_rgba(210,255,0,0.8)]">
              03 // TAPE
            </span>
            <span className="text-gray-500 group-hover:text-[#D2FF00] group-hover:rotate-45 transition-all duration-300 font-bold">
              +
            </span>
          </div>

          {/* Wireframe Icon: Wave / Tape */}
          <div className="w-14 h-14 border border-dashed border-[#D2FF00]/40 flex items-center justify-center font-mono text-[#D2FF00] group-hover:border-[#D2FF00] group-hover:shadow-[0_0_20px_rgba(210,255,0,0.5)] group-hover:bg-[#D2FF00]/10 transition-all duration-300 relative p-1 bg-black/60">
            <svg
              className="w-full h-full"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 8px rgba(210,255,0,0.5))' }}
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                fill="#080808"
                height="40"
                stroke="#D2FF00"
                strokeOpacity="0.3"
                strokeWidth="1"
                width="48"
                x="4"
                y="8"
              ></rect>
              <line
                stroke="#D2FF00"
                strokeDasharray="2 2"
                strokeOpacity="0.4"
                strokeWidth="0.6"
                x1="4"
                x2="52"
                y1="28"
                y2="28"
              ></line>
              <line stroke="#D2FF00" strokeWidth="1" x1="13" x2="13" y1="14" y2="42"></line>
              <rect
                fill="#D2FF00"
                fillOpacity="0.3"
                height="15"
                stroke="#D2FF00"
                strokeWidth="1"
                width="6"
                x="10"
                y="20"
              ></rect>
              <line stroke="#D2FF00" strokeWidth="1" x1="23" x2="23" y1="10" y2="38"></line>
              <rect
                fill="#D2FF00"
                height="18"
                stroke="#D2FF00"
                strokeWidth="1"
                width="6"
                x="20"
                y="14"
              ></rect>
              <line stroke="#ff334b" strokeWidth="1" x1="33" x2="33" y1="18" y2="44"></line>
              <rect
                fill="#ff334b"
                height="12"
                stroke="#ff334b"
                strokeWidth="1"
                width="6"
                x="30"
                y="24"
              ></rect>
              <line stroke="#D2FF00" strokeWidth="1" x1="43" x2="43" y1="12" y2="36"></line>
              <rect
                fill="#D2FF00"
                height="14"
                stroke="#D2FF00"
                strokeWidth="1"
                width="6"
                x="40"
                y="16"
              ></rect>
              <path
                d="M4 36 Q 16 32, 28 20 T 52 14"
                fill="none"
                stroke="#D2FF00"
                strokeLinecap="round"
                strokeWidth="1.5"
              ></path>
              <circle cx="28" cy="20" fill="#D2FF00" r="2"></circle>
              <path
                d="M2 2H8M2 2V8M54 2H48M54 2V8M2 54H8M2 54V48M54 54H48M54 54V48"
                stroke="#D2FF00"
                strokeOpacity="0.6"
                strokeWidth="1"
              ></path>
            </svg>
          </div>

          <h3 className="font-bold text-white text-base tracking-tight font-sans group-hover:text-[#D2FF00] transition-colors">
            1-HOUR COIN MEMORY
          </h3>
          <p className="text-xs text-gray-400 font-mono leading-relaxed group-hover:text-gray-300 transition-colors">
            A scan is one photo; DIVE keeps the tape. Every 5 seconds it records dev balance, pool
            liquidity changes, and sounds alarm before red candle prints.
          </p>
        </div>

        {/* Principle 4: Liquidity Door Math */}
        <div
          onClick={() => handleCardClick('SLIPPAGE')}
          className="border border-[#242424] p-5 bg-[#101010] space-y-4 cyber-card group cursor-pointer"
        >
          <div className="flex justify-between items-start text-xs font-mono text-[#888888]">
            <span className="text-[#D2FF00] font-bold group-hover:drop-shadow-[0_0_8px_rgba(210,255,0,0.8)]">
              04 // SLIPPAGE
            </span>
            <span className="text-gray-500 group-hover:text-[#D2FF00] group-hover:rotate-45 transition-all duration-300 font-bold">
              +
            </span>
          </div>

          {/* Wireframe Icon: Target / Door */}
          <div className="w-14 h-14 border border-dashed border-[#D2FF00]/40 flex items-center justify-center font-mono text-[#D2FF00] group-hover:border-[#D2FF00] group-hover:shadow-[0_0_20px_rgba(210,255,0,0.5)] group-hover:bg-[#D2FF00]/10 transition-all duration-300 relative p-1 bg-black/60">
            <svg
              className="w-full h-full"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 8px rgba(210,255,0,0.5))' }}
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 10H24L38 24H50V32H38L24 46H6V10Z"
                fill="#101010"
                stroke="#D2FF00"
                strokeWidth="1.2"
              ></path>
              <path
                d="M6 18H20L32 26"
                stroke="#D2FF00"
                strokeDasharray="2 2"
                strokeOpacity="0.6"
                strokeWidth="1"
              ></path>
              <path
                d="M6 38H20L32 30"
                stroke="#D2FF00"
                strokeDasharray="2 2"
                strokeOpacity="0.6"
                strokeWidth="1"
              ></path>
              <line stroke="#ff334b" strokeWidth="2" x1="42" x2="42" y1="20" y2="36"></line>
              <line stroke="#ff334b" strokeWidth="2" x1="48" x2="48" y1="24" y2="32"></line>
              <polygon fill="#D2FF00" points="12,24 16,28 12,32"></polygon>
              <polygon fill="#D2FF00" points="22,25 26,28 22,31"></polygon>
              <polygon fill="#ff334b" points="32,26 35,28 32,30"></polygon>
              <rect
                fill="rgba(255, 51, 75, 0.15)"
                height="10"
                stroke="#ff334b"
                strokeDasharray="2 2"
                strokeWidth="1"
                width="14"
                x="37"
                y="23"
              ></rect>
              <path
                d="M2 2H8M2 2V8M54 2H48M54 2V8M2 54H8M2 54V48M54 54H48M54 54V48"
                stroke="#D2FF00"
                strokeOpacity="0.6"
                strokeWidth="1"
              ></path>
            </svg>
          </div>

          <h3 className="font-bold text-white text-base tracking-tight font-sans group-hover:text-[#D2FF00] transition-colors">
            YOUR BAG GREW. THE DOOR DID NOT.
          </h3>
          <p className="text-xs text-gray-400 font-mono leading-relaxed group-hover:text-gray-300 transition-colors">
            Models exit across 4 batch sizes against live bonding curves. Knowing a $24,800 paper profit
            only yields $14,930 exit liquidity before you sell.
          </p>
        </div>

        {/* Principle 5: Creator Fee Ledger */}
        <div
          onClick={() => handleCardClick('FORENSICS')}
          className="border border-[#242424] p-5 bg-[#101010] space-y-4 cyber-card group cursor-pointer"
        >
          <div className="flex justify-between items-start text-xs font-mono text-[#888888]">
            <span className="text-[#D2FF00] font-bold group-hover:drop-shadow-[0_0_8px_rgba(210,255,0,0.8)]">
              05 // FORENSICS
            </span>
            <span className="text-gray-500 group-hover:text-[#D2FF00] group-hover:rotate-45 transition-all duration-300 font-bold">
              +
            </span>
          </div>

          {/* Wireframe Icon: Skull / Hash */}
          <div className="w-14 h-14 border border-dashed border-[#D2FF00]/40 flex items-center justify-center font-mono text-[#D2FF00] group-hover:border-[#D2FF00] group-hover:shadow-[0_0_20px_rgba(210,255,0,0.5)] group-hover:bg-[#D2FF00]/10 transition-all duration-300 relative p-1 bg-black/60">
            <svg
              className="w-full h-full"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 8px rgba(210,255,0,0.5))' }}
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28" cy="28" fill="#101010" r="7" stroke="#ff334b" strokeWidth="1.8"></circle>
              <circle cx="28" cy="28" fill="#ff334b" r="3"></circle>
              <rect fill="#101010" height="8" stroke="#D2FF00" strokeWidth="1.2" width="8" x="8" y="10"></rect>
              <rect fill="#101010" height="8" stroke="#D2FF00" strokeWidth="1.2" width="8" x="40" y="10"></rect>
              <rect fill="#101010" height="8" stroke="#D2FF00" strokeWidth="1.2" width="8" x="8" y="38"></rect>
              <rect fill="#101010" height="8" stroke="#D2FF00" strokeWidth="1.2" width="8" x="40" y="38"></rect>
              <line stroke="#D2FF00" strokeDasharray="2 2" strokeWidth="1.2" x1="16" x2="23" y1="14" y2="23"></line>
              <line stroke="#D2FF00" strokeDasharray="2 2" strokeWidth="1.2" x1="40" x2="33" y1="14" y2="23"></line>
              <line stroke="#D2FF00" strokeDasharray="2 2" strokeWidth="1.2" x1="16" x2="23" y1="42" y2="33"></line>
              <line stroke="#D2FF00" strokeDasharray="2 2" strokeWidth="1.2" x1="40" x2="33" y1="42" y2="33"></line>
              <circle cx="20" cy="18" fill="#D2FF00" r="1.5"></circle>
              <circle cx="36" cy="18" fill="#D2FF00" r="1.5"></circle>
              <circle cx="20" cy="38" fill="#D2FF00" r="1.5"></circle>
              <circle cx="36" cy="38" fill="#D2FF00" r="1.5"></circle>
              <circle
                cx="28"
                cy="28"
                r="16"
                stroke="#D2FF00"
                strokeDasharray="3 3"
                strokeOpacity="0.4"
                strokeWidth="0.8"
              ></circle>
              <path
                d="M2 2H8M2 2V8M54 2H48M54 2V8M2 54H8M2 54V48M54 54H48M54 54V48"
                stroke="#D2FF00"
                strokeOpacity="0.6"
                strokeWidth="1"
              ></path>
            </svg>
          </div>

          <h3 className="font-bold text-white text-base tracking-tight font-sans group-hover:text-[#D2FF00] transition-colors">
            WHO GOT PAID
          </h3>
          <p className="text-xs text-gray-400 font-mono leading-relaxed group-hover:text-gray-300 transition-colors">
            Permanent ledger of fee recipient wallets. Detects repeat serial deployers switching
            wallets or recycling dev tokens into fresh liquidity pools.
          </p>
        </div>
      </div>
    </section>
  );
}
