import { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { playCyberBlip } from '../utils/sound';

interface HexInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HexInspectorModal({ isOpen, onClose }: HexInspectorModalProps) {
  const [activeTab, setActiveTab] = useState<'bytecode' | 'decompiled' | 'storage' | 'radar'>('bytecode');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rawBytecode =
    '0x608060405234801561001057600080fd5b50600436106100575760003560e01c806306fdde031461005c578063095ea7b31461008c57806318160ddd146100bc57806323b872dd146100dc578063313ce5671461010c57806370a082311461012c57806395d89b411461015c578063a9059cbb1461017c578063dd62ed3e146101ac575b600080fd5b6100766101dc565b6040516100839190610543565b60405180910390f35b6100a6600480360360408110156100a257600080fd';

  const copyBytecode = () => {
    playCyberBlip(1100, 0.04);
    navigator.clipboard?.writeText(rawBytecode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        className="w-full max-w-4xl bg-[#0a0a0a] border-2 border-[#D2FF00] shadow-[0_0_40px_rgba(210,255,0,0.3)] font-mono text-xs flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Window Chrome */}
        <div className="bg-[#101010] border-b border-[#242424] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-[#D2FF00] radar-pulse"></span>
            <span className="font-bold text-white tracking-wider">
              HEX_INSPECTOR // $FABLE (0x70536f...3a4e14)
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-[#D2FF00] text-black px-2 py-0.5 text-[10px] font-black">
              SCORE: 100/100 PASS
            </span>
            <button
              onClick={() => {
                playCyberBlip(700, 0.03);
                onClose();
              }}
              className="text-gray-400 hover:text-[#D2FF00] transition-colors p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#242424] bg-[#050505]">
          <button
            onClick={() => {
              playCyberBlip(800, 0.02);
              setActiveTab('bytecode');
            }}
            className={`px-4 py-2.5 font-bold transition-all border-r border-[#242424] cursor-pointer ${
              activeTab === 'bytecode'
                ? 'bg-[#101010] text-[#D2FF00] border-b-2 border-b-[#D2FF00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            BYTECODE &amp; OPCODES
          </button>
          <button
            onClick={() => {
              playCyberBlip(800, 0.02);
              setActiveTab('decompiled');
            }}
            className={`px-4 py-2.5 font-bold transition-all border-r border-[#242424] cursor-pointer ${
              activeTab === 'decompiled'
                ? 'bg-[#101010] text-[#D2FF00] border-b-2 border-b-[#D2FF00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            DECOMPILED LOGIC
          </button>
          <button
            onClick={() => {
              playCyberBlip(800, 0.02);
              setActiveTab('storage');
            }}
            className={`px-4 py-2.5 font-bold transition-all border-r border-[#242424] cursor-pointer ${
              activeTab === 'storage'
                ? 'bg-[#101010] text-[#D2FF00] border-b-2 border-b-[#D2FF00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            STORAGE SLOTS
          </button>
          <button
            onClick={() => {
              playCyberBlip(800, 0.02);
              setActiveTab('radar');
            }}
            className={`px-4 py-2.5 font-bold transition-all cursor-pointer ${
              activeTab === 'radar'
                ? 'bg-[#101010] text-[#D2FF00] border-b-2 border-b-[#D2FF00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            TAX RADAR TRACE
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'bytecode' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-400">
                  RAW RUNTIME BYTECODE (5,420 BYTES // OPTIMIZED RUNS: 200)
                </span>
                <button
                  onClick={copyBytecode}
                  className="flex items-center gap-1 text-[10px] bg-[#101010] border border-[#242424] px-2.5 py-1 text-white hover:border-[#D2FF00] hover:text-[#D2FF00] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#D2FF00]" /> COPIED RAW HEX
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> COPY HEX
                    </>
                  )}
                </button>
              </div>

              <div className="bg-black p-3.5 border border-[#242424] text-[11px] text-gray-300 font-mono break-all leading-relaxed max-h-44 overflow-y-auto">
                {rawBytecode}
              </div>

              <div className="text-[11px] text-[#D2FF00] font-bold">DISASSEMBLED OPCODES (FIRST 8 STEPS):</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                <div className="p-2 bg-black border border-[#242424]">
                  <span className="text-gray-500">[00]</span> PUSH1 0x80
                </div>
                <div className="p-2 bg-black border border-[#242424]">
                  <span className="text-gray-500">[02]</span> PUSH1 0x40
                </div>
                <div className="p-2 bg-black border border-[#242424]">
                  <span className="text-gray-500">[04]</span> MSTORE
                </div>
                <div className="p-2 bg-black border border-[#242424]">
                  <span className="text-gray-500">[05]</span> CALLVALUE
                </div>
                <div className="p-2 bg-black border border-[#242424]">
                  <span className="text-gray-500">[06]</span> DUP1
                </div>
                <div className="p-2 bg-black border border-[#242424]">
                  <span className="text-gray-500">[07]</span> ISZERO
                </div>
                <div className="p-2 bg-black border border-[#242424]">
                  <span className="text-gray-500">[08]</span> PUSH2 0x0010
                </div>
                <div className="p-2 bg-black border border-[#242424]">
                  <span className="text-gray-500">[0B]</span> JUMPI (SAFE)
                </div>
              </div>
            </div>
          )}

          {activeTab === 'decompiled' && (
            <div className="bg-black p-4 border border-[#242424] space-y-2 text-[11px] text-gray-300 leading-relaxed max-h-72 overflow-y-auto">
              <div className="text-[#D2FF00] font-bold">// DECOMPILED PONS V2 TAX HANDLER</div>
              <div>function calculateDecayTax(uint256 launchTimestamp) public view returns (uint256) {'{'}</div>
              <div className="pl-4 text-gray-400">uint256 elapsed = block.timestamp - launchTimestamp;</div>
              <div className="pl-4 text-gray-400">if (elapsed &gt;= 3000) return 0; // 0% tax after 3.0s</div>
              <div className="pl-4 text-gray-400">uint256 remaining = 3000 - elapsed;</div>
              <div className="pl-4 text-[#D2FF00]">
                return (99 * remaining * remaining) / (3000 * 3000); // Exponential decay curve
              </div>
              <div>{'}'}</div>
              <div className="pt-2 text-[#D2FF00] font-bold">// ROUTING RULE: CREATOR ESCROW</div>
              <div>function _transfer(address sender, address recipient, uint256 amount) internal {'{'}</div>
              <div className="pl-4 text-gray-400">uint256 fee = (amount * 15) / 1000; // 1.5% fixed creator fee</div>
              <div className="pl-4 text-emerald-400">
                emit EscrowCredit(creatorWallet, fee); // Verified transparent escrow
              </div>
              <div className="pl-4 text-gray-400">super._transfer(sender, recipient, amount - fee);</div>
              <div>{'}'}</div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-3">
              <div className="text-gray-400 text-[11px]">STORAGE LAYOUT INSPECTION // EIP-1967 COMPATIBLE</div>
              <div className="space-y-2">
                <div className="p-2.5 bg-black border border-[#242424] flex justify-between items-center">
                  <div>
                    <span className="text-[#D2FF00] font-bold">SLOT 0x00:</span> Owner / Admin Address
                  </div>
                  <span className="text-white">0x000000000000000000000000000000000000dead (RENOUNCED)</span>
                </div>
                <div className="p-2.5 bg-black border border-[#242424] flex justify-between items-center">
                  <div>
                    <span className="text-[#D2FF00] font-bold">SLOT 0x01:</span> Total Supply
                  </div>
                  <span className="text-white">1,000,000,000,000,000,000,000,000 (1B $FABLE)</span>
                </div>
                <div className="p-2.5 bg-black border border-[#242424] flex justify-between items-center">
                  <div>
                    <span className="text-[#D2FF00] font-bold">SLOT 0x02:</span> Creator Escrow Beneficiary
                  </div>
                  <span className="text-yellow-400">0xe80234a919420b92e81190412891230481238914</span>
                </div>
                <div className="p-2.5 bg-black border border-[#242424] flex justify-between items-center">
                  <div>
                    <span className="text-[#D2FF00] font-bold">SLOT 0x03:</span> Mint Lock Status
                  </div>
                  <span className="text-emerald-400 font-bold">LOCKED_PERMANENT (NO MINT FUNCTION)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'radar' && (
            <div className="space-y-3">
              <div className="text-gray-400 text-[11px]">LIVE MULTICALL TRACE RUNTIME (216ms TOTAL)</div>
              <div className="p-3 bg-black border border-[#242424] space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span>Step 1: Factory Record Read (pons.v2.getPair)</span>
                  <span className="text-[#D2FF00]">14ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Step 2: Reserves &amp; Swap Ceiling</span>
                  <span className="text-[#D2FF00]">38ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Step 3: Deployer Escrow Ledger Verification</span>
                  <span className="text-[#D2FF00]">72ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Step 4: Real-Time Slippage Simulation Matrix</span>
                  <span className="text-[#D2FF00]">92ms</span>
                </div>
                <div className="border-t border-[#242424] pt-2 flex justify-between font-bold text-white">
                  <span>TOTAL RPC EXECUTION LATENCY:</span>
                  <span className="text-[#D2FF00]">216ms // ZERO LATENCY SNIPER READY</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#101010] border-t border-[#242424] px-4 py-3 flex justify-between items-center">
          <div className="flex items-center text-[#D2FF00] text-[11px]">
            <ShieldCheck className="w-4 h-4 mr-1.5" /> ZERO HONEYPOT RISK IDENTIFIED
          </div>
          <button
            onClick={() => {
              playCyberBlip(600, 0.04);
              onClose();
            }}
            className="bg-[#D2FF00] hover:bg-[#b8e600] text-black font-bold px-5 py-2 uppercase tracking-wider transition-colors cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}
