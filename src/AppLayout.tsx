import { Link, Outlet } from "react-router-dom";
import { Navbar, Footer } from "./components/Layout";
import { SearchOverlay } from "./components/SearchOverlay";

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SearchOverlay />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
