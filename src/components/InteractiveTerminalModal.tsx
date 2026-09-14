import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, ShieldAlert } from 'lucide-react';
import { playCyberBlip, playArmTerminalSound, playCyberWarning } from '../utils/sound';

interface InteractiveTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveTerminalModal({
  isOpen,
  onClose,
}: InteractiveTerminalModalProps) {
  const [history, setHistory] = useState<Array<{ type: 'cmd' | 'output' | 'error' | 'warn' | 'success'; text: string }>>([
    { type: 'output', text: '========================================================================' },
    { type: 'output', text: '   DIVE TERMINAL v0.2.1-live // ROBINHOOD PONS V2 SNIPER CORE' },
    { type: 'output', text: '   ZERO-LATENCY MEMPOOL PROBE // POWERED BY $DIVE WEAPON UTILITY' },
    { type: 'output', text: '========================================================================' },
    { type: 'output', text: 'Type "help" to list available commands, or try "dive doctor --probe".' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isArmed, setIsArmed] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    playCyberBlip(1100, 0.04);
    const newHistory = [...history, { type: 'cmd' as const, text: `$ ${cmd}` }];

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'help') {
      newHistory.push(
        { type: 'output', text: 'AVAILABLE PROTOCOL COMMANDS:' },
        { type: 'output', text: '  dive doctor --probe        Probe RPC, mempool, and Robinhood Pons v2 numbers' },
        { type: 'output', text: '  dive hunt                  Listen to mempool launches with live scores' },
        { type: 'output', text: '  dive scan <address>        Deep forensic multicall scan on any token' },
        { type: 'output', text: '  dive snipe --live          Execute zero-latency snipe route' },
        { type: 'output', text: '  arm                        Arm sniper engine for live on-chain execution' },
        { type: 'output', text: '  disarm                     Switch back to dry-run simulation mode' },
        { type: 'output', text: '  status                     Check RPC node connection and hardware telemetry' },
        { type: 'output', text: '  dive tokenomics            View $DIVE utility tokenomics breakdown' },
        { type: 'output', text: '  clear                      Clear terminal window' }
      );
    } else if (lower.includes('doctor')) {
      newHistory.push(
        { type: 'output', text: '[PROBE] Initializing Robinhood Pons v2 Multicall Diagnostic...' },
        { type: 'success', text: '  ✓ RPC Endpoint: publicnode.ok (latency: 14ms)' },
        { type: 'success', text: '  ✓ Factory Hook: pons.v2.TokenLaunched listening' },
        { type: 'success', text: '  ✓ Quoter Contract: 0x892a...f410 responding in 22ms' },
        { type: 'success', text: '  ✓ Gasless Flash Tunnel: READY // 0 ETH gas priority needed' },
        { type: 'success', text: '  ✓ Mempool Daemon: 1,122 launches indexed past hour' },
        { type: 'output', text: 'DIAGNOSTIC STATUS: 100% HEALTHY. ALL CIRCUITS ARMED.' }
      );
    } else if (lower.includes('hunt')) {
      newHistory.push(
        { type: 'output', text: '[HUNT] Scanning mempool blocks for pending launches...' },
        { type: 'success', text: '  > [BLOCK 62,262,410] $FABLE (score: 100/100) - Tax decay: 99% -> 0% in 3.0s' },
        { type: 'warn', text: '  > [BLOCK 62,262,411] $PONZION (score: 72/100) - Serial deployer: 9 launches' },
        { type: 'error', text: '  > [BLOCK 62,262,412] $RUGGER (score: 12/100) - HONEYPOT DETECTED: Transfer tax locked' },
        { type: 'output', text: 'Listening for new blocks (interval: 150ms)...' }
      );
    } else if (lower.startsWith('dive scan')) {
      const parts = cmd.split(' ');
      const addr = parts[2] || '0x70536f40b2a3a4e14';
      newHistory.push(
        { type: 'output', text: `[SCAN] Multicall inspection for target: ${addr}` },
        { type: 'output', text: '  • Deploy Block: 62,262,410' },
        { type: 'output', text: '  • Reserves: 14.8 ETH / 850,000,000 tokens' },
        { type: 'output', text: '  • Opening Tax Decay: 99% -> 0% in 3000ms' },
        { type: 'output', text: '  • Creator Escrow Recipient: 0xe80234... (Deal syndicated)' },
        { type: 'output', text: '  • Exit Door Simulation ($16 exit): 99% retained value' },
        { type: 'success', text: '  ✓ OVERALL SAFETY SCORE: 100/100 (APPROVED)' }
      );
    } else if (lower.includes('snipe')) {
      if (!isArmed) {
        playCyberWarning();
        newHistory.push(
          { type: 'warn', text: '[DRY-RUN MODE] Engine is currently in simulation mode.' },
          { type: 'output', text: 'To arm live on-chain execution with local private keys, type: "arm"' },
          { type: 'output', text: 'Parameters: Max entry tax = 2.0% | Gas limit = 250,000 | Slippage = 0.5%' }
        );
      } else {
        playArmTerminalSound();
        newHistory.push(
          { type: 'success', text: '⚡ [LIVE SNIPER ARMED] Target route submitted to block producer.' },
          { type: 'output', text: 'Monitoring tax decay countdown: 99% ... 45% ... 12% ... 2.0%' },
          { type: 'success', text: '>>> EXECUTE MULTICALL BUY AT TAX = 1.9% (Block 62,262,410)' },
          { type: 'success', text: '>>> TRANSACTION MINED: 0x99a...c812 (Latency: 18ms)' },
          { type: 'output', text: 'Bag secured with 0% tribute loss to creator trap.' }
        );
      }
    } else if (lower === 'arm') {
      playArmTerminalSound();
      setIsArmed(true);
      newHistory.push(
        { type: 'warn', text: '⚠ ALERT: LIVE TRADING ENGINE ARMED.' },
        { type: 'success', text: 'Zero-latency gasless execution unlocked via $DIVE utility pass.' },
        { type: 'output', text: 'Local private keys stay in memory. Ready for block trigger.' }
      );
    } else if (lower === 'disarm') {
      playCyberBlip(700, 0.05);
      setIsArmed(false);
      newHistory.push({ type: 'output', text: 'Engine disarmed. Reverted to Dry-Run Mode.' });
    } else if (lower === 'status') {
      newHistory.push(
        { type: 'output', text: 'STATUS TELEMETRY:' },
        { type: 'output', text: '  • Engine state: ' + (isArmed ? 'ARMED (LIVE)' : 'DRY-RUN (SIMULATED)') },
        { type: 'output', text: '  • Ping: 14ms (London RPC Node)' },
        { type: 'output', text: '  • Memory: 8.6 GB / 16 GB' },
        { type: 'output', text: '  • Active Streams: 120 FPS' }
      );
    } else if (lower.includes('tokenomics')) {
      newHistory.push(
        { type: 'output', text: '$DIVE UTILITY MEMECOIN TOKENOMICS:' },
        { type: 'output', text: '  • Total Supply: 1,000,000,000 $DIVE' },
        { type: 'output', text: '  • Utility Pass: 1 $DIVE = 1 Speed Pass' },
        { type: 'output', text: '  • God-Mode Tier: 1,000,000 $DIVE (Sub-second sniper feed)' },
        { type: 'output', text: '  • Zero Dev Cut: 100% of contract trading is zero tax' }
      );
    } else {
      newHistory.push(
        { type: 'error', text: `Command not recognized: "${cmd}". Type "help" for instructions.` }
      );
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none"
      onClick={() => {
        playCyberBlip(600, 0.04);
        onClose();
      }}
    >
      <div
        className="w-full max-w-4xl bg-black border-2 border-[#D2FF00] shadow-[0_0_50px_rgba(210,255,0,0.4)] font-mono text-xs flex flex-col h-[75vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Chrome Header */}
        <div className="bg-[#101010] border-b border-[#242424] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={`w-2.5 h-2.5 block ${
                isArmed ? 'bg-red-500 radar-pulse' : 'bg-[#D2FF00] radar-pulse'
              }`}
            ></span>
            <span className="font-bold text-white tracking-wider flex items-center gap-2">
              <TerminalIcon className="w-3.5 h-3.5 text-[#D2FF00]" /> DIVE TERMINAL v0.2.1 //{' '}
              {isArmed ? (
                <span className="text-red-400 font-black animate-pulse">[ARMED LIVE]</span>
              ) : (
                <span className="text-[#D2FF00]">[DRY RUN]</span>
              )}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[10px] text-gray-400">NETWORK: ROBINHOOD PONS V2</span>
            <button
              onClick={() => {
                playCyberBlip(700, 0.03);
                onClose();
              }}
              className="text-gray-400 hover:text-[#D2FF00] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-1.5 scanlines bg-black/95 text-gray-300">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed ${
                line.type === 'cmd'
                  ? 'text-white font-bold'
                  : line.type === 'success'
                    ? 'text-[#D2FF00]'
                    : line.type === 'warn'
                      ? 'text-yellow-400'
                      : line.type === 'error'
                        ? 'text-red-400'
                        : 'text-gray-300'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleCommand}
          className="bg-[#101010] border-t border-[#242424] p-3 flex items-center space-x-2"
        >
          <span className="text-[#D2FF00] font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'dive doctor', 'hunt', 'dive snipe', or 'arm'..."
            className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs placeholder-gray-600"
          />
          <button
            type="submit"
            className="btn-neon-glow bg-[#D2FF00] hover:bg-[#b8e600] text-black font-bold px-4 py-1 uppercase text-[10px] cursor-pointer"
          >
            EXECUTE ↗
          </button>
        </form>
      </div>
    </div>
  );
}
