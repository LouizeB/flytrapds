import * as React from "react";

export function DeferredShowcase({ children, label, minHeight = "32rem" }: {
  children: React.ReactNode;
  label: string;
  minHeight?: string;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || visible) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { rootMargin: "800px 0px" });

    observer.observe(root);
    return () => observer.disconnect();
  }, [visible]);

  return <div aria-busy={!visible || undefined} className="min-w-0" data-slot="deferred-showcase" ref={rootRef}>
    {visible ? children : <div className="grid place-items-center rounded-2xl border border-white/8 bg-black/20 p-6" style={{ minHeight }}>
      <p className="text-sm text-white/60" role="status">{label} loads as you approach this section.</p>
    </div>}
  </div>;
}
