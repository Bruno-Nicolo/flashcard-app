import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown } from "@phosphor-icons/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getDeckById } from "@/data/mock-data";
import type { Card, SortConfig } from "@/types/types";

interface CardTableProps {
  cards: Card[];
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  onPreview?: (card: Card) => void;
}

export function CardTable({
  cards,
  sortConfig,
  onSort,
  onPreview,
}: CardTableProps) {
  const formatDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cardDate = new Date(date);
    cardDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (cardDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    if (diffDays < 7) return `In ${diffDays} days`;

    return cardDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDueStatus = (date: Date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (date < today) {
      const daysOverdue = Math.floor(
        (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (daysOverdue > 0) return "overdue";
    }
    return "upcoming";
  };

  const SortableHeader = ({
    column,
    children,
  }: {
    column: string;
    children: React.ReactNode;
  }) => {
    const isActive = sortConfig?.key === column;

    return (
      <button
        type="button"
        onClick={() => onSort?.(column)}
        className="flex items-center gap-1 hover:text-foreground"
      >
        {children}
        {isActive &&
          (sortConfig?.direction === "asc" ? (
            <ArrowUp className="size-3" />
          ) : (
            <ArrowDown className="size-3" />
          ))}
      </button>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">
            {onSort ? (
              <SortableHeader column="title">Title</SortableHeader>
            ) : (
              "Title"
            )}
          </TableHead>
          <TableHead>
            {onSort ? (
              <SortableHeader column="deck">Deck</SortableHeader>
            ) : (
              "Deck"
            )}
          </TableHead>
          <TableHead>
            {onSort ? (
              <SortableHeader column="nextDueDate">Due Date</SortableHeader>
            ) : (
              "Due Date"
            )}
          </TableHead>
          <TableHead>Last Score</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => {
          const deck = getDeckById(card.deckId);
          const status = getDueStatus(card.nextDueDate);

          return (
            <TableRow key={card.id}>
              <TableCell className="font-medium">
                <button
                  type="button"
                  onClick={() => onPreview?.(card)}
                  className="line-clamp-1 text-left hover:text-primary hover:underline"
                >
                  {card.title}
                </button>
              </TableCell>
              <TableCell>
                {deck && (
                  <Link
                    to={`/deck/${deck.id}`}
                    className="text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {deck.name}
                  </Link>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={status === "overdue" ? "destructive" : "outline"}
                  className={cn(
                    status === "overdue" &&
                      "border-red-500/30 bg-red-500/10 text-red-600",
                  )}
                >
                  {formatDate(card.nextDueDate)}
                </Badge>
              </TableCell>
              <TableCell>
                {card.lastScore ? (
                  <span className="tabular-nums text-muted-foreground">
                    {card.lastScore}/5
                  </span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
