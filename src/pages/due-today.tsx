import { useState } from "react";
import { ListBullets, Target } from "@phosphor-icons/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardFocus } from "@/components/cards/card-focus";
import { CardTable } from "@/components/cards/card-table";
import { CardPreviewDialog } from "@/components/cards/card-preview-dialog";
import { getDueCards } from "@/data/mock-data";
import type { Card, DueTodayViewMode } from "@/types/types";

export function DueToday() {
  const [viewMode, setViewMode] = useState<DueTodayViewMode>("focus");
  const [previewCard, setPreviewCard] = useState<Card | null>(null);
  const dueCards = getDueCards();

  const handleScoreCard = (cardId: string, score: 1 | 2 | 3 | 4 | 5) => {
    // TODO: Update card score and calculate next due date when backend is ready
    console.log(`Card ${cardId} scored: ${score}`);
  };

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-balance">Due Today</h1>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            {dueCards.length === 0
              ? "No cards due for review"
              : `${dueCards.length} card${dueCards.length === 1 ? "" : "s"} waiting for review`}
          </p>
        </div>

        <Tabs
          value={viewMode}
          onValueChange={(v) => setViewMode(v as DueTodayViewMode)}
        >
          <TabsList>
            <TabsTrigger value="focus" className="gap-1.5">
              <Target className="size-4" />
              Focus
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-1.5">
              <ListBullets className="size-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-auto">
        {viewMode === "focus" ? (
          <CardFocus cards={dueCards} onScoreCard={handleScoreCard} />
        ) : (
          <CardTable cards={dueCards} onPreview={setPreviewCard} />
        )}
      </div>

      <CardPreviewDialog
        card={previewCard}
        onClose={() => setPreviewCard(null)}
      />
    </div>
  );
}
