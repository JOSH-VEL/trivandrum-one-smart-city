import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Coins } from 'lucide-react';

interface RewardAnimationProps {
  coins: number;
  show: boolean;
  onComplete?: () => void;
}

export function RewardAnimation({ coins, show, onComplete }: RewardAnimationProps) {
  useEffect(() => {
    if (show) {
      try {
        // Fire confetti
        const duration = 2000;
        const end = Date.now() + duration;

        const frame = () => {
          try {
            confetti({
              particleCount: 3,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ['#00BFFF', '#1E90FF', '#FFD700'],
            });
            confetti({
              particleCount: 3,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ['#00BFFF', '#1E90FF', '#FFD700'],
            });
          } catch (err) {
            console.error('Confetti animation error:', err);
          }

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };

        frame();

        const timer = setTimeout(() => {
          if (onComplete) onComplete();
        }, duration);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error('RewardAnimation error:', err);
        if (onComplete) onComplete();
      }
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative animate-bounce-in">
        <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-50 animate-pulse" />
        <div className="relative bg-card p-12 rounded-3xl shadow-2xl text-center">
          <Coins className="w-24 h-24 mx-auto mb-4 text-accent animate-pulse" />
          <h2 className="text-4xl font-bold mb-2 text-gradient">
            +{coins} Coins!
          </h2>
          <p className="text-muted-foreground">Reward claimed successfully</p>
        </div>
      </div>
    </div>
  );
}
