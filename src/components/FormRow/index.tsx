import React from 'react';

import clsx from 'clsx';

export function FormRow({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('mb-2', className)}>
      <div className="text-sm text-gray-600">{label}</div>
      <div>{children}</div>
    </div>
  );
}
