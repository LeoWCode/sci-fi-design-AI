import React, { useState, useEffect, useRef } from 'react';
import { playCyberBlip, playArmTerminalSound } from '../utils/sound';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  onOpenBuyModal: () => void;
  onInspectHex: () => void;
}

export default function HeroSection({
  onOpenTerminal,
  onOpenBuyModal,
  onInspectHex,
}: HeroSectionProps) {
  const [mouseCoords, setMouseCoords] = useState({ x: 36.1749, y: -86.7676, z: 46.6827 });
  const [activeEvents, setActiveEvents] = useState([
    {
      id: '#568792',
      token: '$FABLE',
      deployer: '0x70536f...3a4e14',
      tax: '99%',
      decayTime: '3.0s',
      status: 'Sub-second snipe route armed via $DIVE gasless tunnel',
    },
  ]);
  const [feedRunning, setFeedRunning] = useState(true);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Simulated live event feeder
  useEffect(() => {
    if (!feedRunning) return;
    const incomingSamples = [
      {
        id: '#568793',
        token: '$GLITCH',
        deployer: '0x39a1f2...8b41cd',
        tax: '99%',
        decayTime: '2.8s',
        status: 'Tax decay monitored; target entry at 1.8%',
      },
      {
        id: '#568794',
        token: '$PONZION',
        deployer: '0x88f219...40e19a',
        tax: '99%',
        decayTime: '3.2s',
        status: 'Creator fee escrow detected: 1.5% routed',
      },
      {
        id: '#568795',
        token: '$VOIDER',
        deployer: '0x1602a8...4a70bb',
        tax: '99%',
        decayTime: '3.0s',
        status: 'Serial deployer alert: prior 49.2 ETH claimed',
      },
    ];

    let index = 0;
    const interval = setInterval(() => {
      const nextSample = incomingSamples[index % incomingSamples.length];
      index++;
      setActiveEvents((prev) => [nextSample, ...prev.slice(0, 2)]);
    }, 7000);

    return () => clearInterval(interval);
  }, [feedRunning]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setMouseCoords({
      x: +(35 + nx * 3.5).toFixed(4),
      y: +(-87 + ny * 2.2).toFixed(4),
      z: +(44 + (nx + ny) * 3).toFixed(4),
    });
  };

  return (
    <>
      {/* Top Crosshair Grid Accents */}
      <div className="max-w-[1720px] mx-auto px-4 py-2 border-b border-[#242424] flex justify-between text-[10px] text-[#888888] font-mono tracking-widest select-none">
        <div className="hover:text-[#D2FF00] transition-colors cursor-crosshair">
          INDEX: 0xFD49 // MEMPOOL READ-ONLY // SECURE CHANNEL
        </div>
        <div className="hidden md:block hover:text-gray-200 transition-colors font-mono">
          COORDINATES: X_{mouseCoords.x} | Y_{mouseCoords.y} | Z_{mouseCoords.z}
        </div>
        <div className="text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
          // ROBINHOOD CHAIN PROTOCOL V2
        </div>
      </div>

      {/* BEGIN: HeroSection (/01) */}
      <section
        className="border border-[#242424] bg-[#0a0a0a] relative p-6 lg:p-10 crosshair-grid hover:border-[#D2FF00]/40 transition-colors duration-300"
        data-purpose="hero-terminal"
        id="terminal"
      >
        {/* Top Section Metadata */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#242424] pb-4 mb-8">
          <div className="flex items-center space-x-3">
            <span className="bg-[#D2FF00] text-black font-bold font-mono px-2 py-0.5 text-xs shadow-[0_0_10px_rgba(210,255,0,0.5)]">
              /01
            </span>
            <span className="text-xs tracking-widest font-mono text-gray-300">
              SNIPER_CORE // PRE-FLIGHT INTERFACE
            </span>
          </div>
          <div className="flex items-center space-x-6 text-xs text-[#888888] font-mono">
            <span>
              &gt; TOKEN_ID:{' '}
              <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.6)]">
                $DIVE
              </span>
            </span>
            <span>
              &gt; ALGO: <span className="text-white">ZERO_LATENCY</span>
            </span>
            <span className="text-[#D2FF00] font-bold">// SCN_01</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Giant Brutalist Headline & Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D2FF00] font-mono font-bold drop-shadow-[0_0_8px_rgba(210,255,0,0.5)]">
                // ROBINHOOD PONZI V2 WEAPONIZED MEMECOIN
              </span>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-sans tracking-tighter uppercase leading-[0.9] text-white">
                EVERY LAUNCH READ{' '}
                <span className="text-stroke-neon transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(210,255,0,0.8)]">
                  BEFORE
                </span>{' '}
                YOU TOUCH IT.
              </h1>
              <div className="pt-2">
                <span className="inline-block bg-[#D2FF00]/10 border border-[#D2FF00]/40 text-[#D2FF00] px-3 py-1 font-mono text-xs tracking-wider uppercase font-bold hover:border-[#D2FF00] hover:shadow-[0_0_15px_rgba(210,255,0,0.35)] transition-all duration-200 cursor-default">
                  $DIVE: THE HIGH-TECH APEX MEME COIN FUELING THE FASTEST MEMPOOL SNIPER ENGINE.
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-300 font-mono max-w-2xl leading-relaxed border-l-2 border-[#D2FF00] pl-4 hover:border-white transition-colors">
              DIVE is a sniper terminal that refuses to race blind. Powered by the $DIVE meme
              utility token, it reads every launch the exact block it lands, scores contract
              mechanics, inspects opening tax decay, and tracks deployer escrow wallets before you
              commit a single satoshi.
            </p>

            <div className="p-3.5 bg-black/60 border border-[#242424] text-xs font-mono space-y-1.5 cyber-card group">
              <div className="text-[#D2FF00] font-bold flex items-center justify-between">
                <span className="group-hover:drop-shadow-[0_0_8px_rgba(210,255,0,0.7)] transition-all">
                  [GOD-MODE MEME UTILITY ARSENAL]
                </span>
                <span className="text-[10px] bg-[#101010] px-1.5 py-0.5 text-white border border-[#242424] group-hover:border-[#D2FF00] group-hover:text-[#D2FF00] transition-colors">
                  STATUS: ARMED
                </span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Holding <strong className="text-white">$DIVE</strong> unlocks sub-second sniper
                execution, honeypot elimination, frontrun protection, and zero-tax flash routing. No
                keys uploaded. Runs half on machine, never sends signatures to external clouds.
              </p>
            </div>

            {/* Dual Cyber Action Buttons with Glow Effects */}
            <div className="flex flex-wrap gap-4 pt-2 font-mono">
              <button
                onClick={() => {
                  playArmTerminalSound();
                  onOpenTerminal();
                }}
                className="btn-neon-glow bg-[#D2FF00] hover:bg-[#b8e600] text-black font-extrabold px-8 py-4 text-xs uppercase flex items-center tracking-wider border border-black shadow-[4px_4px_0px_#333] hover:shadow-[0_0_25px_rgba(210,255,0,0.65),0_0_50px_rgba(210,255,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                RUN THE TERMINAL{' '}
                <span className="ml-2 font-bold text-base transition-transform duration-200 hover:translate-x-0.5">
                  ↗
                </span>
              </button>

              <button
                onClick={() => {
                  playCyberBlip(1100, 0.05);
                  onOpenBuyModal();
                }}
                className="bg-white/10 hover:bg-[#D2FF00]/15 hover:border-[#D2FF00] hover:shadow-[0_0_15px_rgba(210,255,0,0.35)] hover:text-[#D2FF00] text-white font-mono text-xs px-6 py-4 uppercase border border-[#D2FF00]/80 flex items-center tracking-wider hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                BUY $DIVE MEMECOIN{' '}
                <span className="ml-3 text-[#D2FF00] font-bold">[ UNISWAP ]</span>
              </button>

              <div className="flex items-center px-4 py-2 border border-[#242424] bg-black/40 text-[11px] text-[#888888] hover:border-[#D2FF00]/50 transition-colors">
                <span className="w-2 h-2 bg-emerald-500 mr-2 radar-pulse"></span> LATENCY:{' '}
                <span className="text-white ml-1 font-bold animate-pulse">216 ms</span>
              </div>
            </div>

            {/* Quick Metrics Bar with Micro-interactions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#242424] font-mono">
              <div className="p-3 bg-[#101010] border border-[#242424] cyber-card cursor-default">
                <div className="text-[10px] text-[#888888] uppercase tracking-wider">
                  Launches read
                </div>
                <div className="text-2xl font-black text-[#D2FF00] mt-1 drop-shadow-[0_0_8px_rgba(210,255,0,0.4)]">
                  1,122
                </div>
                <div className="text-[9px] text-gray-500">this hour</div>
              </div>
              <div className="p-3 bg-[#101010] border border-[#242424] cyber-card cursor-default">
                <div className="text-[10px] text-[#888888] uppercase tracking-wider">
                  Deployers
                </div>
                <div className="text-2xl font-black text-white mt-1 group-hover:text-[#D2FF00] transition-colors">
                  47,898
                </div>
                <div className="text-[9px] text-gray-500">indexed history</div>
              </div>
              <div className="p-3 bg-[#101010] border border-[#242424] cyber-card cursor-default">
                <div className="text-[10px] text-[#888888] uppercase tracking-wider">
                  Fee Wallets
                </div>
                <div className="text-2xl font-black text-white mt-1 group-hover:text-[#D2FF00] transition-colors">
                  1,492
                </div>
                <div className="text-[9px] text-gray-500">on the ledger</div>
              </div>
              <div className="p-3 bg-[#101010] border border-[#242424] cyber-card cursor-default">
                <div className="text-[10px] text-[#888888] uppercase tracking-wider">
                  Multicall read
                </div>
                <div className="text-2xl font-black text-[#D2FF00] mt-1 drop-shadow-[0_0_8px_rgba(210,255,0,0.4)]">
                  216<span className="text-xs text-gray-400">ms</span>
                </div>
                <div className="text-[9px] text-gray-500">one read loop</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Token Viewport & Cybernetic Terminal Suite */}
          <div className="lg:col-span-6 space-y-4">
            {/* 3D Interactive Token Cyber Viewport */}
            <div
              ref={viewportRef}
              onMouseMove={handleMouseMove}
              className="border border-[#242424] bg-black relative p-3 font-mono shadow-2xl overflow-hidden crosshair-grid hover:border-[#D2FF00]/60 hover:shadow-[0_0_30px_rgba(210,255,0,0.15)] transition-all duration-300"
            >
              {/* Top Telemetry Header */}
              <div className="flex items-center justify-between border-b border-[#242424] pb-2 mb-2 text-[10px]">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-[#D2FF00] radar-pulse"></span>
                  <span className="text-white font-bold tracking-wider uppercase">
                    CORE_ARTIFACT // $DIVE_3D
                  </span>
                  <span className="bg-[#101010] border border-[#242424] text-[#D2FF00] px-1.5 py-0.5 text-[9px] font-bold shadow-[0_0_8px_rgba(210,255,0,0.3)]">
                    INTERACTIVE
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-[#888888]">
                  <span>
                    TOKEN_ID: <strong className="text-white">$DIVE</strong>
                  </span>
                  <span className="hidden sm:inline">
                    ALGO: <strong className="text-[#D2FF00]">ZERO_LATENCY</strong>
                  </span>
                  <span className="text-[#D2FF00] font-black bg-[#D2FF00]/10 px-2 py-0.5 border border-[#D2FF00]/30 shadow-[0_0_10px_rgba(210,255,0,0.2)]">
                    STATUS: ARMED
                  </span>
                </div>
              </div>

              {/* Embedded 3D Token Canvas with Wireframe Head */}
              <div className="relative w-full h-72 sm:h-80 lg:h-88 bg-black border border-[#D2FF00]/40 flex items-center justify-center overflow-hidden group shadow-[0_0_20px_rgba(210,255,0,0.15)] hover:border-[#D2FF00] hover:shadow-[0_0_30px_rgba(210,255,0,0.3)] transition-all duration-300">
                <img
                  alt="Cybernetic Avatar Mascot Wireframe Head"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-125"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1WJ6AMKOX-VGPvwQIZCBe-c9fDXXK8S4p9Ia5le8gYIF7z_viw5odaWai8-pirByHIQOEghM3FayqWrPNPbPy4y6b-XOjXrVkoRkaAu9yVc5o7kny3pE4oC8dfhSqLdnWX24g0qXRcQbUVBLYoRGxzdXKxHcctqDlh6jeCxx0R7pBG1Xg7mukKlsLkzZfUt8mY5_hH-FDYHLNQ5GtxpiVq2gUQDJyOWBGWvTPoRtz11if1mi4q7wICUWAy0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 scanlines pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none"></div>

                {/* HUD Targeting Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3.5 text-[9px] text-[#888888] z-10 select-none">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="inline-block text-[#D2FF00] font-mono font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.8)] bg-black/60 px-1.5 py-0.5 border border-[#D2FF00]/40">
                        [SYS_RETICLE // TARGET_LOCKED]
                      </span>
                      <div className="text-[8px] text-[#D2FF00]/80 tracking-widest font-mono">
                        GRID: 0xFD49_AVATAR
                      </div>
                    </div>
                    <div className="text-right space-y-0.5 bg-black/60 p-1.5 border border-[#242424]/70">
                      <div className="text-[#D2FF00] font-bold text-[9px]">
                        SYSTEM STATUS: <span className="animate-pulse">OPTIMAL</span>
                      </div>
                      <div className="text-[8px] text-gray-400">FOV: 45° // RAD: 2.5</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="bg-black/70 border border-[#242424]/80 p-1.5 space-y-0.5 font-mono text-[8px]">
                      <div className="text-gray-400">COORD_LOCK:</div>
                      <div className="text-[#D2FF00] font-bold">
                        X_{mouseCoords.x} | Y_{mouseCoords.y} | Z_{mouseCoords.z}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] bg-[#D2FF00] text-black font-black font-mono px-2 py-0.5 shadow-[0_0_10px_rgba(210,255,0,0.6)] uppercase tracking-wider">
                        1 $DIVE = 1 SPEED PASS
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Terminal Card / Status HUD for $DIVE Token */}
              <div className="border-t border-[#242424] pt-3 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-[#D2FF00] font-bold uppercase tracking-widest">
                      // MEME_WEAPON_SPEC
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">
                      $DIVE UTILITY MEME PROTOCOL
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        playCyberBlip(1000, 0.05);
                        onOpenBuyModal();
                      }}
                      className="btn-neon-glow bg-[#D2FF00] hover:bg-[#b8e600] text-black text-[10px] font-black px-3 py-1 uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(210,255,0,0.6)] hover:-translate-y-0.5 active:translate-y-0 inline-block cursor-pointer"
                    >
                      BUY $DIVE ON UNISWAP / PONZI ↗
                    </button>
                    <button
                      onClick={() => {
                        playCyberBlip(800, 0.04);
                        onOpenTerminal();
                      }}
                      className="bg-[#101010] border border-[#242424] hover:border-[#D2FF00] hover:shadow-[0_0_15px_rgba(210,255,0,0.35)] hover:text-[#D2FF00] text-gray-300 text-[10px] font-bold px-2.5 py-1 uppercase transition-all duration-200 cursor-pointer"
                    >
                      VIEW MEMPOOL PROBE
                    </button>
                  </div>
                </div>

                {/* Live HUD Specs Matrix */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="p-2 border border-[#242424] bg-[#101010] cyber-card">
                    <div className="text-gray-500 uppercase">ACCESS UNIT</div>
                    <div className="text-[#D2FF00] font-bold mt-0.5">1 $DIVE = 1 SPEED PASS</div>
                  </div>
                  <div className="p-2 border border-[#242424] bg-[#101010] cyber-card">
                    <div className="text-gray-500 uppercase">GOD-MODE TIERS</div>
                    <div className="text-white font-bold mt-0.5">HOLD 1,000,000 $DIVE</div>
                    <div className="text-[8px] text-[#D2FF00]">SNIPER FEED</div>
                  </div>
                  <div className="p-2 border border-[#242424] bg-[#101010] cyber-card">
                    <div className="text-gray-500 uppercase">ROUTING TECH</div>
                    <div className="text-[#D2FF00] font-bold mt-0.5">ZERO-TAX ENGINE</div>
                    <div className="text-[8px] text-gray-400">EMBEDDED</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Streamlined Terminal Log Streamer */}
            <div className="bg-black border border-[#242424] relative font-mono text-xs shadow-2xl hover:border-[#D2FF00]/50 transition-colors duration-300">
              {/* Terminal Header Window Chrome */}
              <div className="bg-[#101010] border-b border-[#242424] px-4 py-2 flex items-center justify-between select-none">
                <div className="flex items-center space-x-2">
                  <span
                    onClick={() => setFeedRunning((p) => !p)}
                    className="w-2.5 h-2.5 bg-red-600 block border border-black hover:scale-125 transition-transform cursor-pointer"
                    title={feedRunning ? 'Pause live feed' : 'Resume live feed'}
                  ></span>
                  <span
                    onClick={() => {
                      playCyberBlip(600, 0.05);
                      setActiveEvents([]);
                    }}
                    className="w-2.5 h-2.5 bg-yellow-500 block border border-black hover:scale-125 transition-transform cursor-pointer"
                    title="Clear live events"
                  ></span>
                  <span
                    onClick={() => {
                      playArmTerminalSound();
                      onOpenTerminal();
                    }}
                    className="w-2.5 h-2.5 bg-[#D2FF00] block border border-black hover:scale-125 transition-transform cursor-pointer shadow-[0_0_6px_rgba(210,255,0,0.8)]"
                    title="Open terminal window"
                  ></span>
                  <span className="text-[10px] text-gray-300 font-bold ml-2">
                    dive terminal v0.2.1-live // $DIVE MEMPOOL DAEMON
                  </span>
                </div>
                <span className="text-[9px] bg-[#0a0a0a] px-2 py-0.5 text-[#D2FF00] border border-[#242424] shadow-[0_0_8px_rgba(210,255,0,0.2)]">
                  {feedRunning ? 'READ-ONLY // SECURE' : 'FEED PAUSED'}
                </span>
              </div>

              {/* Terminal Content Body */}
              <div className="p-3.5 space-y-1.5 text-[11px] leading-relaxed text-gray-300 overflow-x-auto scanlines max-h-48">
                <div className="text-[#888888] hover:text-gray-300 transition-colors">
                  $ dive --listen --network=robinhood-pons-v2 --weapon=$DIVE
                </div>
                <div className="text-gray-400">
                  probe rpc ...........{' '}
                  <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_5px_rgba(210,255,0,0.6)]">
                    publicnode.ok (14ms)
                  </span>
                </div>
                <div className="text-gray-400">
                  auth $DIVE token ....{' '}
                  <span className="text-[#D2FF00] font-bold drop-shadow-[0_0_5px_rgba(210,255,0,0.6)]">
                    TIER_GOD_MODE VERIFIED (1M+)
                  </span>
                </div>
                <div className="text-gray-400">
                  probe factory .......{' '}
                  <span className="text-white">pons.v2 -&gt; TokenLaunched</span>
                </div>

                {activeEvents.map((evt, idx) => (
                  <div
                    key={`${evt.id}-${idx}`}
                    className="p-2 bg-[#101010] border border-[#242424] my-2 space-y-1 hover:border-[#D2FF00]/70 transition-all duration-200"
                  >
                    <div className="text-[#D2FF00] font-bold flex justify-between text-[10px]">
                      <span>[INCOMING CONTRACT EVENT]</span>
                      <button
                        onClick={() => {
                          playCyberBlip(1200, 0.05);
                          onInspectHex();
                        }}
                        className="text-[#D2FF00] underline hover:text-white cursor-pointer"
                      >
                        {evt.token} {evt.id}
                      </button>
                    </div>
                    <div className="text-[10px] text-gray-400">
                      deployer: <span className="text-white font-bold">{evt.deployer}</span> |
                      opening tax:{' '}
                      <span className="text-red-400 font-bold animate-pulse">{evt.tax}</span> decay to{' '}
                      <span className="text-[#D2FF00]">0% in {evt.decayTime}</span>
                    </div>
                    <div className="text-[10px] text-gray-400">
                      weapon engine:{' '}
                      <span className="text-[#D2FF00] font-bold">{evt.status}</span>
                    </div>
                  </div>
                ))}

                <div className="flex items-center text-[#D2FF00] text-[11px]">
                  <span className="mr-1">&gt;</span>
                  <span className="inline-block w-2.5 h-3.5 bg-[#D2FF00] animate-pulse shadow-[0_0_8px_rgba(210,255,0,0.9)]"></span>
                </div>
              </div>

              {/* Bottom Terminal Status Bar */}
              <div className="border-t border-[#242424] bg-[#101010]/80 px-4 py-1.5 flex items-center justify-between text-[10px] text-gray-400">
                <span className="flex items-center">
                  <span
                    className={`w-1.5 h-1.5 mr-1.5 radar-pulse ${
                      feedRunning ? 'bg-[#D2FF00]' : 'bg-yellow-500'
                    }`}
                  ></span>{' '}
                  {feedRunning ? 'MEMPOOL SYNCHRONIZED' : 'STREAM STANDBY'}
                </span>
                <span className="font-mono text-[#D2FF00] font-bold drop-shadow-[0_0_6px_rgba(210,255,0,0.5)]">
                  STREAM: 120 FPS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: HeroSection */}
    </>
  );
}
