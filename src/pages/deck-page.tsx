import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { CardTable } from "@/components/cards/card-table";
import { CardPreviewDialog } from "@/components/cards/card-preview-dialog";
import { getDeckById, getCardsByDeck } from "@/data/mock-data";
import type { Card } from "@/types/types";

export function DeckPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const [previewCard, setPreviewCard] = useState<Card | null>(null);

  const deck = deckId ? getDeckById(deckId) : undefined;
  const cards = deckId ? getCardsByDeck(deckId) : [];

  if (!deck) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl">🔍</div>
        <h2 className="mt-4 text-xl font-semibold text-balance">
          Deck not found
        </h2>
        <p className="mt-2 text-muted-foreground text-pretty">
          The deck you're looking for doesn't exist.
        </p>
        <Link
          to="/due-today"
          className="mt-4 inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Go to Due Today
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/due-today"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-balance">{deck.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">
              {cards.length} card{cards.length !== 1 && "s"} in this deck
            </p>
          </div>
          <Button className="gap-1.5">
            <Plus className="size-4" />
            Add Card
          </Button>
        </div>
      </div>

      {/* Cards table */}
      <div className="flex-1 overflow-auto rounded-lg border border-border">
        <CardTable cards={cards} onPreview={setPreviewCard} />
      </div>

      <CardPreviewDialog
        card={previewCard}
        onClose={() => setPreviewCard(null)}
      />
    </div>
  );
}
