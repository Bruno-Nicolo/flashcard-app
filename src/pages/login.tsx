import { useState } from "react";
import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  LockIcon,
  GoogleLogoIcon,
  CardsIcon,
  EyeIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual login when backend is ready
    console.log("Login attempt:", { email, password });
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth when backend is ready
    console.log("Google login clicked");
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex size-14 items-center justify-center rounded-xl bg-primary">
            <CardsIcon
              weight="duotone"
              className="size-8 text-primary-foreground"
            />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-balance">
            Welcome back
          </h1>
          <p className="mt-1 text-center text-sm text-muted-foreground text-pretty">
            Sign in to continue to Flashcards
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder={
                  isPasswordVisible ? "securePassword123" : "•••••••••••••••••"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                required
              />
              <Button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                variant="ghost"
                size={"icon"}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <EyeIcon />
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={handleGoogleLogin}
        >
          <GoogleLogoIcon weight="bold" className="size-4" />
          Login with Google
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
