
import { useState, useEffect, useRef } from 'react';

// --- STYLISH LIME-YELLOW SCI-FI CURSOR ---
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"]')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  useEffect(() => {
    let animationFrameId: number;
    const followCursor = () => {
      setTrailPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.25,
        y: prev.y + (pos.y - prev.y) * 0.25,
      }));
      animationFrameId = requestAnimationFrame(followCursor);
    };
    animationFrameId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Внешнее кольцо-радар */}
      <div
        className="absolute rounded-full border transition-all duration-75 ease-out flex items-center justify-center pointer-events-none"
        style={{
          left: `${trailPos.x}px`,
          top: `${trailPos.y}px`,
          width: isHovered ? '48px' : isClicked ? '24px' : '36px',
          height: isHovered ? '48px' : isClicked ? '24px' : '36px',
          transform: 'translate(-50%, -50%)',
          borderColor: isHovered ? '#d2ff00' : 'rgba(210, 255, 0, 0.5)',
          backgroundColor: isHovered ? 'rgba(210, 255, 0, 0.1)' : 'transparent',
          boxShadow: isHovered ? '0 0 16px rgba(210, 255, 0, 0.5)' : '0 0 6px rgba(210, 255, 0, 0.2)',
        }}
      />
      {/* Точка-прицел */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isClicked ? '8px' : isHovered ? '4px' : '6px',
          height: isClicked ? '8px' : isHovered ? '4px' : '6px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#d2ff00',
          boxShadow: '0 0 10px #d2ff00, 0 0 20px rgba(210, 255, 0, 0.8)',
        }}
      />
    </div>
  );
}

// --- MATRIX DIGITAL RAIN BACKGROUND ---
function BinaryRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const chars = '010101XYZΩλAI9';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#D2FF00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 z-0" />;
}

