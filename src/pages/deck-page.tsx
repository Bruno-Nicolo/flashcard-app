import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Plus,
  MagnifyingGlass,
  House,
  Folder,
  FolderPlus,
  Cards,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { CardTable } from "@/components/cards/card-table";
import { CardPreviewDialog } from "@/components/cards/card-preview-dialog";
import {
  getDeckById,
  getCardsByDeck,
  getSubDecks,
  getCardsCountForDeck,
} from "@/data/mock-data";
import type { Card, Deck } from "@/types/types";

export function DeckPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const [previewCard, setPreviewCard] = useState<Card | null>(null);

  const deck = deckId ? getDeckById(deckId) : undefined;
  const cards = deckId ? getCardsByDeck(deckId) : [];
  const subDecks = deckId ? getSubDecks(deckId) : [];

  if (!deck) return <EmptyDeckView />;

  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col px-6 py-6 lg:px-12">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-balance">{deck.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            {cards.length} card{cards.length !== 1 && "s"}
            {subDecks.length > 0 &&
              ` · ${subDecks.length} sub-deck${subDecks.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FolderPlus />
            New Sub-deck
          </Button>
          <Button>
            <Plus />
            Add Card
          </Button>
        </div>
      </div>

      {/* Sub-decks section */}
      {subDecks.length > 0 && <SubDecksSection subDecks={subDecks} />}

      {/* Cards section */}
      {cards.length > 0 ? (
        <div className="flex-1 overflow-auto border border-border">
          <CardTable cards={cards} onPreview={setPreviewCard} />
        </div>
      ) : (
        <EmptyCardsView />
      )}

      <CardPreviewDialog
        card={previewCard}
        onClose={() => setPreviewCard(null)}
      />
    </div>
  );
}

function SubDecksSection({ subDecks }: { subDecks: Deck[] }) {
  return (
    <div className="mb-6">
      <h2 className="mb-3 text-sm font-medium text-muted-foreground text-balance">
        Sub-decks
      </h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {subDecks.map((subDeck) => {
          const cardCount = getCardsCountForDeck(subDeck.id);
          return (
            <Link
              key={subDeck.id}
              to={`/deck/${subDeck.id}`}
              className="flex items-center gap-3 border border-border bg-card p-3 transition-colors hover:bg-muted"
            >
              <div className="flex size-9 items-center justify-center bg-muted">
                <Folder
                  className="size-5 text-muted-foreground"
                  weight="duotone"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{subDeck.name}</p>
                <p className="text-xs text-muted-foreground">
                  {cardCount} card{cardCount !== 1 && "s"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function EmptyCardsView() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-none border border-dashed border-border p-12 text-center animate-in fade-in-50">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <Cards className="size-8 text-muted-foreground" weight="duotone" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No cards yet</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs text-balance">
        This deck is empty. Create your first card to start learning.
      </p>
      <Button className="mt-6" variant="outline">
        <Plus className="mr-2 size-4" />
        Add First Card
      </Button>
    </div>
  );
}

function EmptyDeckView() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="flex max-w-sm flex-col items-center border border-border bg-card p-8 text-center shadow-sm">
        {/* Icon container */}
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <MagnifyingGlass
            className="size-8 text-muted-foreground"
            weight="duotone"
          />
        </div>

        {/* Text content */}
        <h2 className="mt-5 text-lg font-semibold text-balance">
          Deck not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          We couldn't find the deck you're looking for. It might have been
          deleted or the link is incorrect.
        </p>

        {/* Action */}
        <Link
          to="/due-today"
          className="mt-6 inline-flex h-8 items-center justify-center gap-2 rounded-none bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <House className="size-4" weight="duotone" />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
