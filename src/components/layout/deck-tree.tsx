import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CaretRight, Folder, FolderOpen } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { mockDecks, getCardsCountForDeck } from "@/data/mock-data";
import type { Deck } from "@/types/types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";

interface DeckWithChildren extends Deck {
  children: DeckWithChildren[];
}

function buildDeckTree(
  items: Deck[],
  parentId: string | null = null,
): DeckWithChildren[] {
  return items
    .filter((d) => d.parentId === parentId)
    .map((deck) => ({
      ...deck,
      children: buildDeckTree(items, deck.id),
    }));
}

export function DeckTree() {
  const [items, setItems] = useState<Deck[]>(mockDecks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const rootDecks = buildDeckTree(items, null);
  const rootIds = rootDecks.map((d) => d.id);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        // Simple reordering logic
        // Note: Real tree reorder needs more complex logic to handle parent changes
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  const activeItem = activeId ? items.find((i) => i.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={rootIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-0.5">
          {rootDecks.map((deck) => (
            <SortableDeckItem
              key={deck.id}
              deck={deck}
              level={0}
              allItems={items}
            />
          ))}
        </div>
      </SortableContext>

      {createPortal(
        <DragOverlay>
          {activeItem ? (
            <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-2 py-1.5 text-sm shadow-md">
              <Folder
                weight="duotone"
                className="size-4 text-sidebar-primary"
              />
              <span>{activeItem.name}</span>
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}

interface SortableDeckItemProps {
  deck: DeckWithChildren;
  level: number;
  allItems: Deck[];
}

function SortableDeckItem({ deck, level, allItems }: SortableDeckItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deck.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = deck.children.length > 0;
  const cardsCount = getCardsCountForDeck(deck.id);

  // Collapse folder when drag starts
  useEffect(() => {
    if (isDragging && isExpanded) {
      setIsExpanded(false);
    }
  }, [isDragging, isExpanded]);

  const childIds = deck.children.map((c) => c.id);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className="flex items-center group touch-none"
        style={{ paddingLeft: `${level * 12}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent drag start when clicking expand
              setIsExpanded(!isExpanded);
            }}
            onPointerDown={(e) => e.stopPropagation()}
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
          onClick={(e) => e.stopPropagation()} // Allow navigation
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

      {hasChildren && (
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-200 ease-out",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <SortableContext
              items={childIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="mt-0.5">
                {deck.children.map((child) => (
                  <SortableDeckItem
                    key={child.id}
                    deck={child}
                    level={level + 1}
                    allItems={allItems}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        </div>
      )}
    </div>
  );
}
