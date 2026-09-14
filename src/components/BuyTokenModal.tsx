import React, { useState } from 'react';
import { X, ArrowDown, ShieldCheck, Check } from 'lucide-react';
import { playCyberBlip, playArmTerminalSound } from '../utils/sound';

interface BuyTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BuyTokenModal({ isOpen, onClose }: BuyTokenModalProps) {
  const [ethAmount, setEthAmount] = useState('0.1');
  const [swapping, setSwapping] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // 1 ETH = 1,000,000 $DIVE
  const diveCalculated = (parseFloat(ethAmount || '0') * 1000000).toLocaleString();

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault();
    playArmTerminalSound();
    setSwapping(true);
    setTimeout(() => {
      setSwapping(false);
      setSuccess(true);
      playCyberBlip(1200, 0.08);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none"
      onClick={() => {
        playCyberBlip(600, 0.04);
        onClose();
      }}
    >
      <div
        className="w-full max-w-md bg-[#0a0a0a] border-2 border-[#D2FF00] shadow-[0_0_40px_rgba(210,255,0,0.3)] font-mono text-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chrome Header */}
        <div className="bg-[#101010] border-b border-[#242424] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-[#D2FF00] radar-pulse"></span>
            <span className="font-bold text-white tracking-wider">
              SWAP INTERFACE // $DIVE MEMECOIN
            </span>
          </div>
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

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {success ? (
            <div className="p-6 text-center space-y-3 bg-[#101010] border border-[#D2FF00]">
              <div className="w-12 h-12 bg-[#D2FF00]/20 border border-[#D2FF00] mx-auto flex items-center justify-center text-[#D2FF00] rounded-none">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">SWAP COMPLETED</h3>
              <p className="text-xs text-gray-300">
                Received <span className="text-[#D2FF00] font-bold">{diveCalculated} $DIVE</span>
              </p>
              <div className="text-[10px] text-[#888888]">
                SPEED PASS ARMED // ZERO ROUTING TAX DEDUCTED
              </div>
              <button
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="btn-neon-glow bg-[#D2FF00] text-black font-bold px-5 py-2 uppercase tracking-wider mt-2 cursor-pointer"
              >
                RETURN TO TERMINAL
              </button>
            </div>
          ) : (
            <form onSubmit={handleSwap} className="space-y-4">
              {/* Pay ETH */}
              <div className="bg-black border border-[#242424] p-3 space-y-1">
                <div className="flex justify-between text-gray-400 text-[10px]">
                  <span>YOU PAY</span>
                  <span>BALANCE: 1.48 ETH</span>
                </div>
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    className="bg-transparent text-white text-lg font-bold focus:outline-none w-3/5 font-mono"
                  />
                  <span className="bg-[#101010] border border-[#242424] px-2.5 py-1 text-white font-bold">
                    ETH
                  </span>
                </div>
              </div>

              {/* Arrow Down Divider */}
              <div className="flex justify-center -my-2">
                <div className="w-7 h-7 bg-[#101010] border border-[#242424] flex items-center justify-center text-[#D2FF00]">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Receive $DIVE */}
              <div className="bg-black border border-[#242424] p-3 space-y-1">
                <div className="flex justify-between text-gray-400 text-[10px]">
                  <span>YOU RECEIVE (ESTIMATED)</span>
                  <span className="text-[#D2FF00]">1 $DIVE = 1 SPEED PASS</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white text-lg font-bold font-mono">{diveCalculated}</div>
                  <span className="bg-[#D2FF00] text-black px-2.5 py-1 font-black">
                    $DIVE
                  </span>
                </div>
              </div>

              {/* Telemetry Breakdown */}
              <div className="bg-black/60 border border-[#242424] p-3 space-y-1.5 text-[10px] text-gray-400">
                <div className="flex justify-between">
                  <span>Routing Slippage:</span>
                  <span className="text-white font-bold">0.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Trading Tax:</span>
                  <span className="text-[#D2FF00] font-bold">0.0% (ZERO TAX ENGINE)</span>
                </div>
                <div className="flex justify-between">
                  <span>Router:</span>
                  <span className="text-gray-300">Uniswap v2 / Pons v2 Pool</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Gas:</span>
                  <span className="text-emerald-400 font-bold">$0.04 (14 Gwei)</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={swapping}
                className="btn-neon-glow w-full bg-[#D2FF00] hover:bg-[#b8e600] text-black font-black py-3 uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(210,255,0,0.5)] cursor-pointer disabled:opacity-50"
              >
                {swapping ? 'ROUTING TRANSACTION...' : 'SWAP NOW // UNLOCK SNIPER PASS ↗'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
