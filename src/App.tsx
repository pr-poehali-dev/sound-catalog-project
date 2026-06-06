import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import LicensesPage from '@/pages/LicensesPage';
import ContactsPage from '@/pages/ContactsPage';
import CabinetPage from '@/pages/CabinetPage';

type Page = 'home' | 'about' | 'licenses' | 'contacts' | 'cabinet';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  const navigate = (page: string) => {
    setActivePage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'about': return <AboutPage onNavigate={navigate} />;
      case 'licenses': return <LicensesPage onNavigate={navigate} />;
      case 'contacts': return <ContactsPage />;
      case 'cabinet': return <CabinetPage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar activePage={activePage} onNavigate={navigate} />
        <main>{renderPage()}</main>
        {activePage !== 'cabinet' && <Footer onNavigate={navigate} />}
      </div>
    </TooltipProvider>
  );
}
