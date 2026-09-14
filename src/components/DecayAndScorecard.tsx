import { useState, useId } from 'react';
import { FeeRecipient } from '../types';
import { playCyberBlip } from '../utils/sound';
import { Search, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';

interface DecayAndScorecardProps {
  onInspectHex: () => void;
  onSelectWallet: (wallet: FeeRecipient) => void;
}

const initialRecipients: FeeRecipient[] = [
  {
    wallet: '0x1602...4a70',
    launches: 1,
    graduated: 1,
    deployedSelf: 'no',
    claimedEth: '49.2 ETH',
    lastSeen: '6d ago',
    statusColor: 'red',
    tags: ['HIGH_VOLUME_CREATOR', 'TIER_1_ESCROW'],
    totalVolume: '$2,480,000',
    flaggedNotes: 'Primary escrow recipient for 3 successful bonding curve graduations.',
  },
  {
    wallet: '0xcF2e...f048',
    launches: 1,
    graduated: 1,
    deployedSelf: 'no',
    claimedEth: '9.03 ETH',
    lastSeen: '1d ago',
    statusColor: 'red',
    tags: ['VERIFIED_ROUTER'],
    totalVolume: '$412,000',
    flaggedNotes: 'Third-party deal syndication wallet. Fast liquidity deployment verified.',
  },
  {
    wallet: '0x2076...35E3',
    launches: 1,
    graduated: 1,
    deployedSelf: 'no',
    claimedEth: '7.05 ETH',
    lastSeen: '4d ago',
    statusColor: 'gray',
    tags: ['COMMUNITY_FAIR'],
    totalVolume: '$320,000',
    flaggedNotes: 'Single launch fee collector with 100% liquidity lock on graduation.',
  },
  {
    wallet: '0x2Da7...0435',
    launches: 1,
    graduated: 1,
    deployedSelf: 'no',
    claimedEth: '4.18 ETH',
    lastSeen: '1d ago',
    statusColor: 'red',
    tags: ['TAX_SPLIT_PARTNER'],
    totalVolume: '$198,000',
    flaggedNotes: 'Automatic split contract recipient; no developer wallet links found.',
  },
  {
    wallet: '0x7824...c62e',
    launches: 9,
    graduated: 2,
    deployedSelf: 'no',
    claimedEth: '3.29 ETH',
    lastSeen: '12h ago',
    statusColor: 'yellow',
    tags: ['SERIAL_DEPLOYER_WATCH', 'FREQUENT_CREATOR'],
    totalVolume: '$144,000',
    flaggedNotes: '9 contract deployments tracked over 14 days. 2 reached bonding curve.',
  },
  {
    wallet: '0x8426...312b',
    launches: 1,
    graduated: 1,
    deployedSelf: 'yes - burned',
    claimedEth: '--',
    lastSeen: '12h ago',
    statusColor: 'emerald',
    tags: ['BURN_ADDRESS', 'ZERO_DEV_FEE'],
    totalVolume: '$580,000',
    flaggedNotes: 'Fees routed directly to dead null address 0x0...dead on transfer.',
  },
];

export default function DecayAndScorecard({
  onInspectHex,
  onSelectWallet,
}: DecayAndScorecardProps) {
  const timeSliderId = useId();
  // Interactive decay curve slider state: 0 to 3000ms
  const [decayMs, setDecayMs] = useState<number>(2650);
  const [selectedExitSize, setSelectedExitSize] = useState<number>(16);
  const [walletFilter, setWalletFilter] = useState<string>('');

  // Calculate tax percentage based on non-linear decay:
  // Starts at 99%, drops sharply in first 1000ms, tails to 0% at 3000ms
  const calculateTax = (ms: number): number => {
    if (ms <= 0) return 99.0;
    if (ms >= 3000) return 0.0;
    const t = ms / 3000;
    // Exponential decay curve: 99 * (1 - t)^2.6
    const val = 99 * Math.pow(1 - t, 2.6);
    return Math.max(0, +val.toFixed(1));
  };

  const currentTax = calculateTax(decayMs);

  // SVG coordinate calculation for scrub marker:
  // x: 10 to 490
  const svgX = 10 + (decayMs / 3000) * 480;
  // y: 20 (99%) down to 185 (0%)
  const svgY = 185 - (currentTax / 99) * 165;

  const filteredWallets = initialRecipients.filter(
    (w) =>
      w.wallet.toLowerCase().includes(walletFilter.toLowerCase()) ||
      w.tags?.some((t) => t.toLowerCase().includes(walletFilter.toLowerCase())) ||
      (typeof w.deployedSelf === 'string' &&
        w.deployedSelf.toLowerCase().includes(walletFilter.toLowerCase()))
  );

  return (
    <section
      className="border border-[#242424] bg-[#0a0a0a] p-6 lg:p-10 crosshair-grid space-y-8"
      data-purpose="live-radar-section"
      id="multicall"
    >
      {/* Section Tag Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#242424] pb-4 select-none">
        <div className="flex items-center space-x-3">
          <span className="bg-[#D2FF00] text-black font-bold font-mono px-2 py-0.5 text-xs shadow-[0_0_10px_rgba(210,255,0,0.5)]">
            /03
          </span>
          <h2 className="text-xs uppercase tracking-widest font-mono text-gray-300 font-bold">
            LIVE DECAY RADAR &amp; CONTRACT SCORECARD
          </h2>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono text-[#888888]">
          <span>
            STREAM ID: <span className="text-gray-300">0x99A_DIVE</span>
          </span>
          <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
            // 24/7 AUDIT FEED
          </span>
        </div>
      </div>

      {/* Radar Grid: 2 Large Panels mirroring the deep data from IMAGE_2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Live Tax Decay Curve (SVG Visualization + Interactive Scrubber) */}
        <div className="lg:col-span-6 bg-[#101010] border border-[#242424] p-6 space-y-6 cyber-card">
          <div className="flex justify-between items-center border-b border-[#242424] pb-3">
            <div>
              <span className="text-xs font-mono text-[#D2FF00] font-bold uppercase">
                // TAX_DECAY_CURVE
              </span>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                OPENING TAX DECAY: 99% → 0% (3000ms)
              </h3>
            </div>
            <div className="text-right font-mono text-xs">
              <span className="text-gray-400 text-[10px] block uppercase">YOUR CEILING</span>
              <span className="text-[#D2FF00] font-black text-sm drop-shadow-[0_0_8px_rgba(210,255,0,0.6)]">
                2.0% MAX ENTRY
              </span>
            </div>
          </div>

          {/* SVG Visual Chart for Tax Decay */}
          <div className="w-full bg-black border border-[#242424] p-4 relative font-mono text-[10px] hover:border-[#D2FF00]/40 transition-colors">
            <div className="flex justify-between text-gray-500 mb-1">
              <span className="text-red-400">99% TAX [START]</span>
              <span>1500ms (50%)</span>
              <span className="text-[#D2FF00] font-bold">3000ms [0% TAX]</span>
            </div>

            {/* Visual SVG Coordinate Grid + Decay Curve */}
            <svg
              className="w-full h-48 stroke-current select-none"
              fill="none"
              viewBox="0 0 500 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid lines */}
              <line stroke="#1f1f1f" strokeWidth="1" x1="0" x2="500" y1="20" y2="20"></line>
              <line stroke="#1f1f1f" strokeWidth="1" x1="0" x2="500" y1="70" y2="70"></line>
              <line stroke="#1f1f1f" strokeWidth="1" x1="0" x2="500" y1="120" y2="120"></line>
              <line stroke="#1f1f1f" strokeWidth="1" x1="0" x2="500" y1="170" y2="170"></line>

              {/* Vertical Time Markers */}
              <line
                stroke="#1c1c1c"
                strokeDasharray="2 2"
                x1="125"
                x2="125"
                y1="0"
                y2="200"
              ></line>
              <line
                stroke="#1c1c1c"
                strokeDasharray="2 2"
                x1="250"
                x2="250"
                y1="0"
                y2="200"
              ></line>
              <line
                stroke="#1c1c1c"
                strokeDasharray="2 2"
                x1="375"
                x2="375"
                y1="0"
                y2="200"
              ></line>

              {/* Non-linear Tax Decay Curve Path */}
              <path
                d="M 10 20 Q 80 140 280 175 T 490 185"
                fill="none"
                stroke="#D2FF00"
                strokeWidth="3"
                style={{ filter: 'drop-shadow(0px 0px 6px rgba(210, 255, 0, 0.7))' }}
              ></path>

              {/* Bot Snipe Trap Zone (Danger Zone) */}
              <rect
                fill="rgba(255, 51, 75, 0.15)"
                height="70"
                stroke="#ff334b"
                strokeDasharray="3 3"
                width="120"
                x="10"
                y="20"
              ></rect>
              <text fill="#ff334b" fontFamily="monospace" fontSize="10" x="20" y="45">
                BOT TRIBUTE TRAP (99%)
              </text>
              <text fill="#888" fontFamily="monospace" fontSize="9" x="20" y="60">
                Funds lost to creator escrow
              </text>

              {/* Safe Execution Target Point */}
              <circle
                cx="360"
                cy="180"
                fill="#D2FF00"
                r="5"
                stroke="#000"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0px 0px 8px #D2FF00)' }}
              ></circle>
              <text
                fill="#D2FF00"
                fontFamily="monospace"
                fontSize="10"
                fontWeight="bold"
                x="310"
                y="165"
              >
                TARGET ENTRY: 2.1%
              </text>

              {/* Dynamic Interactive Scrub Indicator */}
              <line
                stroke="#D2FF00"
                strokeDasharray="2 2"
                strokeWidth="1"
                x1={svgX}
                x2={svgX}
                y1="0"
                y2="200"
                opacity="0.6"
              ></line>
              <circle
                cx={svgX}
                cy={svgY}
                fill={currentTax > 10 ? '#ff334b' : '#D2FF00'}
                r="4"
                stroke="#000"
                strokeWidth="1.5"
              ></circle>
            </svg>

            {/* Interactive Scrubber Slider */}
            <div className="mt-3 pt-2 border-t border-[#242424] space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <label htmlFor={timeSliderId} className="text-gray-400">
                  SIMULATE BLOCK TIME: <strong className="text-white">{decayMs}ms</strong>
                </label>
                <span
                  className={`font-bold ${
                    currentTax > 10
                      ? 'text-red-400'
                      : currentTax > 2
                        ? 'text-yellow-400'
                        : 'text-[#D2FF00]'
                  }`}
                >
                  CALCULATED TAX: {currentTax}%{' '}
                  {currentTax <= 2.0 ? '[SAFE ENTRY TRIGGER]' : '[HIGH TAX EXCLUSION]'}
                </span>
              </div>
              <input
                id={timeSliderId}
                type="range"
                min="0"
                max="3000"
                step="25"
                value={decayMs}
                onChange={(e) => {
                  setDecayMs(Number(e.target.value));
                  playCyberBlip(700 + Number(e.target.value) * 0.2, 0.02);
                }}
                className="w-full accent-[#D2FF00] bg-[#242424] h-1.5 cursor-pointer"
              />
            </div>

            <div className="flex justify-between text-[11px] text-gray-400 mt-2">
              <span>
                Read intervals: <strong className="text-white">Every 150ms</strong>
              </span>
              <span>
                Wait condition:{' '}
                <strong className="text-[#D2FF00] font-bold">Tax &lt;= 2.0%</strong>
              </span>
              <span>
                Action: <strong className="text-white">Instant Multicall Buy</strong>
              </span>
            </div>
          </div>

          {/* Exit Door Simulation Breakdown (from IMAGE_2) */}
          <div className="border border-[#242424] p-4 bg-black/60 space-y-2 hover:border-[#D2FF00]/40 transition-colors">
            <div className="flex justify-between text-xs font-mono font-bold">
              <span className="text-white">EXIT DOOR SIMULATOR (SLIPPAGE IMPACT)</span>
              <span className="text-[#D2FF00] font-mono">$FABLE POOL</span>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-2 text-center font-mono">
              <button
                onClick={() => {
                  setSelectedExitSize(16);
                  playCyberBlip(900, 0.03);
                }}
                className={`p-2 border bg-[#101010] transition-colors cursor-pointer ${
                  selectedExitSize === 16
                    ? 'border-[#D2FF00] shadow-[0_0_12px_rgba(210,255,0,0.3)]'
                    : 'border-[#242424] hover:border-[#D2FF00]/60'
                }`}
              >
                <div className="text-[10px] text-gray-400">$16 EXIT</div>
                <div className="text-xs font-bold text-[#D2FF00]">99% kept</div>
              </button>

              <button
                onClick={() => {
                  setSelectedExitSize(39);
                  playCyberBlip(950, 0.03);
                }}
                className={`p-2 border bg-[#101010] transition-colors cursor-pointer ${
                  selectedExitSize === 39
                    ? 'border-[#D2FF00] shadow-[0_0_12px_rgba(210,255,0,0.3)]'
                    : 'border-[#242424] hover:border-[#D2FF00]/60'
                }`}
              >
                <div className="text-[10px] text-gray-400">$39 EXIT</div>
                <div className="text-xs font-bold text-[#D2FF00]">99% kept</div>
              </button>

              <button
                onClick={() => {
                  setSelectedExitSize(78);
                  playCyberBlip(1000, 0.03);
                }}
                className={`p-2 border bg-[#101010] transition-colors cursor-pointer ${
                  selectedExitSize === 78
                    ? 'border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.3)]'
                    : 'border-[#242424] hover:border-yellow-400/60'
                }`}
              >
                <div className="text-[10px] text-gray-400">$78 EXIT</div>
                <div className="text-xs font-bold text-yellow-400">96% kept</div>
              </button>

              <button
                onClick={() => {
                  setSelectedExitSize(155);
                  playCyberBlip(750, 0.04);
                }}
                className={`p-2 border bg-[#101010] transition-colors cursor-pointer ${
                  selectedExitSize === 155
                    ? 'border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                    : 'border-red-500/40 hover:border-red-500'
                }`}
              >
                <div className="text-[10px] text-gray-400">$155 EXIT</div>
                <div className="text-xs font-bold text-red-400">90% kept</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Live Contract Audit Card ($FABLE 100/100 Breakdown from IMAGE_2) */}
        <div className="lg:col-span-6 bg-[#101010] border border-[#242424] p-6 space-y-6 cyber-card">
          <div className="flex justify-between items-center border-b border-[#242424] pb-3">
            <div>
              <span className="text-xs font-mono text-[#D2FF00] font-bold uppercase">
                // AUDIT_SCORECARD
              </span>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                FABLE ($ENTRY) INSPECTOR
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-[#888888]">SCORE:</span>
              <span className="bg-[#D2FF00] text-black font-black text-xl px-3 py-0.5 font-mono shadow-[0_0_15px_rgba(210,255,0,0.6)] animate-pulse">
                100
              </span>
            </div>
          </div>

          {/* Parameter Summary Rows */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="border border-[#242424] p-3 bg-black hover:border-[#D2FF00]/50 transition-colors">
              <span className="text-[10px] text-gray-400 block uppercase">DEPLOY BLOCK</span>
              <span className="text-white font-bold">62,262,410</span>
              <div className="text-[10px] text-[#D2FF00]">Fresh: 0 prior tx</div>
            </div>
            <div className="border border-[#242424] p-3 bg-black hover:border-[#D2FF00]/50 transition-colors">
              <span className="text-[10px] text-gray-400 block uppercase">POOL PHASE</span>
              <span className="text-[#D2FF00] font-bold">CURVE - 41%</span>
              <div className="text-[10px] text-gray-400">Buys/Sells: 192/56</div>
            </div>
            <div className="border border-[#242424] p-3 bg-black hover:border-[#D2FF00]/50 transition-colors">
              <span className="text-[10px] text-gray-400 block uppercase">CREATOR ESCROW</span>
              <span className="text-white font-bold">$5.8K CREDITED</span>
              <div className="text-[10px] text-red-400">Claimed: $4.0K</div>
            </div>
          </div>

          {/* Score Factor Matrix (from IMAGE_2 $FABLE breakdown) */}
          <div className="border border-[#242424] bg-black p-4 space-y-2.5 font-mono text-xs hover:border-[#D2FF00]/30 transition-colors">
            <div className="text-[11px] text-[#D2FF00] font-bold pb-1 border-b border-[#242424]">
              VERIFIED CONTRACT CONDITIONS:
            </div>
            <div className="flex justify-between items-center text-gray-300 hover:text-white transition-colors">
              <span className="flex items-center">
                <span className="text-[#D2FF00] mr-2 font-bold">+10</span> Creator tax 1.5%,
                creator earns on volume
              </span>
              <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
                PASS
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-300 hover:text-white transition-colors">
              <span className="flex items-center">
                <span className="text-[#D2FF00] mr-2 font-bold">+5</span> Fees routed to third
                party deal (<span className="text-yellow-400 font-mono text-[11px]">0xe80234...</span>)
              </span>
              <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
                PASS
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-300 hover:text-white transition-colors">
              <span className="flex items-center">
                <span className="text-[#D2FF00] mr-2 font-bold">+8</span> Has verified X link
                with verified domain token
              </span>
              <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
                PASS
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-300 hover:text-white transition-colors">
              <span className="flex items-center">
                <span className="text-[#D2FF00] mr-2 font-bold">+5</span> No declared bundle
                wallets inside initial block
              </span>
              <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
                PASS
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-300 hover:text-white transition-colors">
              <span className="flex items-center">
                <span className="text-[#D2FF00] mr-2 font-bold">+10</span> 32 distinct buyers
                within first 100ms
              </span>
              <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
                PASS
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-300 hover:text-white transition-colors">
              <span className="flex items-center">
                <span className="text-[#D2FF00] mr-2 font-bold">-0</span> Dev buy 0.04%,
                token-sized within guidelines
              </span>
              <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
                CLEAN
              </span>
            </div>
          </div>

          {/* Alert Tag & Inspect CTA with Hover Glow */}
          <div className="p-3 border-l-4 border-[#D2FF00] bg-white/5 font-mono text-xs text-gray-300 flex items-center justify-between">
            <span>
              &gt; EVALUATION: <strong className="text-white">VALIDATED FOR EXECUTION</strong>
            </span>
            <button
              onClick={() => {
                playCyberBlip(1250, 0.06);
                onInspectHex();
              }}
              className="btn-neon-glow bg-[#D2FF00] text-black font-bold px-4 py-1.5 text-[11px] uppercase hover:bg-white transition-all shadow-[0_0_12px_rgba(210,255,0,0.4)] hover:shadow-[0_0_25px_rgba(210,255,0,0.7)] cursor-pointer"
            >
              INSPECT HEX ↗
            </button>
          </div>
        </div>
      </div>

      {/* Live Fee Recipient Ledger Table (from IMAGE_2 "WHO GOT PAID") with interactive row glow */}
      <div className="border border-[#242424] bg-[#101010] p-6 space-y-4 font-mono cyber-card">
        <div className="flex flex-wrap justify-between items-center border-b border-[#242424] pb-3 gap-3">
          <div>
            <span className="text-xs text-[#D2FF00] font-bold uppercase">// CREATOR_LEDGER</span>
            <h3 className="text-base font-bold text-white uppercase">
              WHO GOT PAID: FEE RECIPIENTS (LAST 7 DAYS)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 pointer-events-none" />
              <input
                type="text"
                placeholder="FILTER WALLET // TAG..."
                value={walletFilter}
                onChange={(e) => setWalletFilter(e.target.value)}
                className="bg-black border border-[#242424] text-[10px] pl-7 pr-3 py-1 text-white focus:outline-none focus:border-[#D2FF00]"
              />
            </div>
            <span className="text-xs text-[#888888]">
              TRACKED: 1,492 WALLETS // 0 SPOOFED
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-[#242424] text-[#888888] uppercase text-[10px]">
                <th className="py-2.5 px-3">FEE WALLET</th>
                <th className="py-2.5 px-3">LAUNCHES</th>
                <th className="py-2.5 px-3">GRADUATED</th>
                <th className="py-2.5 px-3">DEPLOYED SELF</th>
                <th className="py-2.5 px-3 text-right">CLAIMED ETH</th>
                <th className="py-2.5 px-3 text-right">LAST SEEN</th>
              </tr>
            </thead>
            <tbody className="divide-y border-[#242424] text-gray-300">
              {filteredWallets.map((item, idx) => (
                <tr
                  key={idx}
                  onClick={() => {
                    playCyberBlip(1050, 0.04);
                    onSelectWallet(item);
                  }}
                  className="hover:bg-[rgba(210,255,0,0.15)] hover:text-white transition-all duration-150 cursor-pointer group"
                >
                  <td className="py-2.5 px-3 font-bold text-[#D2FF00] flex items-center group-hover:drop-shadow-[0_0_8px_rgba(210,255,0,0.7)]">
                    <span
                      className={`w-2 h-2 mr-2 ${
                        item.statusColor === 'red'
                          ? 'bg-red-500 radar-pulse'
                          : item.statusColor === 'yellow'
                            ? 'bg-yellow-400'
                            : item.statusColor === 'emerald'
                              ? 'bg-emerald-400 radar-pulse'
                              : 'bg-gray-500'
                      }`}
                    ></span>
                    {item.wallet}
                  </td>
                  <td className="py-2.5 px-3 group-hover:text-white">{item.launches}</td>
                  <td className="py-2.5 px-3 group-hover:text-white">{item.graduated}</td>
                  <td
                    className={`py-2.5 px-3 ${
                      item.deployedSelf === 'yes - burned'
                        ? 'text-[#D2FF00] group-hover:drop-shadow-[0_0_6px_rgba(210,255,0,0.8)]'
                        : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  >
                    {item.deployedSelf}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-white group-hover:text-[#D2FF00]">
                    {item.claimedEth}
                  </td>
                  <td className="py-2.5 px-3 text-right text-gray-400 group-hover:text-gray-200">
                    {item.lastSeen}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
