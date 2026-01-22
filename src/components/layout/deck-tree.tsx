import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CaretRight, Folder, FolderOpen } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { mockDecks, getCardsCountForDeck } from "@/data/mock-data";
import type { Deck } from "@/types/types";

interface DeckWithChildren extends Deck {
  children: DeckWithChildren[];
}

function buildDeckTree(parentId: string | null = null): DeckWithChildren[] {
  return mockDecks
    .filter((d) => d.parentId === parentId)
    .map((deck) => ({
      ...deck,
      children: buildDeckTree(deck.id),
    }));
}

export function DeckTree() {
  const rootDecks = buildDeckTree(null);

  return (
    <div className="space-y-0.5">
      {rootDecks.map((deck) => (
        <DeckItem key={deck.id} deck={deck} level={0} />
      ))}
    </div>
  );
}

interface DeckItemProps {
  deck: DeckWithChildren;
  level: number;
}

function DeckItem({ deck, level }: DeckItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = deck.children.length > 0;
  const cardsCount = getCardsCountForDeck(deck.id);

  return (
    <div>
      <div
        className="flex items-center"
        style={{ paddingLeft: `${level * 12}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex size-6 items-center justify-center rounded hover:bg-sidebar-accent"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <CaretRight
              className={cn(
                "size-3.5 text-sidebar-foreground/60 transition-transform duration-150",
                isExpanded && "rotate-90",
              )}
            />
          </button>
        ) : (
          <span className="size-6" />
        )}

        <NavLink
          to={`/deck/${deck.id}`}
          className={({ isActive }) =>
            cn(
              "flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
            )
          }
        >
          {({ isActive }) => (
            <>
              {isExpanded || isActive ? (
                <FolderOpen
                  weight="duotone"
                  className="size-4 text-sidebar-primary"
                />
              ) : (
                <Folder
                  weight="duotone"
                  className="size-4 text-sidebar-primary"
                />
              )}
              <span className="flex-1 truncate">{deck.name}</span>
              <span className="tabular-nums text-xs text-sidebar-foreground/50">
                {cardsCount}
              </span>
            </>
          )}
        </NavLink>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {deck.children.map((child) => (
            <DeckItem key={child.id} deck={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
