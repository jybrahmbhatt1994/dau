"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ChevronDown } from "@/components/ui/icons";
import { utilityLinks } from "@/data/navigation";
import type { NavItem, NavChild } from "@/lib/types";

export function Header({ navigation }: { navigation: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  // Mobile-only: tracks which nested (3rd-level) group is expanded, keyed by
  // "parentLabel > childLabel" so nested toggles never collide across groups.
  const [openSubGroup, setOpenSubGroup] = useState<string | null>(null);

  // Lock background scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-header">
      <Container className="flex h-[72px] items-center justify-between lg:h-[90px]">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navigation.map((item, i) => {
            const alignRight = i >= navigation.length - 4;
            return (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-black transition-colors group-hover:text-brand"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 text-ash transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {item.children && (
                  <div
                    className={`invisible absolute top-full z-50 min-w-[230px] translate-y-1 border-t-2 border-brand bg-white opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                      alignRight ? "right-0" : "left-0"
                    }`}
                  >
                    <ul className="py-2">
                      {item.children.map((child) => (
                        <li key={child.label} className="group/nested relative">
                          <Link
                            href={child.href}
                            className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium text-black/80 transition-colors hover:bg-surface hover:text-brand"
                          >
                            <span>{child.label}</span>
                            {child.children && (
                              <ChevronDown className="h-3 w-3 -rotate-90 text-ash" />
                            )}
                          </Link>

                          {/* 3rd-level flyout — opens to the right of the parent dropdown */}
                          {child.children && (
                            <div
                              className={`invisible absolute top-0 z-50 min-w-[240px] border-t-2 border-brand bg-white opacity-0 shadow-lg transition-all duration-150 group-hover/nested:visible group-hover/nested:opacity-100 ${
                                alignRight
                                  ? "right-full mr-px"
                                  : "left-full ml-px"
                              }`}
                            >
                              <ul className="py-2">
                                {child.children.map((grandchild) => (
                                  <li key={grandchild.label}>
                                    <Link
                                      href={grandchild.href}
                                      className="block px-4 py-2.5 text-sm font-medium text-black/80 transition-colors hover:bg-surface hover:text-brand"
                                    >
                                      {grandchild.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Morphing hamburger / X — single toggle, floats above the drawer */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative z-[60] inline-flex h-10 w-10 items-center justify-center xl:hidden"
        >
          <span className="relative block h-4 w-6" aria-hidden>
            <span
              className={`absolute left-0 block h-[2px] w-6 rounded-full bg-navy transition-all duration-300 ease-in-out ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-6 -translate-y-1/2 rounded-full bg-navy transition-all duration-200 ease-in-out ${
                open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-[2px] w-6 rounded-full bg-navy transition-all duration-300 ease-in-out ${
                open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </Container>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[86%] max-w-sm flex-col bg-white transition-transform duration-[450ms] xl:hidden ${
          open ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="flex h-[72px] shrink-0 items-center border-b border-line px-5">
          <Logo />
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navigation.map((item, i) => {
            const groupOpen = openGroup === item.label;
            return (
              <div
                key={item.label}
                className={`border-b border-line/70 transition-all duration-300 ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${130 + i * 45}ms` : "0ms" }}
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex-1 px-3 py-3 text-[15px] font-semibold text-navy"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroup(groupOpen ? null : item.label)
                      }
                      className="px-3 py-3 text-ash"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${groupOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {item.children && (
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                      groupOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <ul className="min-h-0 overflow-hidden bg-surface">
                      {item.children.map((child) => {
                        const subKey = `${item.label} > ${child.label}`;
                        const subOpen = openSubGroup === subKey;

                        return (
                          <li key={child.label}>
                            <div className="flex items-center justify-between">
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="flex-1 px-6 py-2.5 text-sm font-medium text-black/75"
                              >
                                {child.label}
                              </Link>
                              {child.children && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenSubGroup(subOpen ? null : subKey)
                                  }
                                  className="px-4 py-2.5 text-ash"
                                  aria-label={`Toggle ${child.label} submenu`}
                                >
                                  <ChevronDown
                                    className={`h-3.5 w-3.5 transition-transform duration-300 ${subOpen ? "rotate-180" : ""}`}
                                  />
                                </button>
                              )}
                            </div>

                            {/* 3rd-level nested accordion */}
                            {child.children && (
                              <div
                                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                                  subOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                              >
                                <ul className="min-h-0 overflow-hidden bg-white">
                                  {child.children.map((grandchild) => (
                                    <li key={grandchild.label}>
                                      <Link
                                        href={grandchild.href}
                                        onClick={() => setOpen(false)}
                                        className="block px-9 py-2.5 text-sm text-black/70"
                                      >
                                        {grandchild.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-line bg-navy px-5 py-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {utilityLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[11px] font-semibold text-white/85"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </header>
  );
}