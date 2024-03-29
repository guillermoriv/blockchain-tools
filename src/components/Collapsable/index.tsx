import React, { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

export function Collapsable({
  children,
  header,
  className,
  reset,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  className?: string;
  reset?: () => void;
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;

    setHeight(expanded ? panelRef.current.scrollHeight : 0);
  }, [children, panelRef, expanded]);

  const handleExpanded = () => {
    setExpanded(!expanded);
    if (reset) reset();
  };

  return (
    <div className={clsx('collapsable', className, expanded && 'expanded')}>
      <div onClick={handleExpanded}>{header}</div>
      <div
        className="transition-[max-height] overflow-hidden"
        ref={panelRef}
        style={{
          maxHeight: height + 'px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
