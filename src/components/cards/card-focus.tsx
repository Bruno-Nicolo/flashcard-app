import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Flashcard } from "./flashcard";
import type { Card } from "@/types/types";
import { cn } from "@/lib/utils";

interface CardFocusProps {
  cards: Card[];
  onScoreCard?: (cardId: string, score: 1 | 2 | 3 | 4 | 5) => void;
}

const scoreLabels = [
  {
    score: 1,
    label: "Forgot",
    color: "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/30",
  },
  {
    score: 2,
    label: "Hard",
    color:
      "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-orange-500/30",
  },
  {
    score: 3,
    label: "Medium",
    color:
      "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/30",
  },
  {
    score: 4,
    label: "Easy",
    color:
      "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/30",
  },
  {
    score: 5,
    label: "Perfect",
    color:
      "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/30",
  },
] as const;

export function CardFocus({ cards, onScoreCard }: CardFocusProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (cards.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="mt-4 text-2xl font-semibold text-balance">
          All caught up!
        </h2>
        <p className="mt-2 text-muted-foreground text-pretty">
          You have no cards to review right now.
        </p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < cards.length - 1;

  const goToPrev = () => {
    if (hasPrev) setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (hasNext) setCurrentIndex(currentIndex + 1);
  };

  const handleScore = (score: 1 | 2 | 3 | 4 | 5) => {
    onScoreCard?.(currentCard.id, score);
    if (hasNext) {
      goToNext();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Progress indicator */}
      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Card{" "}
          <span className="tabular-nums font-medium text-foreground">
            {currentIndex + 1}
          </span>{" "}
          of{" "}
          <span className="tabular-nums font-medium text-foreground">
            {cards.length}
          </span>
        </span>
        <div className="flex h-1.5 w-32 overflow-hidden rounded-full bg-muted">
          <div
            className="bg-primary transition-all duration-200"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-2xl">
          <Flashcard
            title={currentCard.title}
            content={currentCard.content}
            className="shadow-lg"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 space-y-4">
        {/* Score buttons */}
        <div className="flex justify-center gap-2">
          {scoreLabels.map(({ score, label, color }) => (
            <button
              key={score}
              type="button"
              onClick={() => handleScore(score)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                color,
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrev}
            disabled={!hasPrev}
            aria-label="Previous card"
          >
            <ArrowLeft className="mr-1 size-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            disabled={!hasNext}
            aria-label="Next card"
          >
            Next
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
