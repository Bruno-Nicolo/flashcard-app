import { CalendarBlankIcon, SunIcon, TrashIcon } from "@phosphor-icons/react";

export const PAGES = [
  {
    title: "Due Today",
    url: "/due-today",
    icon: <SunIcon />,
  },
  {
    title: "Next Due",
    url: "/next-due",
    icon: <CalendarBlankIcon />,
  },
  {
    title: "Deleted",
    url: "/deleted",
    icon: <TrashIcon />,
  },
];
