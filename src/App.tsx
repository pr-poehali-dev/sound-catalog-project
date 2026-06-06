import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AudioPlayerBar from '@/components/AudioPlayerBar';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import LicensesPage from '@/pages/LicensesPage';
import ContactsPage from '@/pages/ContactsPage';
import CabinetPage from '@/pages/CabinetPage';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Track } from '@/hooks/useAudioPlayer';

type Page = 'home' | 'about' | 'licenses' | 'contacts' | 'cabinet';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const player = useAudioPlayer();

  const navigate = (page: string) => {
    setActivePage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlay = (track: Track) => {
    player.play(track);
  };

  const handlePlayPause = () => {
    if (player.isPlaying) {
      player.pause();
    } else if (player.currentTrack) {
      player.play(player.currentTrack);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage onNavigate={navigate} onPlay={handlePlay} currentTrackId={player.currentTrack?.id ?? null} isPlaying={player.isPlaying} />;
      case 'about': return <AboutPage onNavigate={navigate} />;
      case 'licenses': return <LicensesPage onNavigate={navigate} />;
      case 'contacts': return <ContactsPage />;
      case 'cabinet': return <CabinetPage onPlay={handlePlay} currentTrackId={player.currentTrack?.id ?? null} isPlaying={player.isPlaying} />;
      default: return <HomePage onNavigate={navigate} onPlay={handlePlay} currentTrackId={player.currentTrack?.id ?? null} isPlaying={player.isPlaying} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div
        className="min-h-screen bg-background text-foreground"
        style={{ paddingBottom: player.currentTrack ? '64px' : 0 }}
      >
        <Navbar activePage={activePage} onNavigate={navigate} />
        <main>{renderPage()}</main>
        {activePage !== 'cabinet' && <Footer onNavigate={navigate} />}
      </div>
      <AudioPlayerBar
        track={player.currentTrack}
        isPlaying={player.isPlaying}
        progress={player.progress}
        currentTime={player.currentTime}
        duration={player.duration}
        volume={player.volume}
        loading={player.loading}
        onPlayPause={handlePlayPause}
        onSeek={player.seek}
        onVolumeChange={player.setVolume}
        onClose={player.close}
      />
    </TooltipProvider>
  );
}
