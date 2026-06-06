import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface LicensesPageProps {
  onNavigate: (page: string) => void;
}

const LICENSES = [
  {
    id: 'basic',
    name: 'Базовая',
    emoji: '🎵',
    price: 'от 490 ₽',
    color: '#00c8ff',
    desc: 'Для небольших онлайн-проектов',
    features: [
      { text: 'YouTube, Instagram, TikTok', ok: true },
      { text: 'До 10 000 просмотров', ok: true },
      { text: 'Некоммерческое использование', ok: true },
      { text: 'Коммерческое использование', ok: false },
      { text: 'Телевидение и кино', ok: false },
      { text: 'Неограниченные просмотры', ok: false },
    ],
  },
  {
    id: 'standard',
    name: 'Стандарт',
    emoji: '🚀',
    price: 'от 990 ₽',
    color: '#00f5a0',
    desc: 'Для бизнеса и коммерческих проектов',
    popular: true,
    features: [
      { text: 'YouTube, Instagram, TikTok', ok: true },
      { text: 'Неограниченные просмотры', ok: true },
      { text: 'Некоммерческое использование', ok: true },
      { text: 'Коммерческое использование', ok: true },
      { text: 'Телевидение и кино', ok: false },
      { text: 'Перепродажа трека', ok: false },
    ],
  },
  {
    id: 'pro',
    name: 'Про',
    emoji: '💎',
    price: 'от 2 490 ₽',
    color: '#b060ff',
    desc: 'Для крупных проектов и брендов',
    features: [
      { text: 'YouTube, Instagram, TikTok', ok: true },
      { text: 'Неограниченные просмотры', ok: true },
      { text: 'Некоммерческое использование', ok: true },
      { text: 'Коммерческое использование', ok: true },
      { text: 'Телевидение и кино', ok: true },
      { text: 'Радио и стриминг', ok: true },
    ],
  },
];

const FAQ = [
  {
    q: 'Что значит «лицензия на музыку»?',
    a: 'Лицензия — это документ, дающий вам право использовать трек в конкретных целях. Без неё использование чужой музыки нарушает авторские права.',
  },
  {
    q: 'Как я получу документы после покупки?',
    a: 'Сразу после оплаты в личный кабинет приходит PDF с лицензионным соглашением. Его можно скачать в любой момент.',
  },
  {
    q: 'Можно ли использовать трек навсегда?',
    a: 'Да, лицензия выдаётся бессрочно. Вы один раз покупаете и используете трек столько, сколько нужно.',
  },
  {
    q: 'Что если YouTube заблокирует видео за музыку?',
    a: 'Все треки на платформе имеют чистый статус. Если возникнет претензия, мы помогаем урегулировать её — предоставим документы.',
  },
];

export default function LicensesPage({ onNavigate }: LicensesPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="text-primary text-xs font-ibm tracking-widest uppercase mb-4">Лицензирование</div>
        <h1 className="font-unbounded font-black text-5xl md:text-6xl leading-[0.95] mb-6">
          ПРОСТЫЕ<br />
          <span className="neon-text">ПРАВИЛА</span>
        </h1>
        <p className="font-ibm text-lg text-foreground/50 max-w-xl mx-auto">
          Никаких скрытых условий. Выберите подходящий тип лицензии и используйте музыку легально.
        </p>
      </section>

      {/* License cards */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LICENSES.map((lic) => (
            <div
              key={lic.id}
              className={`relative glass rounded-2xl p-6 border transition-all duration-300 cursor-pointer track-card ${
                selectedLicense === lic.id
                  ? 'border-primary/50'
                  : 'border-transparent'
              } ${lic.popular ? 'ring-1 ring-primary/30' : ''}`}
              onClick={() => setSelectedLicense(selectedLicense === lic.id ? null : lic.id)}
              style={selectedLicense === lic.id ? { boxShadow: `0 0 30px ${lic.color}20` } : {}}
            >
              {lic.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-ibm text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                  Популярный
                </div>
              )}

              <div className="text-4xl mb-4">{lic.emoji}</div>
              <h3 className="font-unbounded font-bold text-xl mb-1" style={{ color: lic.color }}>{lic.name}</h3>
              <p className="font-ibm text-xs text-foreground/40 mb-4">{lic.desc}</p>
              <div className="font-unbounded font-bold text-2xl mb-6">{lic.price}</div>

              <div className="space-y-3 mb-8">
                {lic.features.map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        f.ok ? '' : 'opacity-30'
                      }`}
                      style={{ background: f.ok ? `${lic.color}20` : 'transparent', border: `1px solid ${lic.color}40` }}
                    >
                      <Icon
                        name={f.ok ? 'Check' : 'X'}
                        size={10}
                        style={{ color: f.ok ? lic.color : '#ffffff' }}
                      />
                    </div>
                    <span className={`font-ibm text-sm ${f.ok ? 'text-foreground/70' : 'text-foreground/25 line-through'}`}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); onNavigate('home'); }}
                className="w-full font-ibm font-semibold text-sm py-3 rounded-xl transition-all"
                style={{
                  background: `${lic.color}15`,
                  border: `1px solid ${lic.color}30`,
                  color: lic.color,
                }}
              >
                Выбрать лицензию
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Compare note */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="glass neon-border rounded-2xl p-6 flex gap-4 items-start">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-unbounded font-semibold text-sm mb-1">Нужна корпоративная лицензия?</div>
            <p className="font-ibm text-sm text-foreground/50">
              Для крупных рекламных кампаний, телевизионных проектов и эксклюзивных прав — свяжитесь с нами.
              Обсудим индивидуальные условия.
            </p>
            <button
              onClick={() => onNavigate('contacts')}
              className="mt-3 font-ibm text-sm text-primary hover:underline flex items-center gap-1"
            >
              Связаться <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="text-primary text-xs font-ibm tracking-widest uppercase mb-3">FAQ</div>
          <h2 className="font-unbounded font-bold text-3xl">Частые вопросы</h2>
        </div>

        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div
              key={i}
              className="glass rounded-xl overflow-hidden border border-transparent hover:border-white/5 transition-colors track-card"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-ibm font-medium text-sm">{item.q}</span>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`text-foreground/40 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 font-ibm text-sm text-foreground/50 leading-relaxed border-t border-white/5 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}