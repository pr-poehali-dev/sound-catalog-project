import Icon from '@/components/ui/icon';
import WaveVisualizer from '@/components/WaveVisualizer';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const FEATURES = [
  {
    icon: 'Waveform',
    fallback: 'Music',
    title: 'Живая визуализация',
    desc: 'Слушайте треки прямо в каталоге с анимированной визуализацией звука — ни один сервис не даст такого опыта прослушивания.',
    color: '#00f5a0',
  },
  {
    icon: 'Shield',
    fallback: 'Shield',
    title: 'Чистые лицензии',
    desc: 'Все треки проверены на авторские права. Получите документ сразу после оплаты — без задержек и юристов.',
    color: '#b060ff',
  },
  {
    icon: 'Zap',
    fallback: 'Zap',
    title: 'Мгновенная загрузка',
    desc: 'Оплата и загрузка за 30 секунд. Файлы доступны в WAV, MP3, AIFF — в максимальном качестве.',
    color: '#ffb020',
  },
  {
    icon: 'Users',
    fallback: 'Users',
    title: 'Сообщество авторов',
    desc: 'Более 800 независимых авторов загружают новые треки каждый день. Уникальный звук для любого проекта.',
    color: '#00c8ff',
  },
];

const TIMELINE = [
  { year: '2019', text: 'Основание платформы. Первые 100 треков от 10 авторов.' },
  { year: '2021', text: 'Запуск личных кабинетов. Партнёрская программа.' },
  { year: '2023', text: 'Интеграция с Adobe Premiere и Final Cut Pro.' },
  { year: '2024', text: 'ИИ-поиск по настроению и инструментам.' },
  { year: '2025', text: '12 000 треков, 800+ авторов, 50 000 клиентов.' },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-primary text-xs font-ibm tracking-widest uppercase mb-4">О платформе</div>
          <h1 className="font-unbounded font-black text-5xl md:text-6xl leading-[0.95] mb-6">
            МЫ ДЕЛАЕМ<br />
            <span className="neon-text">ЗВУК</span><br />
            ДОСТУПНЫМ
          </h1>
          <p className="font-ibm text-foreground/50 text-lg leading-relaxed mb-6">
            SOUNDRA — это маркетплейс стоковой музыки нового поколения.
            Мы убрали всё лишнее: сложные лицензии, непонятные условия,
            долгое ожидание. Только музыка и ваш проект.
          </p>
          <p className="font-ibm text-foreground/40 leading-relaxed">
            Наша миссия — дать авторам справедливое вознаграждение,
            а покупателям — прозрачные условия использования без скрытых платежей.
          </p>
        </div>

        {/* Animated visualizer block */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md glass neon-border rounded-2xl p-8">
            <div className="text-xs font-ibm text-foreground/30 uppercase tracking-widest mb-6">Live preview</div>
            <WaveVisualizer playing={true} barCount={48} height={80} />
            <div className="mt-6 flex justify-between items-center">
              <div>
                <div className="font-unbounded font-semibold text-sm">Stellar Drift</div>
                <div className="font-ibm text-xs text-foreground/40 mt-0.5">AmbientLab • 4:22</div>
              </div>
              <div className="font-unbounded text-primary text-lg font-bold">890 ₽</div>
            </div>
            <div className="mt-4 h-1 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-1/3 rounded-full bg-primary" style={{ boxShadow: '0 0 10px rgba(0,245,160,0.5)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-primary text-xs font-ibm tracking-widest uppercase mb-3">Почему SOUNDRA</div>
          <h2 className="font-unbounded font-bold text-3xl md:text-4xl">Принципы платформы</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="track-card glass rounded-2xl p-6 border border-transparent"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
              >
                <Icon name={f.icon} fallback={f.fallback} size={20} style={{ color: f.color }} />
              </div>
              <h3 className="font-unbounded font-semibold text-sm mb-2">{f.title}</h3>
              <p className="font-ibm text-sm text-foreground/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-primary text-xs font-ibm tracking-widest uppercase mb-3">История</div>
          <h2 className="font-unbounded font-bold text-3xl">Путь платформы</h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-6 items-start pl-4">
                <div className="relative flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="glass rounded-xl px-5 py-4 flex-1 border border-transparent track-card">
                  <div className="font-unbounded font-bold text-primary text-sm mb-1">{item.year}</div>
                  <div className="font-ibm text-sm text-foreground/60">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-8 text-center">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-ibm font-semibold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,245,160,0.4)] transition-all"
        >
          <Icon name="Music" size={18} />
          Перейти в каталог
        </button>
      </section>
    </div>
  );
}
