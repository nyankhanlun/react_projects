'use client';

import { useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { clientAuth } from '@/lib/firebase-client';


const AUTO_LOGOUT_MS = 0.5 * 60 * 1000; // 3 minutes

export function UseAutoLogout() {
    // console.log(AUTO_LOGOUT_MS)
  // const timerRef = useRef<NodeJS.Timeout | null>(null);

  // const resetTimer = () => {
  //   if (timerRef.current) clearTimeout(timerRef.current);

  //   timerRef.current = setTimeout(() => {
  //     signOut(clientAuth);
  //     console.log('User auto-logged out due to inactivity');
  //   }, AUTO_LOGOUT_MS);
  // };

  // useEffect(() => {
  //   const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];

  //   events.forEach((event) => window.addEventListener(event, resetTimer));
  //   resetTimer(); // start timer on mount

  //   return () => {
  //     events.forEach((event) => window.removeEventListener(event, resetTimer));
  //     if (timerRef.current) clearTimeout(timerRef.current);
  //   };
  // }, []);
}
