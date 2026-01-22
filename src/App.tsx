import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { DueToday } from "@/pages/due-today";
import { NextDue } from "@/pages/next-due";
import { DeckPage } from "@/pages/deck-page";
import { Login } from "@/pages/login";
import { Signup } from "@/pages/signup";

export default function App() {
  // TODO: Replace with actual auth state when backend is ready
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/due-today" replace />} />
          <Route path="/due-today" element={<DueToday />} />
          <Route path="/next-due" element={<NextDue />} />
          <Route path="/deck/:deckId" element={<DeckPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
