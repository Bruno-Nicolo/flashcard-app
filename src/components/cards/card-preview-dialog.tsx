import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Flashcard } from "./flashcard";
import type { Card } from "@/types/types";

interface CardPreviewDialogProps {
  card: Card | null;
  onClose: () => void;
}

export function CardPreviewDialog({ card, onClose }: CardPreviewDialogProps) {
  return (
    <Dialog open={!!card} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[80vh] overflow-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{card?.title}</DialogTitle>
        </DialogHeader>
        {card && (
          <Flashcard
            title={card.title}
            content={card.content}
            className="border-0 p-0"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
