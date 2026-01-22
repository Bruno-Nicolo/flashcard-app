import { useState, useMemo } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardTable } from "@/components/cards/card-table";
import { CardPreviewDialog } from "@/components/cards/card-preview-dialog";
import { getUpcomingCards, mockDecks } from "@/data/mock-data";
import type { Card, SortConfig } from "@/types/types";

export function NextDue() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeck, setSelectedDeck] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "nextDueDate",
    direction: "asc",
  });
  const [previewCard, setPreviewCard] = useState<Card | null>(null);

  const allCards = getUpcomingCards();

  const filteredAndSortedCards = useMemo(() => {
    let result = [...allCards];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (card) =>
          card.title.toLowerCase().includes(query) ||
          card.content.toLowerCase().includes(query),
      );
    }

    // Filter by deck
    if (selectedDeck !== "all") {
      result = result.filter((card) => card.deckId === selectedDeck);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.key) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "deck":
          comparison = a.deckId.localeCompare(b.deckId);
          break;
        case "nextDueDate":
        default:
          comparison = a.nextDueDate.getTime() - b.nextDueDate.getTime();
          break;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [allCards, searchQuery, selectedDeck, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Next Due</h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          All upcoming cards sorted by due date
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={selectedDeck}
          onValueChange={(value) => setSelectedDeck(value ?? "all")}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by deck" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Decks</SelectItem>
            {mockDecks.map((deck) => (
              <SelectItem key={deck.id} value={deck.id}>
                {deck.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="mb-2 text-sm text-muted-foreground">
        Showing{" "}
        <span className="tabular-nums font-medium text-foreground">
          {filteredAndSortedCards.length}
        </span>{" "}
        cards
      </p>

      {/* Table */}
      <div className="flex-1 overflow-auto rounded-lg border border-border">
        <CardTable
          cards={filteredAndSortedCards}
          sortConfig={sortConfig}
          onSort={handleSort}
          onPreview={setPreviewCard}
        />
      </div>

      <CardPreviewDialog
        card={previewCard}
        onClose={() => setPreviewCard(null)}
      />
    </div>
  );
}
