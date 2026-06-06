import Icon from '@/components/ui/icon';
import WaveVisualizer from '@/components/WaveVisualizer';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-white/5 bg-card/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="font-unbounded font-black text-2xl neon-text mb-3 block"
            >
              SOUNDRA
            </button>
            <p className="font-ibm text-sm text-foreground/40 leading-relaxed max-w-xs mb-4">
              Маркетплейс стоковой музыки нового поколения. Тысячи треков — одна платформа.
            </p>
            <WaveVisualizer playing={false} barCount={24} height={24} className="opacity-30" />
          </div>

          {/* Nav */}
          <div>
            <div className="font-ibm text-xs text-foreground/30 uppercase tracking-widest mb-4">Разделы</div>
            <div className="space-y-2">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'about', label: 'О платформе' },
                { id: 'licenses', label: 'Лицензии' },
                { id: 'contacts', label: 'Контакты' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="block font-ibm text-sm text-foreground/40 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="font-ibm text-xs text-foreground/30 uppercase tracking-widest mb-4">Контакты</div>
            <div className="space-y-2">
              <p className="font-ibm text-sm text-foreground/40">hello@soundra.ru</p>
              <p className="font-ibm text-sm text-foreground/40">@soundra_support</p>
              <div className="flex gap-3 mt-4">
                {[
                  { icon: 'Send', label: 'Telegram' },
                  { icon: 'Music', label: 'VK Music' },
                  { icon: 'Youtube', label: 'YouTube' },
                ].map(s => (
                  <button
                    key={s.label}
                    className="w-9 h-9 glass rounded-lg flex items-center justify-center border border-white/5 hover:border-primary/30 hover:text-primary transition-all text-foreground/40"
                    title={s.label}
                  >
                    <Icon name={s.icon} size={15} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-ibm text-xs text-foreground/20">© 2025 SOUNDRA. Все права защищены.</p>
          <div className="flex gap-6">
            {['Политика конфиденциальности', 'Условия использования'].map(link => (
              <button key={link} className="font-ibm text-xs text-foreground/20 hover:text-foreground/50 transition-colors">
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