// --- MAIN APPLICATION ---
export default function App() {
  const [activeTab, setActiveTab] = useState<'console' | 'specs' | 'sensors'>('console');
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM BOOT]: Quantum Core v4.19 online.',
    '[STATUS]: All sensors calibrated. Latency: 0.8ms.',
    '[READY]: Type "help" or click execute to run diagnostics.',
  ]);
  const [inputCmd, setInputCmd] = useState('');

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCmd.trim()) return;

    const cmd = inputCmd.trim().toLowerCase();
    const newLogs = [...logs, `> ${inputCmd}`];

    if (cmd === 'help') {
      newLogs.push('AVAILABLE COMMANDS: help, ping, scan, clear, status');
    } else if (cmd === 'clear') {
      setLogs([]);
      setInputCmd('');
      return;
    } else if (cmd === 'ping') {
      newLogs.push('PONG: Latency 0.4ms to Neural Grid.');
    } else if (cmd === 'scan') {
      newLogs.push('SCAN COMPLETED: 0 anomalies, firewall 100% active.');
    } else if (cmd === 'status') {
      newLogs.push('STATUS: Security Omega-9 active. All systems nominal.');
    } else {
      newLogs.push(`UNKNOWN: "${inputCmd}". Type "help" for options.`);
    }

    setLogs(newLogs);
    setInputCmd('');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D2FF00] selection:text-black relative flex flex-col font-mono">
      {/* Желто-зеленый курсор */}
      <CustomCursor />

      {/* Матричный фон */}
      <BinaryRainCanvas />

      {/* Шапка */}
      <header className="border-b border-[#222] bg-black/80 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-[#D2FF00] flex items-center justify-center bg-[#D2FF00]/10 text-[#D2FF00] font-bold shadow-[0_0_12px_rgba(210,255,0,0.3)]">
            Ω
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              SCI-FI AI TERMINAL
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#D2FF00]/20 text-[#D2FF00] border border-[#D2FF00]/40">
                LIVE
              </span>
            </h1>
            <p className="text-xs text-zinc-500">AUTONOMOUS QUANTUM NODE</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-ping" />
          <span className="text-zinc-400">SYS_HEALTH: 100%</span>
        </div>
      </header>

      {/* Статистика */}
      <div className="border-b border-[#222] bg-[#090909] py-2 px-6 z-10 flex gap-6 overflow-x-auto text-xs text-zinc-400">
        <div>CPU: <span className="text-[#D2FF00] font-bold">4.8 GHz</span></div>
        <div>MEM: <span className="text-zinc-200">14.2 / 32 GB</span></div>
        <div>LATENCY: <span className="text-[#D2FF00] font-bold">0.8 ms</span></div>
        <div>SECURITY: <span className="text-[#D2FF00]">OMEGA-9</span></div>
      </div>

      {/* Контент */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-4 relative z-10">
        {/* Переключатели */}
        <div className="flex gap-2 border-b border-[#222] pb-3">
          {(['console', 'specs', 'sensors'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs rounded border transition-all ${
                activeTab === tab
                  ? 'bg-[#D2FF00] text-black font-bold border-[#D2FF00] shadow-[0_0_12px_rgba(210,255,0,0.35)]'
                  : 'bg-black/60 text-zinc-400 border-[#222] hover:text-white'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Терминал */}
        {activeTab === 'console' && (
          <div className="bg-black/75 border border-[#262626] rounded-lg p-4 flex-1 flex flex-col min-h-[420px] shadow-xl">
            <div className="flex-1 overflow-y-auto space-y-1 text-xs text-zinc-300">
              {logs.map((log, idx) => (
                <div key={idx} className={log.startsWith('>') ? 'text-[#D2FF00] font-bold' : ''}>
                  {log}
                </div>
              ))}
            </div>

            <form onSubmit={handleCommand} className="flex gap-2 border-t border-[#222] pt-3 mt-3">
              <span className="text-[#D2FF00] font-bold">&gt;</span>
              <input
                type="text"
                value={inputCmd}
                onChange={(e) => setInputCmd(e.target.value)}
                placeholder="Type 'help', 'ping', 'scan'..."
                className="flex-1 bg-transparent border-none outline-none text-[#D2FF00] text-xs placeholder:text-zinc-600"
              />
              <button
                type="submit"
                className="px-4 py-1 bg-[#D2FF00] text-black font-bold text-xs rounded hover:bg-[#bce600]"
              >
                RUN
              </button>
            </form>
          </div>
        )}

        {/* Характеристики */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { t: 'QUANTUM CORE', v: '16 Cores / 32 Threads @ Sub-Zero' },
              { t: 'NEURAL FLOPs', v: '124.6 TFLOPS Deep Learning Engine' },
              { t: 'FIREWALL ENCRYPTION', v: 'RSA-4096 Adaptive Quantum Shield' },
              { t: 'BANDWIDTH', v: '400 Gbps Optical Uplink to Grid' },
            ].map((item, i) => (
              <div key={i} className="border border-[#262626] bg-[#090909]/80 p-4 rounded-lg">
                <div className="text-xs text-[#D2FF00] mb-1 font-bold">{item.t}</div>
                <div className="text-xs text-zinc-300">{item.v}</div>
              </div>
            ))}
          </div>
        )}

        {/* Датчики */}
        {activeTab === 'sensors' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'THERMAL CORE', val: '42.1°C', bar: '45%' },
              { name: 'COOLING LIQUID', val: '18.4°C', bar: '70%' },
              { name: 'MAGNETIC FLUX', val: '0.04 T', bar: '30%' },
              { name: 'NEURAL FREQ', val: '44.1 kHz', bar: '85%' },
            ].map((sensor, i) => (
              <div key={i} className="border border-[#262626] bg-[#090909]/80 p-4 rounded-lg">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-zinc-400">{sensor.name}</span>
                  <span className="text-[#D2FF00] font-bold">{sensor.val}</span>
                </div>
                <div className="w-full bg-[#1e1e1e] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#D2FF00] h-full" style={{ width: sensor.bar }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Подвал */}
      <footer className="border-t border-[#1a1a1a] bg-black/90 py-3 px-6 text-center text-[11px] text-zinc-500 z-10 flex justify-between">
        <span>STATUS: ACTIVE</span>
        <span>CLASSIFIED TERMINAL</span>
      </footer>
    </div>
  );
}
