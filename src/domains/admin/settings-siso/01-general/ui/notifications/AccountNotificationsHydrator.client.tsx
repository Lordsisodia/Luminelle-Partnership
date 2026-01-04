"use client";

import { Suspense, lazy } from "react";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";

const LazyAccountNotificationsBoard = lazy(() =>
  import("./AccountNotificationsBoard.client").then((mod) => ({ default: mod.AccountNotificationsBoard })),
);

export function AccountNotificationsHydrator() {
  const { ref, hydrated } = useHydrateOnView<HTMLDivElement>({ rootMargin: "200px 0px" });

  return (
    <div ref={ref} aria-live="polite">
      {hydrated ? (
        <Suspense fallback={<NotificationsFallback />}>
          <LazyAccountNotificationsBoard />
        </Suspense>
      ) : (
        <NotificationsFallback />
      )}
    </div>
  );
}

function NotificationsFallback() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
      Loading notification preferences…
    </div>
  );
}
