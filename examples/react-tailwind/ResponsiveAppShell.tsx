"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type ShellDestination = {
  href: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
};

/**
 * Responsive navigation presentation. Pass only destinations the caller's
 * existing authorization-aware navigation model allows. This component does
 * not provide access control.
 */
export function ResponsiveAppShell({
  brand,
  context,
  account,
  primary,
  secondary = [],
  children,
}: {
  brand: ReactNode;
  context?: ReactNode;
  account?: ReactNode;
  primary: ShellDestination[];
  secondary?: ShellDestination[];
  children: ReactNode;
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreDialog = useRef<HTMLDialogElement>(null);
  const mobileMore = [...primary.slice(4), ...secondary];
  const moreActive = mobileMore.some((item) => item.active);

  useEffect(() => {
    const dialog = moreDialog.current;
    if (!dialog) return;
    if (moreOpen && !dialog.open) dialog.showModal();
    if (!moreOpen && dialog.open) dialog.close();
  }, [moreOpen]);

  return (
    <div className="flex min-h-dvh min-w-0 flex-col lg:flex-row">
      <aside className="hidden h-dvh w-64 shrink-0 flex-col border-r bg-background p-4 lg:flex">
        <div className="mb-6">{brand}</div>
        {context && <div className="mb-5">{context}</div>}
        <nav aria-label="Main navigation" className="flex flex-col gap-1">
          {[...primary, ...secondary].map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`flex min-h-12 items-center gap-3 rounded-lg px-3 text-base hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${item.active ? "bg-muted font-medium text-foreground" : "text-muted-foreground"}`}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        {account && <div className="mt-auto border-t pt-4">{account}</div>}
      </aside>

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur lg:hidden">
          <div className="flex min-h-14 min-w-0 items-center justify-between gap-3 px-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="shrink-0">{brand}</div>
              {context && <div className="min-w-0 truncate">{context}</div>}
            </div>
            {account}
          </div>
        </header>

        <main className="mx-auto w-full min-w-0 max-w-7xl flex-1 px-4 py-5 pb-[calc(4.75rem+env(safe-area-inset-bottom))] sm:px-6 lg:pb-6">
          {children}
        </main>
      </div>

      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-2 pt-1 pb-[max(.5rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden"
      >
        <div className="mx-auto flex max-w-lg items-stretch justify-around gap-1">
          {primary.slice(0, 4).map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${item.active ? "bg-muted font-medium text-foreground" : "text-muted-foreground"}`}
            >
              <span aria-hidden="true" className="text-lg leading-none">{item.icon}</span>
              <span className="max-w-full truncate">{item.label}</span>
            </a>
          ))}
          {mobileMore.length > 0 && (
            <button
              type="button"
              onClick={() => setMoreOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={moreOpen}
              className={`flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${moreActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground"}`}
            >
              <span aria-hidden="true" className="text-lg leading-none">···</span>
              <span>More</span>
            </button>
          )}
        </div>
      </nav>

      <dialog
        ref={moreDialog}
        aria-labelledby="mobile-more-title"
        onClose={() => setMoreOpen(false)}
        className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] w-full max-w-none rounded-t-2xl border bg-background p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] text-foreground backdrop:bg-black/50 sm:inset-x-1/2 sm:bottom-auto sm:top-1/2 sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id="mobile-more-title" className="text-lg font-semibold">More</h2>
          <button type="button" autoFocus onClick={() => moreDialog.current?.close()} className="min-h-11 min-w-11 rounded-md focus-visible:outline focus-visible:outline-2">
            <span aria-hidden="true">×</span><span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="More destinations" className="grid max-h-[65dvh] gap-1 overflow-y-auto">
          {mobileMore.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`flex min-h-12 items-center gap-3 rounded-lg px-3 text-base hover:bg-muted focus-visible:outline focus-visible:outline-2 ${item.active ? "bg-muted font-medium text-foreground" : "text-muted-foreground"}`}
            >
              <span aria-hidden="true">{item.icon}</span><span>{item.label}</span>
            </a>
          ))}
        </nav>
      </dialog>
    </div>
  );
}
