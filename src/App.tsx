import { useState } from 'react';
import BinaryRainCanvas from './components/BinaryRainCanvas';
import TopTicker from './components/TopTicker';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CorePrinciples from './components/CorePrinciples';
import DecayAndScorecard from './components/DecayAndScorecard';
import ExecutionAndTelemetry from './components/ExecutionAndTelemetry';
import SubscribeSection from './components/SubscribeSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

import HexInspectorModal from './components/HexInspectorModal';
import InteractiveTerminalModal from './components/InteractiveTerminalModal';
import BuyTokenModal from './components/BuyTokenModal';
import WalletDetailModal from './components/WalletDetailModal';
import { FeeRecipient } from './types';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isHexInspectorOpen, setIsHexInspectorOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<FeeRecipient | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D2FF00] selection:text-black relative flex flex-col font-sans">
      <CustomCursor />
      {/* Background Matrix Rain (Zero Impact, 60fps canvas) */}
      <BinaryRainCanvas />

      {/* Persistent Top System Status Ticker */}
      <TopTicker />

      {/* Navigation Header */}
      <Header
        onStartTerminal={() => setIsTerminalOpen(true)}
        onBuyToken={() => setIsBuyModalOpen(true)}
      />

      {/* Main Terminal Frame */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 lg:px-8 py-6 space-y-8 relative z-10">
        {/* /01 Hero Pre-flight Sniper Core */}
        <HeroSection
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenBuyModal={() => setIsBuyModalOpen(true)}
          onInspectHex={() => setIsHexInspectorOpen(true)}
        />

        {/* /02 Core Protocol Mechanics (5 Wireframe Pillars) */}
        <CorePrinciples />

        {/* /03 Live Decay Radar, Exit Door Math & Contract Scorecard */}
        <DecayAndScorecard
          onInspectHex={() => setIsHexInspectorOpen(true)}
          onSelectWallet={(w) => setSelectedWallet(w)}
        />

        {/* /04 & /05 Local CLI Engine & System Telemetry */}
        <ExecutionAndTelemetry
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenBuyModal={() => setIsBuyModalOpen(true)}
        />

        {/* /06 Signal Alerts Subscription */}
        <SubscribeSection />
      </main>

      {/* Footer with Hazard Stripes */}
      <Footer />

      {/* Modals */}
      <InteractiveTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <HexInspectorModal
        isOpen={isHexInspectorOpen}
        onClose={() => setIsHexInspectorOpen(false)}
      />

      <BuyTokenModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />

      <WalletDetailModal
        wallet={selectedWallet}
        onClose={() => setSelectedWallet(null)}
      />
    </div>
  );
}
