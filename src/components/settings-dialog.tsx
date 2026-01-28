import { useState, useEffect } from "react";
import { MoonIcon, SunIcon, MonitorIcon } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Theme } from "@/types/types";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your flashcard experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <ThemeSelection />

          {/* Account Section */}
          <div className="space-y-3">
            <Label>Account</Label>
            <p className="text-sm text-muted-foreground">
              Account settings will be available when the backend is ready.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ThemeSelection() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "system";
    }
    return "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="space-y-3">
      <Label>Appearance</Label>
      <div className="grid grid-cols-3 gap-2">
        <ThemeButton
          theme="light"
          currentTheme={theme}
          onClick={() => setTheme("light")}
          icon={SunIcon}
          label="Light"
        />
        <ThemeButton
          theme="dark"
          currentTheme={theme}
          onClick={() => setTheme("dark")}
          icon={MoonIcon}
          label="Dark"
        />
        <ThemeButton
          theme="system"
          currentTheme={theme}
          onClick={() => setTheme("system")}
          icon={MonitorIcon}
          label="System"
        />
      </div>
    </div>
  );
}

interface ThemeButtonProps {
  theme: Theme;
  currentTheme: Theme;
  onClick: () => void;
  icon: React.ComponentType<{
    className?: string;
    weight?: "fill" | "regular";
  }>;
  label: string;
}

function ThemeButton({
  theme,
  currentTheme,
  onClick,
  icon: Icon,
  label,
}: ThemeButtonProps) {
  const isActive = theme === currentTheme;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-colors",
        isActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-accent",
      )}
    >
      <Icon
        weight={isActive ? "fill" : "regular"}
        className={cn("size-5", isActive ? "text-primary" : "text-foreground")}
      />
      <span
        className={cn(
          "text-xs font-medium",
          isActive ? "text-primary" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </button>
  );
}
