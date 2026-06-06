import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CONTACTS = [
  { icon: 'Mail', label: 'Email', value: 'hello@soundra.ru', color: '#00f5a0' },
  { icon: 'MessageCircle', label: 'Telegram', value: '@soundra_support', color: '#00c8ff' },
  { icon: 'Phone', label: 'Телефон', value: '+7 (800) 555-00-00', color: '#b060ff' },
];

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="text-primary text-xs font-ibm tracking-widest uppercase mb-4">Контакты</div>
        <h1 className="font-unbounded font-black text-5xl md:text-6xl leading-[0.95] mb-6">
          ДАВАЙТЕ<br />
          <span className="neon-text">ПОГОВОРИМ</span>
        </h1>
        <p className="font-ibm text-lg text-foreground/50 max-w-md mx-auto">
          Остались вопросы? Напишите нам — отвечаем в течение одного рабочего дня.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="glass rounded-2xl p-8 border border-white/5">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Icon name="Check" size={28} className="text-primary" />
              </div>
              <h3 className="font-unbounded font-bold text-xl">Сообщение отправлено!</h3>
              <p className="font-ibm text-sm text-foreground/50">Мы свяжемся с вами в ближайшее время.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 font-ibm text-sm text-primary hover:underline"
              >
                Отправить ещё
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-unbounded font-bold text-xl mb-6">Написать нам</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-ibm text-xs text-foreground/40 uppercase tracking-widest block mb-2">Имя</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Ваше имя"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-ibm text-xs text-foreground/40 uppercase tracking-widest block mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="email@domain.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-ibm text-xs text-foreground/40 uppercase tracking-widest block mb-2">Тема</label>
                <select
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                >
                  <option value="" disabled className="bg-background">Выберите тему</option>
                  <option value="license" className="bg-background">Вопрос по лицензии</option>
                  <option value="tech" className="bg-background">Техническая поддержка</option>
                  <option value="author" className="bg-background">Стать автором</option>
                  <option value="corp" className="bg-background">Корпоративный запрос</option>
                  <option value="other" className="bg-background">Другое</option>
                </select>
              </div>

              <div>
                <label className="font-ibm text-xs text-foreground/40 uppercase tracking-widest block mb-2">Сообщение</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Опишите ваш вопрос..."
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-ibm text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/40 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-ibm font-semibold py-3.5 rounded-xl hover:shadow-[0_0_25px_rgba(0,245,160,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={16} />
                Отправить сообщение
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          {/* Contacts */}
          <div className="space-y-4">
            {CONTACTS.map((c) => (
              <div key={c.label} className="glass rounded-xl px-5 py-4 flex items-center gap-4 border border-white/5 track-card">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}
                >
                  <Icon name={c.icon} size={18} style={{ color: c.color }} />
                </div>
                <div>
                  <div className="font-ibm text-xs text-foreground/30 uppercase tracking-wider">{c.label}</div>
                  <div className="font-ibm font-medium text-sm mt-0.5">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Hours */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h3 className="font-unbounded font-semibold text-sm mb-4 flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-primary" />
              Время работы поддержки
            </h3>
            <div className="space-y-2">
              {[
                { days: 'Пн — Пт', hours: '10:00 — 20:00' },
                { days: 'Сб — Вс', hours: '12:00 — 18:00' },
              ].map(row => (
                <div key={row.days} className="flex justify-between font-ibm text-sm">
                  <span className="text-foreground/40">{row.days}</span>
                  <span className="text-foreground/70">{row.hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-ibm text-xs text-foreground/40">Сейчас онлайн</span>
            </div>
          </div>

          {/* Authors CTA */}
          <div className="relative overflow-hidden rounded-2xl p-6 border border-accent/20 bg-accent/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl" />
            <h3 className="font-unbounded font-bold text-sm mb-2">Вы автор музыки?</h3>
            <p className="font-ibm text-sm text-foreground/50 mb-4">
              Загружайте треки и зарабатывайте. Авторы получают до 70% от каждой продажи.
            </p>
            <button className="font-ibm text-sm font-medium text-accent flex items-center gap-1 hover:gap-2 transition-all">
              Стать автором <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
