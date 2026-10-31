import type { ReactNode } from "react";

/** Render cards on phones and the equivalent semantic table at the breakpoint. */
export function ResponsiveCollection({
  cards,
  table,
  cardsUntil = "md",
}: {
  cards: ReactNode;
  table: ReactNode;
  cardsUntil?: "md" | "lg";
}) {
  const cardVisibility = cardsUntil === "lg" ? "lg:hidden" : "md:hidden";
  const tableVisibility = cardsUntil === "lg" ? "hidden lg:block" : "hidden md:block";

  return (
    <>
      <div className={`grid min-w-0 gap-3 ${cardVisibility}`}>{cards}</div>
      <div className={`min-w-0 ${tableVisibility}`}>{table}</div>
    </>
  );
}
