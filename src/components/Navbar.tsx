import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О платформе' },
  { id: 'licenses', label: 'Лицензии' },
  { id: 'contacts', label: 'Контакты' },
];

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="font-unbounded font-black text-xl tracking-wider flex items-center gap-2 group"
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border border-primary/50 group-hover:border-primary transition-colors" />
            <div className="absolute inset-1 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors" />
            <div className="absolute inset-[5px] rounded-full bg-primary group-hover:shadow-[0_0_10px_rgba(0,245,160,0.8)] transition-all" />
          </div>
          <span className="neon-text">SOUNDRA</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link font-ibm text-sm font-medium transition-colors ${
                activePage === item.id
                  ? 'text-primary active'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate('cabinet')}
            className="font-ibm text-sm text-foreground/60 hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/5"
          >
            Войти
          </button>
          <button
            onClick={() => onNavigate('cabinet')}
            className="font-ibm text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(0,245,160,0.3)]"
          >
            Начать
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-foreground/60 hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
              className={`text-left font-ibm text-sm py-2 transition-colors ${
                activePage === item.id ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-white/5 pt-3 flex gap-3">
            <button
              onClick={() => { onNavigate('cabinet'); setMenuOpen(false); }}
              className="font-ibm text-sm text-foreground/60 hover:text-primary transition-colors"
            >
              Войти
            </button>
            <button
              onClick={() => { onNavigate('cabinet'); setMenuOpen(false); }}
              className="font-ibm text-sm font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-lg"
            >
              Начать
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
