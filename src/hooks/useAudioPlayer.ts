import { useState, useRef, useEffect, useCallback } from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  bpm: number;
  price: number;
  tags: string[];
  src: string;
}

interface AudioPlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  loading: boolean;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    loading: false,
  });

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.8;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setState(s => ({
        ...s,
        currentTime: audio.currentTime,
        progress: audio.duration ? (audio.currentTime / audio.duration) * 100 : 0,
      }));
    };
    const onLoadedMetadata = () => {
      setState(s => ({ ...s, duration: audio.duration, loading: false }));
    };
    const onEnded = () => {
      setState(s => ({ ...s, isPlaying: false, progress: 0, currentTime: 0 }));
    };
    const onWaiting = () => setState(s => ({ ...s, loading: true }));
    const onCanPlay = () => setState(s => ({ ...s, loading: false }));

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  const play = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.currentTrack?.id === track.id) {
      if (state.isPlaying) {
        audio.pause();
        setState(s => ({ ...s, isPlaying: false }));
      } else {
        audio.play();
        setState(s => ({ ...s, isPlaying: true }));
      }
      return;
    }

    audio.pause();
    audio.src = track.src;
    audio.load();
    setState(s => ({ ...s, currentTrack: track, loading: true, progress: 0, currentTime: 0 }));
    audio.play().then(() => {
      setState(s => ({ ...s, isPlaying: true }));
    }).catch(() => {
      setState(s => ({ ...s, isPlaying: false, loading: false }));
    });
  }, [state.currentTrack, state.isPlaying]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState(s => ({ ...s, isPlaying: false }));
  }, []);

  const seek = useCallback((percent: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (percent / 100) * audio.duration;
    setState(s => ({ ...s, progress: percent }));
  }, []);

  const setVolume = useCallback((vol: number) => {
    if (audioRef.current) audioRef.current.volume = vol;
    setState(s => ({ ...s, volume: vol }));
  }, []);

  const close = useCallback(() => {
    audioRef.current?.pause();
    setState({ currentTrack: null, isPlaying: false, progress: 0, currentTime: 0, duration: 0, volume: 0.8, loading: false });
  }, []);

  return { ...state, play, pause, seek, setVolume, close };
}
