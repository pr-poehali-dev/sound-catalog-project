import { useState } from 'react';
import Icon from '@/components/ui/icon';
import WaveVisualizer from '@/components/WaveVisualizer';

const PURCHASES = [
  { id: 1, title: 'Neon Horizon', artist: 'SYNTHWAVE_X', license: 'Стандарт', date: '02.06.2025', price: 990, format: 'WAV' },
  { id: 2, title: 'Deep Forest', artist: 'AmbientLab', license: 'Базовая', date: '28.05.2025', price: 490, format: 'MP3' },
  { id: 3, title: 'City Lights', artist: 'JazzFusion', license: 'Про', date: '15.05.2025', price: 2490, format: 'WAV' },
];

const LICENSE_COLORS: Record<string, string> = {
  'Базовая': '#00c8ff',
  'Стандарт': '#00f5a0',
  'Про': '#b060ff',
};

type TabId = 'purchases' | 'licenses' | 'profile';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'purchases', label: 'Покупки', icon: 'ShoppingBag' },
  { id: 'licenses', label: 'Лицензии', icon: 'FileText' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
];

export default function CabinetPage() {
  const [tab, setTab] = useState<TabId>('purchases');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-16">
        <div className="glass neon-border rounded-2xl p-12 text-center max-w-md w-full mx-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Icon name="User" size={28} className="text-primary" />
          </div>
          <h2 className="font-unbounded font-bold text-2xl mb-2">Войти в кабинет</h2>
          <p className="font-ibm text-sm text-foreground/50 mb-8">Управляйте покупками и лицензиями</p>
          <button className="w-full bg-primary text-primary-foreground font-ibm font-semibold py-3.5 rounded-xl hover:shadow-[0_0_25px_rgba(0,245,160,0.3)] transition-all">
            Войти через Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between py-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="font-unbounded font-bold text-primary text-xl">АН</span>
            </div>
            <div>
              <h1 className="font-unbounded font-bold text-2xl">Алексей Новиков</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-ibm text-xs text-foreground/40">alexey@email.com</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="glass rounded-xl px-4 py-3 text-center border border-white/5">
              <div className="font-unbounded font-bold text-primary text-xl">{PURCHASES.length}</div>
              <div className="font-ibm text-xs text-foreground/30 mt-0.5">покупок</div>
            </div>
            <div className="glass rounded-xl px-4 py-3 text-center border border-white/5">
              <div className="font-unbounded font-bold text-accent text-xl">{PURCHASES.length}</div>
              <div className="font-ibm text-xs text-foreground/30 mt-0.5">лицензий</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 glass rounded-xl border border-white/5 mb-8 w-fit">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 font-ibm text-sm font-medium px-5 py-2.5 rounded-lg transition-all ${
                tab === t.id
                  ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,245,160,0.3)]'
                  : 'text-foreground/50 hover:text-foreground'
              }`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Purchases Tab */}
        {tab === 'purchases' && (
          <div className="space-y-3">
            <h2 className="font-unbounded font-semibold text-lg mb-6">История покупок</h2>
            {PURCHASES.map((p) => (
              <div
                key={p.id}
                className="track-card glass rounded-xl px-5 py-4 flex items-center gap-4 border border-transparent group"
              >
                {/* Play */}
                <button
                  onClick={() => setPlayingId(playingId === p.id ? null : p.id)}
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: playingId === p.id ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(0,245,160,0.2)',
                  }}
                >
                  <Icon
                    name={playingId === p.id ? 'Pause' : 'Play'}
                    size={14}
                    className={playingId === p.id ? 'text-primary-foreground ml-0.5' : 'text-primary ml-0.5'}
                  />
                </button>

                {/* Wave */}
                <WaveVisualizer
                  playing={playingId === p.id}
                  barCount={16}
                  height={28}
                  className="flex-shrink-0 opacity-40 group-hover:opacity-70 transition-opacity"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-unbounded font-semibold text-sm truncate">{p.title}</div>
                  <div className="font-ibm text-xs text-foreground/40 mt-0.5">{p.artist}</div>
                </div>

                {/* License badge */}
                <div
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-ibm font-medium flex-shrink-0"
                  style={{
                    background: `${LICENSE_COLORS[p.license]}15`,
                    border: `1px solid ${LICENSE_COLORS[p.license]}30`,
                    color: LICENSE_COLORS[p.license],
                  }}
                >
                  <Icon name="Shield" size={11} />
                  {p.license}
                </div>

                {/* Meta */}
                <div className="hidden md:flex flex-col items-end gap-0.5 flex-shrink-0 text-right">
                  <span className="font-ibm text-xs text-foreground/30">{p.date}</span>
                  <span className="font-unbounded font-semibold text-sm text-primary">{p.price} ₽</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="glass rounded-lg p-2 hover:border-primary/20 border border-transparent transition-colors" title="Скачать">
                    <Icon name="Download" size={15} className="text-foreground/50 hover:text-primary transition-colors" />
                  </button>
                  <button className="glass rounded-lg p-2 hover:border-primary/20 border border-transparent transition-colors" title="Лицензия">
                    <Icon name="FileText" size={15} className="text-foreground/50 hover:text-primary transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Licenses Tab */}
        {tab === 'licenses' && (
          <div>
            <h2 className="font-unbounded font-semibold text-lg mb-6">Мои лицензии</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PURCHASES.map((p) => (
                <div key={p.id} className="glass rounded-2xl p-5 border border-white/5 track-card">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="px-3 py-1 rounded-full text-xs font-ibm font-semibold"
                      style={{
                        background: `${LICENSE_COLORS[p.license]}15`,
                        color: LICENSE_COLORS[p.license],
                        border: `1px solid ${LICENSE_COLORS[p.license]}30`,
                      }}
                    >
                      {p.license}
                    </div>
                    <span className="font-ibm text-xs text-foreground/25">{p.date}</span>
                  </div>
                  <div className="font-unbounded font-bold text-base mb-0.5">{p.title}</div>
                  <div className="font-ibm text-xs text-foreground/40 mb-4">{p.artist}</div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="font-ibm text-xs text-foreground/30 uppercase tracking-wider">{p.format}</span>
                    <button
                      className="flex items-center gap-1.5 font-ibm text-xs text-primary hover:underline"
                    >
                      <Icon name="Download" size={13} />
                      Скачать PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {tab === 'profile' && (
          <div className="max-w-lg">
            <h2 className="font-unbounded font-semibold text-lg mb-6">Настройки профиля</h2>
            <div className="glass rounded-2xl p-6 border border-white/5 space-y-4">
              {[
                { label: 'Имя', value: 'Алексей Новиков', type: 'text' },
                { label: 'Email', value: 'alexey@email.com', type: 'email' },
                { label: 'Телефон', value: '+7 (999) 000-00-00', type: 'tel' },
              ].map(field => (
                <div key={field.label}>
                  <label className="font-ibm text-xs text-foreground/40 uppercase tracking-widest block mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
              ))}
              <button className="w-full bg-primary text-primary-foreground font-ibm font-semibold py-3 rounded-xl mt-2 hover:shadow-[0_0_20px_rgba(0,245,160,0.3)] transition-all">
                Сохранить изменения
              </button>
            </div>
            <button className="mt-4 font-ibm text-sm text-foreground/30 hover:text-destructive transition-colors flex items-center gap-2">
              <Icon name="LogOut" size={14} />
              Выйти из аккаунта
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
