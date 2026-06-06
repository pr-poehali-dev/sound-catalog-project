import { useRef } from 'react';
import Icon from '@/components/ui/icon';
import WaveVisualizer from '@/components/WaveVisualizer';

interface AudioPlayerBarProps {
  track: { title: string; artist: string } | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  loading: boolean;
  onPlayPause: () => void;
  onSeek: (percent: number) => void;
  onVolumeChange: (vol: number) => void;
  onClose: () => void;
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayerBar({
  track,
  isPlaying,
  progress,
  currentTime,
  duration,
  volume,
  loading,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onClose,
}: AudioPlayerBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  if (!track) return null;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    onSeek(Math.max(0, Math.min(100, percent)));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5"
      style={{ backdropFilter: 'blur(24px)' }}
    >
      {/* Progress bar — full width top edge */}
      <div
        ref={progressRef}
        className="absolute top-0 left-0 right-0 h-1 cursor-pointer group"
        onClick={handleProgressClick}
      >
        <div className="h-full bg-white/5" />
        <div
          className="absolute top-0 left-0 h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
            boxShadow: '0 0 8px rgba(0,245,160,0.5)',
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ left: `calc(${progress}% - 6px)`, boxShadow: '0 0 8px rgba(0,245,160,0.8)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4 md:gap-6">
        {/* Track info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <WaveVisualizer playing={isPlaying} barCount={6} height={18} className="scale-75" />
          </div>
          <div className="min-w-0">
            <div className="font-unbounded font-semibold text-xs truncate">{track.title}</div>
            <div className="font-ibm text-xs text-foreground/40 truncate">{track.artist}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="font-ibm text-xs text-foreground/30 hidden sm:block tabular-nums">
            {formatTime(currentTime)}
          </span>

          <button
            onClick={onPlayPause}
            disabled={loading}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:shadow-[0_0_20px_rgba(0,245,160,0.5)] transition-all hover:scale-105 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
            ) : (
              <Icon
                name={isPlaying ? 'Pause' : 'Play'}
                size={16}
                className={`text-primary-foreground ${!isPlaying ? 'ml-0.5' : ''}`}
              />
            )}
          </button>

          <span className="font-ibm text-xs text-foreground/30 hidden sm:block tabular-nums">
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <button onClick={() => onVolumeChange(volume > 0 ? 0 : 0.8)} className="text-foreground/40 hover:text-primary transition-colors">
            <Icon name={volume === 0 ? 'VolumeX' : volume < 0.5 ? 'Volume1' : 'Volume2'} size={16} />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={e => onVolumeChange(Number(e.target.value))}
            className="w-20 h-1 accent-primary cursor-pointer"
            style={{ accentColor: 'hsl(var(--primary))' }}
          />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="text-foreground/30 hover:text-foreground transition-colors flex-shrink-0"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
}
