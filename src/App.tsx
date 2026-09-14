import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import BinaryRainCanvas from './components/BinaryRainCanvas';
import TopTicker from './components/TopTicker';
import Header from './components/Header';
import StatsRibbon from './components/StatsRibbon';
import CyberConsole from './components/CyberConsole';
import TacticalSpecs from './components/TacticalSpecs';
import DiagnosticSensors from './components/DiagnosticSensors';
import MatrixTelemetry from './components/MatrixTelemetry';
import NeuralSignalChart from './components/NeuralSignalChart';
import SecurityAccessModal from './components/SecurityAccessModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'console' | 'specs' | 'diagnostics' | 'telemetry' | 'signals'>('console');
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [terminalAudioEnabled, setTerminalAudioEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D2FF00] selection:text-black relative flex flex-col font-sans">
      {/* ВОТ ЗДЕСЬ СТОИТ КУРСОР: */}
      <CustomCursor />

      {/* Background Matrix Rain (Zero Impact, 60fps canvas) */}
      <BinaryRainCanvas />

      {/* Global Soundscape / Audio Synthesizer */}
      <TopTicker />

      {/* Main Tactical Header */}
      <Header 
        onOpenAccess={() => setIsAccessModalOpen(true)}
        audioEnabled={terminalAudioEnabled}
        onToggleAudio={() => setTerminalAudioEnabled(!terminalAudioEnabled)}
      />

      {/* Real-time Telemetry Stats Ribbon */}
      <StatsRibbon />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6 relative z-10">
        {/* Navigation / Mode Switcher */}
        <div className="flex items-center justify-between border-b border-[#222] pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 max-w-full">
            {[
              { id: 'console', label: 'CYBER CONSOLE' },
              { id: 'specs', label: 'TACTICAL SPECS' },
              { id: 'diagnostics', label: 'CORE SENSORS' },
              { id: 'telemetry', label: 'MATRIX TELEMETRY' },
              { id: 'signals', label: 'NEURAL SIGNALS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 sm:px-4 py-1.5 text-xs font-mono tracking-wider transition-all duration-150 border ${
                  activeTab === tab.id
                    ? 'bg-[#D2FF00] text-black border-[#D2FF00] font-bold shadow-[0_0_12px_rgba(210,255,0,0.3)]'
                    : 'bg-black/60 text-zinc-400 border-[#222] hover:text-white hover:border-zinc-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-right font-mono text-[11px] text-zinc-500 hidden sm:block">
            SECURITY_LEVEL: <span className="text-[#D2FF00]">OMEGA-9</span>
          </div>
        </div>

        {/* Dynamic Panels */}
        <div className="flex-1 min-h-[500px]">
          {activeTab === 'console' && <CyberConsole soundEnabled={terminalAudioEnabled} />}
          {activeTab === 'specs' && <TacticalSpecs />}
          {activeTab === 'diagnostics' && <DiagnosticSensors />}
          {activeTab === 'telemetry' && <MatrixTelemetry />}
          {activeTab === 'signals' && <NeuralSignalChart />}
        </div>
      </main>

      {/* Security Access Terminal Modal */}
      {isAccessModalOpen && (
        <SecurityAccessModal onClose={() => setIsAccessModalOpen(false)} />
      )}

      {/* Tactical Footer */}
      <footer className="border-t border-[#1a1a1a] bg-black/80 backdrop-blur-md py-3 px-6 text-center text-xs font-mono text-zinc-500 z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-pulse"></span>
          <span>SYSTEM RUNTIME: OPTIMAL</span>
        </div>
        <div>CLASSIFIED INTERFACE &bull; AUTHORIZED PERSONNEL ONLY</div>
        <div className="text-zinc-600">v4.19.0-AI-CORE</div>
      </footer>
    </div>
  );
}
