import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
    // Отключаем на мобильных экранах и тач-устройствах
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isMouseDown = false;
    let isVisible = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Проверяем, интерактивный ли элемент под курсором
      const target = e.target as HTMLElement | null;
      isHovered = Boolean(
        target && target.closest('button, a, input, textarea, select, [role="button"]')
      );
    };

    const onMouseDown = () => {
      isMouseDown = true;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    // БЛОКИРУЕМ ПЕРЕТАСКИВАНИЕ КАРТИНОК БРАУЗЕРОМ (чтобы курсор не зависал)
    const onDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Плавный цикл анимации (GPU transform)
    const animate = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (dotRef.current) {
        const dotScale = isMouseDown ? 1.3 : isHovered ? 0.7 : 1;
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        const ringScale = isMouseDown ? 0.75 : isHovered ? 1.45 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.borderColor = isHovered ? '#d2ff00' : 'rgba(210, 255, 0, 0.45)';
        ringRef.current.style.backgroundColor = isHovered ? 'rgba(210, 255, 0, 0.1)' : 'transparent';
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    window.addEventListener('dragstart', onDragStart); // <--- перехват drag
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('dragstart', onDragStart); // <--- удаление слушателя
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block">
      {/* Внешнее кольцо-радар с плавным шлейфом */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute top-0 left-0 w-9 h-9 rounded-full border border-[#d2ff00]/40 opacity-0 transition-opacity duration-150 will-change-transform"
        style={{
          boxShadow: '0 0 10px rgba(210, 255, 0, 0.25)',
        }}
      />

      {/* Центральная неоновая точка-прицел */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#d2ff00] opacity-0 transition-opacity duration-150 will-change-transform"
        style={{
          boxShadow: '0 0 8px #d2ff00, 0 0 16px rgba(210, 255, 0, 0.8)',
        }}
      />
    </div>
  );
}
