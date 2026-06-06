import { useEffect, useRef } from 'react';

interface WaveVisualizerProps {
  playing?: boolean;
  barCount?: number;
  color?: string;
  height?: number;
  className?: string;
}

export default function WaveVisualizer({
  playing = false,
  barCount = 32,
  color = '#00f5a0',
  height = 48,
  className = '',
}: WaveVisualizerProps) {
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div
      className={`flex items-end gap-[2px] ${className}`}
      style={{ height: `${height}px` }}
    >
      {bars.map((i) => {
        const baseH = 20 + Math.sin(i * 0.8) * 30 + Math.cos(i * 0.4) * 20;
        const delay = (i * 0.05) % 1.2;
        return (
          <div
            key={i}
            className={playing ? 'wave-bar' : ''}
            style={{
              width: '3px',
              borderRadius: '2px',
              background: playing ? color : `${color}55`,
              height: playing ? `${baseH}%` : `${10 + (i % 5) * 8}%`,
              minHeight: '4px',
              transformOrigin: 'bottom',
              animationDelay: playing ? `${delay}s` : undefined,
              animationDuration: playing ? `${0.8 + (i % 4) * 0.15}s` : undefined,
              transition: 'height 0.3s ease',
            }}
          />
        );
      })}
    </div>
  );
}
