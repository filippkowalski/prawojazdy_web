'use client';

import { SmartAppBanner } from './smart-app-banner';
import { AppDownloadBottomSheet } from './app-download-bottom-sheet';
import { useEffect } from 'react';
import { detectPlatform } from '@/lib/platform-detection';

/**
 * Wrapper component that coordinates the smart app banner and bottom sheet
 * - Banner: Persistent at top (dismissible for 7 days)
 * - Bottom sheet: Shows once per week on site entry (Reddit-style)
 */
export function AppDownloadBannerWrapper() {
  useEffect(() => {
    // Debug logging for platform detection
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const info = detectPlatform();
      console.log('[AppDownloadBanner] Platform detection:', {
        platform: info.platform,
        browser: info.browser,
        isStandalone: info.isStandalone,
        shouldShowBanner: info.shouldShowBanner,
        userAgent: navigator.userAgent,
      });
    }
  }, []);

  return (
    <>
      <SmartAppBanner />
      <AppDownloadBottomSheet />
    </>
  );
}
