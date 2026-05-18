"use client";

import { useEffect, useRef } from "react";
import DocsNav from "./DocsNav";

interface DocsMobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function DocsMobileDrawer({ open, onClose }: DocsMobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus trap: move initial focus in, intercept Tab/Shift-Tab/Escape
  useEffect(() => {
    if (!open || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    drawer.addEventListener("keydown", handleKeyDown);
    return () => drawer.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="doc-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="doc-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        ref={drawerRef}
      >
        <div className="doc-drawer-header">
          <span className="doc-drawer-title">Documentation</span>
          <button className="doc-drawer-close" onClick={onClose} aria-label="Close navigation">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 3L13 13M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="doc-drawer-body">
          <DocsNav onLinkClick={onClose} />
        </div>
        <div className="doc-drawer-footer">
          <a href="/" className="doc-drawer-back">← lacy.sh</a>
        </div>
      </div>
    </>
  );
}
