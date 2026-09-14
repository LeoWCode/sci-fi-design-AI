import { X, ShieldAlert, ShieldCheck, ExternalLink, Activity } from 'lucide-react';
import { FeeRecipient } from '../types';
import { playCyberBlip } from '../utils/sound';

interface WalletDetailModalProps {
  wallet: FeeRecipient | null;
  onClose: () => void;
}

export default function WalletDetailModal({ wallet, onClose }: WalletDetailModalProps) {
  if (!wallet) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none"
      onClick={() => {
        playCyberBlip(600, 0.04);
        onClose();
      }}
    >
      <div
        className="w-full max-w-lg bg-[#0a0a0a] border-2 border-[#D2FF00] shadow-[0_0_40px_rgba(210,255,0,0.3)] font-mono text-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chrome Header */}
        <div className="bg-[#101010] border-b border-[#242424] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={`w-2.5 h-2.5 block radar-pulse ${
                wallet.statusColor === 'red'
                  ? 'bg-red-500'
                  : wallet.statusColor === 'emerald'
                    ? 'bg-emerald-400'
                    : 'bg-[#D2FF00]'
              }`}
            ></span>
            <span className="font-bold text-white tracking-wider">
              WALLET FORENSICS // {wallet.wallet}
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
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-black border border-[#242424]">
              <span className="text-[10px] text-gray-500 uppercase block">TOTAL CLAIMED</span>
              <span className="text-base font-bold text-[#D2FF00]">{wallet.claimedEth}</span>
              <div className="text-[9px] text-gray-400">Est. Vol: {wallet.totalVolume}</div>
            </div>
            <div className="p-3 bg-black border border-[#242424]">
              <span className="text-[10px] text-gray-500 uppercase block">GRADUATION RATE</span>
              <span className="text-base font-bold text-white">
                {wallet.graduated} / {wallet.launches} (
                {Math.round((wallet.graduated / wallet.launches) * 100)}%)
              </span>
              <div className="text-[9px] text-[#D2FF00]">Bonding curve reach</div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <span className="text-[10px] text-gray-400 block mb-1">AUTOMATED FORENSIC TAGS:</span>
            <div className="flex flex-wrap gap-1.5">
              {wallet.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#101010] border border-[#D2FF00]/40 text-[#D2FF00] px-2 py-0.5 text-[10px] font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Forensic Notes */}
          <div className="p-3 bg-black border border-[#242424] space-y-1">
            <div className="text-gray-400 text-[10px] uppercase font-bold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[#D2FF00]" /> ON-CHAIN AUDIT LOG:
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">{wallet.flaggedNotes}</p>
          </div>

          {/* Safety Evaluation */}
          <div className="p-3 border border-[#242424] bg-[#101010] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {wallet.statusColor === 'emerald' || wallet.statusColor === 'gray' ? (
                <ShieldCheck className="w-5 h-5 text-[#D2FF00]" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-red-500" />
              )}
              <div>
                <div className="text-white font-bold text-xs">
                  {wallet.deployedSelf === 'yes - burned'
                    ? 'BURNED ESCROW (0% DEV FEE RETENTION)'
                    : wallet.launches > 5
                      ? 'SERIAL DEPLOYER ACTIVE MONITORING'
                      : 'STANDARD CREATOR ESCROW POOL'}
                </div>
                <div className="text-[10px] text-gray-400">
                  Last observed block: {wallet.lastSeen}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playCyberBlip(600, 0.04);
              onClose();
            }}
            className="w-full bg-[#D2FF00] hover:bg-[#b8e600] text-black font-bold py-2.5 uppercase tracking-wider text-xs cursor-pointer"
          >
            CLOSE FORENSICS ↗
          </button>
        </div>
      </div>
    </div>
  );
}
