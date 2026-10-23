'use client';

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDictionary } from '@/i18n/dictionary-provider';
import { trackEvent } from '@/lib/analytics';

const OPTIONS = [
  { value: 'dark', Icon: MoonIcon },
  { value: 'light', Icon: SunIcon },
  { value: 'system', Icon: MonitorIcon },
] as const;

/** Dark / light / system switcher. Icons swap via CSS so SSR never flashes. */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();
  const { theme: t } = useDictionary();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={className}
          aria-label={t.label}
          title={t.label}
        >
          <MoonIcon className="light:hidden size-[18px]" aria-hidden />
          <SunIcon className="light:block hidden size-[18px]" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {OPTIONS.map(({ value, Icon }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => {
              setTheme(value);
              trackEvent({
                category: 'UI',
                action: 'theme_switch',
                label: value,
              });
            }}
          >
            <Icon className="size-4" aria-hidden />
            {t[value]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
