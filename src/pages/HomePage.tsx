import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import WaveVisualizer from '@/components/WaveVisualizer';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const GENRES = ['Все', 'Ambient', 'Electronic', 'Cinematic', 'Jazz', 'Hip-Hop', 'Acoustic'];

const TRACKS = [
  { id: 1, title: 'Neon Horizon', artist: 'SYNTHWAVE_X', genre: 'Electronic', duration: '3:42', bpm: 128, price: 990, tags: ['энергичный', 'футуристик'] },
  { id: 2, title: 'Deep Forest', artist: 'AmbientLab', genre: 'Ambient', duration: '5:15', bpm: 75, price: 790, tags: ['спокойный', 'природа'] },
  { id: 3, title: 'City Lights', artist: 'JazzFusion', genre: 'Jazz', duration: '4:08', bpm: 110, price: 1190, tags: ['ночной', 'атмосфера'] },
  { id: 4, title: 'Epic Rising', artist: 'CINEMA_PRO', genre: 'Cinematic', duration: '2:58', bpm: 95, price: 1490, tags: ['эпик', 'динамика'] },
  { id: 5, title: 'Lo-Fi Rain', artist: 'ChillBeats', genre: 'Hip-Hop', duration: '3:20', bpm: 85, price: 690, tags: ['расслабляющий', 'дождь'] },
  { id: 6, title: 'Morning Dew', artist: 'AcousticSoul', genre: 'Acoustic', duration: '4:33', bpm: 68, price: 890, tags: ['утро', 'живой'] },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [activeGenre, setActiveGenre] = useState('Все');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const filtered = activeGenre === 'Все' ? TRACKS : TRACKS.filter(t => t.genre === activeGenre);

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center hero-grid overflow-hidden pt-16">
        {/* Ambient blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,245,160,0.3), transparent)',
            animation: 'scan-line 8s linear infinite',
            top: 0,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-ibm font-medium tracking-widest uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Платформа стоковой музыки
            </div>

            <h1 className="font-unbounded font-black text-5xl md:text-7xl leading-[0.95] mb-6">
              <span className="block text-foreground">ЗВУК</span>
              <span className="block neon-text">КОТОРЫЙ</span>
              <span className="block text-foreground">ПРОДАЁТ</span>
            </h1>

            <p className="font-ibm text-lg text-foreground/50 leading-relaxed mb-10 max-w-md">
              Тысячи треков и звуковых эффектов для ваших проектов.
              Простое лицензирование, мгновенная загрузка.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group flex items-center justify-center gap-3 bg-primary text-primary-foreground font-ibm font-semibold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,245,160,0.4)] transition-all duration-300 hover:scale-[1.02]"
                onClick={() => {}}
              >
                <Icon name="Play" size={18} />
                Слушать каталог
              </button>
              <button
                className="flex items-center justify-center gap-2 neon-border text-foreground/70 hover:text-primary font-ibm font-medium px-8 py-4 rounded-xl transition-all duration-300 bg-primary/5 hover:bg-primary/10"
                onClick={() => onNavigate('licenses')}
              >
                <Icon name="FileText" size={18} />
                Лицензии
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-14 pt-10 border-t border-white/5">
              {[
                { val: '12 000+', label: 'треков' },
                { val: '800+', label: 'авторов' },
                { val: '98%', label: 'клиентов довольны' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-unbounded font-bold text-2xl text-primary">{s.val}</div>
                  <div className="font-ibm text-xs text-foreground/40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Big circle with waveform */}
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: '0s' }} />
              <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: '0.7s' }} />
              <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: '1.4s' }} />

              {/* Outer ring */}
              <div className="absolute inset-4 rounded-full border border-white/5" />
              {/* Inner circle */}
              <div className="absolute inset-12 rounded-full bg-card neon-border flex flex-col items-center justify-center gap-3">
                <button
                  onClick={() => setPlayingId(playingId ? null : 1)}
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,245,160,0.5)] group"
                >
                  <Icon
                    name={playingId ? 'Pause' : 'Play'}
                    size={24}
                    className="text-primary-foreground ml-1 group-hover:scale-110 transition-transform"
                  />
                </button>
                <span className="font-unbounded text-xs text-foreground/40 tracking-wider">
                  {playingId ? 'PLAYING' : 'PREVIEW'}
                </span>
              </div>

              {/* Orbiting waveform */}
              <div className="absolute inset-0 flex items-center justify-center">
                <WaveVisualizer
                  playing={!!playingId}
                  barCount={40}
                  height={60}
                  className="opacity-70"
                />
              </div>
            </div>

            {/* Floating tags */}
            {['Ambient', 'Electronic', 'Cinematic'].map((tag, i) => (
              <div
                key={tag}
                className="absolute glass rounded-full px-3 py-1.5 text-xs font-ibm text-foreground/60 border border-white/5 animate-float"
                style={{
                  top: `${[10, 60, 80][i]}%`,
                  left: `${[85, 5, 75][i]}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${6 + i * 1.5}s`,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-primary text-xs font-ibm tracking-widest uppercase mb-3">Каталог</div>
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl">Популярные треки</h2>
          </div>

          {/* Genre filter */}
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGenre(g)}
                className={`font-ibm text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${
                  activeGenre === g
                    ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,245,160,0.3)]'
                    : 'glass text-foreground/50 hover:text-foreground hover:border-primary/20'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks grid */}
        <div className="space-y-2">
          {filtered.map((track, idx) => (
            <div
              key={track.id}
              className="track-card glass rounded-xl px-5 py-4 flex items-center gap-4 group cursor-pointer border border-transparent"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Number / Play */}
              <div className="w-8 text-center flex-shrink-0">
                <span className="font-unbounded text-xs text-foreground/20 group-hover:hidden">{String(idx + 1).padStart(2, '0')}</span>
                <button
                  onClick={() => setPlayingId(playingId === track.id ? null : track.id)}
                  className="hidden group-hover:flex w-8 h-8 rounded-full bg-primary/10 border border-primary/30 items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Icon name={playingId === track.id ? 'Pause' : 'Play'} size={14} className="text-primary ml-0.5" />
                </button>
              </div>

              {/* Waveform mini */}
              <div className="flex-shrink-0">
                <WaveVisualizer
                  playing={playingId === track.id}
                  barCount={20}
                  height={32}
                  color={playingId === track.id ? '#00f5a0' : '#ffffff'}
                  className="wave-visualizer opacity-30 group-hover:opacity-70 transition-opacity"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-unbounded font-semibold text-sm truncate">{track.title}</div>
                <div className="font-ibm text-xs text-foreground/40 mt-0.5">{track.artist}</div>
              </div>

              {/* Tags */}
              <div className="hidden lg:flex items-center gap-2">
                {track.tags.map(tag => (
                  <span key={tag} className="font-ibm text-xs px-2 py-0.5 rounded-full bg-white/5 text-foreground/40">{tag}</span>
                ))}
              </div>

              {/* Meta */}
              <div className="hidden md:flex items-center gap-6 text-xs font-ibm text-foreground/30 flex-shrink-0">
                <span>{track.bpm} BPM</span>
                <span>{track.duration}</span>
              </div>

              {/* Price + Buy */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="font-unbounded font-semibold text-sm text-primary">{track.price} ₽</span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity font-ibm text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:shadow-[0_0_15px_rgba(0,245,160,0.3)]">
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="neon-border font-ibm font-medium text-sm px-8 py-3 rounded-xl text-foreground/60 hover:text-primary transition-colors bg-primary/5 hover:bg-primary/10">
            Загрузить ещё
          </button>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl neon-border bg-card p-12 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-primary/10 blur-3xl pointer-events-none" />
          <div className="text-xs font-ibm text-primary tracking-widest uppercase mb-4">Личный кабинет</div>
          <h2 className="font-unbounded font-bold text-3xl md:text-4xl mb-4">Управляй своими лицензиями</h2>
          <p className="font-ibm text-foreground/50 mb-8 max-w-md mx-auto">
            Все купленные треки, история заказов и документы — в одном месте
          </p>
          <button
            onClick={() => onNavigate('cabinet')}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-ibm font-semibold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,245,160,0.4)] transition-all"
          >
            <Icon name="User" size={18} />
            Открыть кабинет
          </button>
        </div>
      </section>
    </div>
  );
}
