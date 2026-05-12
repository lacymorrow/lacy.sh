interface DocsCalloutProps {
  type?: "note" | "tip" | "warning";
  children: React.ReactNode;
}

const labels = { note: "Note", tip: "Tip", warning: "Warning" };

export default function DocsCallout({ type = "note", children }: DocsCalloutProps) {
  return (
    <div className={`doc-callout doc-callout-${type}`}>
      <span className="doc-callout-label">{labels[type]}</span>
      {children}
    </div>
  );
}
