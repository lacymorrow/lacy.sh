"use client";

import { useEffect } from "react";
import DocsNav from "./DocsNav";

interface DocsMobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function DocsMobileDrawer({ open, onClose }: DocsMobileDrawerProps) {
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

  if (!open) return null;

  return (
    <>
      <div className="doc-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="doc-drawer" role="dialog" aria-modal="true" aria-label="Navigation">
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
