'use client';

import { ThemeProvider } from 'next-themes';

/**
 * Client-side providers. Theme: dark roast by default, with light and system
 * options; next-themes writes `.light` / `.dark` on <html> before paint.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="waffuru-theme"
    >
      {children}
    </ThemeProvider>
  );
}
