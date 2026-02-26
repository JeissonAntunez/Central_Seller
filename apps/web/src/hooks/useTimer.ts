import { useState, useEffect, useRef } from "react";

interface UseTimerProps {
  duration: number;
  active: boolean;
  onExpire: () => void;
}

export function useTimer({ duration, active, onExpire }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  // Reset when question changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, active]);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [active, duration]);

  return {
    timeLeft,
    percentage: (timeLeft / duration) * 100,
    isUrgent: timeLeft <= 10 && timeLeft > 0,
    isDone: timeLeft === 0,
  };
}