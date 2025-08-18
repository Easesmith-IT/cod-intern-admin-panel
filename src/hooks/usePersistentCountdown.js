"use client";

import { useEffect, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";

export function usePersistentCountdown({
  expiryKey = "countdownExpiry",
  durationInSeconds = 6 * 24 * 60 * 60, // 6 days
} = {}) {
  const intervalRef = useRef(null);

  const createNewExpiry = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + durationInSeconds);
    localStorage.setItem(expiryKey, time.toISOString());
    return time;
  };

  const getExpiryTime = () => {
    const stored = localStorage.getItem(expiryKey);
    const expiry = stored ? new Date(stored) : createNewExpiry();

    if (expiry.getTime() < Date.now()) {
      return createNewExpiry();
    }

    return expiry;
  };

  const { seconds, minutes, hours, days, restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: true,
  });

  useEffect(() => {
    const expiry = getExpiryTime();
    restart(expiry);

    intervalRef.current = setInterval(() => {
      const newExpiry = createNewExpiry();
      restart(newExpiry);
    }, durationInSeconds * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [restart]);

  const format = (n) => String(n).padStart(2, "0");

  return {
    days: format(days),
    hours: format(hours),
    minutes: format(minutes),
    seconds: format(seconds),
  };
}
