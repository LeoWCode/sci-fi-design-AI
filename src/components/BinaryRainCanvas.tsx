import { useEffect, useRef } from 'react';

interface BinaryRainCanvasProps {
  paused?: boolean;
}

export default function BinaryRainCanvas({ paused = false }: BinaryRainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 14;
    const columnSpacing = 58;
    const trailLength = 10;
    let cols = Math.floor(width / columnSpacing);

    interface Stream {
      x: number;
      y: number;
      speed: number;
      trail: Array<{ char: string; y: number }>;
      nextCharTick: number;
      changeInterval: number;
    }

    let streams: Stream[] = [];

    function createStream(colIndex: number, initialY?: number): Stream {
      return {
        x: colIndex * columnSpacing + columnSpacing / 2,
        y: initialY !== undefined ? initialY : Math.random() * -height,
        speed: 0.35 + Math.random() * 0.4,
        trail: [],
        nextCharTick: 0,
        changeInterval: 14 + Math.floor(Math.random() * 16),
      };
    }

    function initStreams() {
      cols = Math.floor(width / columnSpacing);
      streams = [];
      for (let i = 0; i < cols; i++) {
        streams.push(createStream(i, Math.random() * height * 1.5 - height * 0.5));
      }
    }

    initStreams();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStreams();
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let lastFrameTime = performance.now();

    function render(currentTime: number) {
      if (!canvas || !ctx) return;
      const delta = Math.min((currentTime - lastFrameTime) / 1000, 0.1);
      lastFrameTime = currentTime;

      if (!paused) {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';

        for (let i = 0; i < streams.length; i++) {
          const s = streams[i];
          s.y += s.speed * (delta * 60);

          s.nextCharTick++;
          if (s.nextCharTick >= s.changeInterval) {
            s.nextCharTick = 0;
            const newChar = Math.random() > 0.5 ? '1' : '0';
            s.trail.unshift({
              char: newChar,
              y: s.y,
            });
            if (s.trail.length > trailLength) {
              s.trail.pop();
            }
          }

          // Draw trail
          for (let t = 0; t < s.trail.length; t++) {
            const tr = s.trail[t];
            const progress = (trailLength - t) / trailLength;
            const alpha = 0.15 + progress * 0.55;

            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(210, 255, 0, 0.5)';
            ctx.fillStyle = `rgba(210, 255, 0, ${alpha.toFixed(2)})`;
            ctx.fillText(tr.char, s.x, tr.y);
          }

          // Draw head character
          const headChar =
            s.nextCharTick % 4 === 0
              ? Math.random() > 0.5
                ? '1'
                : '0'
              : s.trail[0]
                ? s.trail[0].char
                : '1';

          ctx.shadowBlur = 12;
          ctx.shadowColor = '#D2FF00';
          ctx.fillStyle = '#F4FF80';
          ctx.fillText(headChar, s.x, s.y);

          ctx.shadowBlur = 0;

          if (s.y > height + 80 && Math.random() > 0.985) {
            s.y = Math.random() * -120 - 40;
            s.speed = 0.35 + Math.random() * 0.4;
            s.trail = [];
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      id="binary-rain-canvas"
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}
