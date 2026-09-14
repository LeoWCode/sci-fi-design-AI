import { playCyberBlip } from '../utils/sound';

export default function Footer() {
  const scrollToSection = (id: string) => {
    playCyberBlip(800, 0.04);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="border-t border-[#242424] bg-[#0a0a0a] font-mono text-xs mt-16 relative z-10"
      data-purpose="site-footer"
    >
      {/* Cyber Brutalist Caution Hazard Stripes Bar with Smooth Diagonal Scrolling */}
      <div className="w-full h-8 hazard-stripes border-b border-[#242424] shadow-[0_0_15px_rgba(210,255,0,0.35)]"></div>

      <div className="max-w-[1720px] mx-auto px-4 lg:px-8 py-12 space-y-12">
        {/* Central Access Banner */}
        <div className="text-center py-4 border-y border-[#242424] hover:bg-[rgba(210,255,0,0.15)] transition-colors duration-200 select-none cursor-default">
          <span className="text-[#D2FF00] font-black tracking-[0.4em] text-sm uppercase drop-shadow-[0_0_8px_rgba(210,255,0,0.6)]">
            &gt; ACCESS GRANTED // MEMPOOL LISTENER ONLINE_
          </span>
        </div>

        {/* Links and Node Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Identity & Copyright */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-[#D2FF00] shadow-[0_0_8px_rgba(210,255,0,0.8)]"></span>
              <span className="font-black text-white text-base">DIVE_TERMINAL</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              The sniper terminal for Robinhood Pons v2. Read the chain, not the hype.
            </p>
            <div className="text-[10px] text-gray-500">
              © 2026 DIVE ARCHITECTURE.
              <br />
              ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <div className="text-[#D2FF00] font-bold uppercase text-[11px] drop-shadow-[0_0_5px_rgba(210,255,0,0.5)]">
              NAVIGATION
            </div>
            <ul className="space-y-1.5 text-gray-400">
              <li>
                <button
                  onClick={() => scrollToSection('terminal')}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150 cursor-pointer"
                >
                  Live Terminal
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('decay-mechanics')}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150 cursor-pointer"
                >
                  Tax Decay Math
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('multicall')}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150 cursor-pointer"
                >
                  Scorecards
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('cli-setup')}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150 cursor-pointer"
                >
                  Local CLI Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('token')}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150 cursor-pointer"
                >
                  $DIVE Token
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-2">
            <div className="text-[#D2FF00] font-bold uppercase text-[11px] drop-shadow-[0_0_5px_rgba(210,255,0,0.5)]">
              RESOURCES
            </div>
            <ul className="space-y-1.5 text-gray-400">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    playCyberBlip(750, 0.03);
                  }}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150"
                >
                  Pons v2 Factory Spec
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    playCyberBlip(750, 0.03);
                  }}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150"
                >
                  Decay Curve Formula
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    playCyberBlip(750, 0.03);
                  }}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150"
                >
                  Multicall Hex ABI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    playCyberBlip(750, 0.03);
                  }}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    playCyberBlip(750, 0.03);
                  }}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150"
                >
                  GitHub Repo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Community */}
          <div className="space-y-2">
            <div className="text-[#D2FF00] font-bold uppercase text-[11px] drop-shadow-[0_0_5px_rgba(210,255,0,0.5)]">
              SOCIALS // MESH
            </div>
            <ul className="space-y-1.5 text-gray-400">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    playCyberBlip(750, 0.03);
                  }}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    playCyberBlip(750, 0.03);
                  }}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150"
                >
                  Telegram Signal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    playCyberBlip(750, 0.03);
                  }}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150"
                >
                  Discord Terminal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    playCyberBlip(750, 0.03);
                  }}
                  className="hover:text-[#D2FF00] hover:translate-x-1 inline-block transition-transform duration-150"
                >
                  GitHub Source
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Global RPC Nodes */}
          <div className="space-y-2">
            <div className="text-[#D2FF00] font-bold uppercase text-[11px] drop-shadow-[0_0_5px_rgba(210,255,0,0.5)]">
              GLOBAL NODES
            </div>
            <div className="space-y-2 text-[11px] text-gray-400">
              <div className="flex justify-between border-b border-[#242424] pb-1 hover:text-white transition-colors">
                <span>LON (London):</span>
                <span className="text-[#D2FF00] font-bold">12ms - ACTIVE</span>
              </div>
              <div className="flex justify-between border-b border-[#242424] pb-1 hover:text-white transition-colors">
                <span>NY (New York):</span>
                <span className="text-[#D2FF00] font-bold">22ms - ACTIVE</span>
              </div>
              <div className="flex justify-between border-b border-[#242424] pb-1 hover:text-white transition-colors">
                <span>TYO (Tokyo):</span>
                <span className="text-[#D2FF00] font-bold">78ms - ACTIVE</span>
              </div>
              <div className="flex justify-between pb-1 hover:text-white transition-colors">
                <span>BER (Berlin):</span>
                <span className="text-[#D2FF00] font-bold">16ms - ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer (from IMAGE_2) */}
        <div className="pt-8 border-t border-[#242424] text-[10px] text-gray-600 text-center leading-relaxed">
          MIT - READ-ONLY HERE. THE TRADING ENGINE RUNS ON YOUR MACHINE. ONE CONTRACT, EVERY OTHER
          ADDRESS WITH THIS NAME IS NOT OURS.
        </div>
      </div>
    </footer>
  );
}
