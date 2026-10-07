import React, { useEffect, useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { Volume2, VolumeX, RotateCcw, X, MapPin, Sparkles } from 'lucide-react';

export const RegionalSoundVisualizer: React.FC = () => {
  const { activeRegionalSound, stopRegionalSound, replayRegionalSound } = useJourney();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(6);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!activeRegionalSound) {
      setIsPlaying(false);
      setSecondsRemaining(6);
      return;
    }

    setIsPlaying(true);
    setSecondsRemaining(6);

    const interval = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [activeRegionalSound]);

  if (!activeRegionalSound) return null;

  const elapsed = 6 - secondsRemaining;
  const progressPercent = Math.min(100, (elapsed / 6) * 100);

  return (
    <div
      role="region"
      aria-label="Regional soundscape audio player"
      className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative rounded-2xl bg-[#090F1E]/95 border border-amber-400/40 p-4 shadow-2xl backdrop-blur-2xl text-slate-100 overflow-hidden ring-1 ring-amber-400/20">
        {/* Subtle animated ambient gold bar */}
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />

        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30">
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-amber-300' : 'text-slate-400'}`} />
            </span>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-amber-400 font-semibold">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>6-Second Regional Soundscape</span>
              </div>
              <h4 className="text-sm font-display font-bold text-white line-clamp-1">
                {activeRegionalSound.placeName}
                {activeRegionalSound.country && (
                  <span className="text-slate-400 font-normal text-xs ml-1">
                    · {activeRegionalSound.country}
                  </span>
                )}
              </h4>
            </div>
          </div>

          <button
            onClick={stopRegionalSound}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Dismiss soundscape"
            aria-label="Dismiss soundscape"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Visualizer Waves + Description */}
        <div className="space-y-2">
          <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
            <span className="font-semibold text-amber-200">{activeRegionalSound.title}:</span>{' '}
            {activeRegionalSound.description}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] font-mono text-slate-400">
            {/* Animated Equalizer Wave Bars */}
            <div className="flex items-end gap-1 h-4">
              {[40, 85, 60, 100, 75, 45, 90, 65, 30, 80, 50, 95].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isPlaying ? 'bg-amber-400' : 'bg-slate-600'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(20, Math.sin((elapsed + i) * 1.5) * 50 + 50)}%` : '20%',
                    opacity: isPlaying ? 0.9 : 0.4,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-amber-300 font-bold">
                {isPlaying ? `0:0${elapsed} / 0:06` : '0:06 Finished'}
              </span>

              <button
                onClick={replayRegionalSound}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-amber-400/20 text-slate-200 hover:text-amber-300 transition-colors text-[10px] flex items-center gap-1 font-sans font-medium"
                title="Replay 6-second regional soundscape"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Replay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
