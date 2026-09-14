import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Не запускать на тач-экранах (смартфонах/планшетах)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Проверяем наведение на интерактивные элементы
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"], [data-cursor-hover]')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
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

  // Плавное следование внешнего кольца (lerp анимация)
  useEffect(() => {
    let animationFrameId: number;

    const followCursor = () => {
      setTrailPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.22,
          y: prev.y + dy * 0.22,
        };
      });
      animationFrameId = requestAnimationFrame(followCursor);
    };

    animationFrameId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Внешнее кольцо-радар (желто-лаймовый неон с эффектом прицела) */}
      <div
        className="absolute rounded-full border transition-transform duration-100 ease-out flex items-center justify-center pointer-events-none"
        style={{
          left: `${trailPos.x}px`,
          top: `${trailPos.y}px`,
          width: isHovered ? '48px' : isClicked ? '26px' : '36px',
          height: isHovered ? '48px' : isClicked ? '26px' : '36px',
          transform: 'translate(-50%, -50%)',
          borderColor: isHovered ? '#d2ff00' : 'rgba(210, 255, 0, 0.45)',
          backgroundColor: isHovered ? 'rgba(210, 255, 0, 0.08)' : 'transparent',
          boxShadow: isHovered
            ? '0 0 16px rgba(210, 255, 0, 0.4), inset 0 0 10px rgba(210, 255, 0, 0.2)'
            : '0 0 8px rgba(210, 255, 0, 0.2)',
        }}
      >
        {/* Пунктирный sci-fi прицел при наведении */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-full border border-dashed border-[#d2ff00]/60 animate-spin"
            style={{ animationDuration: '6s' }}
          />
        )}
      </div>

      {/* Центральная неоновая точка-прицел */}
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
