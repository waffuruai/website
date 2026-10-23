import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Unmount rendered trees between tests (no vitest globals, so not automatic).
afterEach(() => cleanup());

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn() }),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

vi.mock('server-only', () => ({}));
