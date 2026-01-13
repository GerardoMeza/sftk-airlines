"use client";

import { useState } from "react";
import Link from "next/link";
import { Plane, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LoginModal } from "./auth/LoginModal";
import { MyTripsDrawer } from "./loyalty/MyTripsDrawer";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTripsOpen, setIsTripsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-[#11172b] to-[#1f2f5c] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
              <Plane className="w-6 h-6" />
              <span className="font-logo text-2xl font-bold">SFTK Airlines</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 items-center">
              <Link href="/" className="hover:text-blue-200 transition">
                Book
              </Link>

              {isAuthenticated && (
                <button
                  onClick={() => setIsTripsOpen(true)}
                  className="hover:text-blue-200 transition"
                >
                  My Trips
                </button>
              )}

              {isAuthenticated ? (
                <div className="flex items-center gap-4 pl-8 border-l border-blue-400">
                  <div className="text-sm">
                    <p className="font-semibold">{user?.firstName}</p>
                    <p className="text-blue-200">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-[#8B1E3F] hover:bg-[#731836] text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-[#8B1E3F] hover:bg-[#731836] text-white font-semibold px-6 py-2 rounded-md transition flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Loyalty Account
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-2 pb-4 border-t border-blue-400 pt-4">
              <Link
                href="/"
                className="block px-4 py-2 hover:bg-blue-600 rounded-lg transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book
              </Link>

              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setIsTripsOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-600 rounded-lg transition"
                  >
                    My Trips
                  </button>
                  <div className="px-4 py-2 border-t border-blue-400 mt-2 pt-2">
                    <p className="font-semibold text-sm mb-1">{user?.firstName}</p>
                    <p className="text-blue-200 text-sm mb-3">{user?.email}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-[#8B1E3F] hover:bg-[#731836] text-white font-semibold px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#8B1E3F] hover:bg-[#731836] text-white font-semibold px-4 py-2 rounded-md transition flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Loyalty Account
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Modals and Drawers */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <MyTripsDrawer isOpen={isTripsOpen} onClose={() => setIsTripsOpen(false)} />
    </>
  );
}
